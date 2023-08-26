var i = 0;
var txt = 'Developer, Operations and Cloud proeffecient'; 
var speed = 60;

function typeWriter() {
    
    if (document.getElementById("type-effect").innerHTML == "Daniel Beltejar") {
        document.getElementById("type-effect").innerHTML = "";
        document.getElementById("title-effect").style.opacity = "1";
    }

    if (i < txt.length) {
        document.getElementById("type-effect").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

if (window.innerWidth < 1024) {
    typeWriter();
  } else {
    setTimeout(typeWriter, 2200);
  }
  