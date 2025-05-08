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

// Load pros list from localStorage
function loadProsList() {
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

// Initialize pros list display
loadProsList(); 