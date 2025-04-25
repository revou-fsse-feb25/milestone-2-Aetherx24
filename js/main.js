document.addEventListener('DOMContentLoaded', () => {
    // play button functionality
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.textContent = 'Loading...';
        });
    });

    // Prompt Username creation
    window.promptUsername = function() {
        const name = prompt('Please enter your nickname for the leaderboard:', '');
        if (name && name.trim()) {
            username = name.trim();
            localStorage.setItem('revofun_username', username);
            displayUsername();
        } else {
            username = 'Player' + Math.floor(Math.random() * 1000);
            localStorage.setItem('revofun_username', username);
            displayUsername();
        }
    }

    function displayUsername() {
        const nav = document.querySelector('.nav-links');
        // Remove existing username display if any
        const existingUser = nav.querySelector('.username-item');
        if (existingUser) {
            existingUser.remove();
        }
        
        const userDiv = document.createElement('li');
        userDiv.className = 'username-item';
        userDiv.innerHTML = `
            <span class="username">${username}</span>
            <button class="change-name" onclick="promptUsername()">Change</button>
        `;
        nav.appendChild(userDiv);
    }

    // Initialize username
    let username = localStorage.getItem('revofun_username');
    if (!username) {
        promptUsername();
    } else {
        displayUsername();
    }
});

