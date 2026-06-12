// App configuration object (demonstrates JavaScript Objects requirement)
const AppConfig = {
    name: "Scripture Memorizer",
    version: "1.0",
    storageKeys: {
        favorites: "favoriteVerses",
        quizStats: "quizStats",
        contactSubmissions: "contactSubmissions"
    },
    getAppInfo: function () {
        return `${this.name} v${this.version}`;
    }
};

const STORAGE_KEY = AppConfig.storageKeys.favorites;
const QUIZ_STATS_KEY = AppConfig.storageKeys.quizStats;

function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function getQuizStats() {
    const stats = localStorage.getItem(QUIZ_STATS_KEY);
    return stats ? JSON.parse(stats) : { score: 0, attempts: 0 };
}

function saveQuizStats(score, attempts) {
    localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify({ score, attempts }));
}