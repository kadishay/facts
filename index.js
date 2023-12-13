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

var app = express();
app.use(express.json()) 
app.get("/", (request, response) => {
    response.sendFile('./index.html', {root: __dirname })
});

app.post("/", async function (request, response) {

    console.log("\nTheory: " + request.body.theory)

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a facts checker who checks the input received as factual or false. Your output should first be the bottom line: whether this statement is true or false.  Then you should provide testaments you have based your conclusion on."},
            {"role": "user", "content": request.body.theory}],
        model: "gpt-3.5-turbo",
    });

    console.log("Fact: " + completion.choices[0].message.content);

    return response.send(completion.choices[0].message.content);
});

app.listen(3000, () => console.log("Server running!!!"));