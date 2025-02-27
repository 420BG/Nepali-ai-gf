(async () => {
  // API Configuration
  const API_KEY = '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'; // Replace with your API key
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"; // Correct model endpoint

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
    return messageDiv;
  }

  // Function to get AI response with a friendly, affectionate tone
  async function getAIResponse(prompt) {
    // Updated prompt: instruct the model to use loving, friendly language without using labels
    const formattedPrompt = `You are a warm and affectionate chatbot who always responds with friendly, love-filled words and care. Do not include any labels like "Assistant:" in your reply. Now, respond to the following:
User: ${prompt}
`;
    console.log("Sending prompt:", formattedPrompt);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "x-wait-for-model": "true"
        },
        body: JSON.stringify({
          inputs: formattedPrompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9
          }
        })
      });
      console.log("HTTP status:", response.status);

      if (!response.ok) {
        const errData = await response.json();
        console.error("Error response:", errData);
        return `Error: ${errData.error || "API request failed."}`;
      }

      const data = await response.json();
      console.log("API response:", data);

      if (Array.isArray(data) && data.length > 0) {
        return data[0].generated_text || "No response.";
      } else if (data.generated_text) {
        return data.generated_text;
      } else {
        return "No response.";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return "Error: Could not connect to AI.";
    }
  }

  // Function to handle sending messages
  async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    console.log("Send button clicked with message:", message);
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
