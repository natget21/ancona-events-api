import axios from 'axios';
import { Readable } from 'stream';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export const sendPromptRequest = async (req, res) => {
  const { promptId, agent } = req.body;
};

export const sendRequest = async (req, res) => {
    const { message, agent } = req.body;

    if (!message || !agent) {
        return res.status(400).json({ error: 'Message and agent are required' });
    }

    try {
        const stream = await getAgentResponse(message, agent);
        
        stream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Error processing the agent request', details: error.message });
    }
};

export const getAgentResponse = async (message, agent) => {
    switch (agent) {
      case 'chatgpt':
        return await getChatGptResponse(message);
      case 'gemini':
        return await getGeminiResponse(message);
      default:
        throw new Error('Unsupported agent');
    }
};

const getChatGptResponse = async (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };
  
    const data = {
      model: 'gpt-3.5-turbo', 
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
      stream: true
    };
  
    const response = await axios.post(url, data, { headers, responseType: 'stream' });
  
    return response.data;
  };
  
  const getGeminiResponse = async (message) => {

    const result = await ai.models.generateContentStream({
        model: 'gemini-2.0-flash-001',
        contents: message,
      });
  
    const stream = new Readable({
      read: async function () {
        for await (const chunk of result.stream) {
          this.push(chunk.text()); 
        }
        this.push(null); 
      },
    });
  
    return stream; 
  };

  const createPrompt = (message, history = [], fileUrls = []) => {
    let prompt = "You are an AI assistant. Answer the user's message based on the given context.\n\n";
  
    if (history.length > 0) {
      prompt += "### Conversation History:\n";
      history.forEach((msg, index) => {
        prompt += `${index + 1}. ${msg.role}: ${msg.content}\n`;
      });
      prompt += "\n";
    }
  
    prompt += `### User Message:\n${message}\n\n`;
  
    if (fileUrls.length > 0) {
      prompt += "### Attached Files:\n";
      fileUrls.forEach((url, index) => {
        prompt += `${index + 1}. ${url}\n`;
      });
      prompt += "\n";
    }
  
    prompt += "### Response:\n";
    
    return prompt;
  };
  