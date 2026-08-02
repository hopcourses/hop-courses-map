// ==========================================================
// Hop Courses Map
// ui.js
// Gestion de l'interface
// ==========================================================

const sheet = document.querySelector(".sheet-content");

/**
 * Affichage de la fiche course
 */

function afficherFiche(course, index, total) {

    sheet.innerHTML = `

    <div class="course-card">

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

            <span>🕒 ${course.heure}</span>

            <div class="separator"></div>

            <span>📦 ${course.type}</span>

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

        <button
            class="btn"
            id="btnFiche">

            Voir la fiche

        </button>

    </div>

    `;

    //-------------------------------------------------
    // Ouverture de la fiche Glide
    //-------------------------------------------------

    document
        .getElementById("btnFiche")
        .addEventListener("click", () => {

            ouvrirFiche(course);

        });

}

/**
 * Ouverture Glide
 * (provisoire)
 */

function ouvrirFiche(course){

    console.log("Order ID :", course.id);

    // Sprint 2 :
    // ouverture automatique de la fiche Glide
    // avec course.id

}