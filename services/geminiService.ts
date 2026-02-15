import { GoogleGenAI } from "@google/genai";
import { Agent } from "../types";

// NOTE: In a real app, never expose keys on client side. This is for demo only.
const API_KEY = process.env.API_KEY || '';

export const sendMessageToAgent = async (
  agent: Agent, 
  message: string, 
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!API_KEY) {
    return "Error: API_KEY is missing. Please check your environment configuration.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // UPGRADE: Switched to 'gemini-3-pro-preview' for high-stakes clinical reasoning.
    // 'gemini-3-flash-preview' is good for speed, but Pro is required for complex logic/prescriptions.
    
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: agent.systemInstruction,
        // CRITICAL: Temperature 0 ensures the model is deterministic and factual.
        // It prevents "hallucinations" or creative guesses, which is vital for medication.
        temperature: 0, 
        // We enable "Thinking" to allow the model to reason through guidelines before answering.
        thinkingConfig: { 
          thinkingBudget: 4096 // Allocate tokens for internal reasoning process
        },
        maxOutputTokens: 8192, // Allow sufficient space for the final detailed prescription
      },
      history: history // Pass previous context
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to contact the AI Agent. Please try again or consult fallback protocols.";
  }
};