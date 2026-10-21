
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAM_CELDA = 25;


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
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(10,23);
      pintarParte(23,10);
      pintarParte(0,10);
      pintarParte(23,23);
    }

function pintarParte(lineaX, lineaY){
  let x=lineaX*TAM_CELDA;
  let y=lineaY*TAM_CELDA;
  ctx.fillStyle="#22c55e";
  ctx.fillRect(x,y,TAM_CELDA,TAM_CELDA);

  ctx.strokeStyle="#000000";
  ctx.strokeRect(x,y,TAM_CELDA,TAM_CELDA);
}

