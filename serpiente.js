// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAM_CELDA = 25;

// Variables de estado del juego
let serpiente = [
  { x: 12, y: 12 }, 
  { x: 11, y: 12 },
  { x: 10, y: 12 },
  { x: 9, y: 12 },
  { x: 8, y: 12 },
  { x: 7, y: 12 },
  { x: 6, y: 12 },
  { x: 5, y: 12 }  
];

let intervaloSerpiente = null;
let direccionActual = "derecha";
let comida = { x: 5, y: 5 };
let puntaje = 0;
let velocidad = 1000; 
let juegoTerminado = false;

// Dibujar el estado inicial al cargar la página
pintarComida();
dibujarTodo();
actualizarEstado("Listo");

function dibujarTablero(){
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += TAM_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += TAM_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarParte(comida.x, comida.y, "red");
}

function pintarParte(lineaX, lineaY, color){
  let x = lineaX * TAM_CELDA;
  let y = lineaY * TAM_CELDA;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAM_CELDA, TAM_CELDA);

  ctx.strokeStyle = "red";
  ctx.strokeRect(x, y, TAM_CELDA, TAM_CELDA);
}

function pintarSerpiente(){
  for(let i = 0; i < serpiente.length; i++){
    if(i == 0){
      pintarParte(serpiente[i].x, serpiente[i].y, "yellow");
    } else {
      pintarParte(serpiente[i].x, serpiente[i].y, "white");
    }
  }
}

function moverDerecha(){
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda(){
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba(){
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo(){
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1};
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

// Cambiar dirección y evitar que retroceda sobre sí misma
function cambiarDireccion(direccion){
  if (juegoTerminado) return;

  if (direccion == "derecha" && direccionActual != "izquierda") {
    direccionActual = "derecha";
  } else if (direccion == "izquierda" && direccionActual != "derecha") {
    direccionActual = "izquierda";
  } else if (direccion == "arriba" && direccionActual != "abajo") {
    direccionActual = "arriba";
  } else if (direccion == "abajo" && direccionActual != "arriba") {
    direccionActual = "abajo";
  }
}

function pintarComida() {
  let columnas = canvas.width / TAM_CELDA;
  let filas = canvas.height / TAM_CELDA;
  
  let xAleatorio = Math.floor(Math.random() * columnas);
  let yAleatorio = Math.floor(Math.random() * filas);
  
  comida = { x: xAleatorio, y: yAleatorio };
}

function atrapaComida() {
  let cabeza = serpiente[0];
  if (cabeza.x == comida.x && cabeza.y == comida.y) {
    return true;
  } else {
    return false;
  }
}

// Función para verificar si la serpiente choca contra su propio cuerpo
function chocaConsigoMisma() {
  let cabeza = serpiente[0];
  // Empezamos desde el índice 1 porque el 0 es la cabeza
  for (let i = 1; i < serpiente.length; i++) {
    if (cabeza.x == serpiente[i].x && cabeza.y == serpiente[i].y) {
      return true;
    }
  }
  return false;
}

function moverSerpiente() {
  if (juegoTerminado) return;

  if (direccionActual == "derecha") {
    moverDerecha();
  } else if (direccionActual == "izquierda") {
    moverIzquierda();
  } else if (direccionActual == "arriba") {
    moverArriba();
  } else if (direccionActual == "abajo") {
    moverAbajo();
  }

  let cabeza = serpiente[0];
  let columnas = canvas.width / TAM_CELDA;
  let filas = canvas.height / TAM_CELDA;

  // 1. Validar Game Over al tocar los bordes
  if (cabeza.x < 0 || cabeza.x >= columnas || cabeza.y < 0 || cabeza.y >= filas) {
    terminarJuego();
    return;
  }

  // 2. Validar Game Over si choca consigo misma
  if (chocaConsigoMisma()) {
    terminarJuego();
    return;
  }

  // Detectar si atrapa la comida
  if (atrapaComida()) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;

    let ultimo = serpiente[serpiente.length - 1];
    let nuevoSegmento = {};

    if (direccionActual == "derecha") {
      nuevoSegmento = { x: ultimo.x - 1, y: ultimo.y };
    } else if (direccionActual == "izquierda") {
      nuevoSegmento = { x: ultimo.x + 1, y: ultimo.y };
    } else if (direccionActual == "arriba") {
      nuevoSegmento = { x: ultimo.x, y: ultimo.y + 1 };
    } else if (direccionActual == "abajo") {
      nuevoSegmento = { x: ultimo.x, y: ultimo.y - 1 };
    }

    serpiente.push(nuevoSegmento);
    pintarComida();

    // Aumentar velocidad progresivamente cada 5 puntos (reducimos 150ms por ejemplo, con un límite mínimo)
    if (puntaje % 5 == 0) {
      if (velocidad > 200) { // Límite para que no se vuelva imposible
        velocidad = velocidad - 150;
        // Reiniciamos el intervalo con la nueva velocidad más rápida
        clearInterval(intervaloSerpiente);
        intervaloSerpiente = setInterval(moverSerpiente, velocidad);
      }
    }
  }
  
  dibujarTodo();
}

function terminarJuego() {
  juegoTerminado = true;
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  actualizarEstado("GAME OVER ❌");
  document.getElementById("mensaje").innerText = "¡Te estrellaste o te comiste a ti mismo! Presiona Reiniciar.";
}

function actualizarEstado(texto) {
  let etiquetaEstado = document.getElementById("estado");
  if (etiquetaEstado) {
    etiquetaEstado.innerText = texto;
  }
}

function iniciarJuego() {
  if (intervaloSerpiente == null && !juegoTerminado) {
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    actualizarEstado("Jugando...");
    document.getElementById("mensaje").innerText = "¡Partida en curso!";
  }
}

function pausarJuego() {
  if (intervaloSerpiente != null) {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    actualizarEstado("Pausado");
    document.getElementById("mensaje").innerText = "Juego pausado.";
  }
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
  juegoTerminado = false;
  puntaje = 0;
  velocidad = 1000;
  document.getElementById("puntaje").innerText = puntaje;
  
  serpiente = [
    { x: 12, y: 12 }, 
    { x: 11, y: 12 },
    { x: 10, y: 12 },
    { x: 9, y: 12 },
    { x: 8, y: 12 },
    { x: 7, y: 12 },
    { x: 6, y: 12 },
    { x: 5, y: 12 }  
  ];
  
  direccionActual = "derecha";
  pintarComida();
  dibujarTodo();
  actualizarEstado("Listo");
  document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";
}