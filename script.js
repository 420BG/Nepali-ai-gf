(async () => {
  // API Configuration
  const API_KEY = 'AIzaSyBEVgPdNDVJM4NV4Ze2oxSiENLsl2TjKCk'; // Your Hume AI API key
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash"; // Correct endpoint

  // Chat elements
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // Function to add a message to the chatbox
  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to get AI response
  async function getAIResponse(prompt) {
    const payload = {
      text: prompt,
      model: "chatbot", // Change based on the Hume AI model you are using
      temperature: 0.7
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Error response:", errData);
        return `Error: ${errData.message || "API request failed."}`;
      }

      const data = await response.json();
      console.log("API response:", data);

      return data.generated_text || "No response.";
    } catch (error) {
      console.error("Fetch error:", error);
      return "Error: Could not connect to AI.";
    }
  }

  // Function to handle sending messages
  async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";

    const loadingMsg = addMessage("Thinking...", false);

    const aiResponse = await getAIResponse(message);
    chatMessages.removeChild(loadingMsg);
    addMessage(aiResponse, false);
  }

  // Event listeners for send button and Enter key
  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  // Initial bot message
  addMessage("Baby! How can I assist you today? 😊", false);
})();
