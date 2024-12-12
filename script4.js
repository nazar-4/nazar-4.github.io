document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([50.0755, 14.4378], 13); // Default to Prague
  const destinationInput = document.getElementById("destination-coordinates");
  const goToDestinationButton = document.getElementById("go-to-destination");

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Array to store markers
  const markers = [];

  // Function to add a marker with popup
  const addMarker = (lat, lng, info) => {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(info).openPopup();
    markers.push(marker);
  };

  // Function to handle Geolocation
  const updateLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date(position.timestamp).toLocaleString();

        addMarker(
          latitude,
          longitude,
          `Current Location: <br>Lat: ${latitude}, Lng: ${longitude}<br>Time: ${timestamp}`
        );

        map.setView([latitude, longitude], 13);
      },
      error => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  // Automatically update the location on load
  updateLocation();

  // Handle destination input and scroll
  goToDestinationButton.addEventListener("click", () => {
    const input = destinationInput.value.trim();
    const [lat, lng] = input.split(",").map(coord => parseFloat(coord));

    if (isNaN(lat) || isNaN(lng)) {
      alert("Invalid coordinates. Please enter in the format 'lat,lng'.");
      return;
    }

    addMarker(lat, lng, `Destination: <br>Lat: ${lat}, Lng: ${lng}`);
    map.setView([lat, lng], 13);
  });

  // Watch position for real-time updates
  if (navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      const timestamp = new Date(position.timestamp).toLocaleString();

      addMarker(
        latitude,
        longitude,
        `Updated Location: <br>Lat: ${latitude}, Lng: ${longitude}<br>Time: ${timestamp}`
      );
    });
  }
});
