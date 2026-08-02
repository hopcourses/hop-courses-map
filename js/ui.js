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

            <div class="course-row" style="display:flex; align-items:center; gap:8px; width:100%;">

    <span class="dot collect" style="flex-shrink:0;"></span>

    <div style="display:flex; align-items:center; justify-content:center; gap:5px; flex:1; min-width:0;">

        <span style="font-weight:600; color:#111827; white-space:nowrap;">
            ${course.depart}
        </span>

        <span style="
            color:#FF9100;
            font-size:15px;
            font-weight:700;
            line-height:1;
        ">
            ➥
        </span>

        <span style="font-weight:600; color:#111827; white-space:nowrap;">
            ${course.arrivee}
        </span>

    </div>

    <span class="dot delivery"
          style="
            width:10px;
            height:10px;
            border-radius:50%;
            background:#FF9100;
            flex-shrink:0;
          ">
    </span>

</div>

            <!-- Livraison -->

            <div class="course-row">

                <span class="dot delivery"></span>

                <span class="course-text">

                    ${course.arrivee}

                </span>

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