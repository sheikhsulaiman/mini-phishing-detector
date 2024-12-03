const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Allow CORS for local development
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Load blacklist
const blacklist = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/blacklist.json"))
);

// Endpoint to check URL
app.use(express.json());
app.post("/check-url", (req, res) => {
  const { url } = req.body;

  // Basic heuristic checks
  const isBlacklisted = blacklist.includes(url.toLowerCase());
  const hasSuspiciousChars = url.includes("@") || url.split(".").length > 5;

  if (isBlacklisted) {
    return res.json({ result: "Phishing", reason: "URL is blacklisted" });
  }

  if (hasSuspiciousChars) {
    return res.json({
      result: "Suspicious",
      reason: "URL has unusual patterns",
    });
  }

  return res.json({ result: "Safe", reason: "No issues detected" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
