// Single in-memory session state for the Formula Fit SPA skeleton.
let appState = {
  usuario: null,
  perfil: {},
  stack: null,
  carrito: [],
  pedido: null
};

// Quiz wizard state
let quizStep = 0;

const LOADER_MESSAGES = [
  {
    title: "Analizando metricas...",
    detail: "Leyendo objetivo, nivel y timing de entrenamiento."
  },
  {
    title: "Formulando proporciones...",
    detail: "Cruzando tu perfil con reglas de compatibilidad del stack."
  },
  {
    title: "Ensamblando tu Stack...",
    detail: "Preparando una recomendacion lista para revisar."
  }
];

let loaderTimers = [];

function formatCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

/**
 * Switches the active view in the SPA.
 * Removes .active and adds .hidden to all views, then sets .active on the target.
 * @param {string} viewId - The id of the target view section (e.g., 'login', 'quiz').
 */
function navigateTo(viewId) {
  const views = document.querySelectorAll('.view');

  views.forEach(view => {
    view.classList.remove('active');
    view.classList.add('hidden');
  });

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.remove('hidden');
    targetView.classList.add('active');
  }

  document.body.classList.toggle('is-checkout', viewId === 'carrito');

  if (viewId === 'loader') {
    startLoaderSequence();
  } else {
    clearLoaderTimers();
  }

  if (viewId === 'carrito') {
    prepareCheckout();
  }
}

/**
 * Clears pending loader timers when the user leaves the loader view.
 */
function clearLoaderTimers() {
  loaderTimers.forEach(timerId => clearTimeout(timerId));
  loaderTimers = [];
}

/**
 * Rotates loader messages and advances the happy path to results.
 */
function startLoaderSequence() {
  clearLoaderTimers();

  const title = document.getElementById('loader-title');
  const detail = document.getElementById('loader-detail');

  if (!title || !detail) {
    return;
  }

  LOADER_MESSAGES.forEach((message, index) => {
    const timerId = setTimeout(() => {
      title.textContent = message.title;
      detail.textContent = message.detail;
    }, index * 800);

    loaderTimers.push(timerId);
  });

  loaderTimers.push(setTimeout(() => navigateTo('resultados'), 2500));
}

/**
 * Handles the login form submission.
 * Saves email to appState and optionally to localStorage, then navigates to quiz.
 * @param {Event} e - The submit event.
 */
function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();

  appState.usuario = { email };

  localStorage.setItem('formulafit_email', email);

  quizStep = 0;
  appState.perfil = {};
  renderQuizStep();
  navigateTo('quiz');
}

/**
 * Renders the current quiz step: updates title, subtitle, progress bar, and option cards.
 */
function renderQuizStep() {
  const step = QUIZ_STEPS[quizStep];
  const options = OPCIONES[step.key];
  const progress = ((quizStep + 1) / QUIZ_STEPS.length) * 100;

  document.getElementById('step-label').textContent = `Paso ${quizStep + 1} de ${QUIZ_STEPS.length}`;
  document.getElementById('quiz-progress-bar').value = progress;
  document.getElementById('quiz-title').textContent = step.title;
  document.getElementById('quiz-subtitle').textContent = step.subtitle;

  const btnBack = document.getElementById('quiz-btn-back');
  const btnNext = document.getElementById('quiz-btn-next');

  btnBack.style.visibility = quizStep === 0 ? 'hidden' : 'visible';

  const isLastStep = quizStep === QUIZ_STEPS.length - 1;
  btnNext.textContent = isLastStep ? 'Formular mi Stack' : 'Siguiente';

  const selectedValue = appState.perfil[step.key] || null;
  btnNext.disabled = !selectedValue;

  const grid = document.getElementById('option-grid');
  grid.innerHTML = '';

  options.forEach(opt => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'option-card';
    card.setAttribute('role', 'radio');
    card.setAttribute('aria-checked', selectedValue === opt.val ? 'true' : 'false');
    card.dataset.value = opt.val;

    if (selectedValue === opt.val) {
      card.classList.add('selected');
    }

    card.innerHTML = `
      <span class="option-icon" aria-hidden="true">${opt.icon}</span>
      <span class="option-label">${opt.label}</span>
    `;

    card.addEventListener('click', () => handleOptionSelect(step.key, opt.val));
    grid.appendChild(card);
  });
}

/**
 * Handles selection of an option card in the quiz.
 * Saves the selection to appState.perfil and updates the UI.
 * @param {string} key - The perfil field (objetivo, nivel, restriccion, horario).
 * @param {string} value - The selected value.
 */
function handleOptionSelect(key, value) {
  appState.perfil[key] = value;

  const cards = document.querySelectorAll('#option-grid .option-card');
  cards.forEach(card => {
    const isSelected = card.dataset.value === value;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
  });

  document.getElementById('quiz-btn-next').disabled = false;
}

/**
 * Navigates to the previous quiz step.
 */
function quizGoBack() {
  if (quizStep > 0) {
    quizStep--;
    renderQuizStep();
  }
}

/**
 * Navigates to the next quiz step, or to loader if on the last step.
 */
