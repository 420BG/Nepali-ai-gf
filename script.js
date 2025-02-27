document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("send-btn").addEventListener("click", function() {
        let chatInput = document.getElementById("chat-input").value;
        fetchGeminiResponse(chatInput);
    });

    function fetchGeminiResponse(userInput) {
        fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=AIzaSyDZij508zywOhfS55m8XQ0CptUF1FnK8yg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: userInput })
        })
        .then(response => response.json())
        .then(data => alert("Gemini Response: " + data.candidates[0].output))
        .catch(error => console.error("Error:", error));
    }
});
