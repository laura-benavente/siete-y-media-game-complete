import "./style.css";
console.log("Hello Typescript!");
let points: number = 0;
const pointsDisplay = document.getElementById("pointsDisplay");

function muestraPuntuacion() {
    if (pointsDisplay !== null && pointsDisplay !== undefined && pointsDisplay instanceof HTMLDivElement) {
        pointsDisplay.textContent = `Puntos: ${points}`;
    }
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

export const obtenerEstadoPartida = (points: number) => {
    let status = '';
    stayManageButtons();

    if (points < 4) {
        status = 'Has sido muy conservador';
    } else if (points === 5) {
        status = 'Te ha entrado el canguelo eh?';
    } else if (points >= 6 && points <= 7) {
        status = 'Casi casi...';
    } else if (points === 7.5) {
        status = '¡ Lo has clavado! ¡Enhorabuena!';
    } else if (points > 7.5) {
        status = 'Game Over';
    }

    return status;
}

function addEventListenerIfButtonExists(id: string, eventType: string, listener: EventListener) {
    const element = document.getElementById(id);

    if (element !== null && element !== undefined && element instanceof HTMLButtonElement) {
        element.addEventListener(eventType, listener);
    } else {
        console.log(`El botón con id ${id} no existe`);
    }
}

addEventListenerIfButtonExists("increaseButton", "click", increasePoints);
addEventListenerIfButtonExists("decreaseButton", "click", decreasePoints);
addEventListenerIfButtonExists("newGameButton", "click", newGame);
addEventListenerIfButtonExists("nextMoveButton", "click", handlePideCartaClick);
addEventListenerIfButtonExists("randomCardButton", "click", handlePideCartaClick);

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


function message (points: number): string {
  let message = '';

  if (points < 4) {
      message = "Has sido muy conservador";
  } else if (points === 5) {
      message = "Te ha entrado el canguelo eh?";
  } else if (points >= 6 && points <= 7) {
      message = "Casi casi...";
  } else if (points === 7.5) {
      message = "¡ Lo has clavado! ¡Enhorabuena!";
  } else if (points > 7.5) {
      message = "Game Over";
  }

  return message;
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
    actualizarPuntos(puntosSumados);

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
        console.log("Has perdido la partida");
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
    const numeroCarta = obtenerNumeroCarta(carta);
    const cartaURL = mapearCartaImagen(numeroCarta);
    mostrarCarta(cartaURL);
    sumarValorCarta(numeroCarta);
}

function newGame() {
    points = 0;
    const cartaURL = mapearCartaImagen(0);
    mostrarCarta(cartaURL);
    muestraPuntuacion();
    newGameManageButtons();
}

const newGameManageButtons = () => {
    const newGameButton = document.getElementById("newGameButton");
    const nextMoveButton = document.getElementById("nextMoveButton");
    const stayButton = document.getElementById("stayButton");
    const pideCartaButton = document.getElementById("randomCardButton");

    if (newGameButton && newGameButton instanceof HTMLButtonElement) {
        newGameButton.classList.add("hiden");
        newGameButton.classList.remove("show");
    }
    if (nextMoveButton && nextMoveButton instanceof HTMLButtonElement) {
        nextMoveButton.classList.add("hiden");
        nextMoveButton.classList.remove("show");
    }
    if (stayButton && stayButton instanceof HTMLButtonElement) {
        stayButton.classList.add("show");
        stayButton.classList.remove("hiden");
    }
    if (pideCartaButton && pideCartaButton instanceof HTMLButtonElement) {
        pideCartaButton.disabled = false;
    }
};

const stayManageButtons = () => {
    const newGameButton = document.getElementById("newGameButton");
    const nextMoveButton = document.getElementById("nextMoveButton");
    const stayButton = document.getElementById("stayButton");

    if (newGameButton && newGameButton instanceof HTMLButtonElement) {
        newGameButton.classList.add("show");
        newGameButton.classList.remove("hiden");
    }
    if (nextMoveButton && nextMoveButton instanceof HTMLButtonElement) {
        nextMoveButton.classList.add("show");
        nextMoveButton.classList.remove("hiden");
    }
    if (stayButton && stayButton instanceof HTMLButtonElement) {
        stayButton.classList.add("hiden");
        stayButton.classList.remove("show");
    }
};
addEventListenerIfButtonExists("stayButton", "click", stayManageButtons);

const finishGameManageButtons = () => {
    const newGameButton = document.getElementById("newGameButton");
    const nextMoveButton = document.getElementById("nextMoveButton");
    const stayButton = document.getElementById("stayButton");
    const pideCartaButton = document.getElementById("randomCardButton");

    if (newGameButton && newGameButton instanceof HTMLButtonElement) {
        newGameButton.classList.add("show");
    }
    if (nextMoveButton && nextMoveButton instanceof HTMLButtonElement) {
        nextMoveButton.classList.add("hiden");
    }
    if (stayButton && stayButton instanceof HTMLButtonElement) {
        stayButton.classList.add("hiden");
    }
    if (pideCartaButton && pideCartaButton instanceof HTMLButtonElement) {
        pideCartaButton.disabled = true;
    }
};
