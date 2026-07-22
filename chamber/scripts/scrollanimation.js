

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".membership-card");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
            }
        });
    }, {
        threshold: 0.5 // 50% of the card must be in view to trigger
    });

    cards.forEach(card => {
        observer.observe(card); // Start observing each card
    });
});