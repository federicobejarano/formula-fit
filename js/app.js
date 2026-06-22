// Single in-memory session state for the Formula Fit SPA skeleton.
let appState = {
  usuario: null,
  perfil: {},
  stack: null,
  carrito: [],
  pedido: null
};

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
}
