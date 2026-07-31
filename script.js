let dA = [];//todos los div

//elemtos de dom
const huecos = document.getElementById("huecos_1");
const spanContador = document.getElementById("contador");
const spanTiempo = document.getElementById("tiempo");
const botonReiniciar = document.getElementById("reiniciar");

//variables para el contador
let contador = 0;
let interval = null;
let tp = 15;

//ritas de los iconos svg
const RUTA_CHANCHO = "./assets/chancho.svg";
const RUTA_OYO = "./assets/oyo.svg";

//funcionamiento del boton reiniciar
botonReiniciar.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  tp = 15;
  contador = 0;

  spanContador.textContent = 0;
  spanTiempo.textContent = 15;
});

// Crear los huecos
let html = "";

for (let i = 1; i <= 50; i++) {
  const tipo = i === 1 ? "chancho" : "oyo";
  const src = i === 1 ? RUTA_CHANCHO : RUTA_OYO;

  html += `
    <div id="d${i}" class="hueco">
      <img
        class="svg"
        src="${src}"
        data-tipo="${tipo}"
        alt=""
      >
    </div>
  `;
}

huecos.innerHTML = html;

// Guardar referencias a los divs
for (let i = 1; i <= 50; i++) {
  dA.push(document.getElementById(`d${i}`));
}

const todosLosD = document.querySelectorAll(".hueco");

todosLosD.forEach((hueco) => {
  hueco.addEventListener("click", () => {

    // Iniciar el temporizador
    if (interval === null) {
      interval = setInterval(() => {
        if (tp > 0) {
          tp--;
          spanTiempo.textContent = tp;
        } else {
          clearInterval(interval);

          alert(
            `El juego ha acabado. Le diste al chancho ${contador} veces. Dale a reiniciar.`
          );

          interval = null;
          tp = 15;
          contador = 0;

          spanTiempo.textContent = 15;
          spanContador.textContent = 0;
        }
      }, 1000);
    }

    const img = hueco.querySelector("img");

    if (img.dataset.tipo === "chancho") {

      contador++;
      spanContador.textContent = contador;

      // Convertir este hueco en hoyo
      img.dataset.tipo = "oyo";
      img.src = RUTA_OYO;

      // Elegir otro hueco
      let na;

      do {
        na = naleatorio(0, dA.length - 1);
      } while (dA[na] === hueco);

      const nuevaImg = dA[na].querySelector("img");
      nuevaImg.dataset.tipo = "chancho";
      nuevaImg.src = RUTA_CHANCHO;
    }
  });
});

function naleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
