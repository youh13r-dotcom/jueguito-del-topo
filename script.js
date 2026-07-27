let dA = [];
const huecos = document.getElementById("huecos_1");
const spanContador = document.getElementById("contador");
const spanTiempo = document.getElementById("tiempo");
const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", () => {
  clearInterval(interval);
  tp = 15;
  interval = null;
  contador = 0;
  spanContador.innerHTML = 0;
  spanTiempo.innerHTML = 15;
});

let acumuladorHTML1 = `<div id="d1" class="hueco">🤭</div>`;

let contador = 0;
let interval = null;
let tp = 15;

for (let i = 2; i <= 50; i++) {

  acumuladorHTML1 += `<div id="d${i}" class="hueco">🕳</div>`;

}

huecos.innerHTML = acumuladorHTML1;

for (let i = 1; i <= 50; i++) {
  let elementoHTML = document.getElementById("d" + i);
  dA.push(elementoHTML);
}

const todosLosD = document.querySelectorAll(".hueco");

todosLosD.forEach((hueco) => {
  hueco.addEventListener("click", () => {
    if (interval === null) {
      interval = setInterval(() => {
        if (tp > 0) {
          tp--;
          spanTiempo.innerHTML = tp;
        } else {
          clearInterval(interval);
          alert(
            "el juego a acabado, le diste al topo " +
              contador +
              " vezes. dale a reiniciar",
          );
          tp = 15;
          interval = null;
          contador = 0;
          spanContador.innerHTML = 0;
          spanTiempo.innerHTML = 15;
        }
      }, 1000);
    }
    if (hueco.textContent === "🤭") {
      contador++;
      spanContador.innerHTML = contador;
      hueco.textContent = "🕳";
      let na = naleatorio(0, dA.length - 1);
      dA[na].textContent = "🤭";
    }
  });
});

function naleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
