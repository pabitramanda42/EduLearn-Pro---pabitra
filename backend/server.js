const express = require('express');
const app = express();
require('dotenv').config();

// ========== Packages ==========
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// ========== DB & Cloudinary ==========
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// ========== Middleware ==========
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser());
app.use(
  cors({
    origin: '*', // or replace with your frontend URL for security: "http://localhost:5173"
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  })
);

// ========== Database & Cloudinary Connection ==========
connectDB();
cloudinaryConnect();

// ========== Routes Import ==========
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');
const categoryRoutes = require('./routes/category');

// ========== Route Mounting ==========
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/category', categoryRoutes);

// ========== Default Route ==========
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Arial; padding: 20px;">
      <h2>✅ Server is running successfully!</h2>
      <p>Everything is OK — LMS backend operational 🚀</p>
    </div>
  `);
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on PORT ${PORT}`);
});
