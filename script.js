document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeModal = document.getElementById("closeModal");
    const userNameInput = document.getElementById("userNameInput");
    const characterImageInput = document.getElementById("characterImageInput");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
    const userNameDisplay = document.getElementById("userName");
    const characterImage = document.getElementById("characterImage");
    const moodIndicator = document.getElementById("moodIndicator");

    // Initialize responses with default messages
    let responses = [
        { text: "Hey baby! I've been waiting to meet someone like you! How's your day going? 💕", isUser: false },
        { text: "My name is Mithu. I'm so excited to get to know you better, sweetie! 😘", isUser: false },
    ];

    // Load saved settings from local storage
    const loadSettings = () => {
        const savedUserName = localStorage.getItem("userName");
        const savedCharacterImage = localStorage.getItem("characterImage");
        if (savedUserName) {
            userNameDisplay.textContent = savedUserName;
            userNameInput.value = savedUserName;
        }
        if (savedCharacterImage) {
            characterImage.src = savedCharacterImage;
            characterImageInput.value = savedCharacterImage;
        }
    };

    const updateMessages = () => {
        messagesDiv.innerHTML = '';
        responses.forEach(response => {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = response.text;
            messageDiv.className = response.isUser ? "user-message" : "ai-message";
            
            // Add timestamp
            const timestamp = document.createElement("span");
            timestamp.className = "timestamp";
            timestamp.textContent = new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            
            messageDiv.appendChild(timestamp);
            messagesDiv.appendChild(messageDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    const generateAIResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();
        let aiResponse = "That's interesting! Tell me more! 😊";

        // Improved response logic
        if (/how are you/i.test(userMessage)) {
            aiResponse = "I'm just a program, but I'm here for you! How about you? 😊";
        } else if (/(love|like)/i.test(userMessage)) {
            aiResponse = "Love is wonderful! What makes you feel that way? ❤️";
        } else if (/happy/i.test(userMessage)) {
            aiResponse = "Your happiness makes me smile! 😄 What's making you happy?";
        } else if /sad/i.test(userMessage)) {
            aiResponse = "I'm here to listen. Want to share what's bothering you? 😔";
        } else if (/joke/i.test(userMessage)) {
            aiResponse = "Why did the computer go to therapy? It had too many bytes of emotional baggage! 😂";
        } else if (/nepal/i.test(userMessage)) {
            aiResponse = "Nepal's beauty is unmatched! Have you visited Pokhara? 🏔️";
        } else if (/name/i.test(userMessage)) {
            aiResponse = "You can call me Mithu! What should I call you? 😊";
        }

        return aiResponse;
    };

    // Event Listeners
    sendBtn.addEventListener("click", () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Add user message
            responses.push({ text: messageText, isUser: true });
            messageInput.value = '';
            updateMessages();

            // Generate and add AI response
            setTimeout(() => {
                const aiResponse = generateAIResponse(messageText);
                responses.push({ text: aiResponse, isUser: false });
                updateMessages();
            }, 800); // Reduced delay for better UX
        }
    });

    // Modal Handling
    settingsBtn.addEventListener("click", () => settingsModal.style.display = "block");
    closeModal.addEventListener("click", () => settingsModal.style.display = "none");
    
    saveSettingsBtn.addEventListener("click", () => {
        const newUserName = userNameInput.value.trim();
        const newCharacterImage = characterImageInput.value.trim();
        
        if (newUserName) {
            userNameDisplay.textContent = newUserName;
            localStorage.setItem("userName", newUserName);
        }
        
        if (newCharacterImage) {
            characterImage.src = newCharacterImage;
            localStorage.setItem("characterImage", newCharacterImage);
        }
        
        settingsModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
    };

    // Initial setup
    loadSettings();
    updateMessages();
});
