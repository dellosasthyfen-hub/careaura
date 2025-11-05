const scriptURL = "https://script.google.com/macros/s/AKfycbzyw59ehMXxMRUmurrONKhQQMoJ3bUgmtUvw2ApFLIpxkhEenai3xBNi0b9MVhPQXvJ/exec"; 

document.getElementById("sendBtn").addEventListener("click", async (evt) => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendBtn = document.getElementById("sendBtn");

  // prevent accidental double-submits
  if (sendBtn.disabled) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // basic email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Google Apps Script web apps usually expect form-encoded data (e.parameter)
  const formBody = new URLSearchParams({ name, email, message });

  try {
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: formBody.toString()
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Contact form response error', response.status, text);
      alert("Failed to send message. Please try again later.");
    } else {
      // show server response (Apps Script often returns plain text)
      alert(text || "Message sent — thank you!");
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    }

  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Failed to send message. Please check your connection and try again.");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Message";
  }
});
