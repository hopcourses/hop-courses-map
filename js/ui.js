// =====================================
// Bottom Sheet
// =====================================

const sheet = document.querySelector(".bottom-sheet");


function afficherCourse(index){

    const course = courses[index];

    sheet.innerHTML = `

    <div class="course-card">

        <div class="course-counter">

            📦 ${courses.length === 1 ? "1 course disponible" : courses.length + " courses disponibles"}

        </div>

        <h2>${course.depart} ➜ ${course.arrivee}</h2>

        <p>

        💶 <strong>${course.gain}</strong><br><br>

        🕒 ${course.heure}<br><br>

        ${course.type}

        </p>

        <button class="btn">

        Voir les détails

        </button>

    </div>

    `;

}
