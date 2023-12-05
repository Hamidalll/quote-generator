const quoteContainer = document.getElementById('quote-container');
const txtQuote = document.getElementById('quote');
const txtauthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Complite
function complite() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  loading();
  // Pick a random quote from array
  const qoute =
    apiQuotes[Math.floor(Math.trunc(Math.random() * apiQuotes.length))];

  // Pick a author if a don't exist  return 'Unknown'
  if (!qoute.author) {
    txtauthor.innerText = 'Unknown';
  } else {
    txtauthor.innerText = qoute.author;
  }

  // If text of quote greatest than 120 lenght add long-quote class
  if (qoute.text.length > 120) {
    txtQuote.classList.add('long-quote');
  } else {
    txtQuote.classList.remove('long-quote');
  }

  txtQuote.innerText = qoute.text;
  complite();
}

// Get quotes from API
async function getQuote() {
  const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;
  try {
    const respons = await fetch(apiUrl);
    apiQuotes = await respons.json();
    newQuote();
  } catch (error) {
    // Catch error here
    console.log(error);
  }
}
getQuote();

// Twitt Quote
function twittQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${txtQuote.innerText} - ${txtauthor.innerText}`;
  window.open(twitterUrl, '_blank');
}

// CEvent Listenner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', twittQuote);
