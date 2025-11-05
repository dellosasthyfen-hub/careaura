const scriptURL = "https://script.google.com/macros/s/AKfycbzYJjJYqN0H3ezgJ7iKQkc-C-K1tqgavRD6gbk1H9jvjRH3TcCs2icAkgTfngqLw5w_/exec"; 

document.getElementById("sendBtn").addEventListener("click", async () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const data = { name, email, message };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const text = await response.text();
    alert(text);

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

  } catch (error) {
    alert("Failed to send message. Please try again later.");
    console.error(error);
    
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  }
});
