require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 1000, // Limit each IP to 100 requests per window
//   message: 'Too many requests from this IP'
// });

// app.use('/api/', limiter);

const redis = require('redis');
const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible');

async function setupRateLimiter() {
  const redisClient = redis.createClient({ url: 'redis://localhost:6379' });

  try {
    await redisClient.connect();
    console.log('Redis connected');

    return new RateLimiterRedis({
      storeClient: redisClient,
      points: 3,
      duration: 10,
      keyPrefix: 'rl_'
    });
  } catch (err) {
    console.error('Redis error, falling back to memory');
    return new RateLimiterMemory({
      points: 3,
      duration: 10,
    });
  }
}

(async () => {
  const limiter = await setupRateLimiter();

  app.use(async (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.ip;
    try {
      await limiter.consume(clientIP);
      next();
    } catch (e) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    }
  });


  // Routes 
  app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the MERN API2===' });
  });


})();
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample Model Route
const sampleRouter = require('./routes/sample');
app.use('/api/samples', sampleRouter);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});