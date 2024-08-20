// Variables del juego
export let points: number = 0;
export let stay: boolean = false;
export let gameOver: boolean = false;

// Función para reiniciar el estado del juego
export function resetGame() {
    points = 0;
    stay = false;
    gameOver = false;
}
