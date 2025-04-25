function createFloatingNumbers() {
    const container = document.getElementById('floating-numbers');
    const numbers = 50; // Amount of floating numbers

    for (let i = 0; i < numbers; i++) {
        const number = document.createElement('div');
        number.className = 'number';
        number.style.left = `${Math.random() * 100}%`;
        number.style.animationDelay = `${Math.random() * 15}s`;
        number.textContent = Math.floor(Math.random() * 20) + 1;
        container.appendChild(number);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingNumbers();
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const message = document.getElementById('message');
    const attemptsLeft = document.getElementById('attempts-left');
    const restartBtn = document.getElementById('restart-btn');
    const leaderboard = new Leaderboard('guessNumber');
    
    let secretNumber;
    let attempts;
    let highScore = localStorage.getItem('guessNumberHighScore') || 0;
    let gamesWon = parseInt(localStorage.getItem('guessNumberWins')) || 0;
    let gamesPlayed = parseInt(localStorage.getItem('guessNumberGames')) || 0;

    // Score display to HTML
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `
        <p>High Score: <span id="high-score">${highScore}</span></p>
        <p>Games Won: <span id="games-won">${gamesWon}</span></p>
        <p>Games Played: <span id="games-played">${gamesPlayed}</span></p>
    `;
    document.querySelector('.game-box').appendChild(scoreDisplay);

    function updateScores(won) {
        gamesPlayed++;
        if (won) {
            gamesWon++;
            const currentScore = attempts + 1; // More attempts left = higher score
            if (currentScore > highScore) {
                highScore = currentScore;
            }
        }
        
        localStorage.setItem('guessNumberHighScore', highScore);
        localStorage.setItem('guessNumberWins', gamesWon);
        localStorage.setItem('guessNumberGames', gamesPlayed);
        
        document.getElementById('high-score').textContent = highScore;
        document.getElementById('games-won').textContent = gamesWon;
        document.getElementById('games-played').textContent = gamesPlayed;
    }

    function initializeGame() {
        secretNumber = Math.floor(Math.random() * 20) + 1;
        attempts = 5;
        attemptsLeft.textContent = attempts;
        message.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        guessBtn.disabled = false;
        restartBtn.classList.add('hidden');
    }

    function endGame(won) {
        guessInput.disabled = true;
        guessBtn.disabled = true
        restartBtn.classList.remove('hidden');
        message.style.color = won ? 'var(--secondary-color)' : '#ff4444';
        updateScores(won);

        const score = won ? (attempts + 1) * 20 : 0;
        leaderboard.addScore(score);
    }

    guessBtn.addEventListener('click', () => {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 20) {
            message.textContent = 'Please enter a valid number between 1 and 20';
            message.style.color = '#ff4444';
            return;
        }

        attempts--;
        attemptsLeft.textContent = attempts;

        if (userGuess === secretNumber) {
            message.textContent = `Congratulations! You found the number ${secretNumber}!`;
            endGame(true);
        } else {
            const hint = userGuess < secretNumber ? 'Too low!' : 'Too high!';
            message.textContent = hint;
            message.style.color = 'var(--text-color)';

            if (attempts === 0) {
                message.textContent = `Game Over! the number was ${secretNumber}.`;
                endGame(false);
            }
        }

        guessInput.value = '';
    });

    restartBtn.addEventListener('click', initializeGame);

    leaderboard.displayScores();
    // Start the game
    initializeGame();
});