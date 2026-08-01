const map = L.map('map',{
    zoomControl:false
});

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}).addTo(map);

let markerCollecte;
let markerLivraison;
let ligne;

function afficherItineraire(course){

    if(markerCollecte) map.removeLayer(markerCollecte);
    if(markerLivraison) map.removeLayer(markerLivraison);
    if(ligne) map.removeLayer(ligne);

    markerCollecte = L.marker(course.collecte).addTo(map);

    markerLivraison = L.marker(course.livraison).addTo(map);

    ligne = L.polyline(

        [

            course.collecte,

            course.livraison

        ],

        {

            color:"#F28C18",

            weight:5

        }

    ).addTo(map);

    map.fitBounds(ligne.getBounds(),{

        padding:[60,60]

    });

}

afficherItineraire(courses[0]);
