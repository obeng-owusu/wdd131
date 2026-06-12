// QuizVerse class (demonstrates JavaScript Objects requirement)
class QuizVerse {
    constructor(reference, originalText, question, answer) {
        this.reference = reference;
        this.originalText = originalText;
        this.question = question;
        this.answer = answer;
        this.timestamp = new Date();
    }

    getSummary() {
        return `${this.reference}: ${this.answer}`;
    }
}

let currentVerse = null;
let score = 0;
let attempts = 0;

function generateFillBlankQuestion(verse) {
    const words = verse.text.split(' ');
    const importantWords = words.filter(w =>
        w.length > 5 &&
        !['the', 'and', 'for', 'that', 'with', 'from', 'have', 'this', 'but', 'not', 'are'].includes(w.toLowerCase())
    );

    let blankWord;

    // Fixed edge case: handle empty importantWords
    if (importantWords.length === 0) {
        const middleIndex = Math.floor(words.length / 2);
        blankWord = words[middleIndex] || words[0];
    } else if (verse.keyword && words.some(w => w.toLowerCase().includes(verse.keyword.toLowerCase()))) {
        const keywordWord = words.find(w => w.toLowerCase().includes(verse.keyword.toLowerCase()));
        blankWord = keywordWord || importantWords[0];
    } else {
        blankWord = importantWords[Math.floor(Math.random() * importantWords.length)];
    }

    // Clean punctuation from blankWord
    blankWord = blankWord.replace(/[.,!?;:]$/, '');

    const regex = new RegExp(`\\b${blankWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const questionText = verse.text.replace(regex, '______');

    // Return a QuizVerse object
    return new QuizVerse(
        verse.reference,
        verse.text,
        questionText,
        blankWord
    );
}

function loadNewQuestion(verses) {
    if (!verses || verses.length === 0) return;

    const randomIndex = Math.floor(Math.random() * verses.length);
    const randomVerse = verses[randomIndex];
    currentVerse = generateFillBlankQuestion(randomVerse);

    const questionEl = document.getElementById("question");
    if (questionEl) {
        questionEl.innerHTML = `<strong>${currentVerse.reference}</strong><br><br>${currentVerse.question}`;
    }

    const answerInput = document.getElementById("answer");
    if (answerInput) {
        answerInput.value = "";
        answerInput.focus();
    }
}

function updateStatsDisplay() {
    const scoreEl = document.getElementById("score");
    const attemptsEl = document.getElementById("attempts");
    if (scoreEl) scoreEl.textContent = score;
    if (attemptsEl) attemptsEl.textContent = attempts;
}

document.addEventListener("DOMContentLoaded", async () => {
    const verses = await loadVerses();

    if (verses.length === 0) {
        const questionEl = document.getElementById("question");
        if (questionEl) questionEl.textContent = "Error loading verses. Please refresh the page.";
        return;
    }

    // Load saved stats
    const savedStats = getQuizStats();
    score = savedStats.score;
    attempts = savedStats.attempts;
    updateStatsDisplay();

    loadNewQuestion(verses);

    const submitBtn = document.getElementById("submit-btn");
    const answerInput = document.getElementById("answer");
    const resultDisplay = document.getElementById("result");

    if (submitBtn && answerInput && resultDisplay) {
        submitBtn.addEventListener("click", () => {
            const userAnswer = answerInput.value.trim().toLowerCase();
            const correctAnswer = currentVerse.answer.toLowerCase();

            attempts++;

            if (userAnswer === correctAnswer) {
                score++;
                resultDisplay.textContent = "✅ Correct! Great job memorizing!";
                resultDisplay.className = "result-message result-correct";
                loadNewQuestion(verses);
            } else {
                resultDisplay.textContent = `❌ Incorrect. The missing word was "${currentVerse.answer}". Keep practicing!`;
                resultDisplay.className = "result-message result-incorrect";
                answerInput.value = "";
                answerInput.focus();
            }

            updateStatsDisplay();
            saveQuizStats(score, attempts);
        });

        // Using 'keydown' instead of deprecated 'keypress'
        answerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                submitBtn.click();
            }
        });
    }
});