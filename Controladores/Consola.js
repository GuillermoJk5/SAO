
//Funcion para simular boton con el Enter
function boton(){
    const input = document.getElementById('texto');
    input.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        leercomando(input.value);
        input.value="";
      }   
    });
}

//Metodo para leer lo que se ha introducido
function leercomando(comando){

  trozos = comando.split(" ");

    switch(trozos[0]){
        case "/clear": 
        activarImagen("n");
        clear();
        break;
        case "/help": 
        activarImagen("n");
        cabecera("HELP");
        help();
        break;
        case "/system_time": 
        activarImagen("n");
        cabecera("DATE");
        time();
        break;
        case "/list_users":
        activarImagen("n");
        cabecera("USERS");
        listauser();
        break;
        case "/profile": 
        activarImagen("n");
        if(trozos.length==2)
        {activarImagen("s");
        cabecera("PROFILE");
        profile(trozos[1]);
      }else{error();}
        break;
        case "/dungeons": 
        if(trozos.length==2)
        {activarImagen("n");
        cabecera("DUNGEONS");
        dungeons(trozos[1]);
      }else{error();}
        break;
        default: 
        error(); 
        break;
    }
}

//Metodo para borrar la consola
function clear(){
  textarea=document.getElementById("consola");
  textarea.value="Indique un comando y pulse Enter:\n_______________________________________";
   textarea.scrollTop = textarea.scrollHeight;
}

//Pinta la cabecera de cada comando
function cabecera(texto){
  textarea.value+="\n"+texto;
}

//Metodo para listar los comandos
function help(){
   
    frases = ["\n\n/clear : limpia la consola\n\n","/system_time : Muestra la fecha del juego\n\n",
    "/list_users : Lista a los jugadores\n\n",
    "/profile [id_user]: Muestra el perfil del jugador indicado en el parametro\n\n",
    "/dungeons [id_user]: Muestra las mazmorras que ha completado el jugador indicado en el parametro"];

    escribir(frases);
}

//Metodo que alerta de un error
function error(){
  frase=["\n\nError : Comando desconocido"]
  escribir(frase);
}

//Metodo que escribe la fecha y hora
function time(){
  fecha = new Date();
  hora = fecha.getHours();
  minutos = fecha.getMinutes();
  segundos = fecha.getSeconds();
  dia = fecha.getDate();
  mes = fecha.getMonth() + 1;
  año = fecha.getFullYear();

 
  hora = formatearNumero(hora);
  minutos = formatearNumero(minutos);
  segundos = formatearNumero(segundos);
  dia = formatearNumero(dia);
  mes = formatearNumero(mes);

   horaActual = ["\n\nFecha actual del juego : "
   +dia+"/"+mes+"/"+año+" "+hora+":"+minutos+":"+segundos];

   escribir(horaActual);
}

// Metodo para el metodo profile
function profile(id){
  
ind =  parseInt(id);

const xhr = new XMLHttpRequest();

xhr.open('GET', `http://localhost/SAO/Controladores/profile.php?id=${ind}`, true);
xhr.withCredentials = true;

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    const data = xhr.responseText;
    
    //Obtengo los datos en un array junto con la foto
    arraydata=maquetar(data);
    
    //Pinto la foto
    if(arraydata[7]==null){
      arraydata[7]="http://localhost/SAO/img/foto.png"
    }
    imagen(arraydata[7]);
    
    //Borro la foto para mostrar las lineas de texto
    arraydata.splice(7,1);
    escribir(arraydata);

  } else {
    console.error('Hubo un error con la solicitud:', xhr.status);
    error();
  }
};

xhr.onerror = function() {
  console.error('Hubo un error con la solicitud');
};

xhr.send();
}

//Metodo para maquetar el metodo de Profile
function maquetar(data) {
  array = data.split("\n");
  array[0] = "\n";
  array.splice(8, 1);
  img = array[7];
  
  // Obtengo la URL de toda la línea
  url = img.split('"');
  array[7] = url[3];
  
  return array;
}

