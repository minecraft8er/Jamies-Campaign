// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Jamie123';

// DOM Elements
const adminLoginBtn = document.getElementById('adminLoginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const prosList = document.getElementById('prosList');
const consList = document.getElementById('consList');
const descriptionDiv = document.getElementById('descriptionText');

// Load pros and cons lists from localStorage
function loadLists() {
    // Load pros
    const savedPros = localStorage.getItem('prosList');
    if (savedPros) {
        const pros = JSON.parse(savedPros);
        prosList.innerHTML = pros.map(pro => `<p>• ${pro}</p>`).join('');
    } else {
        // Default pros if none exist
        const defaultPros = [
            "Strong leadership skills and experience",
            "Dedicated to improving student life",
            "Open to feedback and suggestions",
            "Clear vision for positive change",
            "Excellent communication skills"
        ];
        prosList.innerHTML = defaultPros.map(pro => `<p>• ${pro}</p>`).join('');
    }

    // Load cons
    const savedCons = localStorage.getItem('consList');
    if (savedCons) {
        const cons = JSON.parse(savedCons);
        consList.innerHTML = cons.map(con => `<p>• ${con}</p>`).join('');
    } else {
        // Default cons if none exist
        const defaultCons = [
            "New to student government",
            "Learning curve for some responsibilities"
        ];
        consList.innerHTML = defaultCons.map(con => `<p>• ${con}</p>`).join('');
    }
}

function loadDescription() {
    const savedDescription = localStorage.getItem('descriptionText');
    descriptionDiv.textContent = savedDescription ? savedDescription : '';
}

// Show login modal
adminLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    usernameInput.focus();
});

// Close modal
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        usernameInput.value = '';
        passwordInput.value = '';
    }
});

// Handle login
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
});

// Handle Enter key in password field
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Initialize lists display
loadLists();
loadDescription();

// Decorative background images (scattered among the stars)
const decorativeImages = [
    'images/heart.jpg',
    'images/blue-fish.jpg',
    'images/cookie-fish.jpg',
    'images/ceramic-star.jpg',
    'images/glass-star.png',
    'images/white-swirl.jpg',
    'images/pink-bunny.png',
    'images/green-frog.png',
    'images/blue-cat.png',
    'images/monkey2.png',
    'images/monkey.png',
    'images/evil-eye.png',
    'images/green-button.png',
    'images/orange-button.png',
    'images/orange-button2.png',
    'images/green-star.png',
    'images/blue-star.png',
    'images/green-peace.png',
    'images/felt-star.png'
];

function scatterDecorativeBackground() {
    // Create a container for the decorations
    let decoContainer = document.getElementById('deco-bg');
    if (!decoContainer) {
        decoContainer = document.createElement('div');
        decoContainer.id = 'deco-bg';
        decoContainer.style.position = 'fixed';
        decoContainer.style.top = '0';
        decoContainer.style.left = '0';
        decoContainer.style.width = '100vw';
        decoContainer.style.height = '100vh';
        decoContainer.style.zIndex = '0';
        decoContainer.style.pointerEvents = 'none';
        document.body.prepend(decoContainer);
    }
    decoContainer.innerHTML = '';

    // --- Stars ---
    const starColors = [
        '#333', '#e84393', '#fbc02d', '#4a90e2', '#a29bfe', '#00bfae', '#4caf50', '#ff5252', '#9c27b0', '#009688', '#ffd600', '#e040fb', '#00bcd4', '#ff4081', '#3ddc97'
    ];
    const numStars = 90 + Math.floor(Math.random() * 31); // 90-120 stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = 30 + Math.random() * 70;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const rotation = Math.floor(Math.random() * 360);
        star.style.position = 'absolute';
        star.style.left = `${-5 + Math.random() * 110}vw`;
        star.style.top = `${-5 + Math.random() * 110}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.zIndex = '0';
        star.style.pointerEvents = 'none';
        star.style.opacity = '0.7';
        star.style.transform = `rotate(${rotation}deg)`;
        star.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="10,0 12.94,6.18 20,7.24 14.5,12.02 15.88,19.02 10,15.5 4.12,19.02 5.5,12.02 0,7.24 7.06,6.18" fill="${color}"/></svg>`;
        decoContainer.appendChild(star);
    }

    // --- Decorative Images ---
    const numImages = 30;
    for (let i = 0; i < numImages; i++) {
        const img = document.createElement('img');
        const src = decorativeImages[Math.floor(Math.random() * decorativeImages.length)];
        img.src = src;
        img.style.position = 'absolute';
        img.style.zIndex = '0';
        img.style.pointerEvents = 'none';
        // Random size (40px to 120px)
        const size = 40 + Math.random() * 80;
        img.style.width = `${size}px`;
        img.style.height = 'auto';
        // Random position
        img.style.left = `${-5 + Math.random() * 110}vw`;
        img.style.top = `${-5 + Math.random() * 110}vh`;
        // Random rotation
        img.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
        img.style.opacity = '0.85';
        decoContainer.appendChild(img);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    scatterDecorativeBackground();
});