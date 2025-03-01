(async () => {
  // API Configuration
  const API_KEY = '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'; // Replace with your OpenAI API key
  const API_URL = "https://api.openai.com/v1/chat/completions"; // OpenAI's ChatGPT API endpoint

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

  // Function to get AI response from OpenAI API
  async function getAIResponse(prompt) {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful AI assistant." }, { role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Error response:", errData);
        return `Error: ${errData.error?.message || "API request failed."}`;
      }

      const data = await response.json();
      console.log("API response:", data);

      return data.choices[0]?.message?.content || "No response.";
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

    const loadingMsg = document.createElement("div");
    loadingMsg.className = "message bot-message";
    loadingMsg.textContent = "Thinking...";
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

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
