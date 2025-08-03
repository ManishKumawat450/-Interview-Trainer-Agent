require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.IBM_API_KEY;
const SCORING_URL = process.env.IBM_SCORING_URL;

app.post('/api/token', async (req, res) => {
    // We can remove the previous console.log now
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'urn:ibm:params:oauth:grant-type:apikey');
        params.append('apikey', API_KEY);

        const response = await axios.post('https://iam.cloud.ibm.com/identity/token', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching token:", error.message);
        res.status(500).json({ error: "Failed to fetch token. Check server logs." });
    }
});

app.post('/api/score', async (req, res) => {
    const { token, message } = req.body;

    // --- ADD THIS CONSOLE LOG TO CHECK THE URL ---
    console.log("Verifying the Scoring URL loaded in the server:", SCORING_URL);
    // ---------------------------------------------
    
    if (!token || !message) {
        return res.status(400).json({ error: "Token and message are required" });
    }

    try {
        const payload = { "messages": [{ "content": message, "role": "user" }] };

        const watsonxResponse = await axios.post(SCORING_URL, payload, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            },
            responseType: 'stream'
        });
        
        res.setHeader('Content-Type', 'text/event-stream');
        watsonxResponse.data.pipe(res);

    } catch (error) {
        console.error("Error during scoring:", error.message);
        res.status(500).json({ error: "Failed to get response from agent. Check server logs." });
    }
});

module.exports = app;