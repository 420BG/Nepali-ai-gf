// Load Google Generative AI SDK
(async () => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@google/generative-ai";
    document.head.appendChild(script);
    await new Promise(resolve => script.onload = resolve);

    // API Configuration
    const API_KEY = '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'; // Replace with your valid API key
    const genAI = new window.googleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Chat elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Chat history storage
    let chatHistory = [];

    // Add message to chatbox
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv; // Return message element
    }

    // Get AI response
    async function getAIResponse(prompt) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text(); // Properly accessing response text
        } catch (error) {
            console.error('AI Error:', error);
            return "Sorry, I'm having trouble responding right now. Please try again later.";
        }
    }

    // Handle sending message
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
    addMessage("Baby! How can I assist you today? 😊", false);
})();
