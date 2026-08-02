// ==========================================================
// Hop Courses Map
// ui.js
// Gestion de l'interface
// Sprint 1.2
// ==========================================================

const sheet = document.querySelector(".sheet-content");

/**
 * ----------------------------------------------------------
 * Affichage de la fiche de la course
 * ----------------------------------------------------------
 */

function afficherFiche(course, index, total){

    if(!sheet) return;

    sheet.innerHTML = `

        <div class="course-card" id="courseCard">

            <div class="course-counter">

                ${index + 1} / ${total}

            </div>

            <div class="course-title">

                ${course.depart} ➜ ${course.arrivee}

            </div>

            <div class="course-price">

                ${course.gain}

            </div>

            <div class="course-info">

                <span>

                    🕒 ${course.heure}

                </span>

                <div class="separator"></div>

                <span>

                    📦 ${course.type}

                </span>

            </div>

            <div class="divider"></div>

            <div class="locations">

                <div class="location">

                    <div class="location-title">

                        <span class="dot collect"></span>

                        Collecte

                    </div>

                    <div class="location-city">

                        ${course.depart}

                    </div>

                </div>

                <div class="location">

                    <div class="location-title">

                        <span class="dot delivery"></span>

                        Livraison

                    </div>

                    <div class="location-city">

                        ${course.arrivee}

                    </div>

                </div>

            </div>

        </div>

    `;    //--------------------------------------------------------
    // Toute la fiche est cliquable
    //--------------------------------------------------------

    const card = document.getElementById("courseCard");

    if(card){

        card.addEventListener("click", () => {

            ouvrirFiche(course);

        });

    }

}

/**
 * ----------------------------------------------------------
 * Ouverture de la fiche Glide
 * ----------------------------------------------------------
 */

function ouvrirFiche(course){

    console.log("Ouverture de la fiche :", course.id);

    /*
        Sprint 1.6

        Ici nous ouvrirons directement
        la fiche Glide correspondant
        à course.id.

        Exemple futur :

        window.location.href =
        "https://....../order/" + course.id;

    */

}