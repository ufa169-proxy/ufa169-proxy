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
