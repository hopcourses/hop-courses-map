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
let markerLivreur = null;

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

    // Nettoyage des anciens éléments
    if(markerCollecte){ map.removeLayer(markerCollecte); }
    if(markerLivraison){ map.removeLayer(markerLivraison); }
    if(itineraire){ map.removeLayer(itineraire); }
    if(markerLivreur){ map.removeLayer(markerLivreur); }

    // ------------------------------------------------------
    // 1. Icône Collecte (Inchangée : Point bleu)
    // ------------------------------------------------------
    const iconeCollecte = L.divIcon({
        className: "",
        html: `
            <div style="
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #003366;
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(0,0,0,.25);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    // ------------------------------------------------------
    // 2. Icône Livraison (Inchangée : Point orange)
    // ------------------------------------------------------
    const iconeLivraison = L.divIcon({
        className: "",
        html: `
            <div style="
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #FF9100;
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(0,0,0,.25);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    // ------------------------------------------------------
    // 3. Calcul de la distance dynamique
    // ------------------------------------------------------
    let texteDistance = "";
    if (map) {
        const distMetres = map.distance(course.collecte, course.livraison);
        const distKm = (distMetres / 1000).toFixed(1); // Ex: 3.5 km
        texteDistance = `${distKm} km`;
    }

    // ------------------------------------------------------
    // 4. Icône Livreur (Bonhomme vers la droite + Bulle Distance)
    // ------------------------------------------------------
    const iconeLivreur = L.divIcon({
        className: "",
        html: `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                pointer-events: none;
            ">
                <!-- Bulle de distance -->
                <div style="
                    background: #003366;
                    color: white;
                    font-size: 11px;
                    font-weight: bold;
                    font-family: sans-serif;
                    padding: 2px 7px;
                    border-radius: 10px;
                    border: 1px solid #00D26A;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    white-space: nowrap;
                    margin-bottom: 2px;
                ">
                    ${texteDistance}
                </div>

                <!-- Personnage vers la droite -->
                <div style="
                    font-size: 26px;
                    line-height: 26px;
                    text-align: center;
                    transform: scaleX(-1);
                    filter: drop-shadow(-2px 3px 4px rgba(0,0,0,0.4));
                ">🚗</div>
            </div>
        `,
        iconSize: [60, 50],
        iconAnchor: [30, 42]
    });

    // ------------------------------------------------------
    // Création des marqueurs fixes et de la ligne
    // ------------------------------------------------------
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

    // ------------------------------------------------------
    // Animation du livreur
    // ------------------------------------------------------
    const dureeAnimation = 8000; // 8 secondes

    if (L.Marker.movingMarker) {
        markerLivreur = L.Marker.movingMarker(
            [course.collecte, course.livraison],
            [dureeAnimation],
            {
                icon: iconeLivreur,
                autostart: true,
                loop: true
            }
        ).addTo(map);
    }

    recentrerCarte(course);
}

/**
 * ----------------------------------------------------------
 * Centre la carte sur la course
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
            paddingTopLeft: [20, 20],
            paddingBottomRight: [20, 20],
            maxZoom: 16
        }
    );
}

/**
 * ----------------------------------------------------------
 * Lecture automatique des coordonnées depuis l'URL
 * ----------------------------------------------------------
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

document.addEventListener("DOMContentLoaded", () => {
    const courseDepuisURL = obtenirParamsURL();
    
    if (courseDepuisURL) {
        afficherCarte(courseDepuisURL);
    } else {
        console.log("Hop Courses Map : En attente des coordonnées d'URL...");
    }
});
