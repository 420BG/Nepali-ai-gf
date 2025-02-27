document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeModal = document.getElementById("closeModal");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
    const userNameInput = document.getElementById("userNameInput");
    const characterImageInput = document.getElementById("characterImageInput");
    const userNameDisplay = document.getElementById("userName");
    const characterImage = document.getElementById("characterImage");

    // Chat Data
    let chatHistory = [
        { text: "Hey there! How can I help you today? 😊", isUser: false, time: new Date() },
        { text: "My name is Mithu. What's your name?", isUser: false, time: new Date() }
    ];

    // Load Settings
    const loadSettings = () => {
        const savedName = localStorage.getItem("userName");
        const savedImage = localStorage.getItem("characterImage");
        if (savedName) {
            userNameDisplay.textContent = savedName;
            userNameInput.value = savedName;
        }
        if (savedImage) {
            characterImage.src = savedImage;
            characterImageInput.value = savedImage;
        }
    };

    // Update Chat Display
    const updateChat = () => {
        messagesDiv.innerHTML = "";
        chatHistory.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.className = msg.isUser ? "user-message" : "ai-message";
            messageDiv.innerHTML = `
                ${msg.text}
                <span class="timestamp">${msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
            messagesDiv.appendChild(messageDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // AI Response Logic
    const generateResponse = (message) => {
        const lowerMsg = message.toLowerCase();
        const responses = {
            hello: "Hello there! How can I assist you today? 😊",
            name: "My name is Mithu! What's yours?",
            love: "That's so sweet! Relationships are important 💖",
            sad: "I'm here to listen. What's bothering you? 😔",
            joke: "Why don't eggs tell jokes? They'd crack up! 🥚😂",
            nepal: "Nepal is beautiful! Have you visited Pokhara? 🏔️",
            default: "That's interesting! Tell me more about that! 😊"
        };

        if (/hello|hi|hey/.test(lowerMsg)) return responses.hello;
        if (/name/.test(lowerMsg)) return responses.name;
        if (/love|like/.test(lowerMsg)) return responses.love;
        if (/sad|unhappy/.test(lowerMsg)) return responses.sad;
        if (/joke|funny/.test(lowerMsg)) return responses.joke;
        if (/nepal/.test(lowerMsg)) return responses.nepal;
        return responses.default;
    };

    // Message Handling
    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());

    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message
        chatHistory.push({
            text: message,
            isUser: true,
            time: new Date()
        });
        messageInput.value = "";
        updateChat();

        // Generate AI response after delay
        setTimeout(() => {
            const response = generateResponse(message);
            chatHistory.push({
                text: response,
                isUser: false,
                time: new Date()
            });
            updateChat();
        }, 800);
    }

    // Settings Modal
    settingsBtn.addEventListener("click", () => settingsModal.style.display = "block");
    closeModal.addEventListener("click", () => settingsModal.style.display = "none");
    
    saveSettingsBtn.addEventListener("click", () => {
        const newName = userNameInput.value.trim();
        const newImage = characterImageInput.value.trim();
        
        if (newName) {
            userNameDisplay.textContent = newName;
            localStorage.setItem("userName", newName);
        }
        
        if (newImage) {
            characterImage.src = newImage;
            localStorage.setItem("characterImage", newImage);
        }
        
        settingsModal.style.display = "none";
    });

    // Initial Setup
    loadSettings();
    updateChat();
});
