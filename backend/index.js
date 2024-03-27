const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(corsMiddleware);

mongoose.connect('mongodb+srv://ah4487855:ZinabHassan2009@ahmed.6nkfejd.mongodb.net/?retryWrites=true&w=majority&appName=Ahmed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/tasks', require('./controllers/tasks'), cors({
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/users', require('./controllers/userController'), cors({
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(corsMiddleware);

const clientURL = process.env.CLIENT_URL;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app