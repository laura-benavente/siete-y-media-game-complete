import "./style.css";

console.log("Hello Typescript!");
let points: number = 0;
const pointsDisplay = document.getElementById('pointsDisplay') as HTMLDivElement;
let stay = false;
let gameOver = false;



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
    stay = true;
    let message = ''
    stayManageButtons()

    switch (true) {
        case points < 4:
            message = 'Has sido muy conservador';
            break;
        case points === 5:
            message = 'Te ha entrado el canguelo eh?';
            break;
        case (points >= 6 &&
            points <= 7):
            message = 'Casi casi...';
        case points === 7.5:
            message = '¡ Lo has clavado! ¡Enhorabuena!';
            break
    }

    window.alert(message)
};


const increaseButton = document.getElementById('increaseButton') as HTMLButtonElement;
const decreaseButton = document.getElementById('decreaseButton') as HTMLButtonElement;
const stayButton = document.getElementById('stayButton') as HTMLButtonElement;
const newGameButton = document.getElementById('newGameButton') as HTMLButtonElement;
const nextMoveButton = document.getElementById('nextMoveButton') as HTMLButtonElement;


if (increaseButton !== null && increaseButton !== undefined) {
    increaseButton.addEventListener('click', increasePoints);
}
else {
    console.log("El boton no existe")
}
if (decreaseButton !== null && decreaseButton !== undefined) {
    decreaseButton.addEventListener('click', decreasePoints);
}
else {
    console.log("El boton no existe")
}
if (stayButton !== null && stayButton !== undefined) {
    stayButton.addEventListener('click', showMessage);
}
else {
    console.log("El boton no existe")
}
if (newGameButton !== null && newGameButton !== undefined) {
    newGameButton.addEventListener('click', newGame);
}
else {
    console.log("El boton no existe")
}
if (nextMoveButton !== null && nextMoveButton !== undefined) {
    nextMoveButton.addEventListener('click', handlePideCartaClick)
}
else {
    console.log("El boton no existe")
}


muestraPuntuacion();

function dameCarta(): number {
    let carta: number;
    do {
        carta = Math.floor(Math.random() * 12) + 1;
    } while (carta === 8 || carta === 9);

    return carta;
}

function mapearCartaImagen(valor: number): string {
    switch (valor) {
        case 1:
            return 'src/assets/images/1_as-copas.jpg';
        case 2:
            return 'src/assets/images/2_dos-copas.jpg';
        case 3:
            return 'src/assets/images/3_tres-copas.jpg';
        case 4:
            return 'src/assets/images/4_cuatro-copas.jpg';
        case 5:
            return 'src/assets/images/5_cinco-copas.jpg';
        case 6:
            return 'src/assets/images/6_seis-copas.jpg';
        case 7:
            return 'src/assets/images/7_siete-copas.jpg';
        case 10:
            return 'src/assets/images/10_sota-copas.jpg';
        case 11:
            return 'src/assets/images/11_caballo-copas.jpg';
        case 12:
            return 'src/assets/images/12_rey-copas.jpg';
        default:
            return 'src/assets/images/back.jpg'

    }
}
function getValueToSum(valor: number): number {
    if (valor === 10 || valor === 11 || valor === 12) {
        return 0.5
    }

    return valor
}
function sumarValorCarta(cardNumber: number) {
    points = points + getValueToSum(cardNumber);
    muestraPuntuacion();
    setTimeout(() => {
        checkIfGameOver()
    }, 1);

}
function checkIfGameOver() {
    if (points > 7.5) {
        gameOver = true;
        gameOverManageButtons()
        window.alert('Game Over')
    }

}


function mostrarCarta(valor: number) {
    const cartaImagen = document.getElementById('cartaImagen') as HTMLImageElement;
    cartaImagen.src = mapearCartaImagen(valor);
}


function handlePideCartaClick() {
    const carta = dameCarta();
    mostrarCarta(carta);
    sumarValorCarta(carta)
}


const pideCartaButton = document.getElementById('randomCardButton') as HTMLButtonElement;


if (pideCartaButton !== null && pideCartaButton !== undefined) {
    pideCartaButton.addEventListener('click', handlePideCartaClick);
}
else {
    console.log("El boton no existe")
}


function newGame() {
    points = 0;
    gameOver = false;
    stay = false;
    mostrarCarta(0)
    muestraPuntuacion()
    newGameManageButtons()
}

const newGameManageButtons = () => {
    newGameButton.classList.add('hiden')
    newGameButton.classList.remove('show')
    nextMoveButton.classList.add('hiden')
    nextMoveButton.classList.remove('show')
    stayButton.classList.add('show')
    stayButton.classList.remove('hiden')
};

const stayManageButtons = () => {
    newGameButton.classList.add('show')
    newGameButton.classList.remove('hiden')
    nextMoveButton.classList.add('show')
    nextMoveButton.classList.remove('hiden')
    stayButton.classList.add('hiden')
    stayButton.classList.remove('show')
};

const gameOverManageButtons = () => {
    newGameButton.classList.add('show')
    nextMoveButton.classList.add('hiden')
    stayButton.classList.add('hiden')
};

console.log(stay, gameOver)