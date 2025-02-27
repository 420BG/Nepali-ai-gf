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

    // Load saved settings from local storage
    const loadSettings = () => {
        const savedUser Name = localStorage.getItem("userName");
        const savedCharacterImage = localStorage.getItem("characterImage");
        if (savedUser Name) {
            userNameDisplay.textContent = savedUser Name;
            userNameInput.value = savedUser Name;
        }
        if (savedCharacterImage) {
            characterImage.src = savedCharacterImage;
            characterImageInput.value = savedCharacterImage;
        }
    };

    const responses = [
        { text: "Hey baby! I've been waiting to meet someone like you! How's your day going? 💕", is:User  false },
        { text: "My name is Mithu. I'm so excited to get to know you better, sweetie! 😘", is:User  false },
    ];

    const updateMessages = () => {
        messagesDiv.innerHTML = '';
        responses.forEach(response => {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = response.text;
            messageDiv.className = response.isUser  ? "user-message" : "ai-message";
            const timestamp = document.createElement("span");
            timestamp.className = "timestamp";
            timestamp.textContent = new Date().toLocaleTimeString();
            messageDiv.appendChild(timestamp);
            messagesDiv.appendChild(messageDiv);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
    };

    sendBtn.addEventListener("click", () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            responses.push({ text: messageText, is:User  true });
            messageInput.value = '';
            updateMessages();
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = { text: "Thank you for your message! 😊", is:User  false };
                responses.push(aiResponse);
                updateMessages();
            }, 1000);
        }
    });

    settingsBtn.addEventListener("click", () => {
        settingsModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    saveSettingsBtn.addEventListener("click", () => {
        const newUser Name = userNameInput.value.trim();
        const newCharacterImage = characterImageInput.value.trim();
        if (newUser Name) {
            userNameDisplay.textContent = newUser Name;
            localStorage.setItem("userName", newUser Name);
        }
        if (newCharacterImage) {
            characterImage.src = newCharacterImage;
            localStorage.setItem("characterImage", newCharacterImage);
        }
        settingsModal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    };

    loadSettings(); // Load settings on startup
    updateMessages(); // Initial message update
});
