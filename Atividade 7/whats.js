let body = document.querySelector(".body");
let bodyPanel = document.querySelector(".body-panel");
let imgBody = document.getElementById("img-body");

function criarGrupo(name,  i, id){
  let amigo = document.createElement("div");
  let imgUser = document.createElement("div");
  let spanUser = document.createElement("div");
  let img = document.createElement("img");
  let span = document.createElement("span");
  let spanTexto = document.createTextNode(name);

  img.src="usuario.png";

  span.appendChild(spanTexto);
  imgUser.appendChild(img);
  spanUser.appendChild(span);
  amigo.appendChild(imgUser);
  amigo.appendChild(spanUser);

  body.appendChild(amigo);
  amigo.classList.add("amigo");
  imgUser.classList.add("img-user");
  spanUser.classList.add("span-user");
  span.classList.add(".span-amigos");

  amigo.addEventListener("click", function(){spanHeadPanel(i)});
  amigo.addEventListener("click", function(){bodyPanel.style.backgroundImage="url('fundo2.png')"});
  amigo.addEventListener("click", function(){iterarMensagens(id)});
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
  if(xhttp.readyState==4){
    let obj_parsed = JSON.parse(xhttp.responseText);
    for(let i=0; i<obj_parsed.length; i++){
      criarGrupo(obj_parsed[i].groupName, i, obj_parsed[i].groupID);
    }
  }
}
xhttp.open('GET','http://rest.learncode.academy/api/pereira/groups',true);
xhttp.send();

//let amigoList = document.querySelectorAll(".amigo");
let headPanel = document.querySelector(".head-panel");
let listSpan = document.getElementsByClassName(".span-amigos");

function spanHeadPanel(i){
  document.getElementById("span").innerHTML="";
  let name = listSpan[i].innerHTML;
  let span = document.getElementById("span");
  let spanTexto = document.createTextNode(name);

  span.appendChild(spanTexto);
}

function iterarMensagens(id){
  document.getElementById("body-panel").innerHTML="";
  let div = document.createElement("div");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
      let obj_parsed = JSON.parse(xhttp.responseText);
      for(let j=0; j<obj_parsed.length; j++){
        let div2 = document.createElement("div");
        div2.classList.add("mensagem");
        let div3 = document.createElement("div");
        div3.classList.add("msg-estilo");
        let usuario = obj_parsed[j].userName;
        let rand1 = Math.floor(Math.random() * 255);
        let rand2 = Math.floor(Math.random() * 255);
        let rand3 = Math.floor(Math.random() * 255);
        console.log(rand1);
        console.log(rand2);
        console.log(rand3);
        let p = document.createElement("p");
        p.style.color="rgb("+rand1+","+rand2+","+rand3+")";
        let textPuser = document.createTextNode(usuario);

        let texto = obj_parsed[j].message;
        let p2 = document.createElement("p");
        let textPtexto = document.createTextNode(texto);

        p.appendChild(textPuser);
        p2.appendChild(textPtexto);

        div3.appendChild(p);
        div3.appendChild(p2);
        div2.appendChild(div3);
        div.appendChild(div2);

        bodyPanel.appendChild(div);
      }
    }
  }
  let url = 'http://rest.learncode.academy/api/pereira/'+id;
  xhttp.open('GET',url,true);
  xhttp.send();
}
