function createFloatingNumbers() {
    const container = document.getElementById('floating-numbers');
    const numbers = 50; // Amount of floating numbers

    for (let i = 0; i < numbers; i++) {
        const number = document.createElement('div');
        number.className = 'number';
        number.style.left = `${Math.random() * 100}%`;
        number.style.animationDelay = `${Math.random() * 15}s`;
        number.textContent = Math.floor(Math.random() * 100);
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
    
    let secretNumber;
    let attempts;

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

    // Start the game
    initializeGame();
});