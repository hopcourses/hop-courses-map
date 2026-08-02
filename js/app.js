// ==========================================================
// Hop Courses Map
// app.js
// Sprint 2.1
// Gestion de l'application
// ==========================================================

let indexCourse = 0;

/**
 * ----------------------------------------------------------
 * Affiche la course courante
 * ----------------------------------------------------------
 */

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

/**
 * ----------------------------------------------------------
 * Course suivante
 * ----------------------------------------------------------
 */

function courseSuivante(){

    if(indexCourse >= courses.length - 1){

        return;

    }

    indexCourse++;

    afficherCourseCourante();

}

/**
 * ----------------------------------------------------------
 * Course précédente
 * ----------------------------------------------------------
 */

function coursePrecedente(){

    if(indexCourse <= 0){

        return;

    }

    indexCourse--;

    afficherCourseCourante();

}

/**
 * ----------------------------------------------------------
 * Variables Swipe
 * ----------------------------------------------------------
 */

let startX = 0;

let currentX = 0;

let isSwiping = false;
/**
 * ----------------------------------------------------------
 * Initialisation du Swipe
 * ----------------------------------------------------------
 */

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

        // Swipe vers la gauche
        if(distance < -60){

            courseSuivante();

            return;

        }

        // Swipe vers la droite
        if(distance > 60){

            coursePrecedente();

            return;

        }

    });

}

/**
 * ----------------------------------------------------------
 * Initialisation
 * ----------------------------------------------------------
 */

function initialiserApplication(){

    console.log("Application prête.");

    afficherCourseCourante();

    initialiserSwipe();

}

/**
 * ----------------------------------------------------------
 * Chargement des données
 * ----------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded",()=>{

    chargerCourses();

});
