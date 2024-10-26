// Import GoogleGenerativeAI from the npm package
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client with your API key
const genAI = new GoogleGenerativeAI('AIzaSyCMTVPR2xlE22wDD6ST1mF4UigPgwHEJJQ');

// Select the model (gemini-1.5-flash in this case)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Send a message to Google Generative AI and display the response
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (!userInput) return;

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

  try {
    // Generate content using the AI model
    const result = await model.generateContent(userInput);

    // Display the chatbot's response
    const botReply = await result.response.text(); // Ensure we get the text response
    messagesDiv.innerHTML += `<div><strong>Chatbot:</strong> ${botReply}</div>`;
  } catch (error) {
    messagesDiv.innerHTML += `<div><strong>Error:</strong> ${error.message}</div>`;
  }

  // Clear the input field after sending the message
  document.getElementById('user-input').value = '';
}

// Attach the sendMessage function to the button click event
document.getElementById('send-btn').addEventListener('click', sendMessage);
