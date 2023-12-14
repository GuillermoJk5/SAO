
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

    switch(comando){
        case "/help": 
        help();
        break;
        case "/system_time": 
        time();
        break;
        case "/list_users":
        listauser();
        break;
        case "/profile": 
        break;
        case "/dungeons": 
        break;
        default: 
        error(); 
        break;
    }
}

//Metodo para listar los comandos
function help(){
   
    frases = ["\n\n/system_time : Muestra la fecha del juego\n\n",
    "/list_users : Lista a los jugadores\n\n",
    "/profile [id_user]: Muestra el perfil del jugador indicado en el parametro"];

    escribir(frases,2);
}

//Metodo que alerta de un error
function error(){
  frase=["\n\nError : Comando desconocido"]
  escribir(frase,0);
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

   escribir(horaActual,0);
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
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost/SAO/Controladores/listusers.php", true);

  xhttp.onload = function() {
      if (this.status == 200) {
          respuesta = this.responseText;
          console.log(respuesta);
          lineas = respuesta.trim().split("\n");
          console.log(lineas);
          lineas.splice(0, 1);
          console.log(lineas);
          jugadores = [];

          for (i = 0; i < lineas.length; i++) {
              var palabras = lineas[i].split(';');

              player = "\n" + palabras[0] + " " + palabras[1] + " [" + palabras[3] + "] " +
                  palabras[2] + " (" + palabras[4] + " , " + palabras[5] + ")";

              jugadores.push(player);
          }

          escribir(jugadores, jugadores.length - 1);
      } else {
          console.log("Ha ocurrido un problema:", this.status, this.statusText);
      }
  };
  xhttp.send();
}

//Metodo para escribir en la pantalla
function escribir(frases, cantidad){

  document.getElementById("texto").setAttribute("disabled",true);
  textarea =document.getElementById("consola");

  //Uso esto para saber cuantas lineas he escrito
let contador = 0;

const temporizador = setInterval(function() {
  textarea.value += frases[contador]; 
  console.log(frases[contador]);
  contador++; 
  textarea.scrollTop = textarea.scrollHeight;

  // Detener el temporizador 
  if (contador > cantidad) {
   clearInterval(temporizador);
   textarea.value+="\n\nIndique un comando y pulse Enter:\n_______________________________________"
   textarea.scrollTop = textarea.scrollHeight;
document.getElementById("texto").removeAttribute("disabled");
document.getElementById("texto").focus();
  }
}, 600);


}

//Metodo que escribe al inicio de la pagina
function escribirinicio(){

  frases=["Ingrese Contraseña:\n","*******\n","Contraseña Aceptada\n",
  "Cargando Archivos.......\n","0%\n","27%\n","65%\n","Archivos Cargados\n"
  ,"Conectando con los servidores...","","\n"+
  "Conexion Exitosa\n","Concediendo permisos de Administrador....\n",
  "Usuario : 4dm1n1str4t0r : Iniciado"]
  
  escribir(frases,12);
  
  }