// models.js

const mongoose = require('mongoose');

// Seat Schema
const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, unique: true },
  isBooked: { type: Boolean, default: false },
  row: { type: Number, required: true },
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingTime: { type: Date, default: Date.now },
  numSeats: { type: Number, required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
});

const Seat = mongoose.model('Seat', seatSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Seat, Booking };
