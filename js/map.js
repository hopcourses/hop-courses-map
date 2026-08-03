// ==========================================================
// Hop Courses Map
// map.js
// Sprint 2.7.1
// Gestion de la carte Leaflet
// ==========================================================

let map = null;

let markerCollecte = null;
let markerLivraison = null;
let itineraire = null;
let markerLivreur = null; // Marqueur animé pour le livreur

/**
 * ----------------------------------------------------------
 * Initialisation de la carte
 * ----------------------------------------------------------
 */
function initialiserCarte(){
    map = L.map("map",{
        zoomControl: true,
        attributionControl: false,
        zoomSnap: 0.25,
        zoomDelta: 0.25
    });

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19
        }
    ).addTo(map);

    //--------------------------------------------------------
    // Fix : le composant custom Glide (iframe) redimensionne
    // parfois le conteneur #map après le premier rendu.
    //--------------------------------------------------------
    const conteneurCarte = document.getElementById("map");

    if (conteneurCarte && window.ResizeObserver) {
        new ResizeObserver(() => {
            map.invalidateSize({ animate: false });
        }).observe(conteneurCarte);
    }

    window.addEventListener("resize", () => {
        map.invalidateSize({ animate: false });
    });
}

/**
 * ----------------------------------------------------------
 * Affichage et animation d'une course
 * ----------------------------------------------------------
 */
function afficherCarte(course){
    if(!map){
        initialiserCarte();
    }

    //--------------------------------------------------------
    // Nettoyage des anciens éléments
    //--------------------------------------------------------
    if(markerCollecte){ map.removeLayer(markerCollecte); }
    if(markerLivraison){ map.removeLayer(markerLivraison); }
    if(itineraire){ map.removeLayer(itineraire); }
    if(markerLivreur){ map.removeLayer(markerLivreur); }

    //--------------------------------------------------------
    // Icônes
    //--------------------------------------------------------
    const iconeCollecte = L.divIcon({
        className: "",
        html: `
            <div style="
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #003366;
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(0,0,0,.25);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    const iconeLivraison = L.divIcon({
        className: "",
        html: `
            <div style="
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #FF9100;
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(0,0,0,.25);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    // Icône du livreur en mouvement (bleue bordée de vert fluo)
    // Icône du livreur : Image personnalisée
    const iconeLivreur = L.icon({
        iconUrl: 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_1275,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FxqQ16xCqkIi7N1s0OrNF%2Fpub%2FqFABcpiY8kEHBveCNllr.gif', // URL de ton icône voiture
        iconSize: [32, 32],   // Taille de l'image [largeur, hauteur]
        iconAnchor: [16, 16]  // Point d'ancrage au centre de l'icône
    });

    //--------------------------------------------------------
    // Création des marqueurs fixes et du tracé
    //--------------------------------------------------------
    markerCollecte = L.marker(course.collecte, { icon: iconeCollecte }).addTo(map);
    markerLivraison = L.marker(course.livraison, { icon: iconeLivraison }).addTo(map);

    itineraire = L.polyline(
        [course.collecte, course.livraison],
        {
            color: "#FF9100",
            weight: 4,
            opacity: .60,
            dashArray: "8, 8"
        }
    ).addTo(map);

    //--------------------------------------------------------
    // Animation du livreur (Point A -> Point B)
    //--------------------------------------------------------
    const dureeAnimation = 8000; // 8000ms = 8 secondes de trajet

    if (L.Marker.movingMarker) {
        markerLivreur = L.Marker.movingMarker(
            [course.collecte, course.livraison],
            [dureeAnimation],
            {
                icon: iconeLivreur,
                autostart: true,
                loop: true // Recommence en boucle
            }
        ).addTo(map);
    }

    //--------------------------------------------------------
    // Cadrage adapté
    //--------------------------------------------------------
    recentrerCarte(course);
}

/**
 * ----------------------------------------------------------
 * Centre la carte sur la course courante
 * ----------------------------------------------------------
 */
function recentrerCarte(course){
    if(!itineraire){ return; }

    map.invalidateSize({ animate: false });

    const bounds = itineraire.getBounds();

    map.fitBounds(
        bounds,
        {
            animate: true,
            duration: 0.8,
            paddingTopLeft: [50, 50],
            paddingBottomRight: [50, 240],
            maxZoom: 13.5
        }
    );
}

/**
 * ==========================================================
 * Lecture automatique des coordonnées depuis l'URL
 * Ex: ?latA=50.799&lngA=2.693&latB=50.701&lngB=2.712
 * ==========================================================
 */
function obtenirParamsURL() {
    const params = new URLSearchParams(window.location.search);
    
    const latA = parseFloat(params.get('latA'));
    const lngA = parseFloat(params.get('lngA'));
    const latB = parseFloat(params.get('latB'));
    const lngB = parseFloat(params.get('lngB'));

    if (!isNaN(latA) && !isNaN(lngA) && !isNaN(latB) && !isNaN(lngB)) {
        return {
            collecte: [latA, lngA],
            livraison: [latB, lngB]
        };
    }
    return null;
}

// Lancement automatique au chargement
document.addEventListener("DOMContentLoaded", () => {
    const courseDepuisURL = obtenirParamsURL();
    
    if (courseDepuisURL) {
        afficherCarte(courseDepuisURL);
    } else {
        console.log("Hop Courses Map : En attente des coordonnées d'URL...");
    }
});
