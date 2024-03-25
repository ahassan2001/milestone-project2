const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router;

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = ['mongodb+srv://ah4487855:ZinabHassan2009@ahmed.6nkfejd.mongodb.net/?retryWrites=true&w=majority&appName=Ahmed'];
app.use(cors({
    origin: allowedOrigins,
}));

app.use(express.json());

mongoose.connect('', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/tasks', require('../controllers/tasks'));
app.use('/api/users', require('../controllers/userController'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;