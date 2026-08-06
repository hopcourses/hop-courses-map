// ==========================================================
// Hop Courses Map
// map.js
// Sprint 2.7.1 (Modifié avec Position Livreur)
// Gestion de la carte Leaflet
// ==========================================================

let map = null;  

let markerCollecte = null;
let markerLivraison = null;
let itineraire = null;
let markerLivreur = null;
let markerPositionLivreur = null; // Nouveau marqueur pour la position fixe du livreur

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
function afficherCarte(donneesCourse){
    if(!map){
        initialiserCarte();
    }

    // Nettoyage des anciens éléments
    if(markerCollecte){ map.removeLayer(markerCollecte); }
    if(markerLivraison){ map.removeLayer(markerLivraison); }
    if(itineraire){ map.removeLayer(itineraire); }
    if(markerLivreur){ map.removeLayer(markerLivreur); }
    if(markerPositionLivreur){ map.removeLayer(markerPositionLivreur); }

    // ------------------------------------------------------
    // 1. Icône Collecte (Point bleu)
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
    // 2. Icône Livraison (Point orange)
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
    // 3. Calcul de la distance dynamique (Collecte -> Livraison)
    // ------------------------------------------------------
    let texteDistance = "";
    if (map) {
        const distMetres = map.distance(donneesCourse.collecte, donneesCourse.livraison);
        const distKm = (distMetres / 1000).toFixed(1);
        texteDistance = `${distKm} km`;
    }

    // ------------------------------------------------------
    // 4. Icône Livreur Animé (Trajet A -> B)
    // ------------------------------------------------------
    const iconeLivreurAnime = L.divIcon({
        className: "",
        html: `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                pointer-events: none;
            ">
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
                <div style="
                    font-size: 26px;
                    line-height: 26px;
                    text-align: center;
                    transform: scaleX(-1);
                    filter: drop-shadow(-2px 3px 4px rgba(0,0,0,0.4));
                ">⚲</div>
            </div>
        `,
        iconSize: [60, 50],
        iconAnchor: [30, 42]
    });

    // ------------------------------------------------------
    // 5. Icône Position Actuelle du Livreur (Voiture)
    // ------------------------------------------------------
    const iconePositionLivreur = L.divIcon({
        className: "",
        html: `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                pointer-events: none;
            ">
                <div style="
                    background: #00D26A;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    font-family: sans-serif;
                    padding: 2px 6px;
                    border-radius: 8px;
                    border: 1px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    white-space: nowrap;
                    margin-bottom: 2px;
                ">
                    Votre position actuelle
                </div>
                <div style="
                    font-size: 24px;
                    line-height: 24px;
                    text-align: center;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
                ">🚗</div>
            </div>
        `,
        iconSize: [70, 45],
        iconAnchor: [35, 38]
    });

    // ------------------------------------------------------
    // Création des marqueurs fixes et de la ligne
    // ------------------------------------------------------
    markerCollecte = L.marker(donneesCourse.collecte, { icon: iconeCollecte }).addTo(map);
    markerLivraison = L.marker(donneesCourse.livraison, { icon: iconeLivraison }).addTo(map);

    itineraire = L.polyline(
        [donneesCourse.collecte, donneesCourse.livraison],
        {
            color: "#FF9100",
            weight: 4,
            opacity: .60,
            dashArray: "8, 8"
        }
    ).addTo(map);

    // Ajout du marqueur de position actuelle du livreur si les coordonnées existent
    if (donneesCourse.positionLivreur) {
        markerPositionLivreur = L.marker(donneesCourse.positionLivreur, { icon: iconePositionLivreur }).addTo(map);
    }

    // ------------------------------------------------------
    // Animation du livreur sur le trajet
    // ------------------------------------------------------
    const dureeAnimation = 8000;

    if (L.Marker.movingMarker) {
        markerLivreur = L.Marker.movingMarker(
            [donneesCourse.collecte, donneesCourse.livraison],
            [dureeAnimation],
            {
                icon: iconeLivreurAnime,
                autostart: true,
                loop: true
            }
        ).addTo(map);
    }

    recentrerCarte(donneesCourse);
}

/**
 * ----------------------------------------------------------
 * Centre la carte pour inclure la course ET le livreur
 * ----------------------------------------------------------
 */
function recentrerCarte(donneesCourse){
    if(!itineraire){ return; }

    map.invalidateSize({ animate: false });

    // On récupère les limites de l'itinéraire (A et B)
    const bounds = L.latLngBounds([donneesCourse.collecte, donneesCourse.livraison]);

    // Si on a aussi la position du livreur, on élargit les limites de la carte pour l'inclure
    if (donneesCourse.positionLivreur) {
        bounds.extend(donneesCourse.positionLivreur);
    }

    map.fitBounds(
        bounds,
        {
            animate: true,
            duration: 0.8,
            paddingTopLeft: [30, 30],
            paddingBottomRight: [30, 30],
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
    
    const latLivreur = parseFloat(params.get('latLivreur'));
    const lngLivreur = parseFloat(params.get('lngLivreur'));

    if (!isNaN(latA) && !isNaN(lngA) && !isNaN(latB) && !isNaN(lngB)) {
        return {
            collecte: [latA, lngA],
            livraison: [latB, lngB],
            positionLivreur: (!isNaN(latLivreur) && !isNaN(lngLivreur)) ? [latLivreur, lngLivreur] : null
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
