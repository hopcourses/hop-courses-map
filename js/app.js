// =====================================
// Initialisation
// =====================================

let indexCourse = 0;

function initialiserApplication() {

    if (courses.length === 0) return;

    indexCourse = 0;

    afficherCourse(indexCourse);

    afficherItineraire(courses[indexCourse]);

}