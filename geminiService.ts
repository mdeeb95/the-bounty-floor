
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSharkAdvice = async (bountyTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a legendary senior developer known as "The Shark". 
      Give a short, aggressive, high-stakes advice for a developer attempting this bounty: "${bountyTitle}". 
      Keep it under 30 words. Use developer slang.`
    });
    return response.text;
  } catch (error) {
    return "Refactor or perish. The clock is ticking.";
  }
};

export const generateBountyBriefing = async (bountyTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 3-step high-level technical plan for this coding task: "${bountyTitle}". 
      Format as a JSON object with "steps" array of strings.`
    });
    return JSON.parse(response.text.replace(/```json|```/g, ''));
  } catch (error) {
    return { steps: ["Analyze requirements", "Implement fix", "Secure the bag"] };
  }
};
