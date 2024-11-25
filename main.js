var map = L.map('map').setView([56.9472, 24.1222], 8);

// loads the map visual image from openstreetmap with copyright
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// loading the data from the json file, using fetch
// [!!!] DOESN'T WORK WITHOUT LOCALHOST OR RIGHTS
fetch('geomap.json') 
    .then(response => response.json())
    .then(data => {
        // getting the data from json file, going through each "feature" in the features array of the json file
        data.features.forEach(feature => {
            // checks if the feature type is point, and if it is, then places a marker on the map
            if (feature.geometry.type === "Point") {
                // wgs84 is a name of a coordinate system used by Leaflet
                var wgs84Coords = LKS92WGS84.convertXYToLatLon(feature.geometry.coordinates);
                // Leaflet already has markers, so I'm just using a integrated function to make them appear
                L.marker([wgs84Coords[0], wgs84Coords[1]]) // (Lat, Lon) or basically (x, y) 
                    .addTo(map)
                    // only adds the PLACENAME when marker is hovered, could also use PLACESUBTY later
                    .bindPopup(`<b>${feature.properties.PLACENAME}</b>`);
            }
        });
    })
    .catch(error => console.error('Error loading JSON:', error));