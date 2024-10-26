// Function to initiate the call
function callEmergencyNumber() {
    const phoneNumber = "9908047296";
    // Create a link to initiate the call
    window.location.href = `tel:${phoneNumber}`;
}

// Add event listener to the SOS button
document.getElementById('sos-button').addEventListener('click', callEmergencyNumber);