// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Jamie123';
const JSONBIN_API_KEY = '681fa7898e451c79651dfa7f';
const JSONBIN_BIN_ID = '681fa7b98a456b79669b21b1';

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

// Load data from JSONbin.io
async function loadData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const data = await response.json();
        console.log('Loaded data:', data.record);
        return data.record;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Save data to JSONbin.io
async function saveData(data) {
    try {
        console.log('Saving data:', data);
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log('Save response:', result);
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

// Load pros and cons lists
async function loadLists() {
    const data = await loadData();
    if (data) {
        // Load pros
        if (data.pros && Array.isArray(data.pros)) {
            prosList.innerHTML = data.pros.map(pro => `<p>• ${pro}</p>`).join('');
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
        if (data.cons && Array.isArray(data.cons)) {
            consList.innerHTML = data.cons.map(con => `<p>• ${con}</p>`).join('');
        } else {
            // Default cons if none exist
            const defaultCons = [
                "New to student government",
                "Learning curve for some responsibilities"
            ];
            consList.innerHTML = defaultCons.map(con => `<p>• ${con}</p>`).join('');
        }

        // Load description
        if (data.description) {
            descriptionDiv.textContent = data.description;
        }
    }
}

// Save pros and cons lists
async function saveLists(pros, cons, description) {
    const data = await loadData() || {};
    data.pros = pros;
    data.cons = cons;
    data.description = description;
    return await saveData(data);
}

// Load campaign platform text
async function loadPlatformText() {
    const data = await loadData();
    if (data && data.platform) {
        document.getElementById('platformText').innerHTML = data.platform;
    } else {
        const defaultPlatform = `Graduation: for our class' graduation, I believe it would be best to change some things. This would include walking down the aisle with somebody else being changed to walking by yourself, and changing the gowns so that we all wear the same thing.<br><br>
        
        Hat day: I think it would be much more financially affective to have a hat day every day. People could pay to wear a hat every day and if an organization doesnt sign up for a day then the money can go to the school.<br><br>
        
        Fix winter carnival: a lot of people were stressed by winter carnival this year. Our class had a major lack of participation which cause a huge loss of points. As hopes of solution I plan to organize things more ahead of time and also propose changing the point system a little bit. I also think letting class members outside of winter carnival vote for themes and such so not just student government gets to choose.<br><br>
        
        Work on class trip: I have lots of ideas for class trips. If we could raise enough money, I think we could have an awesome class trip and I am more than willing to have class trip ideas from other people too.<br><br>
        
        Add another school dance: I think having a silent disco style dance in the spring that is all grades (a spring fling) would be a wonderful idea. FIRST of all the silent disco portion could be really inclusive for the special needs kids that get too overwhelmed at school dances. Second of all having a spring dance open to everybody could make prom upperclassmen only likd most schools do. This will give more spotlight to the people close to graduating. The money raised from this extra dance could go to our class`;
        document.getElementById('platformText').innerHTML = defaultPlatform;
    }
}

// Save campaign platform text
async function savePlatformText(text) {
    const data = await loadData() || {};
    data.platform = text;
    return await saveData(data);
}

// Show login modal
adminLoginBtn?.addEventListener('click', () => {
    loginModal.style.display = 'block';
    usernameInput.focus();
});

// Close modal
closeBtn?.addEventListener('click', () => {
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
loginBtn?.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
});

// Handle Enter key in password field
passwordInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    if (prosList && consList && descriptionDiv) {
        await loadLists();
    }
    if (document.getElementById('platformText')) {
        await loadPlatformText();
    }
});

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

// Add platform editing functionality to admin page
function addPlatformEditor() {
    const platformSection = document.createElement('div');
    platformSection.className = 'admin-section';
    platformSection.innerHTML = `
        <h3>Edit Campaign Platform</h3>
        <textarea id="platformEditor" rows="6" style="width: 100%;">${localStorage.getItem('campaignPlatform') || ''}</textarea>
        <button onclick="savePlatformText(document.getElementById('platformEditor').value)" class="submit-btn">Save Platform</button>
    `;
    document.querySelector('.admin-content').appendChild(platformSection);
}

// Initialize platform text when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPlatformText();
    // Add platform editor to admin page if we're on the admin page
    if (document.querySelector('.admin-content')) {
        addPlatformEditor();
    }
});