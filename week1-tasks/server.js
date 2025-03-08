const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Predefined list of quotes (replace with your own data)
const quotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { content: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
];

// Route to get a random quote
app.get('/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
});

// Route to search quotes by author
app.get('/search', (req, res) => {
    const author = req.query.author.toLowerCase();
    const filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author));
    res.json(filteredQuotes);
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route (this will be shown when you access http://localhost:5000)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
