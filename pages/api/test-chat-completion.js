import { openai } from "../../src/backend/utilities/openai";

export default async function handler(req, res) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });
    res.status(200).json({ chatCompletion });
}
