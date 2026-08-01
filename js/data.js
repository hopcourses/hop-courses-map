alert("data.js chargé");

let courses = [];

async function chargerCourses() {
    try {
        const response = await fetch("../data.json");

        if (!response.ok) {
            throw new Error("Impossible de charger data.json");
        }

        courses = await response.json();

        console.log("Courses chargées :", courses);

    } catch (error) {
        console.error(error);
    }
}

chargerCourses();
