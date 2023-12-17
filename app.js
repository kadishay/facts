import OpenAI from "openai";
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY
});

var port = process.env.PORT || 5000;

var app = express();
app.use(express.json()) 
app.get("/", (request, response) => {
    response.sendFile('./index.html', {root: __dirname })
});

app.post("/", async function (request, response) {
    try {
        console.log("\nTheory: " + request.body.theory)

        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "Assume the role of a fact-checker tasked with assessing the validity of the claims presented in the following text. Write a one-paragraph analysis comparing the key points in the text to established knowledge on the subject matter, highlighting any inconsistencies or contradictions between the text's assertions and widely recognized information. Please translate the output to the original language of the text. Text: ###"},
                {"role": "user", "content": request.body.theory}],
            model: "gpt-3.5-turbo",
        });

        console.log("Fact: " + completion.choices[0].message.content);

        return response.send(completion.choices[0].message.content);
    } catch (error) {
        console.log("\nError:");
        console.log(error);
        return error;
    }
});

app.listen(port, () => console.log("Server running!!! on: ", port));
