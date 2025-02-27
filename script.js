// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Authentication Function
function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log("User signed in:", result.user);
    }).catch((error) => {
        console.error("Authentication Error:", error);
    });
}

// Functionality for buttons
document.getElementById('gamesBtn').addEventListener('click', () => {
    alert("Games function clicked!");
});

document.getElementById('customizeBtn').addEventListener('click', () => {
    alert("Customize function clicked!");
});

document.getElementById('giftsBtn').addEventListener('click', () => {
    alert("Gifts function clicked!");
});

document.getElementById('photosBtn').addEventListener('click', () => {
    alert("Photos function clicked!");
});

document.getElementById('eventsBtn').addEventListener('click', () => {
    alert("Events function clicked!");
});

// Chat Functionality
document.getElementById('sendBtn').addEventListener('click', () => {
    const message = document.getElementById('chatInput').value;
    if (message.trim()) {
        // Call the Gemini API to send the chat message
        console.log("Message to send:", message);
        document.getElementById('chatInput').value = ""; // Clear input
    }
});
