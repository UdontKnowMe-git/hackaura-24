if ('Gyroscope' in window) {
    let steps = 0;
    let lastAngle = { x: 0, y: 0, z: 0 };

    const stepThreshold = 1.5; // Adjust this threshold based on sensitivity
    const gyro = new Gyroscope({ frequency: 60 });

    gyro.addEventListener('reading', e => {
        const angleChange = Math.sqrt(
            Math.pow(gyro.x - lastAngle.x, 2) +
            Math.pow(gyro.y - lastAngle.y, 2) +
            Math.pow(gyro.z - lastAngle.z, 2)
        );

        if (angleChange > stepThreshold) {
            steps++;
            document.getElementById('steps').innerText = `Steps: ${steps}`;
        }

        lastAngle = { x: gyro.x, y: gyro.y, z: gyro.z };
    });

    gyro.start();

    // Simulated API call to send step data
    function sendStepsToAPI(steps) {
        fetch('https://example.com/api/steps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ steps: steps })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // Send steps to API every 10 steps
    setInterval(() => {
        sendStepsToAPI(steps);
        steps = 0; // Reset the step counter
    }, 60000); // Adjust the interval as needed
} else {
    console.log('Gyroscope is not supported by your browser.');
}
