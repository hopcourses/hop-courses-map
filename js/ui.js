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

function afficherFiche(course,index,total){

    if(!sheet){

        return;

    }

    sheet.innerHTML = `

        <div class="course-card" id="courseCard">

            <!-- Compteur -->

            <div class="course-counter">

                ${index + 1} / ${total}

            </div>

            <!-- En-tête -->

            <div class="course-header">

                <div class="course-date">

                    ${course.date}

                </div>

                <div class="course-price">

                    ${course.gain}

                </div>

            </div>

            <!-- Heure -->

            <div class="course-row">

                <span class="course-icon">

                    🕒

                </span>

                <span class="course-text">

                    ${course.heure}

                </span>

            </div>

            <!-- Type -->

            <div class="course-row">

                <span class="course-icon">

                    📦

                </span>

                <span class="course-text">

                    ${course.type}

                </span>

            <div class="course-route-line" style="display: flex; align-items: center; gap: 8px; margin-top: 6px; width: 100%;">

    <span class="dot collect" style="width: 10px; height: 10px; min-width: 10px; min-height: 10px; border-radius: 50%; background-color: #003366; display: inline-block; flex-shrink: 0;"></span>

    <span class="course-text" style="font-weight: 600; font-size: 14px; color: #111827; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${course.depart} <span style="color: #FF9100; font-weight: bold; margin: 0 4px;">➥</span> ${course.arrivee || course.livraison}
    </span>

    <span class="dot delivery" style="width: 10px; height: 10px; min-width: 10px; min-height: 10px; border-radius: 50%; background-color: #FF9100; display: inline-block; flex-shrink: 0;"></span>

</div>

        </div>

    `;

    const card = document.getElementById("courseCard");

    if(card){

        card.addEventListener("click",()=>{

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
    //
    // window.location.href =
    // "https://ton-app-glide...?orderId=" + course.id;
    //
    // ------------------------------------------------------

}