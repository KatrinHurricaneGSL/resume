lucide.createIcons();

const filterSelect = document.querySelector("#filter-select")
const searchInput = document.querySelector("#search-input")
const themeBtn = document.querySelector(".theme")

filterSelect.addEventListener("change", sortCardList)

searchInput.addEventListener("keyup", sortCardList)

themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    setTheme(newTheme)
})

function setTheme(currentTheme) {
    const lightIcon = document.querySelector(".theme-light-icon")
    const darkIcon = document.querySelector(".theme-dark-icon")

    document.documentElement.setAttribute("data-theme", currentTheme)

    if (currentTheme === "dark") {
        lightIcon.classList.remove("hidden")
        darkIcon.classList.add("hidden")

        updateTitle(currentTheme)
    } else {
        lightIcon.classList.add("hidden")
        darkIcon.classList.remove("hidden")

        updateTitle(currentTheme)
    }

    localStorage.setItem("theme", currentTheme)
}

function updateTitle(theme) {
    const title = theme === "dark" ? "Перейти на светлую тему" : "Перейти на тёмную тему"
    themeBtn.setAttribute("title", title)
}

document.addEventListener("DOMContentLoaded", () => {
    const theme = document.documentElement.getAttribute("data-theme")
    updateTitle(theme)
})

function sortCardList() {
    const selectedCategory = filterSelect.value
    const skills = document.querySelectorAll(".card-skill")
    const searchText = searchInput.value.trim().toLowerCase()

    let totalVisible = 0

    skills.forEach((skill) => {
        let categoryResult = true
        let searchResult = true

        const category = skill.getAttribute("data-category")

        if (selectedCategory === "all" || category === selectedCategory) {
            categoryResult = true
        } else {
            categoryResult = false
        }

        const title = skill.querySelector("p").textContent.trim().toLowerCase()

        if (searchText === "" || title.includes(searchText)) {
            searchResult = true
        } else {
            searchResult = false
        }

        if (categoryResult && searchResult) {
            skill.classList.remove("hidden")
            totalVisible++
        } else {
            skill.classList.add("hidden")
        }
    })

    if(totalVisible === 0) {
        document.querySelector(".skills-empty").classList.remove("hidden")
    } else {
        document.querySelector(".skills-empty").classList.add("hidden")
    }
}
