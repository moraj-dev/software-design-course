/**
 * Sistema de tema claro/oscuro
 * Maneja el cambio de tema y persistencia en localStorage
 */

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  applyTheme(savedTheme);

  // Listener para cambios en preferencias del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
      location.reload();
    }
  });
}

function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else if (theme === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    // system - dejar que CSS maneje con media queries
    root.removeAttribute('data-theme');
  }

  localStorage.setItem('theme', theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'system';
  let nextTheme = 'system';

  if (currentTheme === 'system') {
    nextTheme = 'light';
  } else if (currentTheme === 'light') {
    nextTheme = 'dark';
  }

  applyTheme(nextTheme);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  if (theme === 'light') {
    btn.innerHTML = '<i class="bi bi-moon-stars"></i> Oscuro';
    btn.title = 'Cambiar a tema oscuro';
  } else if (theme === 'dark') {
    btn.innerHTML = '<i class="bi bi-sun"></i> Claro';
    btn.title = 'Cambiar a tema claro';
  } else {
    btn.innerHTML = '<i class="bi bi-circle-half"></i> Sistema';
    btn.title = 'Cambiar a tema del sistema';
  }
}

document.addEventListener('DOMContentLoaded', initTheme);
