import OpenAI from "openai";
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY
});

var port = process.env.PORT || 8080;

var app = express();
app.use(express.json()) 
app.use(cors());

app.get("/", (request, response) => {
    response.sendFile('./index.html', {root: __dirname })
});

app.post("/", async function (request, response) {
    try {
        console.log("\nTheory: " + request.body.theory)

        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "Assume the role of a fact-checker tasked with assessing the validity of the claims presented in the following text. Write a one-paragraph analysis comparing the key points in the text to established knowledge on the subject matter, highlighting any inconsistencies or contradictions between the text's assertions and widely recognized information. Text: ###"},
                {"role": "user", "content": request.body.theory}],
            model: "gpt-4-1106-preview",
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