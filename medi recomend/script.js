// Sample static recommendations
const recommendations = [
    "Drink plenty of water daily.",
    "Exercise for at least 30 minutes a day.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Get at least 7-8 hours of sleep each night.",
    "Schedule regular check-ups with your doctor.",
    "Eat a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats.",
    "Limit processed foods, sugar, and saturated fats, which can increase the risk of chronic diseases.",
    "Aim for at least 150 minutes of moderate aerobic exercise or 75 minutes of vigorous exercise per week, along with strength training twice a week.",
    "Manage stress through mindfulness practices, meditation, deep breathing exercises, and physical activity.",
    "Adults should aim for 7-9 hours of quality sleep per night.",
    "Get vaccinated according to recommended schedules, including annual flu shots and other vaccines as appropriate (e.g., COVID-19, tetanus, shingles).",
    "Avoid smoking and consider programs to help quit if you do smoke, as it significantly increases the risk of multiple diseases.",
    "Use sunscreen with SPF 30 or higher, wear protective clothing, and avoid peak sun hours (10 a.m. to 4 p.m.) to reduce skin cancer risk.",
    "Head ache - take POWERGESIC ",
    "Common cold - take LIVING CITREZINE",
    "fever - take DOLO 650",
    "Body pains - take BRUFIN",
    "Basic Gastrick problems - take ENO(any basic acid)",
    "Round worms in stomach - take ALBENZOL",
];

// Function to display recommendations
function displayRecommendations() {
    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = ''; // Clear existing recommendations

    recommendations.forEach(rec => {
        const listItem = document.createElement('li');
        listItem.textContent = rec;
        recommendationList.appendChild(listItem);
    });
}

// Initial display of recommendations
window.onload = displayRecommendations;