//Metodo para imprimir la imagen
function imagen(url){
  img =document.getElementById("img");
  img.src=url;
}

//Metodo para activar el camppo de la imagen
function activarImagen(op) {
  textarea =document.getElementById("consola");
  img =document.getElementById("img");
  if(op=="s"){
  textarea.style.width="60%";
    img.style.display = 'block';
  }
  else{ 
    textarea.style.width="82%";
    img.style.display = 'none';
  }
}

//Metodo para formatear el numero de la hora
function formatearNumero(numero) {
  if (numero < 10) {
      numero = "0" + numero;
  }
  return numero;
}

//Metodo que pilla los jugadores de la bbdd y los muestra
function listauser() {
  xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost/SAO/Controladores/listusers.php", true);

  xhttp.onload = function() {
      if (this.status == 200) {
          respuesta = this.responseText;
          lineas = respuesta.trim().split("\n");
          lineas.splice(0, 1);
          jugadores = [];

          for (i = 0; i < lineas.length; i++) {
               palabras = lineas[i].split(';');

              player = "\n\n" + palabras[0] + " : " + palabras[1] + " (" + palabras[3] + ") (" +
                 palabras[2] + ") (" + palabras[4] + " , " + palabras[5].trim() + ")";

              jugadores.push(player);
          }

          escribir(jugadores);
      } else {
          console.log("Ha ocurrido un problema:", this.status, this.statusText);
      }
  };
  xhttp.send();
}

//Metodo de las mazmorras
function dungeons(id){

  ind =  parseInt(id);

  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', `http://localhost/SAO/Controladores/userdungeons.php?id=${ind}`, true);
  xhr.withCredentials = true;
  
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      const data = xhr.responseText;
      
      //Obtengo los datos en un array junto con la foto
      arraydata=maquetardungeons(data);

      escribir(arraydata);
    
  
    } else {
      console.error('Hubo un error con la solicitud:', xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.error('Hubo un error con la solicitud');
  };
  
  xhr.send();

}

//Metodo para maquetar la info de las mazmorras
function maquetardungeons(data){
data=data.replace("[","");
data=data.replace("]","");
data=data.replace(/{/g,"");
data=data.replace(/}/g,"");
arraydatos=data.split(",");
return arraydatos;
  
}


//Metodo para escribir en la pantalla
function escribir(frases) {
  // Bloqueo el input
  document.getElementById("texto").setAttribute("disabled", true);
  textarea = document.getElementById("consola");

  // Uso esto para saber cuantas lineas he escrito
  let contador = 0;

  const temporizador = setInterval(function() {
      // Pinto lo mandado por parametro
      textarea.value += frases[contador];
      console.log(frases[contador]);
      contador++;
      textarea.scrollTop = textarea.scrollHeight;

      // Detener el temporizador 
      if (contador > frases.length-1) {
          clearInterval(temporizador);

          // Pintar la linea base
          textarea.value += "\n\nIndique un comando y pulse Enter:";
          textarea.value += "\n_______________________________________";
          textarea.scrollTop = textarea.scrollHeight;

          // Desbloquear el input
          document.getElementById("texto").removeAttribute("disabled");
          document.getElementById("texto").focus();
      }
  }, 600);
}

//Metodo que escribe al inicio de la pagina
function escribirinicio(){

  frases=["Ingrese Contraseña:\n",
  "*******\n",
  "Contraseña Aceptada\n",
  "Cargando Archivos.......\n",
  "0%\n",
  "27%\n",
  "65%\n",
  "Archivos Cargados\n",
  "Conectando con los servidores...",
  "...",
  "\n",
  "Conexion Exitosa\n",
  "Concediendo permisos de Administrador....\n",
  "Usuario : 4dm1n1str4t0r : Iniciado"]
  
  escribir(frases);
  }