function searchImages() {
    const searchQuery = document.getElementById('searchInput').value;
    if (!searchQuery.trim()) return;
    const apiKey = 'efulWhghUHgnYJ7gxT5FlyrbjsDSRh5QNjJ7OJGsxoUMq5J8BBv9v3J1'; 
    const timestamp = Date.now();
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15&timestamp=${timestamp}`;

    fetch(url, {
        headers: {
            'Authorization': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            const imageGallery = document.getElementById('imageGallery');
            imageGallery.innerHTML = '';

            data.photos.forEach(photo => {
                const imgElement = document.createElement('div');
                imgElement.classList.add('imageItem');
                imgElement.innerHTML = `<img src="${photo.src.medium}" alt="${photo.alt}">`;
                imageGallery.appendChild(imgElement);
            });
        })
        .catch(error => console.log('Error fetching images:', error));
}

// Listen for keypress event on search input
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchImages();
    }
});
