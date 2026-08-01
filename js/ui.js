// =====================================
// Gestion de la Bottom Sheet
// =====================================

const sheet = document.querySelector(".bottom-sheet");

function afficherAucuneCourse() {

sheet.innerHTML = `

<h2>📦 Aucune course disponible</h2>

<p>Actualisez votre position ou augmentez votre rayon de recherche.</p>

<button class="btn">
Actualiser
</button>

`;

}

function afficherCourse(course){

sheet.innerHTML = `

<h2>${course.depart} ➜ ${course.arrivee}</h2>

<p>

💶 <strong>${course.gain}</strong><br><br>

🕒 ${course.heure}<br><br>

${course.type}

</p>

<button class="btn">

Voir la course

</button>

`;

}
