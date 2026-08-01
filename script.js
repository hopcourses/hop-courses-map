// =========================
// Création de la carte
// =========================

const map = L.map('map', {
    zoomControl: true
}).setView([50.77, 2.72], 11);


// =========================
// Fond OpenStreetMap
// =========================

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}).addTo(map);


// =========================
// Données de démonstration
// =========================

const courses = [

{

id:1,

depart:"Boeschepe",

arrivee:"Bailleul",

gain:"8,50 €",

heure:"19h30 - 20h00",

type:"Drive alimentaire - Taille S",

collecte:[50.8018,2.6905],

livraison:[50.7358,2.7358]

},

{

id:2,

depart:"Hazebrouck",

arrivee:"Steenvoorde",

gain:"6,00 €",

heure:"09h00 - 10h00",

type:"Drive alimentaire - Taille S",

collecte:[50.7236,2.5370],

livraison:[50.8100,2.5830]

},

{

id:3,

depart:"Dunkerque",

arrivee:"Bergues",

gain:"9,20 €",

heure:"18h00 - 18h30",

type:"Drive alimentaire - Taille M",

collecte:[51.0344,2.3768],

livraison:[50.9680,2.4320]

}

];


// =========================
// Création des marqueurs
// =========================

courses.forEach(course=>{

L.marker(course.collecte)

.addTo(map)

.bindPopup(course.depart+" ➜ "+course.arrivee);

});
