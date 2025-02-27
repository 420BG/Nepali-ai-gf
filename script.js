// API Configuration
const API_KEY = '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'; // Replace with your API key
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct"; // Hugging Face API URL

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

// Function to get AI response from Hugging Face
async function getAIResponse(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        const data = await response.json();

        if (data && Array.isArray(data)) {
            return data[0].generated_text || "Sorry, I couldn't generate a response.";
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
    if (e.key === 'Enter') handleSend();
});

// Initial bot message
addMessage("Baby! How can I assist you today? 😊", false);
