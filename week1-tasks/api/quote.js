export default function handler(req, res) {
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

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
}
