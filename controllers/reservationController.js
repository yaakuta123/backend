const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const { userId, date, time, numberOfPeople, contactInfo } = req.body;

    const reservation = new Reservation({
      user: userId,
      date,
      time,
      numberOfPeople,
      contactInfo
    });

    await reservation.save();
    res.json({ msg: 'Đặt bàn thành công', reservation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server lỗi');
  }
};

exports.getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const reservations = await Reservation.find({ user: userId }).sort({ date: -1 });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server lỗi');
  }
};
