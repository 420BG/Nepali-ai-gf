document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeModal = document.getElementById("closeModal");
    const userNameInput = document.getElementById("userNameInput");
    const saveNameBtn = document.getElementById("saveNameBtn");
    const userNameDisplay = document.getElementById("userName");
    const moodIndicator = document.getElementById("moodIndicator");

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

    saveNameBtn.addEventListener("click", () => {
        const newUser Name = userNameInput.value.trim();
        if (newUser Name) {
            userNameDisplay.textContent = newUser Name;
        }
        settingsModal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    };

    updateMessages(); // Initial message update
});
