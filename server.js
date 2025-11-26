import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// เพื่อใช้ __dirname ใน ES Module
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// ==========================
// CONFIG API ต้นทาง
// ==========================
const API_BASE = "https://apis.lottox-glo6.cc";
const API_KEY = "R7Q9FM2XPH8D4WT3L9CFAZ7KQ28MDYXN";

// ==========================
// 1) Proxy ตารางบอล
// ==========================
app.get("/api/schedule", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/api/schedule`, {
      headers: { "x-api-key": API_KEY }
    });

    const json = await response.json();
    res.json(json);

  } catch (err) {
    console.error("schedule error:", err);
    res.status(500).json({ error: "schedule load failed" });
  }
});

// ==========================
// 2) Proxy playchannelCode
// ==========================
app.get("/api/playchannelCode", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/api/playchannelCode`, {
      headers: { "x-api-key": API_KEY }
    });

    const json = await response.json();
    res.json(json);

  } catch (err) {
    console.error("playchannelCode error:", err);
    res.status(500).json({ error: "playchannelCode failed" });
  }
});

// ==========================
// 3) Proxy play-real (POST)
// ==========================
app.post("/api/play-real", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/api/play-real`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(req.body)
    });

    const json = await response.json();
    res.json(json);

  } catch (err) {
    console.error("play-real error:", err);
    res.status(500).json({ error: "play-real failed" });
  }
});

// ==========================
// Static เว็บ
// ==========================
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server running on port", PORT));
