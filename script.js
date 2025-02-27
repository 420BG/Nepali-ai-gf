document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Simple AI responses
    const responses = {
        hello: "Namaste! How can I help you today? 😊",
        name: "My name is Mithu! What's your name?",
        love: "You're so sweet! 💖",
        sad: "I'm here for you 😔",
        joke: "Why did the computer go to therapy? It had too many bytes of emotional baggage! 😂",
        default: "That's interesting! Tell me more!"
    };

    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(input) {
        input = input.toLowerCase();
        if (input.includes('hello')) return responses.hello;
        if (input.includes('name')) return responses.name;
        if (input.includes('love') || input.includes('like')) return responses.love;
        if (input.includes('sad')) return responses.sad;
        if (input.includes('joke')) return responses.joke;
        return responses.default;
    }

    function handleSend() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = '';

        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, false);
        }, 500);
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Initial message
    addMessage(responses.hello, false);
});
