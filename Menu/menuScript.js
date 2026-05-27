window.onload = function() {
    const initialOverlay = document.getElementById('initial-overlay');
    initialOverlay.addEventListener('click', function() {
        initialOverlay.style.display = 'none';
        playBackgroundMusic();
    });
};

function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play().catch(error => {
        console.error('Error playing background music:', error);
    });
}

const storyTexts = [
    "En un mundo no muy diferente al nuestro...",
    "Los hermanos Millyo y Milly vivían su vida tranquilamente...",
    "Hasta que todo cambió.",
    "Las Monsters aparecieron de la nada.\nEran muchas... demasiadas...",
    "En cuestión de días, las calles, los edificios, el cielo... todo les pertenecía.\nSu energía era inagotable... pero también lo era su hambre de control.",
    "Millyo despertó en un mundo que ya no era el suyo.\nSolo tenía un objetivo: encontrar a su hermana.",
    "Capítulo 1: Un mundo distorsionado"
];

function showStory() {
    const storyOverlay = document.getElementById('story-overlay');
    const storyTextElement = document.getElementById('story-text');
    let currentTextIndex = 0;

    storyOverlay.style.opacity = '1';
    storyOverlay.style.pointerEvents = 'auto';

    function typeText(text, index) {
        if (index < text.length) {
            storyTextElement.innerHTML += text.charAt(index);
            setTimeout(() => typeText(text, index + 1), 50);
        } else {
            storyOverlay.addEventListener('click', nextScreen);
        }
    }

    function nextScreen() {
        storyOverlay.removeEventListener('click', nextScreen);
        currentTextIndex++;
        if (currentTextIndex < storyTexts.length) {
            storyTextElement.innerHTML = '';
            typeText(storyTexts[currentTextIndex], 0);
        } else {
            storyOverlay.style.opacity = '0';
            storyOverlay.style.pointerEvents = 'none';
            const backgroundMusic = document.getElementById('background-music');
            localStorage.setItem('audioCurrentTime', backgroundMusic.currentTime);

            setTimeout(() => {
                window.location.href = '../musiicBrothers.html';
            }, 1000); // Espera 1 segundo antes de redirigir
        }
    }

    typeText(storyTexts[currentTextIndex], 0);
}

// Función para iniciar el juego
document.getElementById('play-button').addEventListener('click', function() {
    const menuContainer = document.querySelector('.menu-container');
    
    // Ocultar el menú
    menuContainer.style.display = 'none';
    
    // Mostrar la historia
    showStory();
});

// Música de fondo
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.1; // Ajusta el volumen

// Efecto de partículas
// for (let i = 0; i < 50; i++) {
//     const particle = document.createElement('div');
//     //particle.classList.add('particle');
//     particle.style.left = `${Math.random() * 100}vw`;
//     particle.style.top = `${Math.random() * 100}vh`;
//     particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
//     particle.style.position = 'absolute';
//     particle.style.width = '10px';
//     particle.style.height = '10px';
//     particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
//     particle.style.borderRadius = '50%';
//     particle.style.animation = 'floatParticle 5s infinite ease-in-out';
//     document.body.appendChild(particle);
// }


// Partículas con canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Configuración de partículas
const PARTICLE_COUNT = 50;
const COLORS = ['#ff00ff', '#00e0ff', '#fff', '#ffd700']; // Puedes poner los colores que quieras

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.5 + 0.5
    };
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }
}
initParticles();

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function updateParticles() {
    for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y - p.r > canvas.height) {
            // Reinicia la partícula arriba
            p.x = Math.random() * canvas.width;
            p.y = -p.r;
            p.r = Math.random() * 4 + 3;
            p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            p.speedX = (Math.random() - 0.5) * 0.5;
            p.speedY = Math.random() * 0.7 + 0.2;
            p.alpha = Math.random() * 0.5 + 0.5;
        }
    }
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

const menuMain = document.getElementById('menu-main');
const menuCredits = document.getElementById('menu-credits');
const creditsButton = document.getElementById('credits-button');
const backMenuButton = document.getElementById('back-menu');

// Mostrar créditos
creditsButton.onclick = () => {
  menuMain.style.opacity = '0';
  setTimeout(() => {
    menuMain.style.display = 'none';
    menuCredits.style.display = 'block';
    setTimeout(() => menuCredits.style.opacity = '1', 10);
  }, 700);
};

// Volver al menú
backMenuButton.onclick = () => {
  menuCredits.style.opacity = '0';
  setTimeout(() => {
    menuCredits.style.display = 'none';
    menuMain.style.display = 'block';
    setTimeout(() => menuMain.style.opacity = '1', 10);
  }, 700);
};