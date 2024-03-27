const express = require('express');

const app = express();

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'https://milestone-project2-seven.vercel.app'); // Replace with your frontend URL
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

next();
});