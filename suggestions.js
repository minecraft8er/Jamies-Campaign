// DOM Elements
const suggestionForm = document.getElementById('suggestionForm');
const suggestionText = document.getElementById('suggestionText');
const submissionMessage = document.getElementById('submissionMessage');

// Handle form submission
suggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const suggestion = suggestionText.value.trim();
    
    if (suggestion) {
        // Get existing suggestions
        const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
        
        // Add new suggestion
        suggestions.push(suggestion);
        
        // Save to localStorage
        localStorage.setItem('suggestions', JSON.stringify(suggestions));
        
        // Clear the form
        suggestionText.value = '';
        
        // Show success message
        submissionMessage.style.display = 'block';
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            submissionMessage.style.display = 'none';
        }, 3000);
    }
}); 