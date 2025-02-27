// API Configuration
const API_KEY = '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'; // Replace with your API key
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct"; // Ensure this is the correct endpoint

// Chat elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add message to chatbox
function addMessage(text, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageDiv; // Return message element for removal
}

// Function to get AI response from Hugging Face with extra parameters and waiting header
async function getAIResponse(prompt) {
  try {
    // Wrap the prompt in a simple conversation format
    const formattedPrompt = `User: ${prompt}\nAssistant:`;
    console.log("Sending prompt to API:", formattedPrompt);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        // Force waiting for model if it's cold
        "x-wait-for-model": "true"
      },
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          top_p: 0.9
        }
      })
    });
    
    console.log("Response status:", response.status);
    if (!response.ok) {
      const errData = await response.json();
      console.error("API Error:", errData);
      return `Error: ${errData.error || "Unknown error"}`;
    }
    
    const data = await response.json();
    console.log("Response data:", data);
    
    if (data.error) {
      return `Error: ${data.error}`;
    }
    
    if (Array.isArray(data)) {
      return data[0].generated_text || "Sorry, I couldn't generate a response.";
    } else if (data.generated_text) {
      return data.generated_text;
    } else {
      return "Sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("AI Error:", error);
    return "Error connecting to AI. Please try again.";
  }
}

// Function to handle sending messages
async function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;

  console.log("Send button clicked with message:", message);
  // Add user message
  addMessage(message, true);
  userInput.value = '';

  // Add loading indicator
  const loadingMsg = addMessage("Thinking...", false);

  try {
    // Get AI response
    const response = await getAIResponse(message);
    chatMessages.removeChild(loadingMsg);
    addMessage(response, false);
  } catch (error) {
    chatMessages.removeChild(loadingMsg);
    addMessage("Error processing your request", false);
  }
}

// Event listeners for send button and enter key
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});

// Initial bot message
addMessage("Baby! How can I assist you today? 😊", false);
