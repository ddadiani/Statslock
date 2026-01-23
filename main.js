const heroButton = document.getElementById("hero-lookup-button")
const playerButton = document.getElementById("player-lookup-button")


// listeners for clicking the buttons

// hero lookup listener
heroButton.addEventListener("click", () => {
    heroButton.classList.add("active")
    playerButton.classList.remove("active")

    loadTemplate("hero-lookup")
})

// player lookup listener
playerButton.addEventListener("click", () => {
    heroButton.classList.remove("active")
    playerButton.classList.add("active")

    loadTemplate("player-lookup")
})

// function for loading appropriate lookup html content
function loadTemplate(id) {
    const main = document.getElementById('main-content');
    const template = document.getElementById(id).cloneNode(true);
    main.innerHTML = '';
    main.appendChild(template.content);
}




// by default, make the hero lookup pressed and show
heroButton.click()