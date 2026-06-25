const storyTexts = [
    "En un mundo no muy diferente al nuestro...",
    "Los hermanos Millyo y Milly vivían su vida tranquilamente...",
    "Hasta que todo cambió.",
    "Las Monsters aparecieron de la nada.\nEran muchas... demasiadas...",
    "En cuestión de días, las calles, los edificios, el cielo... todo les pertenecía.\nSu energía era inagotable... pero también lo era su hambre de control.",
    "Millyo despertó en un mundo que ya no era el suyo.\nSolo tenía un objetivo: encontrar a su hermana.",
    "Capítulo 1: Un mundo distorsionado"
];

const menuState = {
    activeIndex: 0,
    menuVisible: false,
    storyActive: false,
    creditsOpen: false
};

window.addEventListener('DOMContentLoaded', initMenu);

function initMenu() {
    const initialOverlay = document.getElementById('initial-overlay');
    initialOverlay.addEventListener('click', onInitialOverlayClick);
    initialOverlay.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onInitialOverlayClick();
        }
    });

    document.addEventListener('keydown', handleKeyDown);

    const menuButtons = getMenuButtons();
    menuButtons.forEach((button, index) => {
        button.dataset.index = index;
        button.addEventListener('click', onMenuButtonClick);
        button.addEventListener('focus', () => {
            menuState.activeIndex = index;
        });
    });

    const backMenuButton = document.getElementById('back-menu');
    backMenuButton.addEventListener('click', () => executeMenuAction('back'));
    backMenuButton.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            executeMenuAction('back');
        }
    });

    focusMenuButton(menuState.activeIndex);
    setAudioVolume(0.1);
}

function onInitialOverlayClick() {
    hideInitialOverlay();
    playBackgroundMusic();
    showMenu();
}

function hideInitialOverlay() {
    const initialOverlay = document.getElementById('initial-overlay');
    initialOverlay.style.display = 'none';
}

function showMenu() {
    const menuMain = document.getElementById('menu-main');
    menuMain.style.opacity = '1';
    menuMain.style.pointerEvents = 'auto';
    menuState.menuVisible = true;
    focusMenuButton(menuState.activeIndex);
}

function hideMenu() {
    const menuMain = document.getElementById('menu-main');
    menuMain.style.opacity = '0';
    menuMain.style.pointerEvents = 'none';
    menuState.menuVisible = false;
}

function getMenuButtons() {
    return Array.from(document.querySelectorAll('.menu-options button'));
}

function onMenuButtonClick(event) {
    const action = event.currentTarget.dataset.action;
    executeMenuAction(action);
}

function executeMenuAction(action) {
    if (menuState.storyActive) {
        return;
    }

    const handler = menuActions[action] || placeholderAction;
    handler(action);
}

const menuActions = {
    play: startGame,
    continue: placeholderAction,
    'chapter-select': placeholderAction,
    options: placeholderAction,
    exit: exitGame,
    credits: openCredits,
    back: closeCredits
};

function startGame() {
    if (menuState.storyActive) {
        return;
    }

    menuState.storyActive = true;
    hideMenu();
    showStory();
}

function placeholderAction(action) {
    const messageMap = {
        continue: 'Continuar estará disponible pronto.',
        'chapter-select': 'Selección de capítulos estará disponible pronto.',
        options: 'Opciones estará disponible pronto.',
        exit: 'Salir estará disponible pronto.'
    };

    const message = messageMap[action] || 'Función próximamente disponible.';
    window.alert(message);
}

function exitGame() {
    window.alert('La opción Salir estará disponible en una versión futura.');
}

function openCredits() {
    hideMenu();
    const creditsOverlay = document.getElementById('credits-overlay');
    creditsOverlay.classList.add('active');
    menuState.creditsOpen = true;
    document.getElementById('back-menu').focus();
}

function closeCredits() {
    const creditsOverlay = document.getElementById('credits-overlay');
    creditsOverlay.classList.remove('active');
    menuState.creditsOpen = false;
    showMenu();
}

function handleKeyDown(event) {
    const keyboardMenuKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];

    if (menuState.storyActive) {
        return;
    }

    if (menuState.creditsOpen) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeCredits();
        }
        return;
    }

    if (!menuState.menuVisible) {
        return;
    }

    if (!keyboardMenuKeys.includes(event.key)) {
        return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const buttons = getMenuButtons();
        const button = buttons[menuState.activeIndex];
        if (button) {
            button.click();
        }
        return;
    }

    event.preventDefault();
    const buttons = getMenuButtons();
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    moveFocus(delta, buttons);
}

function moveFocus(delta, buttons) {
    if (!buttons.length) {
        return;
    }

    let nextIndex = menuState.activeIndex + delta;
    if (nextIndex < 0) {
        nextIndex = buttons.length - 1;
    } else if (nextIndex >= buttons.length) {
        nextIndex = 0;
    }

    focusMenuButton(nextIndex, buttons);
}

function focusMenuButton(index, buttons = null) {
    const menuButtons = buttons || getMenuButtons();
    const button = menuButtons[index];
    if (!button) {
        return;
    }
    menuState.activeIndex = index;
    button.focus();
}

function setAudioVolume(volume) {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = volume;
    }
}

function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    if (!backgroundMusic) {
        return;
    }
    backgroundMusic.play().catch(error => {
        console.error('Error playing background music:', error);
    });
}

function showStory() {
    const storyOverlay = document.getElementById('story-overlay');
    const storyTextElement = document.getElementById('story-text');
    let currentTextIndex = 0;

    storyTextElement.innerHTML = '';
    storyOverlay.classList.add('active');

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
        currentTextIndex += 1;
        if (currentTextIndex < storyTexts.length) {
            storyTextElement.innerHTML = '';
            typeText(storyTexts[currentTextIndex], 0);
        } else {
            storyOverlay.classList.remove('active');
            const backgroundMusic = document.getElementById('background-music');
            if (backgroundMusic) {
                localStorage.setItem('audioCurrentTime', backgroundMusic.currentTime);
            }

            setTimeout(() => {
                window.location.href = '../musiicBrothers.html';
            }, 1000);
        }
    }

    typeText(storyTexts[currentTextIndex], 0);
}

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const PARTICLE_COUNT = 50;
const COLORS = ['#ff00ff', '#00e0ff', '#fff', '#ffd700'];

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

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function updateParticles() {
    for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.y - particle.r > canvas.height) {
            particle.x = Math.random() * canvas.width;
            particle.y = -particle.r;
            particle.r = Math.random() * 4 + 3;
            particle.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            particle.speedX = (Math.random() - 0.5) * 0.5;
            particle.speedY = Math.random() * 0.7 + 0.2;
            particle.alpha = Math.random() * 0.5 + 0.5;
        }
    }
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
