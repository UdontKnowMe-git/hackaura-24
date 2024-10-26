let heartRateElement = document.getElementById('heartRate');
let ecgElement = document.getElementById('ecg');
let stepsElement = document.getElementById('steps');
let statusElement = document.getElementById('status');

let heartRateData = [];
let stepsData = [];
let heartRateChart, stepsChart;

// Chart.js configuration
function initCharts() {
    const ctxHeartRate = document.getElementById('heartRateChart').getContext('2d');
    heartRateChart = new Chart(ctxHeartRate, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => i + 1), // 10 points
            datasets: [{
                label: 'Heart Rate (BPM)',
                data: heartRateData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const ctxSteps = document.getElementById('stepsChart').getContext('2d');
    stepsChart = new Chart(ctxSteps, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => i + 1), // 10 points
            datasets: [{
                label: 'Steps',
                data: stepsData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Update charts with new data
function updateCharts() {
    if (heartRateData.length >= 10) heartRateData.shift(); // Limit to 10 points
    if (stepsData.length >= 10) stepsData.shift(); // Limit to 10 points

    heartRateData.push(Math.floor(Math.random() * 100) + 60); // Simulate heart rate
    stepsData.push(Math.floor(Math.random() * 5)); // Simulate steps

    heartRateChart.update();
    stepsChart.update();
}

// Connect to device and gather data
async function connectToDevice() {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        const decoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(decoder.writable);
        const reader = decoder.readable.getReader();

        statusElement.innerText = "Connected! Waiting for data...";

        setInterval(updateCharts, 1000); // Update charts every second

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            // Assuming the data is in the format "HR:70,ECG:0.5"
            const data = value.trim().split(',');
            const heartRate = data[0]?.split(':')[1] || '--';
            const ecg = data[1]?.split(':')[1] || '--';

            heartRateElement.innerText = `Heart Rate: ${heartRate} BPM`;
            ecgElement.innerText = `ECG: ${ecg} mV`;

            heartRateData.push(parseInt(heartRate)); // Update heart rate data
            stepsData.push(Math.floor(Math.random() * 5)); // Simulate steps
            
            // Update charts with the new data
            updateCharts();
        }

        reader.releaseLock();
    } catch (error) {
        console.error('Error connecting to device:', error);
        statusElement.innerText = "Failed to connect to device.";
    }
}

document.getElementById('connect').addEventListener('click', connectToDevice);
initCharts();
