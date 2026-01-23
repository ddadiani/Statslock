const heroButton = document.getElementById("hero-lookup-button")
const playerButton = document.getElementById("player-lookup-button")


// listeners for clicking the buttons

// hero lookup listener
heroButton.addEventListener("click", () => {
    heroButton.classList.add("active");
    playerButton.classList.remove("active");

    loadTemplate("hero-lookup");
    heroSearch();
})

// player lookup listener
playerButton.addEventListener("click", () => {
    heroButton.classList.remove("active");
    playerButton.classList.add("active");

    loadTemplate("player-lookup");
})





// FUNCTIONS

// function for loading appropriate lookup html content
function loadTemplate(id) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(id).cloneNode(true);
    main.innerHTML = '';
    main.appendChild(template.content);
}

// function for using the searchbox on hero lookup and parsing the entered hero's data
function heroSearch() {
    const heroInputBox = document.getElementById("hero-input");
    const searchButton = document.getElementById("search-button");

    if (heroInputBox && searchButton) {
        searchButton.addEventListener("click", () => {
            const query = heroInputBox.value;
            if (query) {
                fetchHero(query);
            }
            else {
                console.error("Search is empty");
            }
        })
    }
}

function playerSearch() {
    // add the same as herosearch ^^
}

// fetch hero from API
async function fetchHero(hero) {
    const url = `https://assets.deadlock-api.com/v2/heroes/by-name/${hero}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    }
    catch (error) {
        console.error(error.message);
    }
}





// by default, make the hero lookup pressed and show
heroButton.click();