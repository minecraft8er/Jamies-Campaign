// DOM Elements
const prosText = document.getElementById('prosText');
const saveProsBtn = document.getElementById('savePros');
const suggestionsList = document.getElementById('suggestionsList');

// Load pros list from localStorage
function loadProsList() {
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
}

// Save pros list to localStorage
saveProsBtn.addEventListener('click', () => {
    const newContent = prosText.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    if (newContent.length > 0) {
        localStorage.setItem('prosList', JSON.stringify(newContent));
        alert('Pros list updated successfully!');
    } else {
        alert('Please enter at least one item');
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

// Initialize
loadProsList();
loadSuggestions(); 