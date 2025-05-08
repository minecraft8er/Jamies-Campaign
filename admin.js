// DOM Elements
const prosText = document.getElementById('prosText');
const consText = document.getElementById('consText');
const saveListsBtn = document.getElementById('saveLists');
const suggestionsList = document.getElementById('suggestionsList');
const descriptionEdit = document.getElementById('descriptionEdit');
const saveDescriptionBtn = document.getElementById('saveDescription');

// Load pros and cons lists from localStorage
function loadLists() {
    // Load pros
    const savedPros = localStorage.getItem('prosList');
    if (savedPros) {
        prosText.value = JSON.parse(savedPros).join('\n');
    } else {
        // Default pros if none exist
        const defaultPros = [
            "Strong leadership skills and experience",
            "Dedicated to improving student life",
            "Open to feedback and suggestions",
            "Clear vision for positive change",
            "Excellent communication skills"
        ];
        prosText.value = defaultPros.join('\n');
    }

    // Load cons
    const savedCons = localStorage.getItem('consList');
    if (savedCons) {
        consText.value = JSON.parse(savedCons).join('\n');
    } else {
        // Default cons if none exist
        const defaultCons = [
            "New to student government",
            "Learning curve for some responsibilities"
        ];
        consText.value = defaultCons.join('\n');
    }
}

// Save pros and cons lists to localStorage
saveListsBtn.addEventListener('click', () => {
    const newPros = prosText.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    const newCons = consText.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    if (newPros.length > 0 && newCons.length > 0) {
        localStorage.setItem('prosList', JSON.stringify(newPros));
        localStorage.setItem('consList', JSON.stringify(newCons));
        alert('Lists updated successfully!');
    } else {
        alert('Please enter at least one item in each list');
    }
});

// Load suggestions from localStorage
function loadSuggestions() {
    const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
    
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<p class="no-suggestions">No suggestions yet.</p>';
        return;
    }

    suggestionsList.innerHTML = suggestions
        .map((suggestion, index) => `
            <div class="suggestion-item">
                <p class="suggestion-number">#${index + 1}</p>
                <p class="suggestion-text">${suggestion}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `)
        .join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
            suggestions.splice(index, 1);
            localStorage.setItem('suggestions', JSON.stringify(suggestions));
            loadSuggestions();
        });
    });
}

// Load description from localStorage
function loadDescription() {
    const savedDescription = localStorage.getItem('descriptionText');
    descriptionEdit.value = savedDescription ? savedDescription : '';
}

saveDescriptionBtn.addEventListener('click', () => {
    localStorage.setItem('descriptionText', descriptionEdit.value.trim());
    alert('Description updated successfully!');
});

// Initialize
loadDescription();
loadLists();
loadSuggestions(); 