document.addEventListener('DOMContentLoaded', async () => {
    // Gemini API Configuration
    const API_KEY = 'AIzaSyDZij508zywOhfS55m8XQ0CptUF1FnK8yg';
    const genAI = new window.googleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Chat elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Chat history storage
    let chatHistory = [];

    // Add message to chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get Gemini response
    async function getAIResponse(prompt) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('AI Error:', error);
            return "Sorry, I'm having trouble responding right now. Please try again later.";
        }
    }

    // Handle message sending
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
            
            // Remove loading and add actual response
            chatMessages.removeChild(loadingMsg);
            addMessage(response, false);
            
            // Store conversation
            chatHistory.push({ user: message, ai: response });
        } catch (error) {
            chatMessages.removeChild(loadingMsg);
            addMessage("Error processing your request", false);
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Initial message
    addMessage("Namaste! How can I assist you today? 😊", false);
});
