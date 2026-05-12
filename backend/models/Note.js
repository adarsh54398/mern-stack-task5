const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 120,
  },

  content: {
    type: String,
    required: true,
  },

  tags: [String],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Note", noteSchema);