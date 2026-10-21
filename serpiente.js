
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
      { x: 7, y: 12 },
      { x: 6, y: 12 },
      { x: 5, y: 12 }  
];


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