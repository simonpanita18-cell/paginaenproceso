// ============================================================
// 1. Botón "Entrar" -> scroll suave a la siguiente sección
// ============================================================
document.getElementById('btnEntrar')?.addEventListener('click', () => {
  document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
});

// ============================================================
// 2. Scroll reveal con IntersectionObserver
// ============================================================
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => observer.observe(item));
} else {
  // fallback simple para navegadores muy viejos
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// ============================================================
// 3. Partículas ambientales muy sutiles (hojas de canela / flores)
// ============================================================
const ambient = document.getElementById('ambient');
const AMBIENT_SYMBOLS = ['🍥', '🌻', '✨', '💕', '☁️', '🤍'];
const AMBIENT_COUNT = window.innerWidth < 600 ? 6 : 12;

if (ambient && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let i = 0; i < AMBIENT_COUNT; i++) {
    const span = document.createElement('span');
    span.textContent = AMBIENT_SYMBOLS[Math.floor(Math.random() * AMBIENT_SYMBOLS.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.fontSize = `${0.8 + Math.random() * 0.9}rem`;
    span.style.animationDuration = `${18 + Math.random() * 14}s`;
    span.style.animationDelay = `${Math.random() * 20}s`;
    ambient.appendChild(span);
  }
}

// ============================================================
// 4. Cinnamon roll interactivo
//    Intenta pedir las frases al backend (/api/frases).
//    Si no está disponible (por ejemplo, abriendo el HTML suelto
//    sin correr Spring Boot), usa una lista local de respaldo.
// ============================================================
const rollButton = document.getElementById('rollButton');
const rollPhrasesContainer = document.getElementById('rollPhrases');

const FRASES_RESPALDO = [
  'Te quiero 🍥',
  'Gracias por estar',
  'Me haces sonreír',
  'Quiero que estemos bien',
  'No necesito perfección',
  'Solo sinceridad',
  'Aunque estemos lejos, te siento cerca',
  'Contigo, incluso en la distancia'
];

let frasesCache = null;

async function obtenerFrases() {
  if (frasesCache) return frasesCache;
  try {
    const res = await fetch('/api/frases');
    if (!res.ok) throw new Error('respuesta no ok');
    frasesCache = await res.json();
    return frasesCache;
  } catch (err) {
    return FRASES_RESPALDO;
  }
}

function lanzarFrase(texto, index) {
  const bubble = document.createElement('span');
  bubble.className = 'roll-phrase';
  bubble.textContent = texto;

  // distribuye las burbujas en un círculo suave alrededor del roll
  const angle = (index * 47) % 360; // 47° para que no se alineen todas
  const radius = 90 + Math.random() * 40;
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * radius;
  const ty = Math.sin(rad) * radius;

  bubble.style.setProperty('--tx', `${tx}px`);
  bubble.style.setProperty('--ty', `${ty}px`);

  rollPhrasesContainer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2700);
}

let clickCount = 0;
rollButton?.addEventListener('click', async () => {
  const frases = await obtenerFrases();
  const frase = frases[clickCount % frases.length];
  lanzarFrase(frase, clickCount);
  clickCount++;
});

// ============================================================
// 5. Corazones al tocar/hacer clic en cualquier parte de la página
//    (detalle kawaii, muy liviano, no interfiere con botones ni links)
// ============================================================
const CLICK_HEARTS = ['💕', '🤍', '🌸'];

function crearCorazonClick(x, y) {
  const heart = document.createElement('span');
  heart.className = 'click-heart';
  heart.textContent = CLICK_HEARTS[Math.floor(Math.random() * CLICK_HEARTS.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1100);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('click', (e) => {
    // evita spamear corazones cuando se toca el cinnamon roll (ya tiene su propia animación)
    if (e.target.closest('#rollButton')) return;
    crearCorazonClick(e.clientX, e.clientY);
  });
}
