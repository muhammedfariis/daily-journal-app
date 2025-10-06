// routes/entries.js
const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const auth = require("../middleware/auth"); // ✅ Correct import

// ====================== GET all entries for logged-in user ======================
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ====================== CREATE new entry ======================
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newEntry = new Entry({
      title,
      content,
      user: req.user.id,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ====================== DELETE an entry ======================
router.delete("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ Only allow deleting your own entry
    });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found or unauthorized" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
