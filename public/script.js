document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const messageText = userInput.value.trim();

    if (messageText === "") return;

    displayMessage(messageText, "user");
    userInput.value = "";
    
    getAgentResponse(messageText);
}

function displayMessage(text, type, isHtml = false) {
    const chatWindow = document.getElementById("chat-window");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type === "user" ? "user-message" : "agent-message");
    
    if (isHtml) {
        messageDiv.innerHTML = text; // Render HTML content
    } else {
        messageDiv.textContent = text; // Render plain text
    }
    
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return messageDiv;
}

// Function to add and remove the typing indicator
function showTypingIndicator() {
    const chatWindow = document.getElementById("chat-window");
    let indicator = document.getElementById("typing-indicator");
    if (!indicator) {
        indicator = document.createElement("div");
        indicator.classList.add("message", "agent-message");
        indicator.id = "typing-indicator";
        indicator.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        chatWindow.appendChild(indicator);
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
        indicator.remove();
    }
}

// FINAL VERSION with formatting and typing indicator
async function getAgentResponse(userMessage) {
    showTypingIndicator(); // Show indicator before fetching

    try {
        // --- THIS IS THE CHANGED LINE ---
        const tokenResponse = await fetch('/api/token', { method: 'POST' });
        // ------------------------------

        if (!tokenResponse.ok) throw new Error('Failed to get authentication token.');
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // --- THIS IS THE CHANGED LINE ---
        const scoreResponse = await fetch('/api/score', {
        // ------------------------------
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accessToken, message: userMessage })
        });

        if (!scoreResponse.ok) throw new Error('Failed to get response from the agent.');
        
        removeTypingIndicator(); // Remove indicator once response starts
        const agentMessageDiv = displayMessage("", "agent"); // Create an empty bubble to fill
        
        const reader = scoreResponse.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.trim().startsWith('data: ')) {
                    const jsonString = line.substring(6);
                    try {
                        const parsed = JSON.parse(jsonString);
                        if (parsed.choices && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                            fullResponse += parsed.choices[0].delta.content;
                            agentMessageDiv.innerHTML = marked.parse(fullResponse);
                            document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
                        }
                    } catch (e) {
                        // Ignore any errors from incomplete JSON chunks
                    }
                }
            }
        }
    } catch (error) {
        removeTypingIndicator();
        console.error('Error:', error);
        displayMessage("Error: " + error.message, "agent");
    }
}