import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Proxy API: ดึงสตรีมจากทุกประเทศไม่บล็อค
app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).json({ error: "No URL provided" });

    const response = await fetch(targetUrl);
    const data = await response.arrayBuffer();

    res.set("Content-Type", "video/MP2T");
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Render ต้องใช้พอร์ตนี้
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy running on " + PORT));
// ================= API SCHEDULE MOCK =================

// ตารางถ่ายทอดสด
app.get("/api/schedule", (req, res) => {
  res.json({
    data: [
      {
        league: "Premier League",
        dateTime: "21:00",
        teams: {
          home: { name: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
          away: { name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" }
        },
        channels: [
          { code: "ch1", icon: "https://i.imgur.com/CEGPnQV.png" }
        ]
      }
    ]
  });
});

// session/baseUrl สำหรับเรียกช่อง
app.get("/api/playchannel", (req, res) => {
  res.json({
    encrypted_session: "dGVzdF9zZXNzaW9u", // base64 "test_session"
    encrypted_baseUrl: "aHR0cHM6Ly9leGFtcGxlLmNvbS9wbGF5P2NoPQ==" // base64 "https://example.com/play?ch="
  });
});

// decode session + baseUrl
app.post("/api/playreal", (req, res) => {
  const { encrypted_session, encrypted_baseUrl } = req.body;

  res.json({
    session: encrypted_session,
    baseUrl: encrypted_baseUrl
  });
});
