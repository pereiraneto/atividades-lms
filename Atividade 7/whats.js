let body = document.querySelector(".body");
let bodyPanel = document.querySelector(".body-panel");
let imgBody = document.getElementById("img-body");
let footer = document.querySelector(".footer");
let listaAmigos = document.querySelector(".lista-grupos");

if(localStorage.getItem("usuario") === null){
  document.getElementById("button").innerHTML = "Entrar";
  document.getElementById("body").innerHTML = "";

  let openModal = document.getElementById("button");
  let modalOverlay = document.querySelector(".modal-overlay");
  let modal = document.querySelector(".modal");

  openModal.addEventListener("click", function(){
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    let closeModal = document.getElementById("fechar-modal");
    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
      let idInput = document.getElementById("id").value;
      if(idInput == 1){
        if(typeof(Storage) !== "undefined"){
          localStorage.setItem("usuario", "Pereira Neto");
          localStorage.setItem("id", "1");
        }else {
          document.getElementById("spanUser").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
      }else{
        event.preventDefault();
        document.getElementById("spanError").innerHTML = "Id do usuário inválido";
       }
    });
    closeModal.addEventListener("click", function(){
      modalOverlay.style.display = "none";
      modal.style.display = "none";
      document.getElementById("id").value = "";
      document.getElementById("spanError").innerHTML = "";
    });
  });
}else{
  document.getElementById("spanUser").innerHTML = localStorage.getItem("usuario");
  document.getElementById("button").innerHTML = "Sair";
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
  document.getElementById("button").addEventListener("click", function(){
    localStorage.removeItem("usuario");
    document.getElementById("spanUser").innerHTML = "";
    document.getElementById("button").innerHTML = "Entrar";
    document.getElementById("body").innerHTML = "";
    document.getElementById("span").innerHTML = "";
    
    document.getElementById("body-panel").innerHTML = "";
    bodyPanel.style.backgroundImage="url('tela_wh.png')";
  });
}

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
  listaAmigos.appendChild(amigo);

  //body.appendChild(amigo);
  amigo.classList.add("amigo");
  imgUser.classList.add("img-user");
  spanUser.classList.add("span-user");
  span.classList.add(".span-amigos");

  amigo.addEventListener("click", function(){spanHeadPanel(i)});
  amigo.addEventListener("click", function(){bodyPanel.style.backgroundImage="url('fundo2.png')"});
  amigo.addEventListener("click", function(){iterarMensagens(id)});
}

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
  div.classList.add("msgs");
  let div4 = document.createElement("div");
  div4.classList.add("footer");
  let div5 = document.createElement("div");
  div5.classList.add("input-msg");
  let input = document.createElement("input");
  input.placeholder = "Digite uma mensagem";
  input.classList.add("input-msg.input");

  document.addEventListener('keypress', function(e){
    if(e.which == 13){
      if(input.value != ""){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if(xhttp.readyState==4){
            //iterarMensagens(id);
            atualizaMensagens(id);
          }
        }
        xhttp.open("POST", "http://rest.learncode.academy/api/pereira/"+id, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        let person = {"userName":localStorage.getItem("usuario") , "message":input.value};
        let body = JSON.stringify(person);
        xhttp.send(body);
        input.value = "";
      }
    }
  });
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
      let obj_parsed = JSON.parse(xhttp.responseText);
      bodyPanel.innerHTML = "";
      for(let j=0; j<obj_parsed.length; j++){
        let div2 = document.createElement("div");
        div2.classList.add("mensagem");
        let div3 = document.createElement("div");
        let usuario = obj_parsed[j].userName;
        if(usuario == localStorage.getItem("usuario")){
          div3.classList.add("msg-estilo-send");
        }else{
          div3.classList.add("msg-estilo");
        }
        let p = document.createElement("p");
        p.style.color="black";
        let textPuser = document.createTextNode(usuario);

        let texto = obj_parsed[j].message;
        let p2 = document.createElement("p");
        p2.style.color="#262626";
        let textPtexto = document.createTextNode(texto);

        p.appendChild(textPuser);
        p2.appendChild(textPtexto);

        div3.appendChild(p);
        div3.appendChild(p2);
        div2.appendChild(div3);
        div.appendChild(div2);

        bodyPanel.appendChild(div);
        div5.appendChild(input);
        div4.appendChild(div5);
        bodyPanel.appendChild(div4);
      }
      div5.appendChild(input);
      div4.appendChild(div5);
      bodyPanel.appendChild(div4);
    }
  }
  let url = 'http://rest.learncode.academy/api/pereira/'+id;
  xhttp.open('GET',url,true);
  xhttp.send();
}

function enviarGp(groupName, groupId){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if(xhttp.readyState==4){
        atualizaGrupos();
      }
  }
  xhttp.open("POST", "http://rest.learncode.academy/api/pereira/groups", true);
  xhttp.setRequestHeader("Content-Type","application/json");
  let person = {"groupName":groupName , "groupID":groupId};
  let body = JSON.stringify(person);
  xhttp.send(body);
}

let submitGroup = document.getElementById("submit-group");
let nameGroup = document.querySelector('input[name="group-name"]');
let nameId = document.querySelector('input[name="group-id"]');
submitGroup.addEventListener("click", function(e){
  e.preventDefault();
  if(nameGroup.value != "" && nameId.value != ""){
    enviarGp(nameGroup.value, nameId.value);
    nameGroup.value = "";
    nameId.value = "";
  }
});

function atualizaGrupos(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
      let obj_parsed = JSON.parse(xhttp.responseText);
      listaAmigos.innerHTML = "";
      for(let i =0; i<obj_parsed.length; i++){
        criarGrupo(obj_parsed[i].groupName, i, obj_parsed[i].groupID);
      }
    }
  }
  xhttp.open('GET', 'http://rest.learncode.academy/api/pereira/groups', true);
  xhttp.send();
}

function atualizaMensagens(id){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
      //let obj_parsed = JSON.parse(xhttp.responseText);
      bodyPanel.innerHTML = "";
      // for(let i =0; i<obj_parsed.length; i++){
      //   iterarMensagens(id);
      // }
      iterarMensagens(id);
    }
  }
  xhttp.open('GET', 'http://rest.learncode.academy/api/pereira/'+id, true);
  xhttp.send();
}

atualizaGrupos();
//atualizaMensagens(id);
