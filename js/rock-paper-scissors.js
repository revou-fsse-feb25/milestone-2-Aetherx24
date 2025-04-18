document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const playerScore = document.getElementById('player-score');
    const computerScore = document.getElementById('computer-score');
    const resultText = document.getElementById('result-text');
    const playerChoice = document.getElementById('player-choice');
    const computerChoice = document.getElementById('computer-choice');
    const resetBtn = document.getElementById('reset-btn');

    let scores = {
        player: 0,
        computer: 0
    };

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

    function playRound(playerMove) {
        const moves = ['rock', 'paper', 'scissors'];
        const computerMove = moves[Math.floor(Math.random() * moves.length)];

        playerChoice.textContent = emojis[playerMove];
        computerChoice.textContent = emojis[computerMove];

        const result = getWinner(playerMove, computerMove);
        updateScore(result);
        displayResult(result, playerMove, computerMove);
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

    resetBtn.addEventListener('click', () => {
        scores.player = 0;
        scores.computer = 0;
        playerScore.textContent = '0';
        computerScore.textContent = '0';
        playerChoice.textContent = '❔';
        computerChoice.textContent = '❔';
        resultText.textContent = 'Choose your move!';
        resultText.style.color = 'var(--secondary-color)';
    });
});