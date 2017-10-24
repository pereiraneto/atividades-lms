let body = document.querySelector(".body");

let amigos = [
  {"usuario" : "Antonio Neto", "mensagens": [{"usuario": "Antonio Neto","texto": "Tudo bem?"},{"usuario": "Pereira Neto","texto": "Tudo Tranqs"},{"usuario": "Antonio Neto","texto": "Que bom"}]},
  {"usuario": "Joao Melo","mensagens": [{"usuario": "Joao Melo","texto": "Na paz?"},{"usuario": "Pereira Neto","texto": "Show"},{"usuario": "Joao Melo","texto": "Que bom"}]},
  {"usuario": "Junior Rodrigues","mensagens": [{"usuario": "Pereira Neto","texto": "Bom?"},{"usuario": "Junior Rodrigues","texto": "Bom"},{"usuario": "Pereira Neto","texto": "Que bom"}]}
];

console.log(amigos);

function criarAmigo(name){
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
}
criarAmigo(amigos[0].usuario);
criarAmigo(amigos[1].usuario);
criarAmigo(amigos[2].usuario);

let amigoList = document.querySelectorAll(".amigo");
let headPanel = document.querySelector(".head-panel");
let listSpan = document.getElementsByClassName(".span-amigos");
let bodyPanel = document.querySelector(".body-panel");

function spanHeadPanel(i){
  document.getElementById("span").innerHTML="";
  let name = listSpan[i].innerHTML;
  let span = document.getElementById("span");
  let spanTexto = document.createTextNode(name);

  span.appendChild(spanTexto);
}

for (let i = 0; i < amigoList.length; i++) {
  amigoList[i].addEventListener("click", function(){spanHeadPanel(i)});
}
for (let i = 0; i < amigoList.length; i++) {
  amigoList[i].addEventListener("click", function(){iterarMensagens(i)});
}

function iterarMensagens(i){
  document.getElementById("body-panel").innerHTML="";
  let div = document.createElement("div");
  for (let j = 0; j < amigos[i].mensagens.length; j++) {
    let div2 = document.createElement("div");
    div2.classList.add("mensagem");
    let div3 = document.createElement("div");
    div3.classList.add("mesagem-user");
    let usuario = amigos[i].mensagens[j].usuario;
    let p = document.createElement("p");
    let textPuser = document.createTextNode(usuario);

    let texto = amigos[i].mensagens[j].texto;
    let p2 = document.createElement("p");
    let textPtexto = document.createTextNode("-------"+texto);

    p.appendChild(textPuser);
    p2.appendChild(textPtexto);

    div2.appendChild(p);
    div2.appendChild(p2);
    div.appendChild(div2);

    let user = document.getElementById("span").innerHTML;

    if(user == usuario){
      div2.classList.add("user-receive-msg");
    }else{
      div3.appendChild(p);
      div3.appendChild(p2);
      div2.appendChild(div3);
      div2.classList.add("user-send-msg");
    }

  }

  bodyPanel.appendChild(div);
}
