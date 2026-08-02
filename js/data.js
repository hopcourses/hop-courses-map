// ==========================================================
// Hop Courses Map
// data.js
// Chargement et tri des données
// Sprint 2.2
// ==========================================================

let courses = [];

/**
 * ----------------------------------------------------------
 * Convertit une date française en objet Date
 * ----------------------------------------------------------
 */

function convertirDate(dateTexte){

    if(!dateTexte){

        return new Date(2999,11,31);

    }

    // Aujourd'hui

    if(dateTexte.toLowerCase() === "aujourd'hui"){

        const d = new Date();

        d.setHours(0,0,0,0);

        return d;

    }

    // Demain

    if(dateTexte.toLowerCase() === "demain"){

        const d = new Date();

        d.setDate(d.getDate()+1);

        d.setHours(0,0,0,0);

        return d;

    }

    // Cas :
    // Mardi 5 août
    // Vendredi 14 novembre

    const mois = {

        janvier:0,
        février:1,
        fevrier:1,
        mars:2,
        avril:3,
        mai:4,
        juin:5,
        juillet:6,
        août:7,
        aout:7,
        septembre:8,
        octobre:9,
        novembre:10,
        décembre:11,
        decembre:11

    };

    const morceaux = dateTexte.split(" ");

    if(morceaux.length >= 3){

        const jour = parseInt(morceaux[1]);

        const moisTexte = morceaux[2].toLowerCase();

        const annee = new Date().getFullYear();

        return new Date(

            annee,

            mois[moisTexte],

            jour

        );

    }

    return new Date(2999,11,31);

}/**
 * ----------------------------------------------------------
 * Chargement du fichier JSON
 * ----------------------------------------------------------
 */

async function chargerCourses(){

    try{

        const response = await fetch("data.json");

        if(!response.ok){

            throw new Error("Impossible de charger data.json");

        }

        courses = await response.json();

        console.log("✅ Courses chargées :", courses);

        initialiserApplication();

    }

    catch(error){

        console.error(error);

        const sheet = document.querySelector(".sheet-content");

        if(sheet){

            sheet.innerHTML = `

                <div class="loading">

                    Impossible de charger les courses.

                </div>

            `;

        }

    }

}
