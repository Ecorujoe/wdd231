document.addEventListener('DOMContentLoaded', () => {
    fetch('data/photos.json') // Adjust path to your actual JSON file location
        .then(response => response.json())
        .then(data => displayPhotos(data.photos))
        .catch(error => console.error('Error loading photos:', error));
});

// Function to display photos
function displayPhotos(photos) {
    const photosContainer = document.getElementById('photos-container');
    photosContainer.innerHTML = '';  // Clear previous content

    const photoCards = photos.map(photo => {
        const photoCard = document.createElement('div');
        photoCard.classList.add('photo-card');

        photoCard.innerHTML = `
            <img src="images/${photo.image}" alt="${photo.name} logo" width="100" loading="lazy">
            <h3>${photo.name}</h3>
            <p><strong>Caption:</strong> ${photo.caption}</p>
        `;

        photosContainer.appendChild(photoCard);
        return photoCard; // Return the card for the observer
    });

    // Create an Intersection Observer for the photo cards
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view'); // Add the class to trigger animation
                observer.unobserve(entry.target); // Stop observing after adding class
            }
        });
    }, {
        threshold: 0.5 // 40% of the card must be in view to trigger
    });

    // Start observing each photo card
    photoCards.forEach(photoCard => {
        observer.observe(photoCard);
    });
}