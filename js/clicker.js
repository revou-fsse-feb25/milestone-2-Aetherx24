document.addEventListener('DOMContentLoaded', () => {
    const clickArea = document.getElementById('click-area');
    const startBtn = document.getElementById('start-btn');
    const timer = document.getElementById('timer');
    const clickCount = document.getElementById('click-count');
    const cps = document.getElementById('cps');
    const results = document.getElementById('results');
    const finalClicks = document.getElementById('final-clicks');
    const finalCps = document.getElementById('final-cps');
    const bestCps = document.getElementById('best-cps');

    let clicks = 0;
    let timeLeft = 10.0;
    let gameInterval;
    let isGameRunning = false;
    let bestCpsScore = 0;

    function updateTimer() {
        timeLeft = Math.max(0, timeLeft - 0.1);
        timer.textContent = timeLeft.toFixed(1);
        
        if (timeLeft === 0) {
            endGame();
        }
        
        // Update CPS every 100ms
        const currentCps = (clicks / (10 - timeLeft)).toFixed(1);
        cps.textContent = timeLeft === 10 ? '0.0' : currentCps;
    }

    function startGame() {
        clicks = 0;
        timeLeft = 10.0;
        clickCount.textContent = '0';
        cps.textContent = '0.0';
        results.classList.add('hidden');
        clickArea.classList.remove('disabled');
        startBtn.textContent = 'Reset';
        isGameRunning = true;
        
        gameInterval = setInterval(updateTimer, 100);
    }

    function endGame() {
        clearInterval(gameInterval);
        isGameRunning = false;
        clickArea.classList.add('disabled');
        startBtn.textContent = 'Play Again';
        
        const finalCpsValue = (clicks / 10).toFixed(1);
        bestCpsScore = Math.max(bestCpsScore, parseFloat(finalCpsValue));
        
        finalClicks.textContent = clicks;
        finalCps.textContent = finalCpsValue;
        bestCps.textContent = bestCpsScore.toFixed(1);
        
        results.classList.remove('hidden');
    }

    clickArea.addEventListener('click', () => {
        if (isGameRunning) {
            clicks++;
            clickCount.textContent = clicks;
        }
    });

    startBtn.addEventListener('click', () => {
        if (isGameRunning) {
            clearInterval(gameInterval);
            endGame();
        }
        startGame();
    });
});