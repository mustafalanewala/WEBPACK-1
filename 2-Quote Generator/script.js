document.addEventListener('DOMContentLoaded', getQuote);

const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const dateTimeText = document.getElementById('date-time');
const newQuoteBtn = document.getElementById('new-quote-btn');

newQuoteBtn.addEventListener('click', () => {
    getQuote();
    changeBackgroundImage();
});

function getQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            quoteText.textContent = `"${data.content}"`;
            authorText.textContent = `- ${data.author}`;
            const now = new Date();
            dateTimeText.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        })
        .catch(error => console.error('Error fetching quote:', error));
}

function changeBackgroundImage() {
    const randomImage = Math.floor(Math.random() * 1000);
    const imageUrl = `https://source.unsplash.com/random/?dark&${randomImage}`;
    
    const tempImage = new Image();
    tempImage.src = imageUrl;

    tempImage.onload = () => {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    };
}
