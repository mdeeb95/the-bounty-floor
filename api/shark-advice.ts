import { GoogleGenAI } from "@google/genai";
import { VercelRequest, VercelResponse } from '@vercel/node';

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { bountyTitle } = req.body;

    if (!bountyTitle) {
        return res.status(400).json({ error: 'Bounty title is required' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a legendary senior developer known as "The Shark". 
      Give a short, aggressive, high-stakes advice for a developer attempting this bounty: "${bountyTitle}". 
      Keep it under 30 words. Use developer slang.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.status(200).json({ text });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch shark advice', details: error.message });
    }
}
