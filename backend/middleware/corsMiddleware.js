const cors = require('cors');

const corsOptions = {
  origin: 'https://milestone-project2-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);