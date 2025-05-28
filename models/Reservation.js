const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  contactInfo: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
