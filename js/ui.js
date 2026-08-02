// =====================================
// Bottom Sheet
// =====================================

const sheet = document.querySelector(".bottom-sheet");

function afficherCourse(index) {

    if (!courses || courses.length === 0) return;

    const course = courses[index];

    if (!course) return;

    sheet.innerHTML = `

    <div class="course-card">

        <div class="course-counter">

            📦 ${courses.length} course${courses.length > 1 ? "s" : ""} disponible${courses.length > 1 ? "s" : ""}

        </div>

        <h2>${course.depart} ➜ ${course.arrivee}</h2>

        <p>

            💶 <strong>${course.gain}</strong><br><br>

            🕒 ${course.heure}<br><br>

            📦 ${course.type}

        </p>

        <button class="btn" id="btnDetails">

            Voir les détails

        </button>

    </div>

    `;

}