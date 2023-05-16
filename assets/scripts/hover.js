const projectDiv = document.getElementsByClassName("project");
const projectsDiv = document.getElementById("projects");


for (let i = 0; i < projectDiv.length; i++) {
    projectDiv[i].addEventListener("mouseover", () => {
        projectsDiv.style.backgroundColor = "var(--dark-color)";


        buttons = projectDiv[i].getElementsByClassName("button");
        for (let j = 0; j < buttons.length; j++) {
            width = buttons[j].offsetWidth;
            buttons[j].style.height = 97;
            buttons[j].style.width = 97;

          }
      
    });
    
    projectDiv[i].addEventListener("mouseout", () => {
        projectsDiv.style.backgroundColor = "var(--light-color)";

        buttons = projectDiv[i].getElementsByClassName("button");
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.height = null;
            buttons[j].style.width = null;
          }
    });
}