function quizGoNext() {
  const step = QUIZ_STEPS[quizStep];

  if (!appState.perfil[step.key]) {
    return;
  }

  if (quizStep < QUIZ_STEPS.length - 1) {
    quizStep++;
    renderQuizStep();
  } else {
    navigateTo('loader');
  }
}

function readStaticResultsItems() {
  return Array.from(document.querySelectorAll('#resultados .product-card')).map(card => {
    const img = card.querySelector('img');
    const price = card.querySelector('.product-price')?.textContent.replace('$', '') || '0';

    return {
      id: img?.src.split('/').pop().replace('.png', '') || card.querySelector('h3').textContent,
      nombre: card.querySelector('h3').textContent,
      categoria: card.querySelector('.product-category')?.textContent || 'Stack personalizado',
      precio: Number(price),
      img: img?.getAttribute('src') || '',
      cantidad: 1
    };
  });
}

function prepareCheckout() {
  if (appState.carrito.length === 0) {
    const stackItems = appState.stack?.items || readStaticResultsItems();
    appState.carrito = stackItems.map(item => ({
      ...item,
      cantidad: item.cantidad || 1
    }));
  }

  renderCheckout();
}

function calculateCartTotal() {
  return appState.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function renderCheckout() {
  const cartLines = document.getElementById('cart-lines');
  const subtotal = document.getElementById('checkout-subtotal');
  const total = document.getElementById('checkout-total');

  if (!cartLines || !subtotal || !total) {
    return;
  }

  cartLines.innerHTML = appState.carrito.map((item, index) => `
    <article class="cart-line">
      <img src="${item.img}" alt="${item.nombre}">
      <div class="cart-line-info">
        <p class="product-category">${item.categoria}</p>
        <h3>${item.nombre}</h3>
        <div class="quantity-stepper" aria-label="Cantidad de ${item.nombre}">
          <button type="button" data-quantity-action="decrease" data-cart-index="${index}" aria-label="Restar unidad">-</button>
          <span>${item.cantidad}</span>
          <button type="button" data-quantity-action="increase" data-cart-index="${index}" aria-label="Sumar unidad">+</button>
        </div>
      </div>
      <strong>${formatCurrency(item.precio * item.cantidad)}</strong>
    </article>
  `).join('');

  const cartTotal = calculateCartTotal();
  subtotal.textContent = formatCurrency(cartTotal);
  total.textContent = formatCurrency(cartTotal);
}

function handleQuantityClick(e) {
  const button = e.target.closest('[data-quantity-action]');
  if (!button) {
    return;
  }

  const item = appState.carrito[Number(button.dataset.cartIndex)];
  if (!item) {
    return;
  }

  if (button.dataset.quantityAction === 'increase') {
    item.cantidad++;
  } else if (item.cantidad > 1) {
    item.cantidad--;
  }

  renderCheckout();
}

function construirPedido() {
  const hoy = new Date();
  const total = calculateCartTotal();

  return {
    ID_Transaccion: {
      Fecha: { aa: hoy.getFullYear(), mm: hoy.getMonth() + 1, dd: hoy.getDate() },
      Email_Usuario: appState.usuario?.email || 'demo@formulafit.local',
      Hash: `FF-${Date.now().toString(36).toUpperCase()}`
    },
    Perfil_Atleta: {
      Objetivo: appState.perfil.objetivo,
      Nivel: appState.perfil.nivel,
      Restriccion: appState.perfil.restriccion,
      Hora_Entrenamiento: appState.perfil.horario
    },
    Precio_Final: Number(total.toFixed(2)),
    Estado_Checkout: 'Pagado'
  };
}

function openConfirmation() {
  appState.pedido = construirPedido();

  const overlay = document.getElementById('confirmation-overlay');
  const summary = document.getElementById('confirmation-summary');

  if (summary) {
    const tx = appState.pedido.ID_Transaccion;
    summary.innerHTML = `
      <p><span>ID Transaccion</span><strong>${tx.Hash}</strong></p>
      <p><span>Email</span><strong>${tx.Email_Usuario}</strong></p>
      <p><span>Total</span><strong>${formatCurrency(appState.pedido.Precio_Final)}</strong></p>
    `;
  }

  overlay?.classList.remove('hidden');
}

function closeConfirmation() {
  document.getElementById('confirmation-overlay')?.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  const savedEmail = localStorage.getItem('formulafit_email');
  if (savedEmail) {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.value = savedEmail;
    }
  }

  const btnBack = document.getElementById('quiz-btn-back');
  const btnNext = document.getElementById('quiz-btn-next');

  if (btnBack) {
    btnBack.addEventListener('click', quizGoBack);
  }

  if (btnNext) {
    btnNext.addEventListener('click', quizGoNext);
  }

  document.querySelectorAll('button[data-target]:not([type="submit"])').forEach(button => {
    button.addEventListener('click', () => navigateTo(button.dataset.target));
  });

  document.getElementById('cart-lines')?.addEventListener('click', handleQuantityClick);
  document.querySelector('[data-open-confirmation]')?.addEventListener('click', openConfirmation);
  document.querySelector('[data-close-confirmation]')?.addEventListener('click', closeConfirmation);

  renderQuizStep();
});
