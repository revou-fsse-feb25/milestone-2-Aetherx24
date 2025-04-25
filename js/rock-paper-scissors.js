document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const playerScore = document.getElementById('player-score');
    const computerScore = document.getElementById('computer-score');
    const resultText = document.getElementById('result-text');
    const playerChoice = document.getElementById('player-choice');
    const computerChoice = document.getElementById('computer-choice');
    const resetBtn = document.getElementById('reset-btn');
    const gamesLimit = document.getElementById('game-limit');
    const gamesLeft = document.getElementById('games-left');
    const leaderboard = new Leaderboard('rockPaperScissors');

    // Add score tracking variables
    let totalGames = parseInt(localStorage.getItem('rpsGames')) || 0;
    let totalWins = parseInt(localStorage.getItem('rpsWins')) || 0;
    let winStreak = parseInt(localStorage.getItem('rpsStreak')) || 0;
    let bestStreak = parseInt(localStorage.getItem('rpsBestStreak')) || 0;

    // Add score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `
        <p>Total Games: <span id="total-games">${totalGames}</span></p>
        <p>Total Wins: <span id="total-wins">${totalWins}</span></p>
        <p>Current Streak: <span id="win-streak">${winStreak}</span></p>
        <p>Best Streak: <span id="best-streak">${bestStreak}</span></p>
    `;
    document.querySelector('.score-board').appendChild(scoreDisplay);

    let scores = {
        player: 0,
        computer: 0,
        maxGames: 3
    };

    gamesLimit.addEventListener('change', () => {
        scores.maxGames = parseInt(gamesLimit.value);
        resetGame();
    });

    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌'
    };

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const playerMove = choice.dataset.choice;
            playRound(playerMove);
        });
    });

    function updateStats(result) {
        totalGames++;
        if (result === 'win') {
            totalWins++;
            winStreak++;
            bestStreak = Math.max(bestStreak, winStreak);
        } else if (result === 'lose') {
            winStreak = 0;
        }

        localStorage.setItem('rpsGames', totalGames);
        localStorage.setItem('rpsWins', totalWins);
        localStorage.setItem('rpsStreak', winStreak);
        localStorage.setItem('rpsBestStreak', bestStreak);

        document.getElementById('total-games').textContent = totalGames;
        document.getElementById('total-wins').textContent = totalWins;
        document.getElementById('win-streak').textContent = winStreak;
        document.getElementById('best-streak').textContent = bestStreak;
    }

    function playRound(playerMove) {

        // check if we've reached the game limit
        if (scores.player + scores.computer >= scores.maxGames) {
            return; //wont allow more moves after series is complete
        }
        const moves = ['rock', 'paper', 'scissors'];
        const computerMove = moves[Math.floor(Math.random() * moves.length)];

        playerChoice.textContent = emojis[playerMove];
        computerChoice.textContent = emojis[computerMove];

        const result = getWinner(playerMove, computerMove);
        updateScore(result);
        updateStats(result);
        displayResult(result, playerMove, computerMove);

        // check if this was the final game
        if (scores.player + scores.computer >= scores.maxGames) {
            const winner = scores.player > scores.computer ? 'Player' : 'Computer';
            resultText.textContent = `Series Over! ${winner} wins the series!`;
            disableChoices(true);
        }
    }

    function getWinner(player, computer) {
        if (player === computer) return 'draw';
        
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }

    function updateScore(result) {
        if (result === 'win') scores.player++;
        if (result === 'lose') scores.computer++;
        
        playerScore.textContent = scores.player;
        computerScore.textContent = scores.computer;
        gamesLeft.textContent = scores.maxGames - (scores.player + scores.computer);

        if(scores.player + scores.computer >= scores.maxGames) {
            const winner = scores.player > scores.computer ? 'Player' : 'Computer';
            resultText.textContent = `${winner} wins the series!`;
            disableChoices(true);
        }
    }

    function disableChoices(disabled) {
        choices.forEach(choice => {
            choice.disabled = disabled;
            choice.style.opacity = disabled ? '0.5' : '1';
        });
    }

    function displayResult(result, playerMove, computerMove) {
        const messages = {
            win: `You win! ${playerMove} beats ${computerMove}`,
            lose: `You lose! ${computerMove} beats ${playerMove}`,
            draw: "It's a draw!"
        };
        
        resultText.textContent = messages[result];
        resultText.style.color = result === 'win' ? 'var(--secondary-color)' : 
                                result === 'lose' ? '#ff4444' : 
                                'var(--text-color)';
    }

    function resetGame() {
        scores.player = 0;
        scores.computer = 0;
        playerScore.textContent = '0';
        computerScore.textContent = '0';
        playerChoice.textContent = '❔';
        computerChoice.textContent = '❔';
        resultText.textContent = 'Choose your move!';
        resultText.style.color = 'var(--secondary-color)';
        gamesLeft.textContent = scores.maxGames;
        disableChoices(false);
    }

    resetBtn.addEventListener('click', () => {
        scores.player = 0;
        scores.computer = 0;
        playerScore.textContent = '0';
        computerScore.textContent = '0';
        playerChoice.textContent = '❔';
        computerChoice.textContent = '❔';
        resultText.textContent = 'Choose your move!';
        resultText.style.color = 'var(--secondary-color)';
        winStreak = 0;
        gamesLeft.textContent = scores.maxGames;
        localStorage.setItem('rpsStreak', winStreak);
        document.getElementById('win-streak').textContent = winStreak;
        disableChoices(false);

        
    });

    function endGame() {
        const playerWins = parseInt(playerScore.textContent);
        const computerWins = parseInt(computerScore.textContent);
        const totalGames = parseInt(gameLimit.value);
        
        // Calculate score based on win ratio and game length
        const score = Math.round((playerWins / totalGames) * 100);
        
        // Add score to leaderboard
        leaderboard.addScore(score);
        
        // Disable choices
        choices.forEach(choice => choice.disabled = true);
        resultText.textContent = playerWins > computerWins 
            ? "Congratulations! You won the series!" 
            : "Game Over! Computer won the series!";
    }

    // Add this at the end of your DOMContentLoaded callback
    leaderboard.displayScores();
});