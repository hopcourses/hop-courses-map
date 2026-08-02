// ==========================================================
// Hop Courses Map
// map.js
// Gestion de la carte Leaflet
// ==========================================================

let map;

let markerCollecte = null;
let markerLivraison = null;
let itineraire = null;

/**
 * Initialisation de la carte
 */

function initialiserCarte(){

    map = L.map("map",{

        zoomControl:true,

        attributionControl:false

    });

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:19

        }

    ).addTo(map);

}

/**
 * Affichage d'une course
 */

function afficherCarte(course){

    if(!map){

        initialiserCarte();

    }

    // -----------------------------
    // Suppression anciens éléments
    // -----------------------------

    if(markerCollecte){

        map.removeLayer(markerCollecte);

    }

    if(markerLivraison){

        map.removeLayer(markerLivraison);

    }

    if(itineraire){

        map.removeLayer(itineraire);

    }

    // -----------------------------
    // Icône collecte
    // -----------------------------

    const iconeCollecte = L.divIcon({

        className:"",

        html:`

        <div style="

            width:18px;

            height:18px;

            border-radius:50%;

            background:#003366;

            border:3px solid white;

            box-shadow:0 0 10px rgba(0,0,0,.25);

        "></div>

        `,

        iconSize:[18,18],

        iconAnchor:[9,9]

    });

    // -----------------------------
    // Icône livraison
    // -----------------------------

    const iconeLivraison = L.divIcon({

        className:"",

        html:`

        <div style="

            width:18px;

            height:18px;

            border-radius:50%;

            background:#FF9100;

            border:3px solid white;

            box-shadow:0 0 10px rgba(0,0,0,.25);

        "></div>

        `,

        iconSize:[18,18],

        iconAnchor:[9,9]

    });

    markerCollecte = L.marker(

        course.collecte,

        {

            icon:iconeCollecte

        }

    ).addTo(map);

    markerLivraison = L.marker(

        course.livraison,

        {

            icon:iconeLivraison

        }

    ).addTo(map);

    // -----------------------------
    // Ligne
    // -----------------------------

    itineraire = L.polyline(

        [

            course.collecte,

            course.livraison

        ],

        {

            color:"#FF9100",

            weight:5,

            opacity:.9

        }

    ).addTo(map);

    // -----------------------------
    // Zoom automatique
    // -----------------------------

    map.fitBounds(

        itineraire.getBounds(),

        {

            padding:[70,70]

        }

    );

}