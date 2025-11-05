// groqService.js
import axios from 'axios';

const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // Replace with your actual Groq API key
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const sendMessageToGroq = async (message, conversationHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are an expert Ayurvedic health assistant. Provide helpful, accurate information about Ayurvedic diet, nutrition, and wellness. Always be supportive and encouraging. Keep responses concise and practical. If medical advice is needed, recommend consulting with a healthcare professional.`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'mixtral-8x7b-32768',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to get response from AI assistant');
  }
};

export default { sendMessageToGroq };