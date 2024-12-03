document.getElementById("checkBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value;
  const resultEl = document.getElementById("result");

  if (!url) {
    resultEl.textContent = "Please enter a URL.";
    resultEl.className = ""; // Clear previous classes
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/check-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    resultEl.textContent = `Result: ${data.result} (${data.reason})`;

    // Add dynamic styling based on result
    if (data.result === "Safe") {
      resultEl.className = "safe";
    } else if (data.result === "Phishing") {
      resultEl.className = "phishing";
    } else if (data.result === "Suspicious") {
      resultEl.className = "suspicious";
    }
  } catch (error) {
    console.error(error);
    resultEl.textContent = "Error checking URL.";
    resultEl.className = "";
  }
});
