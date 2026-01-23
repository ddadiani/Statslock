const heroButton = document.getElementById("hero-lookup-button")
const playerButton = document.getElementById("player-lookup-button")


// listeners for clicking the buttons
heroButton.addEventListener("click", () => {
    heroButton.classList.add("active")
    playerButton.classList.remove("active")
    
    const section = document.getElementById('main-content');
})

playerButton.addEventListener("click", () => {
    heroButton.classList.remove("active")
    playerButton.classList.add("active")
})

// by default, make the hero lookup pressed and show
heroButton.click()
