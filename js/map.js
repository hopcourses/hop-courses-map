// =============================
// Initialisation de la carte
// =============================

const map = L.map('map', {
    zoomControl: false
});

// Fond OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Position provisoire
map.setView([50.77, 2.72], 11);
