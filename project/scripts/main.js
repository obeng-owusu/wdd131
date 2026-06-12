function displayVerses(verses) {
    const container = document.getElementById("verse-container");

    if (!container) return;

    if (!verses || verses.length === 0) {
        container.innerHTML = '<p class="error">No verses found. Please check back later.</p>';
        return;
    }

    const favorites = getFavorites();

    // Using .map() array method to generate HTML
    const verseHTML = verses.map(verse => {
        const isFavorited = favorites.includes(verse.reference);
        return `
            <div class="card">
                <h3>📖 ${verse.reference}</h3>
                <p>${verse.text}</p>
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-reference="${verse.reference}">
                    ${isFavorited ? '★ Favorited' : '☆ Add to Favorites'}
                </button>
            </div>
        `;
    }).join('');

    container.innerHTML = verseHTML;

    // Using .forEach() for event listeners
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const reference = btn.dataset.reference;
            let favorites = getFavorites();

            if (favorites.includes(reference)) {
                favorites = favorites.filter(fav => fav !== reference);
                btn.textContent = '☆ Add to Favorites';
                btn.classList.remove('favorited');
            } else {
                favorites.push(reference);
                btn.textContent = '★ Favorited';
                btn.classList.add('favorited');
            }

            saveFavorites(favorites);
        });
    });
}

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("verse-container");
    if (container) {
        const verses = await loadVerses();
        displayVerses(verses);
    }
});