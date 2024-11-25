var map = L.map('map').setView([56.95, 24.11], 8);

// Adds a base map layer (tiles from OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Step 3: Load the JSON data
fetch('geomap.json') // This loads the JSON file
    .then(response => response.json())
    .then(data => {
        // Step 4: Process each feature in the JSON
        data.features.forEach(feature => {
            if (feature.geometry.type === "Point") {
                // Convert the coordinates from EPSG:3059 to WGS84 using MapTask
                var wgs84Coords = MapTask.convertXYToLatLon(feature.geometry.coordinates);

                // Step 5: Add a marker to the map
                L.marker([wgs84Coords[0], wgs84Coords[1]]) // [Latitude, Longitude]
                    .addTo(map)
                    .bindPopup(`<b>${feature.properties.PLACENAME}</b>`); // Add popup with the place name
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));