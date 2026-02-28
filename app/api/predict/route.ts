import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
      Provide a 4 word formal email subject line for this message: "${text}". Return only the subject text.`,
    });

    return Response.json({ subject: response.text });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { subject: "Error generating subject" },
      { status: 500 },
    );
  }
}
