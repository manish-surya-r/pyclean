
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

export interface Change {
    lineNumber: number;
    explanation: string;
}

export interface BeautifyResult {
    formattedCode: string;
    changes: Change[];
}

const systemInstruction = `You are an expert Python code formatter. Your task is to take Python code, beautify it according to PEP 8 standards, and explain the changes you made.
You MUST return a valid JSON object that adheres to the provided schema.
The JSON object must contain:
1.  "formattedCode": A string containing the fully formatted Python code.
2.  "changes": An array of objects, where each object details a specific correction. Each object must contain:
    - "lineNumber": The line number in the *formatted code* where the change was made.
    - "explanation": A brief, clear explanation of the correction, referencing PEP 8 where applicable.

- Do not add any new logic or comments to the code itself.
- Ensure the 'formattedCode' is raw Python, without any markdown formatting.
- If no changes are needed, return the original code and an empty 'changes' array.`;

export const beautifyPythonCode = async (code: string): Promise<BeautifyResult> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: code,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        formattedCode: { type: Type.STRING },
                        changes: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    lineNumber: { type: Type.NUMBER },
                                    explanation: { type: Type.STRING },
                                },
                                required: ["lineNumber", "explanation"],
                            },
                        },
                    },
                    required: ["formattedCode", "changes"],
                },
            },
        });
        
        const result = JSON.parse(response.text);
        return result;

    // FIX: Corrected catch block syntax. The `=>` is invalid here.
    } catch (error) {
        console.error("Error calling Gemini API or parsing JSON:", error);
        if (error instanceof SyntaxError) {
             throw new Error("The AI returned an invalid response format. Please try again.");
        }
        throw new Error("Failed to communicate with the AI service.");
    }
};
