const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check nếu user đã tồn tại
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email đã được đăng ký' });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Tạo token JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user.id, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server lỗi');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email không đúng' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Mật khẩu không đúng' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user.id, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server lỗi');
  }
};
