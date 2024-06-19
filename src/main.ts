import "./style.css";

console.log("Hello Typescript!");
let points: number = 0;
const pointsDisplay = document.getElementById(
  "pointsDisplay"
) as HTMLDivElement;

function muestraPuntuacion() {
  pointsDisplay.textContent = `Puntos: ${points}`;
}

function increasePoints() {
  points++;
  muestraPuntuacion();
}

function decreasePoints() {
  if (points > 0) {
    points--;
    muestraPuntuacion();
  }
}

export const showMessage = (): void => {
  let message = "";
  stayManageButtons();

  switch (true) {
    case points < 4:
      message = "Has sido muy conservador";
      break;
    case points === 5:
      message = "Te ha entrado el canguelo eh?";
      break;
    case points >= 6 && points <= 7:
      message = "Casi casi...";
      break;
    case points === 7.5:
      message = "¡ Lo has clavado! ¡Enhorabuena!";
      break;
  }

  window.alert(message);
};

const increaseButton = document.getElementById(
  "increaseButton"
) as HTMLButtonElement;
		
if (
  increaseButton !== null &&
  increaseButton !== undefined &&
  increaseButton instanceof HTMLButtonElement
) {
  increaseButton.addEventListener("click", increasePoints);
} else {
  console.log("El boton no existe");
}

const decreaseButton = document.getElementById(
  "decreaseButton"
) as HTMLButtonElement;

if (
  decreaseButton !== null &&
  decreaseButton !== undefined &&
  decreaseButton instanceof HTMLButtonElement
) {
  decreaseButton.addEventListener("click", decreasePoints);
} else {
  console.log("El boton no existe");
}

const stayButton = document.getElementById("stayButton") as HTMLButtonElement;

if (
  stayButton !== null &&
  stayButton !== undefined &&
  stayButton instanceof HTMLButtonElement
) {
  stayButton.addEventListener("click", showMessage);
} else {
  console.log("El boton no existe");
}

const newGameButton = document.getElementById(
  "newGameButton"
) as HTMLButtonElement;

if (
  newGameButton !== null &&
  newGameButton !== undefined &&
  newGameButton instanceof HTMLButtonElement
) {
  newGameButton.addEventListener("click", newGame);
} else {
  console.log("El boton no existe");
}


const nextMoveButton = document.getElementById(
  "nextMoveButton"
) as HTMLButtonElement;

if (nextMoveButton !== null &&
  nextMoveButton !== undefined &&
  nextMoveButton instanceof HTMLButtonElement) {
  nextMoveButton.addEventListener("click", handlePideCartaClick);
} else {
  console.log("El boton no existe");
}

muestraPuntuacion();

function dameCarta(): number {
  return Math.floor(Math.random() * 10) + 1;
}


const obtenerNumeroCarta = (numeroAleatorio: number) => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

function mapearCartaImagen(carta: number): string {
  switch (carta) {
    case 1:
      return "src/assets/images/1_as-copas.jpg";
    case 2:
      return "src/assets/images/2_dos-copas.jpg";
    case 3:
      return "src/assets/images/3_tres-copas.jpg";
    case 4:
      return "src/assets/images/4_cuatro-copas.jpg";
    case 5:
      return "src/assets/images/5_cinco-copas.jpg";
    case 6:
      return "src/assets/images/6_seis-copas.jpg";
    case 7:
      return "src/assets/images/7_siete-copas.jpg";
    case 10:
      return "src/assets/images/10_sota-copas.jpg";
    case 11:
      return "src/assets/images/11_caballo-copas.jpg";
    case 12:
      return "src/assets/images/12_rey-copas.jpg";
    default:
      return "src/assets/images/back.jpg";
  }
}
function getValueToSum(carta: number): number {
    if (carta > 7) {
      return 0.5;
    }
    return carta;
}

const sumarPuntos = (puntos: number) => {
    return points + puntos;
  };
  
const actualizarPuntos = (puntosSumados: number) => {
    points = puntosSumados;
};

function sumarValorCarta(cardNumber: number) {
  const puntosSumados = sumarPuntos(getValueToSum(cardNumber));
  actualizarPuntos(puntosSumados)

  muestraPuntuacion();
  setTimeout(() => {
    manageFinishGame();
  }, 1);
}

function manageFinishGame() {
    if (points === 7.5) {
        finishGameManageButtons();
        console.log("Has ganado la partida");
        window.alert("Has ganado la partida");
    }
    if (points > 7.5) {
        finishGameManageButtons();
        console.log("Has perdido la partida")
        window.alert("Game Over");
     
    }
}


function mostrarCarta(urlCarta: string) {
    const cartaImagen = document.getElementById("cartaImagen");
    if (
      cartaImagen !== null &&
      cartaImagen !== undefined &&
      cartaImagen instanceof HTMLImageElement
    ) {
      cartaImagen.src = urlCarta;
    }
}

function handlePideCartaClick() {
  const carta = dameCarta();
  const numeroCarta = obtenerNumeroCarta(carta)
  const cartaURL = mapearCartaImagen(numeroCarta);
  mostrarCarta(cartaURL);
  sumarValorCarta(numeroCarta);
}

const pideCartaButton = document.getElementById(
  "randomCardButton"
) as HTMLButtonElement;

		
if (
  pideCartaButton !== null &&
  pideCartaButton !== undefined &&
  pideCartaButton instanceof HTMLButtonElement
) {
  pideCartaButton.addEventListener("click", handlePideCartaClick);
} else {
  console.log("El boton no existe");
}

function newGame() {
  points = 0;
  const cartaURL = mapearCartaImagen(0);
  mostrarCarta(cartaURL);
  muestraPuntuacion();
  newGameManageButtons();
}

const newGameManageButtons = () => {
  newGameButton.classList.add("hiden");
  newGameButton.classList.remove("show");
  nextMoveButton.classList.add("hiden");
  nextMoveButton.classList.remove("show");
  stayButton.classList.add("show");
  stayButton.classList.remove("hiden");
  pideCartaButton.disabled = false
};

const stayManageButtons = () => {
  newGameButton.classList.add("show");
  newGameButton.classList.remove("hiden");
  nextMoveButton.classList.add("show");
  nextMoveButton.classList.remove("hiden");
  stayButton.classList.add("hiden");
  stayButton.classList.remove("show");
};

const finishGameManageButtons = () => {
  newGameButton.classList.add("show");
  nextMoveButton.classList.add("hiden");
  stayButton.classList.add("hiden");
  pideCartaButton.disabled = true
};
