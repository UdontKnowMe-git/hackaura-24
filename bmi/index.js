// Variables to track BMI history
let bmiHistory = [];
let bmiLabels = [];

// Initialize chart
const ctx = document.getElementById("bmiChart").getContext("2d");
const bmiChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: bmiLabels,
    datasets: [
      {
        label: "BMI Over Time",
        data: bmiHistory,
        borderColor: "#ff4081",
        backgroundColor: "rgba(255, 64, 129, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "BMI" } },
    },
  },
});

// Update unit labels
function changeUnit() {
  const unit = document.getElementById("unitSelect").value;
  document.querySelector("label[for='height']").textContent =
    unit === "metric" ? "Height (cm):" : "Height (in):";
  document.querySelector("label[for='weight']").textContent =
    unit === "metric" ? "Weight (kg):" : "Weight (lb):";
}

// Calculate and display BMI
function calculateBMI() {
  const unit = document.getElementById("unitSelect").value;
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight) {
    alert("Please enter valid height and weight!");
    return;
  }

  // Convert height and weight to metric if needed
  if (unit === "imperial") {
    height *= 2.54; // Convert inches to cm
    weight *= 0.453592; // Convert pounds to kg
  }

  // Calculate BMI
  height /= 100; // Convert height to meters
  const bmi = (weight / (height * height)).toFixed(1);

  // Update BMI display
  document.getElementById("bmiValue").textContent = bmi;

  // Determine BMI category
  const bmiCommentElement = document.getElementById("bmiComment");
  if (bmi < 18.5) {
    bmiCommentElement.textContent = "You are underweight.";
    bmiCommentElement.className = "bmi-category underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiCommentElement.textContent = "You have a normal weight. Great job!";
    bmiCommentElement.className = "bmi-category normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiCommentElement.textContent = "You are overweight. Consider a balanced diet and exercise.";
    bmiCommentElement.className = "bmi-category overweight";
  } else {
    bmiCommentElement.textContent = "You are obese. Health advice is recommended.";
    bmiCommentElement.className = "bmi-category obese";
  }

  // Record BMI in history and update chart
  bmiLabels.push(new Date().toLocaleTimeString());
  bmiHistory.push(bmi);
  bmiChart.update();
}