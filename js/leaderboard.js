class Leaderboard {
    constructor(gameName, maxEntries = 10) {
        this.gameName = gameName;
        this.maxEntries = maxEntries;
        this.leaderboardKey = `revofun_${gameName}_leaderboard`;
    }

    getScores() {
        try {
            return JSON.parse(localStorage.getItem(this.leaderboardKey) || '[]');
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return [];
        }
    }

    addScore(score) {
        try {
            const username = localStorage.getItem('revofun_username') || 'Anonymous';
            const scores = this.getScores();
            scores.push({
                username,
                score: Number(score).toFixed(2), 
                date: new Date().toISOString() 
            });
            scores.sort((a, b) => b.score - a.score);
            scores.splice(this.maxEntries);
            localStorage.setItem(this.leaderboardKey, JSON.stringify(scores));
            this.displayScores();
        } catch (error) {
            console.error('Error adding score:', error);
        }
    }

    displayScores() {
        try {
            const leaderboardList = document.getElementById('leaderboard-list');
            if (!leaderboardList) return;
            const scores = this.getScores();

            leaderboardList.innerHTML = scores.map((entry, index) => `
            <li class="leaderboard-item">
                <span>${index + 1}. ${entry.username}</span>
                <span class="player-score">${entry.score}</span>
            </li>
            `).join('');
        } catch (error) {
            console.error('Error displaying scores:', error);
        }
    }
}