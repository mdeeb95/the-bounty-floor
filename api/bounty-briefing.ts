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
        const prompt = `Generate a 3-step high-level technical plan for this coding task: "${bountyTitle}". 
      Format as a JSON object with "steps" array of strings.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const json = JSON.parse(text.replace(/```json|```/g, ''));

        return res.status(200).json(json);
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch briefing', details: error.message });
    }
}
