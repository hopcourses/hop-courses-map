// =====================================
// Carte Leaflet
// =====================================

const map = L.map("map", {
    zoomControl: false
});

// Fond OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// Objets de la carte
let markerCollecte = null;
let markerLivraison = null;
let ligne = null;

// =====================================
// Afficher un itinéraire
// =====================================

function afficherItineraire(course) {

    if (!course) return;

    // Suppression des anciens éléments
    if (markerCollecte) map.removeLayer(markerCollecte);
    if (markerLivraison) map.removeLayer(markerLivraison);
    if (ligne) map.removeLayer(ligne);

    // Marqueur collecte (bleu)
    markerCollecte = L.marker(course.collecte).addTo(map);

    // Marqueur livraison (rouge)
    markerLivraison = L.marker(course.livraison).addTo(map);

    // Ligne entre les deux
    ligne = L.polyline(
        [
            course.collecte,
            course.livraison
        ],
        {
            color: "#F28C18",
            weight: 5
        }
    ).addTo(map);

    // Ajuste automatiquement le zoom
    map.fitBounds(ligne.getBounds(), {
        padding: [50, 50]
    });

}