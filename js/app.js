// ==========================================================
// Hop Courses Map
// app.js
// Sprint 2.6.2
// Gestion de l'application
// Partie 1 / 2
// ==========================================================

let indexCourse = 0;

let animationEnCours = false;
// ==========================================================
// Paramètres de l'URL
// ==========================================================

window.emailCotransporteur =
    new URLSearchParams(window.location.search).get("email");

console.log("Email reçu :", window.emailCotransporteur);

console.log("Email reçu :", emailCotransporteur);

/* ==========================================================
   Affichage de la course courante
========================================================== */

function afficherCourseCourante(){

    if(!courses || courses.length===0){

        return;

    }

    const course = courses[indexCourse];

    afficherCarte(course);

    afficherFiche(

        course,

        indexCourse,

        courses.length

    );

}

/* ==========================================================
   Animation de changement de fiche
========================================================== */

function changerCourseAnimee(direction){

    if(animationEnCours){

        return;

    }

    const ancienneCarte = document.getElementById("courseCard");

    if(!ancienneCarte){

        return;

    }

    animationEnCours = true;

    //--------------------------------------------------------
    // Animation de sortie
    //--------------------------------------------------------

    if(direction==="left"){

        ancienneCarte.classList.add("sheet-exit-left");

    }

    else{

        ancienneCarte.classList.add("sheet-exit-right");

    }

    //--------------------------------------------------------
    // Changement de mission
    //--------------------------------------------------------

    setTimeout(()=>{

        if(direction==="left"){

            indexCourse++;

        }

        else{

            indexCourse--;

        }

        afficherCourseCourante();

        //----------------------------------------------------
        // Animation d'entrée
        //----------------------------------------------------

        const nouvelleCarte = document.getElementById("courseCard");

        if(nouvelleCarte){

            nouvelleCarte.classList.add("sheet-enter");

            setTimeout(()=>{

                nouvelleCarte.classList.remove("sheet-enter");

                animationEnCours=false;

            },260);

        }

    },220);

}

/* ==========================================================
   Course suivante
========================================================== */

function courseSuivante(){

    if(animationEnCours){

        return;

    }

    if(indexCourse >= courses.length-1){

        return;

    }

    changerCourseAnimee("left");

}

/* ==========================================================
   Course précédente
========================================================== */

function coursePrecedente(){

    if(animationEnCours){

        return;

    }

    if(indexCourse<=0){

        return;

    }

    changerCourseAnimee("right");

}
/* ==========================================================
   Variables Swipe
========================================================== */

let startX = 0;

let currentX = 0;

let isSwiping = false;

/* ==========================================================
   Initialisation du Swipe
========================================================== */

function initialiserSwipe(){

    const sheet = document.querySelector(".bottom-sheet");

    if(!sheet){

        return;

    }

    sheet.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

        currentX = startX;

        isSwiping = true;

    });

    sheet.addEventListener("touchmove",(e)=>{

        if(!isSwiping){

            return;

        }

        currentX = e.touches[0].clientX;

    });

    sheet.addEventListener("touchend",()=>{

        if(!isSwiping){

            return;

        }

        const distance = currentX - startX;

        isSwiping = false;

        if(distance < -60){

            courseSuivante();

            return;

        }

        if(distance > 60){

            coursePrecedente();

            return;

        }

    });

}

/* ==========================================================
   Initialisation
========================================================== */

function initialiserApplication(){

    console.log("Application prête.");

    afficherCourseCourante();

    initialiserSwipe();

}

/* ==========================================================
   Chargement des données
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    chargerCourses();

});