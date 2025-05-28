const express = require('express');
const router = express.Router();
const { createReservation, getReservationsByUser } = require('../controllers/reservationController');

router.post('/reserve', createReservation);
router.get('/reservations', getReservationsByUser);

module.exports = router;
