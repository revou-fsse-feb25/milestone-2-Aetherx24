document.addEventListener('DOMContentLoaded', () => {
    // Play button functionality
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.textContent = 'Loading...';
        });
    });

    // username/nickname system
    let username = localStorage.getItem('revofun_username');

    if (!username) {
        promptUsername();
    } else {
        displayUsername();
    }

    function promptUsername() {
        const name = prompt('Please enter your nickname for the leaderboarc:', '');
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
        const userDiv = document.createElement('li');
        userDiv.innerHTML = `
        <span class="username">${username}</span>
        <button class="change-name" onclick="promptUsername()">Change</button>
        `;
        nav.appendChild(userDiv)
    }
});

