function addMessage(text, sender) {
  const messagesDiv = document.getElementById("messages");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  // Real backend call to Render
  fetch("https://your-render-service.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => addMessage("WERBIT says: " + data.reply, "bot"))
  .catch(err => addMessage("Error: " + err, "bot"));
}
