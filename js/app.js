// =====================================
// Application
// =====================================

let indexCourse = 0;

function initialiserApplication() {

    if (!courses || courses.length === 0) {

        console.log("Aucune course disponible.");

        return;

    }

    indexCourse = 0;

    afficherCourse(indexCourse);

    afficherItineraire(courses[indexCourse]);

}