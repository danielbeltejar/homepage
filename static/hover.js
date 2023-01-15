console.log("AAA")
const projectDiv = document.getElementsByClassName("project");
const projectsDiv = document.getElementById("projects");

for (let i = 0; i < projectDiv.length; i++) {
    projectDiv[i].addEventListener("mouseover", () => {
        projectsDiv.style.backgroundColor = "var(--dark-color)";
    });
    
    projectDiv[i].addEventListener("mouseout", () => {
        projectsDiv.style.backgroundColor = "var(--light-color)";
    });
}