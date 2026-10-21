
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAM_CELDA = 25;
    const serpiente = [
      { x: 12, y: 12 }, 
      { x: 11, y: 12 },
      { x: 10, y: 12 },
      { x: 9, y: 12 },
      { x: 8, y: 12 },
      { x: 7, y: 12 }
    ];

    let comida = { x: 5, y: 5 };

    let puntaje=0;

    let intervaloSerpiente=null
    let direccionActual = "derecha";

    dibujarTodo();

    function dibujarTablero(){
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
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
      pintarParte(comida.x, comida.y, "green");
    }

function pintarParte(lineaX, lineaY, color){
  let x = lineaX * TAM_CELDA;
  let y = lineaY * TAM_CELDA;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAM_CELDA, TAM_CELDA);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAM_CELDA, TAM_CELDA);
}

function pintarSerpiente(){
  for(let i=0;i<serpiente.length;i++){
    if(i == 0){
      pintarParte(serpiente[i].x, serpiente[i].y, "yellow");
    } else {
      pintarParte(serpiente[i].x, serpiente[i].y, "black");
    }
  }
}

function moverDerecha(){
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function cambiarDireccion(direccion){
  direccionActual=direccion;
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

function moverSerpiente() {
  if (direccionActual == "derecha") {
    moverDerecha();
  } else if (direccionActual == "izquierda") {
    moverIzquierda();
  } else if (direccionActual == "arriba") {
    moverArriba();
  } else if (direccionActual == "abajo") {
    moverAbajo();
  }

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
  }
  
  dibujarTodo();
}

function iniciarJuego() {
  if (intervaloSerpiente == null) {
    intervaloSerpiente = setInterval(moverSerpiente, 1000);
  }
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null;
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