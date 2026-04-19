import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ initialize HERE (after env is ready)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    console.log("API KEY:", genAI, process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    You are an Islamic assistant helping users with Hajj and Umrah.
    Provide accurate, simple, and respectful answers.
    If unsure, advise consulting a scholar.

    User: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Something went wrong" });
  }
};
