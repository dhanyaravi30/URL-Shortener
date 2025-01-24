import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { nanoid } from 'nanoid'; // Correct ES module import

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// In-memory storage for URL mappings
const urlDatabase = {};

// API to shorten URL
app.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);
    urlDatabase[shortId] = originalUrl;
    res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

// API to redirect shortened URL
app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const originalUrl = urlDatabase[shortId];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
