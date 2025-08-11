import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRote.js';

// ✅ ES Module compatible __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Middlewares
app.use(express.json());

// ✅ CORS setup to allow frontend and admin domains
app.use(cors({
  origin: [
    'https://zova.onrender.com',
    'https://zova-admin.onrender.com'
  ],
  credentials: true
}));

// ✅ Serve static files (e.g., images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Health check route for cron-job.org
app.get('/', (req, res) => {
  res.send('Zova backend is running!');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
