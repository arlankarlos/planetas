
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Estados das teclas
let left = false;
let right = false;
let up = false;
let down = false;

// Posição do personagem
let nave = {
    x: 200,
    y: 330,
    velocidade: 2
};

let planetas = [
    {x: 200, y: 300, tamanho: 20},
    {x: 400, y: 100, tamanho: 30},
    {x: 600, y: 500, tamanho: 25},
    //{x: 50, y: 200, tamanho: 35},
    {x: 700, y: 10, tamanho: 20}
];

let score = 0;
let lives = 3;

// Função mostrar score da variável let score canto superior esquerdo
function mostrarScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Lives: ' + lives, 10, 40);
}


// Funções para desenhar

function drawPlanetas() {
    planetas.forEach(planeta => {
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(planeta.x, planeta.y, planeta.tamanho, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawPercurso() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    for (let i = 0; i < planetas.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(planetas[i].x, planetas[i].y);
        ctx.lineTo(planetas[i + 1].x, planetas[i + 1].y);
        ctx.stroke();
    }
}
function drawNave() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(nave.x - 5, nave.y + 5);
    ctx.lineTo(nave.x + 5, nave.y + 5);
    ctx.lineTo(nave.x, nave.y - 10);
    ctx.closePath();
    ctx.fill();
}

// Funções para atualizar
function updateNave() {
    if (left) nave.x -= nave.velocidade;
    if (right) nave.x += nave.velocidade;
    if (up) nave.y -= nave.velocidade;
    if (down) nave.y += nave.velocidade;

    if ((Math.abs(nave.x - planetas[planetas.length - 1].x)) <= nave.velocidade &&
        (Math.abs(nave.y - planetas[planetas.length - 1].y)) <= nave.velocidade) {
        score++;
        alert('Você completou o percurso!');
        window.location.reload();
    }

    if ((lives > 0 && score < planetas.length - 1 &&
         (Math.abs(nave.x - planetas[planetas.indexOf(planetas[planetas.length - 1])].x)) <= nave.velocidade &&
         (Math.abs(nave.y - planetas[planetas.indexOf(planetas[planetas.length - 1])].y)) <= nave.velocidade)
        || lives < 0) {
        nave.x = canvas.width / 2;
        nave.y = canvas.height / 2;
        lives--;
    }
}

// Funções para atualizar
let keysPressed = {};

function gameLoop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    drawPlanetas();
    drawPercurso();
    drawNave();
    mostrarScore();

    updateNave();

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') left = true;
        if (event.key === 'ArrowRight') right = true;
        if (event.key === 'ArrowUp') up = true;
        if (event.key === 'ArrowDown') down = true;
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') left = false;
        if (event.key === 'ArrowRight') right = false;
        if (event.key === 'ArrowUp') up = false;
        if (event.key === 'ArrowDown') down = false;
    });

    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();