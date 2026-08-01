// =====================================
// Carte
// =====================================

const map = L.map('map',{

zoomControl:false

});

L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{

attribution:'© OpenStreetMap'

}

).addTo(map);

map.setView(courses[0].collecte,11);


// Création des marqueurs

courses.forEach(course=>{

const marker=L.marker(course.collecte).addTo(map);

marker.on("click",()=>{

afficherCourse(course);

map.panTo(course.collecte);

});

});
