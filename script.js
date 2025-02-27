(async () => {
  // API Configuration
  const API_KEY = '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'; // Replace with your API key
  // Updated endpoint with correct model version
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

  // Chat elements
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // Function to add message to chatbox
  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv; // Return message element for removal
  }

  // Function to get AI response from Hugging Face with additional parameters
  async function getAIResponse(prompt) {
    // Wrap the prompt in a conversation format
    const formattedPrompt = `User: ${prompt}\nAssistant:`;
    console.log("Sending prompt:", formattedPrompt);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          // Force waiting if the model is cold
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

    // Add loading indicator
    const loadingMsg = addMessage("Thinking...", false);

    // Get AI response and update chat
    const aiResponse = await getAIResponse(message);
    chatMessages.removeChild(loadingMsg);
    addMessage(aiResponse, false);
  }

  // Event listeners for the send button and Enter key
  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  // Initial bot message
  addMessage("Baby! How can I assist you today? 😊", false);
})();
