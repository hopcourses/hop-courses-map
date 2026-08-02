// ==========================================================
// Hop Courses Map
// app.js
// Application principale
// ==========================================================

let indexCourse = 0;

/**
 * Affiche la course courante
 */

function afficherCourseCourante(){

    if(courses.length===0){

        return;

    }

    const course = courses[indexCourse];

    afficherCarte(course);

    afficherFiche(course,indexCourse,courses.length);

}

/**
 * Course suivante
 */

function courseSuivante(){

    if(indexCourse>=courses.length-1){

        return;

    }

    indexCourse++;

    afficherCourseCourante();

}

/**
 * Course précédente
 */

function coursePrecedente(){

    if(indexCourse<=0){

        return;

    }

    indexCourse--;

    afficherCourseCourante();

}

/**
 * Démarrage
 */

function initialiserApplication(){

    console.log("Application prête.");

    afficherCourseCourante();

}

/**
 * Chargement
 */

document.addEventListener("DOMContentLoaded",()=>{

    chargerCourses();

});