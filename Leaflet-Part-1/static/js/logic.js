//Pull the geojson data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data =>
    console.log(data)
);

// Creating the map object
let myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });  

// Create the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    createMarkers(data)
});

function createMarkers(earthquakes) {
    earthquakeMarkers = [];

    for (let i = 0; i< earthquakes.length; i++) {
        let lat = earthquakes[i].features.geometry.coordinates[1];
        let lng = earthquakes[i].features.geometry.coordinates[0];
        let magnitude = earthquakes[i].features.properties.mag;
        let latlng = [lat,lng];
        let depth = earthquakes[i].features.geometry.coordinates[2];
        let color = "";
        if (depth <10) {
            color = "white"
        }else if (depth <30){
            color = "lightgreen"
        }else if (depth <50){
            color = "yellow"
        }else if (depth <70){
            color = "orange"
        }else if (depth <90){
            color = "red"
        }else {
            color = "maroon"
        };

        earthquakeMarkers.push(L.circle(latlng, {
            stroke:false,
            fillOpacity:0.75,
            color:"black",
            fillColor: color,
            radius: magnitude *45000
        }).bindPopup("<h3>"+ earthquakes[i].features.properties.title + "</h3><hr><p>" + new Date(earthquakes[i].features.properties.time) + "</p>")
        );
    };
}
