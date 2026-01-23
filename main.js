const heroButton = document.getElementById("hero-lookup-button")
const playerButton = document.getElementById("player-lookup-button")

// listeners for clicking the buttons

// hero lookup listener
heroButton.addEventListener("click", () => {
    // animation
    heroButton.classList.add("active");
    playerButton.classList.remove("active");

    loadTemplate("hero-lookup");
    searchHero();
})

// player lookup listener
playerButton.addEventListener("click", () => {
    // animation
    heroButton.classList.remove("active");
    playerButton.classList.add("active");

    loadTemplate("player-lookup");
    searchHero();
});





// FUNCTIONS

// function for loading appropriate lookup html content
function loadTemplate(id) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(id).cloneNode(true);
    main.innerHTML = '';
    main.appendChild(template.content);
}

// function for using the searchbox on hero lookup and parsing the entered hero's data
async function searchHero() {
    const heroInputBox = document.getElementById("hero-input");
    const searchButton = document.getElementById("search-button");    



    if (heroInputBox && searchButton) {

        // make enter key press the search button
        heroInputBox.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                searchButton.click();
            }
        });
        // listen to the search button click
        searchButton.addEventListener("click", async () => {
            // animation
            searchButton.classList.add("active");
            setTimeout(() => {
                searchButton.classList.remove("active");
            }, 200)

            const query = heroInputBox.value;
            if (query) {
                const data = await fetchHero(query);
                if (data) {
                    renderHero(data);
                }
            }
            else {
                console.error("Search is empty");
                alert("Search can't be empty");
            }
        })
    }
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
        // console.log(result); //debug
        return await result;
    }
    catch (error) {
        console.error(error.message);
        alert(`${error.message}: Hero not found`);
    }
}

// render hero card
function renderHero(data) {
    const div = document.getElementById("card");
    if (div && data) {
        // make it display flex to make it visible because its hidden before in css
        div.style.display = "flex";

        const heroImage = document.getElementById("hero-image");
        const heroName = document.getElementById("hero-name")
        const loreText = document.getElementById("lore-text");
        const roleText = document.getElementById("role-text");
        const playstyleText = document.getElementById("playstyle-text");

        const headers = document.getElementsByClassName("dynamic-hero-color");

        heroImage.src = data.images.icon_hero_card_webp;
        heroName.textContent = data.name;
        loreText.textContent = data.description.lore;
        roleText.textContent = data.description.role;
        playstyleText.textContent = data.description.playstyle;
        

        heroColors = data.colors.ui;
        console.log(data.colors.ui);
        for (const header of headers) {
            header.style.color = `rgb(${data.colors.ui})`;
        }
    }
}

// ----TODO-----  do same as herosearch for namesearch 3 functions



// by default, make the hero lookup pressed and show
heroButton.click();
document.body.style.zoom = "90%";
