// OpenAI API Key (Replace with your actual key)
const API_KEY = "your-api-key-here"; 

// Get UI Elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to send a message
async function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    // Display user message
    displayMessage("You", message, "user");

    // Clear input
    userInput.value = "";

    // Get AI response
    let aiResponse = await getAIResponse(message);
    displayMessage("AI", aiResponse, "bot");
}

// Function to display messages
function displayMessage(sender, text, className) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Function to call OpenAI API
async function getAIResponse(userMessage) {
    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        let data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, I couldn't process your request.";
    }
}

// Event Listener for Send Button
sendBtn.addEventListener("click", sendMessage);

// Event Listener for Enter Key
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});
