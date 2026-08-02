// =====================================
// Application Hop Courses
// =====================================

let indexCourse = 0;

function afficherCourseCourante(){

    afficherCourse(indexCourse);

    afficherItineraire(courses[indexCourse]);

}

function initialiserApplication(){

    if(!courses || courses.length===0){

        console.log("Aucune course disponible.");

        return;

    }

    indexCourse = 0;

    afficherCourseCourante();

}