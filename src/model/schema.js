const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
  attendees: { type: [String], required: true },
});

const Event = mongoose.models.Event || mongoose.Model("Event", eventSchema);

module.exports = {
  Event,
};
