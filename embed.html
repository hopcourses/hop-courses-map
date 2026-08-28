// ==========================================================
// Hop Courses Map  
// map.js - OPTIMISÉ POUR GLIDE
// Sprint 2.7.2 (Version épurée : Points A et B uniquement)
// Gestion de la carte Leaflet - FIX AFFICHAGE GLIDE
// ==========================================================

let map = null;  
let markerCollecte = null;
let markerLivraison = null;
let itineraire = null;
let markerLivreur = null;
let resizeTimeout = null;

/**
 * ----------------------------------------------------------
 * Déterminer si c'est un petit écran (Glide mobile/tablet)
 * ----------------------------------------------------------
 */
function isSmallScreen() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const conteneur = document.getElementById("map");
    const containerWidth = conteneur ? conteneur.offsetWidth : width;
    
    return width < 768 || containerWidth < 500;
}

/**
 * ----------------------------------------------------------
 * Initialisation de la carte
 * ----------------------------------------------------------
 */
function initialiserCarte(){
    const conteneurCarte = document.getElementById("map");
    
    if (!conteneurCarte) {
        console.error("Conteneur #map non trouvé!");
        return;
    }

    // Attendre que le DOM soit prêt et le conteneur visible
    if (conteneurCarte.offsetHeight === 0) {
        setTimeout(initialiserCarte, 100);
        return;
    }

    map = L.map("map", {
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

    // Gestion du redimensionnement avec debounce
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (map) {
                    map.invalidateSize({ animate: false });
                }
            }, 150);
        });
        resizeObserver.observe(conteneurCarte);
    }

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (map) {
                map.invalidateSize({ animate: false });
            }
        }, 150);
    });
}

/**
 * ----------------------------------------------------------
 * Icônes adaptées à la taille de l'écran
 * ----------------------------------------------------------
 */
function creerIcones(texteDistance) {
    const small = isSmallScreen();
    
    // Collecte (Point bleu)
    const iconeCollecte = L.divIcon({
        className: "",
        html: `
            <div style="
                width: ${small ? '14px' : '18px'};
                height: ${small ? '14px' : '18px'};
                border-radius: 50%;
                background: #003366;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,.3);
            "></div>
        `,
        iconSize: [small ? 14 : 18, small ? 14 : 18],
        iconAnchor: [small ? 7 : 9, small ? 7 : 9]
    });

    // Livraison (Point orange)
    const iconeLivraison = L.divIcon({
        className: "",
        html: `
            <div style="
                width: ${small ? '14px' : '18px'};
                height: ${small ? '14px' : '18px'};
                border-radius: 50%;
                background: #FF9100;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,.3);
            "></div>
        `,
        iconSize: [small ? 14 : 18, small ? 14 : 18],
        iconAnchor: [small ? 7 : 9, small ? 7 : 9]
    });

    // Livreur Animé
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
                    font-size: ${small ? '9px' : '11px'};
                    font-weight: bold;
                    font-family: sans-serif;
                    padding: ${small ? '1px 5px' : '2px 7px'};
                    border-radius: 10px;
                    border: 1px solid #00D26A;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    white-space: nowrap;
                    margin-bottom: 2px;
                ">
                    ${texteDistance}
                </div>
                <div style="
                    font-size: ${small ? '18px' : '26px'};
                    line-height: ${small ? '18px' : '26px'};
                    text-align: center;
                    transform: scaleX(-1);
                    filter: drop-shadow(-2px 3px 4px rgba(0,0,0,0.4));
                ">⚲</div>
            </div>
        `,
        iconSize: [small ? 40 : 60, small ? 35 : 50],
        iconAnchor: [small ? 20 : 30, small ? 28 : 42]
    });

    return { iconeCollecte, iconeLivraison, iconeLivreurAnime };
}

/**
 * ----------------------------------------------------------
 * Affichage et animation d'une course
 * ----------------------------------------------------------
 */
function afficherCarte(donneesCourse) {
    if (!map) {
        initialiserCarte();
        // Attendre que la carte soit initialisée
        setTimeout(() => afficherCarte(donneesCourse), 200);
        return;
    }

    // Nettoyage des anciens éléments
    if (markerCollecte) { map.removeLayer(markerCollecte); }
    if (markerLivraison) { map.removeLayer(markerLivraison); }
    if (itineraire) { map.removeLayer(itineraire); }
    if (markerLivreur) { map.removeLayer(markerLivreur); }

    // Calcul de la distance
    let texteDistance = "";
    if (map) {
        const distMetres = map.distance(donneesCourse.collecte, donneesCourse.livraison);
        const distKm = (distMetres / 1000).toFixed(1);
        texteDistance = `${distKm} km`;
    }

    // Créer les icônes adaptées
    const { iconeCollecte, iconeLivraison, iconeLivreurAnime } = creerIcones(texteDistance);

    // Création des marqueurs fixes
    markerCollecte = L.marker(donneesCourse.collecte, { icon: iconeCollecte }).addTo(map);
    markerLivraison = L.marker(donneesCourse.livraison, { icon: iconeLivraison }).addTo(map);

    // Polyline (trajet)
    itineraire = L.polyline(
        [donneesCourse.collecte, donneesCourse.livraison],
        {
            color: "#FF9100",
            weight: 3,
            opacity: 0.6,
            dashArray: "8, 8"
        }
    ).addTo(map);

    // Animation du livreur
    const dureeAnimation = 6000;
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

    // Recentrer après un délai pour s'assurer que tout est rendu
    setTimeout(() => recentrerCarte(donneesCourse), 50);
}

/**
 * ----------------------------------------------------------
 * Centre la carte pour inclure la course (A et B)
 * OPTIMISÉ POUR PETITS ÉCRANS
 * ----------------------------------------------------------
 */
function recentrerCarte(donneesCourse) {
    if (!itineraire || !map) { return; }

    const small = isSmallScreen();
    const conteneur = document.getElementById("map");
    const containerWidth = conteneur ? conteneur.offsetWidth : window.innerWidth;

    // Calcul du padding adapté à la taille de l'écran
    let paddingTop = small ? 30 : 20;
    let paddingBottom = small ? 30 : 20;
    let paddingLeft = small ? 15 : 20;
    let paddingRight = small ? 15 : 20;

    // Réduire le padding si l'écran est très étroit
    if (containerWidth < 400) {
        paddingTop = 25;
        paddingBottom = 25;
        paddingLeft = 10;
        paddingRight = 10;
    }

    map.invalidateSize({ animate: false });

    const bounds = L.latLngBounds([donneesCourse.collecte, donneesCourse.livraison]);

    map.fitBounds(
        bounds,
        {
            animate: true,
            duration: 0.8,
            paddingTopLeft: [paddingLeft, paddingTop],
            paddingBottomRight: [paddingRight, paddingBottom],
            maxZoom: small ? 17 : 16
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

/**
 * ----------------------------------------------------------
 * Initialisation au chargement du DOM
 * ----------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
    // Attendre un peu pour que Glide ait rendu le conteneur
    setTimeout(() => {
        const courseDepuisURL = obtenirParamsURL();
        
        if (courseDepuisURL) {
            afficherCarte(courseDepuisURL);
        } else {
            console.log("Hop Courses Map : En attente des coordonnées d'URL...");
            initialiserCarte();
        }
    }, 300);
});

// Forcer un redimensionnement si la page devient visible (Glide peut le masquer au départ)
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && map) {
        setTimeout(() => {
            map.invalidateSize({ animate: false });
        }, 100);
    }
});
