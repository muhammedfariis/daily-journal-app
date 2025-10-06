const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const entryRoutes = require("./routes/entryroutes");
const authMiddleware = require("./middleware/auth");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/dailyjournal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", authMiddleware, entryRoutes);  // <-- FIXED

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
