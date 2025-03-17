const express = require('express');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for generating a result (example)
app.get('/api/generateResult', (req, res) => {
    const result = generateResult();
    res.json(result);
});

let period = 1;
let history = [];

function generateResult() {
    let randomNum = Math.floor(Math.random() * 10);
    let bigSmall = randomNum >= 5 ? "Big" : "Small";
    let colors = ["Green", "Violet", "Red"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    let result = { period, number: randomNum, bigSmall, color: randomColor };
    history.push(result);
    period++;
    return result;
}

// Export the Express app for Netlify Functions
module.exports = app;
module.exports.handler = serverless(app);