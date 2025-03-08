const quoteButton = document.getElementById('new-quote');
const quoteElement = document.getElementById('quote');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('author-name');
const searchResultsTable = document.getElementById('quote-table').getElementsByTagName('tbody')[0];
const tableHeader = document.getElementById('table-header');

// Simulate the delay for fetching a quote
async function fetchQuote() {
    // Initially show 'Loading...' before fetching the quote
    quoteElement.textContent = 'Loading...';
    quoteElement.classList.remove('quote-show'); // Remove the class initially to keep it hidden

    // Simulate a delay of 2 seconds before fetching the quote
    setTimeout(async () => {
        const response = await fetch('http://localhost:5000/quote');
        const data = await response.json();
        quoteElement.textContent = `"${data.content}" - ${data.author}`;
        quoteElement.classList.add('quote-show'); // Add class to show the quote with transition
    }, 2000); // 2 seconds delay
}


// Search quotes by author
async function searchQuotes() {
    const author = searchInput.value;
    const response = await fetch(`http://localhost:5000/search?author=${author}`);
    const data = await response.json();
    displaySearchResults(data);
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
