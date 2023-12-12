import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "YYou are a facts checker who checks the input received as factual or false. Your output should first be the bottom line: whether this statement is true or false.  Then you should provide testaments you have based your conclusion on."},
        {"role": "user", "content": "Obama won the NBA championship"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
main();
