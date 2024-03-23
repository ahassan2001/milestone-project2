const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ah4487855:ZinabHassan2009@ahmed.6nkfejd.mongodb.net/?retryWrites=true&w=majority&appName=Ahmed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/tasks', require('./controllers/tasks'));
app.use('/api/users', require('./controllers/userController'));
app.use('/api/routes', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app