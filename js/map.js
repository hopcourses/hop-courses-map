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
    // parfois le conteneur #map après le premier rendu, ou la
    // taille n'est pas encore stable à l'initialisation.
    // Sans invalidateSize(), fitBounds() calcule son cadrage
    // sur une taille de conteneur erronée : l'itinéraire part
    // alors vers le haut ou le bas et sort du cadre visible.
    // On garde Leaflet synchronisé en continu.
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
 * Affichage d'une course
 * ----------------------------------------------------------
 */
function afficherCarte(course){
    if(!map){
        initialiserCarte();
    }

    //--------------------------------------------------------
    // Nettoyage
    //--------------------------------------------------------
    if(markerCollecte){ map.removeLayer(markerCollecte); }
    if(markerLivraison){ map.removeLayer(markerLivraison); }
    if(itineraire){ map.removeLayer(itineraire); }

    //--------------------------------------------------------
    // Icône collecte (conservée selon tes paramètres)
    //--------------------------------------------------------
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

    //--------------------------------------------------------
    // Icône livraison (conservée selon tes paramètres)
    //--------------------------------------------------------
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

    //--------------------------------------------------------
    // Création des marqueurs
    //--------------------------------------------------------
    markerCollecte = L.marker(course.collecte, { icon: iconeCollecte }).addTo(map);
    markerLivraison = L.marker(course.livraison, { icon: iconeLivraison }).addTo(map);

    //--------------------------------------------------------
    // Itinéraire
    //--------------------------------------------------------
    itineraire = L.polyline(
        [course.collecte, course.livraison],
        {
            color: "#FF9100",
            weight: 5,
            opacity: .90,
            lineJoin: "round",
            lineCap: "round"
        }
    ).addTo(map);

    //--------------------------------------------------------
    // Cadrage adapté au panneau Shopopop
    //--------------------------------------------------------
    recentrerCarte(course);
}

/**
 * ----------------------------------------------------------
 * Centre la carte sur la course courante (Adapté panneau bas)
 * ----------------------------------------------------------
 */
function recentrerCarte(course){
    if(!itineraire){ return; }

    // Fix : on force le recalcul de la taille réelle du conteneur
    // AVANT de cadrer, sinon les paddings ci-dessous sont appliqués
    // sur une taille obsolète et l'itinéraire sort du cadre.
    map.invalidateSize({ animate: false });

    const bounds = itineraire.getBounds();

    map.fitBounds(
        bounds,
        {
            animate: true,
            duration: 0.8,
            // [Haut, Gauche] : Marge en haut et à gauche
            paddingTopLeft: [50, 50],
            // [Bas, Droite] : Réserve 240px en bas pour libérer la zone de la carte Shopopop
            paddingBottomRight: [50, 240],
            // maxZoom ajusté pour garder la vue bien cadrée
            maxZoom: 13.5
        }
    );
}