require("dotenv").config();
const mongoose = require("mongoose");
const { Event } = require("../model/schema");

async function connectDB() {
  const URI = process.env.DB_URI;
  try {
    await mongoose.connect(URI);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(name, date, time, description = null) {
  // date will be receieved in DD/MM/YYYY
  // time will be HH:mm (24hr)
  const newEvent = new Event({
    name,
    date,
    time,
    description,
    attendees: [],
  });
  try {
    await newEvent.save();
    console.log("event added");
  } catch (error) {
    console.error(error);
  }
}

async function updateEvent(id, updates) {
  try {
    await Event.findByIdAndUpdate(id, { ...updates });
    console.log("event updated");
  } catch (error) {
    console.error(error);
  }
}

async function deleteEvent(id) {
  try {
    await Event.findByIdAndDelete(id);
    console.log("event deleted");
  } catch (error) {
    console.error(error);
  }
}

async function getEvents() {
  try {
    const events = await Event.find({});
    console.log("fetched events");
    return events;
  } catch (error) {
    console.error(error);
  }
}

async function addAttendee(id, attendee) {
  try {
    const event = await Event.findById(id);
    const { attendees } = event;
    if (!attendees.find((item) => item === attendee)) {
      attendees.push(attendee);
    }
    await Event.findByIdAndUpdate(id, { attendees });
  } catch (error) {
    console.error(error);
  }
}

async function removeAttendee(id, attendee) {
  try {
    const event = await Event.findById(id);
    const { attendees } = event;
    attendees = attendees.filter((item) => item !== attendee);
    await Event.findByIdAndUpdate(id, { attendees });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectDB,
  addEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  addAttendee,
  removeAttendee,
};
