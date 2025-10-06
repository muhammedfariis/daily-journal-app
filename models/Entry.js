// models/Entry.js

const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // IMPORTANT: Links the entry to the User model
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 'User' must match the name you used when defining your User model
    required: true
  }
});

module.exports = mongoose.model('Entry', EntrySchema);