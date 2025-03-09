const quoteButton = document.getElementById('new-quote');
const quoteElement = document.getElementById('quote');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('author-name');
const searchResultsTable = document.getElementById('quote-table').getElementsByTagName('tbody')[0];
const tableHeader = document.getElementById('table-header');

// Predefined list of quotes and authors
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

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Simulate the delay for fetching a quote (this will simulate the "loading" effect)
function fetchQuote() {
    // Initially show 'Loading...' before showing the quote
    quoteElement.textContent = 'Loading...';
    quoteElement.classList.remove('quote-show'); // Remove the class initially to keep it hidden

    // Simulate a delay of 2 seconds before showing the quote
    setTimeout(() => {
        const randomQuote = getRandomQuote();
        quoteElement.textContent = `"${randomQuote.content}" - ${randomQuote.author}`;
        quoteElement.classList.add('quote-show'); // Add class to show the quote with transition
    }, 2000); // 2 seconds delay
}

// Search quotes by author
function searchQuotes() {
    const author = searchInput.value.toLowerCase();
    const filteredQuotes = quotes.filter(quote =>
        quote.author.toLowerCase().includes(author)
    );
    displaySearchResults(filteredQuotes);
}

// Display search results in the table
function displaySearchResults(quotes) {
    const searchResultsTable = document.querySelector("#quote-table tbody");
    const tableHeader = document.querySelector("#table-header");

    // Clear the existing rows in the table
    searchResultsTable.innerHTML = '';

    // If no results, display "No quotes found"
    if (quotes.length === 0) {
        const noResultRow = searchResultsTable.insertRow();
        const noResultCell = noResultRow.insertCell(0);
        noResultCell.colSpan = 2;
        noResultCell.textContent = 'No quotes found.';
    } else {
        // Insert rows for each quote
        quotes.forEach(quote => {
            const row = searchResultsTable.insertRow();
            const quoteCell = row.insertCell(0);
            const authorCell = row.insertCell(1);
            quoteCell.textContent = `"${quote.content}"`;
            authorCell.textContent = quote.author;
        });
    }

    // Remove the 'hidden' class to display the table headers
    tableHeader.classList.remove('hidden');

    // Add the fade-in class to the table (applies the animation)
    const table = document.querySelector("#quote-table");
    table.style.opacity = 0; // Ensure table starts invisible
    setTimeout(() => {
        table.style.opacity = 1; // Fade the table in after a small delay
    }, 50);
}

// Event Listeners
quoteButton.addEventListener('click', fetchQuote);
searchButton.addEventListener('click', searchQuotes);

// Ensure the table header is hidden initially
window.onload = function() {
    tableHeader.classList.add('hidden'); // Hide headers when page loads
    fetchQuote(); // Fetch the quote when the page loads
};

// Add an event listener for the Enter key in the search input
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchQuotes();
    }
});
