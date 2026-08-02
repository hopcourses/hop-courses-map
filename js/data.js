alert("data.js chargé");

let courses = [];

async function chargerCourses() {
    try {
        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error("Impossible de charger data.json");
        }

        courses = await response.json();

        alert("Nombre de courses : " + courses.length);

    } catch (error) {
        console.error(error);
    }
}

chargerCourses();
