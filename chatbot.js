document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

async function sendMessage() {
    let userInput = document.getElementById("chat-input").value;
    if (!userInput.trim()) return;

    appendMessage("You: " + userInput);
    document.getElementById("chat-input").value = "";

    try {
        let response = await fetch("https://your-backend-url.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });
        let data = await response.json();
        appendMessage("Bot: " + data.reply);
    } catch (error) {
        appendMessage("Error: Could not connect to chatbot.");
    }
}

function appendMessage(text) {
    let chatBox = document.getElementById("chat-box");
    let message = document.createElement("div");
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
