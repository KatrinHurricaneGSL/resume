lucide.createIcons();

const filterSelect = document.querySelector("#filter-select")
const searchInput = document.querySelector("#search-input")
const themeBtn = document.querySelector(".theme")

filterSelect.addEventListener("change", sortCardList)

searchInput.addEventListener("keyup", sortCardList)

themeBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    setTheme(newTheme, true)
})

function setTheme(currentTheme, updateStorage = false) {
    const lightIcon = document.querySelector(".theme-light-icon")
    const darkIcon = document.querySelector(".theme-dark-icon")

    document.body.setAttribute("data-theme", currentTheme)

    console.log(currentTheme === "dark", currentTheme === "light")
    if (currentTheme === "dark") {
        lightIcon.classList.remove("hidden")
        darkIcon.classList.add("hidden")

        themeBtn.setAttribute("title", "Перейти на светлую тему")
    } else {
        lightIcon.classList.add("hidden")
        darkIcon.classList.remove("hidden")

        themeBtn.setAttribute("title", "Перейти на тёмную тему")
    }

    if (updateStorage) {
        localStorage.setItem("theme", currentTheme)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme")
    if (!savedTheme) {
        return
    }

    console.log(savedTheme)
    setTheme(savedTheme)
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
