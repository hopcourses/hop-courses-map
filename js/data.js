// ==========================================================
// Hop Courses Map
// data.js
// Chargement des données
// ==========================================================

let courses = [];

/**
 * Charge le fichier JSON
 */
async function chargerCourses() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Impossible de charger data.json");
        }

        courses = await response.json();

        console.log("✅ Courses chargées :", courses);

        initialiserApplication();

    } catch (error) {

        console.error(error);

        document.querySelector(".sheet-content").innerHTML = `

            <div class="loading">

                Impossible de charger les courses.

            </div>

        `;

    }

}