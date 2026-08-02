// =====================================
// Bottom Sheet Hop Courses
// =====================================

const sheet = document.querySelector(".bottom-sheet");

function afficherCourse(index){

    if(!courses || courses.length===0) return;

    const course = courses[index];

    if(!course) return;

    sheet.innerHTML = `

    <div class="course-card">

        <div class="course-counter">

            ${index + 1} / ${courses.length}

        </div>

        <h2>

            ${course.depart} ➜ ${course.arrivee}

        </h2>

        <div class="price">

            ${course.gain}

        </div>

        <div class="time">

            🕒 ${course.heure}

        </div>

        <div class="type">

            📦 ${course.type}

        </div>

        <div class="separator"></div>

        <div class="bloc">

            <div class="bloc-title">

                🔵 Collecte

            </div>

            <div class="bloc-content">

                ${course.depart}

            </div>

        </div>

        <div class="separator"></div>

        <div class="bloc">

            <div class="bloc-title">

                🔴 Livraison

            </div>

            <div class="bloc-content">

                ${course.arrivee}

            </div>

        </div>

        <div class="navigation">

            <button class="nav-btn" id="btnPrev">

                ◀

            </button>

            <button class="btn" id="btnDetails">

                Voir les détails

            </button>

            <button class="nav-btn" id="btnNext">

                ▶

            </button>

        </div>

    </div>

    `;

    // -------------------------
    // Navigation
    // -------------------------

    document.getElementById("btnPrev").onclick = () => {

        if(indexCourse > 0){

            indexCourse--;

            afficherCourse(indexCourse);

            afficherItineraire(courses[indexCourse]);

        }

    };

    document.getElementById("btnNext").onclick = () => {

        if(indexCourse < courses.length - 1){

            indexCourse++;

            afficherCourse(indexCourse);

            afficherItineraire(courses[indexCourse]);

        }

    };

    // -------------------------
    // Détails (à connecter à Glide)
    // -------------------------

    document.getElementById("btnDetails").onclick = () => {

        console.log("Order ID :", course.id);

        // Ici on ouvrira la fiche Glide
        // avec l'Order_ID

    };

}