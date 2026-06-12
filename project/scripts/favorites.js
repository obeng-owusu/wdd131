async function displayFavorites() {
    const container = document.getElementById("favorites-container");

    if (!container) return;

    container.innerHTML = '<div class="loading">Loading favorites...</div>';

    const verses = await loadVerses();
    let favorites = getFavorites();

    // Ensure favorites is an array
    if (!favorites) favorites = [];

    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="card">
                <p>⭐ You haven't added any favorite verses yet.</p>
                <p><a href="verses.html" class="btn">Browse Verses</a></p>
            </div>
        `;
        return;
    }

    // Using .filter() array method
    const favoriteVerses = verses.filter(verse => favorites.includes(verse.reference));

    if (favoriteVerses.length === 0) {
        container.innerHTML = `
            <div class="card">
                <p>Your favorite verses couldn't be loaded. Please try again.</p>
            </div>
        `;
        return;
    }

    // Using .map() to generate HTML
    container.innerHTML = favoriteVerses.map(verse => `
        <div class="card">
            <h3>📖 ${verse.reference}</h3>
            <p>${verse.text}</p>
            <button class="remove-favorite-btn" data-reference="${verse.reference}">
                ❌ Remove from Favorites
            </button>
        </div>
    `).join('');

    // Using .forEach() for event listeners
    document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const reference = btn.dataset.reference;

            // Using .find() to get the verse data
            const verseToRemove = favoriteVerses.find(v => v.reference === reference);
            if (verseToRemove) {
                console.log(`Removing: ${verseToRemove.reference}`);
            }

            let favorites = getFavorites();
            favorites = favorites.filter(fav => fav !== reference);
            saveFavorites(favorites);
            displayFavorites();
        });
    });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("favorites-container")) {
        displayFavorites();
    }
});