// Création de la carte
const map = L.map('map', {
    zoomControl: false
}).setView([46.603354, 1.888334], 6);

// Fond de carte OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Position d'exemple
const courier = L.marker([48.8566, 2.3522]).addTo(map);

courier.bindPopup("🚚 Vous êtes ici");
