//Menu Lateral Retratil
let sanduiche = document.querySelector(".sanduiche");
let width = screen.width;

function abrirMenu(){
  document.getElementById('nav-vertical').style.transform="translate(0%)";
  document.getElementById('nav-vertical').style.transition="all 500ms";
  document.getElementById('conteudo').style.transform="translate(20%)";
  document.getElementById('conteudo').style.transition="all 500ms";
  if(width >= 480){
    document.getElementById('conteudo').style.marginLeft="0%";
  }
}

function fecharMenu() {
  document.getElementById('nav-vertical').style.transform="translate(-100%)";
  document.getElementById('nav-vertical').style.transition="all 500ms";
  document.getElementById('conteudo').style.transform="translate(0%)";
  document.getElementById('conteudo').style.transition="all 500ms";
}

sanduiche.addEventListener("click", abrirMenu);
sanduiche.addEventListener("dblclick", fecharMenu);

//Acordeon
let headerAcordeons = document.querySelectorAll(".conteudo .acordeon .header-acordeon");
let contentAcordeons = document.querySelectorAll(".conteudo .acordeon .content-acordeon");
let active = 0;

function abrirAcordeon(i){
  contentAcordeons[active].classList.remove("active");
  contentAcordeons[i].classList.add(".active");
  let headers = document.querySelectorAll("#id-content-acordeon");
  for (let i = 0; i < headers.length; i++) {
    headers[i].style.transition="all 500ms";
  }
  active = i;
}

for (let i = 0; i < headerAcordeons.length; i++) {
  headerAcordeons[i].addEventListener("click", function(){abrirAcordeon(i)});
}
