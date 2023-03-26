const projectDiv = document.getElementsByClassName("project");
const projectsDiv = document.getElementById("projects");
const projectsTitleBorder = document.getElementById("bg-light");

for (let i = 0; i < projectDiv.length; i++) {
    projectDiv[i].addEventListener("mouseover", () => {
        projectsDiv.style.backgroundColor = "var(--dark-color)";
        projectsTitleBorder.style.borderBottom = "3px solid var(--dark-color)";
    });
    
    projectDiv[i].addEventListener("mouseout", () => {
        projectsDiv.style.backgroundColor = "var(--light-color)";
        projectsTitleBorder.style.borderBottom = "3px solid var(--light-color)";
    });
}