import "dotenv/config";
import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});
