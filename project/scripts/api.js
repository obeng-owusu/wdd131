// Centralized API functions to avoid duplication
async function loadVerses() {
    try {
        const response = await fetch('data/verses.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data.verses || [];
    } catch (error) {
        console.error('Error loading verses:', error);
        return [];
    }
}