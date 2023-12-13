
function escribirinicio(){

textarea =document.getElementById("consola");

"Accediendo al control del terminal central ..................\n"+
"";

frases=["Ingrese Contraseña:\n","*******\n","Contraseña Aceptada\n",
"Cargando Archivos.......\n","0%\n","27%\n","65%\n","Archivos Cargados\n"
,"Conectando con los servidores",".....",".......\n"+
"Conexion Exitosa\n","Concediendo permisos de Administrador....\n",
"Usuario : 4dm1n1str4t0r : Iniciado\n","Indique un comando:"]


let contador = 0;


const temporizador = setInterval(function() {
  textarea.value += frases[contador]; // Agregar el número al textarea
  contador++; // Incrementar el contador

  // Detener el temporizador después de cierto número de iteraciones
  if (contador > 13) {
    clearInterval(temporizador);
  }
}, 600);








}

function boton(){
    const input = document.getElementById('texto');

   
    input.addEventListener('keyup', function(event) {
     
      if (event.keyCode === 13) {
       
        alert('Presionaste Enter');
      }
    });
}
