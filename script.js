(async () => {
  // API Configuration
  const API_KEY = 'JnOIvPtGcHOQLY28UO9VHTshPk0pUaqdmLqdSv1DHZ6ltN26'; // Your Hume AI Key
  const API_URL = "https://api.hume.ai/v0/models/chat"; // Correct Hume AI API Endpoint

  // Chat elements
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function getAIResponse(prompt) {
    const formattedPrompt = `User: ${prompt}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: { text: formattedPrompt } }) // Adjusted JSON format
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Error response:", errData);
        return `Error: ${errData.message || "API request failed."}`;
      }

      const data = await response.json();
      return data.output || "No response.";
    } catch (error) {
      console.error("Fetch error:", error);
      return "Error: Could not connect to AI. Check API key and CORS settings.";
    }
  }

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

  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  addMessage("Baby! How can I assist you today? 😊", false);
})();
