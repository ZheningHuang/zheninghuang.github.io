(function () {
  'use strict';

  var root = document.documentElement;
  var preference = window.matchMedia('(prefers-color-scheme: dark)');
  var savedTheme = null;
  var toggle;

  try {
    var stored = localStorage.getItem('zhening-theme');
    if (stored === 'light' || stored === 'dark') savedTheme = stored;
  } catch (error) {
    // Switching remains available when browser storage is disabled.
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) toggle.setAttribute('aria-checked', String(theme === 'dark'));
  }

  applyTheme(savedTheme || (preference.matches ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {
    toggle = document.getElementById('theme-toggle');
    applyTheme(root.dataset.theme);
    document.querySelector('.appearance-controls').hidden = false;

    toggle.addEventListener('click', function () {
      savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(savedTheme);
      try {
        localStorage.setItem('zhening-theme', savedTheme);
      } catch (error) {
        // The choice still applies for the current visit.
      }
    });
  });

  preference.addEventListener('change', function (event) {
    if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
  });
}());
