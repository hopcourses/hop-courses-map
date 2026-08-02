// ==========================================================
// Hop Courses Map
// ui.js
// Sprint 2.5.1
// Interface utilisateur V3.1
// Partie 1 / 2
// ==========================================================

const sheet = document.querySelector(".sheet-content");

/**
 * ----------------------------------------------------------
 * Affichage de la fiche
 * ----------------------------------------------------------
 */
function afficherFiche(course, index, total) {
    if (!sheet) {
        return;
    }

    sheet.innerHTML = `
        <div class="course-card" id="courseCard">

            <div class="course-counter">
                ${index + 1} / ${total}
            </div>

            <div class="course-header">
                <div class="course-date">
                    ${course.date}
                </div>
                <div class="course-price">
                    ${course.gain}
                </div>
            </div>

            <div class="course-row" style="display: flex !important; align-items: center; gap: 8px; width: 100%;">
                <span class="course-icon" style="flex-shrink: 0; width: 20px; text-align: center;">🕒</span>
                <span class="course-text" style="flex: 1; min-width: 0; display: block;">
                    ${course.heure}
                </span>
            </div>

            <div class="course-row" style="display: flex !important; align-items: center; gap: 8px; width: 100%; margin-bottom: 14px;">
                <span class="course-icon" style="flex-shrink: 0; width: 20px; text-align: center;">📦</span>
                <span class="course-text" style="flex: 1; min-width: 0; display: block;">
                    ${course.type}
                </span>
            </div>

            <div class="course-route-line" style="display: flex; align-items: center; gap: 8px; margin-top: 0; padding-top: 10px; border-top: 1px solid #F3F4F6; width: 100%;">
                <span class="dot collect" style="width: 10px; height: 10px; min-width: 10px; min-height: 10px; border-radius: 50%; background-color: #003366; display: inline-block; flex-shrink: 0;"></span>

                <span class="course-text" style="font-weight: 600; font-size: 14px; color: #111827; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${course.depart} <span style="color: #FF9100; font-weight: bold; margin: 0 4px;">➥</span> ${course.arrivee || course.livraison}
                </span>

                <span class="dot delivery" style="width: 10px; height: 10px; min-width: 10px; min-height: 10px; border-radius: 50%; background-color: #FF9100; display: inline-block; flex-shrink: 0;"></span>
            </div>

        </div>
    `;

    const card = document.getElementById("courseCard");
    if (card) {
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
function ouvrirFiche(course) {
    console.log(
        "Ouverture de la fiche :",
        course.id
    );

    // ------------------------------------------------------
    // Sprint 2.6
    //
    // Toute la carte est cliquable.
    // Cette fonction ouvrira directement
    // la fiche Glide correspondant à la course.
    //
    // Exemple futur :
    // window.location.href = "https://ton-app-glide...?orderId=" + course.id;
    // ------------------------------------------------------
}