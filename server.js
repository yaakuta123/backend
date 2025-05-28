const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://yaakuta123.github.io' // cho phép frontend GitHub Pages truy cập
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/reservationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));
