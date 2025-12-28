// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Check on load

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 🔥 Pre-warming: Despertar el servidor de Render en background
const RENDER_APP_URL = 'https://facturas-app-v2.onrender.com';
let appReady = false;

function wakeUpRenderApp() {
    console.log('🌟 Despertando servidor en Render...');

    // Hacer ping al servidor
    fetch(RENDER_APP_URL, {
        mode: 'no-cors', // Evita errores CORS
        cache: 'no-cache'
    })
        .then(() => {
            console.log('✅ Servidor de Render está despierto');
            appReady = true;
        })
        .catch((error) => {
            console.log('⚠️ Ping enviado (normal con no-cors)');
            appReady = true; // Asumir que está despierto
        });
}

// Despertar el servidor 2 segundos después de cargar la landing
setTimeout(() => {
    wakeUpRenderApp();
}, 2000);

// También despertar cuando el usuario hace hover en los botones principales
document.querySelectorAll('.btn-primary, .cta-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!appReady) {
            wakeUpRenderApp();
        }
    }, { once: true });
});
