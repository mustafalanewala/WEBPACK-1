document.addEventListener('DOMContentLoaded', getQuote);

const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const dateTimeText = document.getElementById('date-time');
const newQuoteBtn = document.getElementById('new-quote-btn');

newQuoteBtn.addEventListener('click', () => {
    getQuote();
});

async function getQuote() {
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': '3+044zhLHVVKEkgr9YdT9A==9yLgC9jTMMecbsjf'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const quoteData = data[randomIndex];
        
        const quote = quoteData.quote;
        const author = quoteData.author;
        
        quoteText.textContent = `"${quote}"`;
        authorText.textContent = `- ${author}`;
        
        const now = new Date();
        dateTimeText.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        
        changeBackgroundImage();
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
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
