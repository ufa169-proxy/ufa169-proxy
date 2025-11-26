import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// ==========================
// CONFIG API ต้นทาง
// ==========================
const API_BASE = "https://apis.lottox-glo6.cc";
const API_KEY = "R7Q9FM2XPH8D4WT3L9CFAZ7KQ28MDYXN";

// Helper – safe fetch
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      timeout: 20000,
      ...options
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// ==========================
// 1) ตารางบอล
// ==========================
app.get("/api/schedule", async (req, res) => {
  const result = await safeFetch(`${API_BASE}/api/schedule`, {
    headers: { "x-api-key": API_KEY }
  });

  if (!result) return res.status(500).json({ error: "schedule failed" });

  res.json(result);
});

// ==========================
// 2) playchannelCode
// ==========================
app.get("/api/playchannelCode", async (req, res) => {
  const result = await safeFetch(`${API_BASE}/api/playchannelCode`, {
    headers: { "x-api-key": API_KEY }
  });

  if (!result) return res.status(500).json({ error: "playchannelCode failed" });

  res.json(result);
});

// ==========================
// 3) play-real
// ==========================
app.post("/api/play-real", async (req, res) => {
  const result = await safeFetch(`${API_BASE}/api/play-real`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(req.body)
  });

  if (!result) return res.status(500).json({ error: "play-real failed" });

  res.json(result);
});

// ==========================
// Static เว็บ
// ==========================
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server running on port", PORT));
