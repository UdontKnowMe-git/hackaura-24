// Predefined geolocation (set to New York City for example)
const lat = 40.730610;
const lon = -73.935242;
const radius = 20000; // 20 km radius

function findHospitals() {
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${lat},${lon})[amenity=hospital];out;`;

  fetch(overpassUrl)
    .then(response => response.json())
    .then(data => displayHospitals(data.elements))
    .catch(error => {
      console.error('Error fetching hospitals:', error);
      alert('Failed to retrieve hospitals. Please try again later.');
    });
}

function displayHospitals(hospitals) {
  const hospitalList = document.getElementById('hospital-list');
  hospitalList.innerHTML = ''; // Clear previous results

  if (hospitals.length === 0) {
    hospitalList.innerHTML = '<p>No hospitals found nearby.</p>';
    return;
  }

  hospitals.forEach((hospital) => {
    const hospitalItem = document.createElement('div');
    hospitalItem.className = 'hospital-item';
    hospitalItem.innerHTML = `<strong>${hospital.tags.name || 'Unnamed Hospital'}</strong>
                              <p>Lat: ${hospital.lat}, Lon: ${hospital.lon}</p>`;
    hospitalList.appendChild(hospitalItem);
  });
}