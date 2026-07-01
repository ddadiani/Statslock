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
    searchPlayer();
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
    const url = `https://api.deadlock-api.com/v1/assets/heroes/by-name/${hero}`;
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

async function fetchHeroes() {
    const url = "https://api.deadlock-api.com/v1/assets/heroes";
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
    }
}

// render hero card
function renderHero(data) {
    const div = document.getElementById("card");
    if (div && data) {
        // make it display flex to make it visible because its hidden before in css
        div.style.display = "flex";

        const heroImage = document.getElementById("hero-image");
        const heroName = document.getElementById("hero-name");
        const loreText = document.getElementById("lore-text");
        const roleText = document.getElementById("role-text");
        const playstyleText = document.getElementById("playstyle-text");

        const headers = document.getElementsByClassName("dynamic-hero-color");

        heroImage.src = data.images.icon_hero_card_webp;
        heroName.textContent = data.name;
        loreText.textContent = data.description.lore;
        roleText.textContent = data.description.role;
        playstyleText.textContent = data.description.playstyle;
        

        // console.log(data.colors.ui); //debug
        for (const header of headers) {
            header.style.color = `rgb(${data.colors.ui})`;
        }
    }
}



async function searchPlayer() {
    const playerInputBox = document.getElementById("player-input");
    const searchButton = document.getElementById("search-button");



    if (playerInputBox && searchButton) {

        // make enter key press the search button
        playerInputBox.addEventListener("keydown", (event) => {
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

            const query = playerInputBox.value;
            if (query) {
                const data = await fetchHistory(query);
                if (data) {
                    renderHistory(data);
                }
            }
            else {
                console.error("Search is empty");
                alert("Search can't be empty");
            }
        })
    }
}


async function fetchHistory(account_id) {
    const url = `https://api.deadlock-api.com/v1/players/${account_id}/match-history`
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
        alert(error.message);
    }
}

async function renderHistory(data) {
    const div = document.getElementById("history");
    div.innerHTML = ""; // clear previous history if there is any
    if (div && data) {
        // make it display flex to make it visible because its hidden before in css
        div.style.display = "flex";

        // get all heros data to get the images and other data for each match
        const heroData = await fetchHeroes();
   
        let n = 1;

        // console.log(data, heroData); //debug

        // for each match, copy the match template thats in html and put data in it
        data.forEach((match) => {
            const matchDiv = document.getElementById("match-template").cloneNode(true);
            
            // unique id for each match div
            matchDiv.id = `match-${n}`;

            // extract content
            const matchDivContent = matchDiv.content;

            const heroId = match.hero_id;
            const hero = heroData.find(o => o.id === heroId);

            // left side
            const gamemode = (match.game_mode === 1) ? "Normal" : "Brawl";
            const matchDate = new Date(match.start_time * 1000);
            const daysSinceMatch = Math.floor((Date.now() - matchDate) / (1000 * 60 * 60 * 24));
            const matchId = match.match_id;
            if (match.match_result === match.player_team) {
                var matchResult = "Victory";
            } else {
                var matchResult = "Defeat";
            }
            const matchLength = `${Math.floor(match.match_duration_s / 60)}m ${match.match_duration_s % 60}s`;

            // middle
            const heroImg = hero.images.icon_image_small_webp;
            const heroLevel = match.hero_level;

            const kills = match.player_kills;
            const deaths = match.player_deaths;
            const assists = match.player_assists;

            const kda = `${kills} / ${deaths} / ${assists}`;
            const kdaAvg = (kills+assists) / deaths;

            // right
            const souls = `Souls: ${match.net_worth}`;
            const farm = `Last hits: ${match.last_hits} (${(match.last_hits / (match.match_duration_s / 60)).toFixed(1)})`;
            const denies = `Denies: ${match.denies}`;

            // injecting them all
            matchDivContent.querySelector(".match-type").textContent = gamemode;
            switch (daysSinceMatch) {
                case 0:
                    matchDivContent.querySelector(".days-after-played").textContent = `Today`;
                    break;
                case 1:
                    matchDivContent.querySelector(".days-after-played").textContent = `Yesterday`;
                    break;
                default:
                    matchDivContent.querySelector(".days-after-played").textContent = `${daysSinceMatch} days ago`;

            }
            matchDivContent.querySelector(".match-id").textContent = `Match ID: ${matchId}`;
            matchDivContent.querySelector(".match-result").textContent = matchResult;
            matchDivContent.querySelector(".match-length").textContent = matchLength;

            matchDivContent.querySelector(".hero-image-player").src = heroImg;
            matchDivContent.querySelector(".hero-level").textContent = `Level: ${heroLevel}`;
            matchDivContent.querySelector(".kda").textContent = `KDA: ${kda} (${kdaAvg.toFixed(2)})`;
            // matchDiv.querySelector(".kda-average").textContent = `(${kdaAvg.toFixed(2)})`;

            matchDivContent.querySelector(".souls").textContent = souls;
            matchDivContent.querySelector(".last-hits").textContent = farm;
            matchDivContent.querySelector(".denies").textContent = denies;

            if (matchResult === "Victory") {
                matchDivContent.querySelector(".match-result").style.color = "rgb(140, 255, 140)";
            }
            else {
                matchDivContent.querySelector(".match-result").style.color = "rgb(255, 120, 120)";
            }

            div.appendChild(matchDivContent);  
            n += 1;
        });
    }
}


// by default, make the player lookup pressed and show
playerButton.click();
document.body.style.zoom = "90%";
