/* ==========================================================================
   VICTOR'S MUSIC — boot.js
   Runs chrome + widgets + the page initialiser for <body data-page="…">.
   Every init is isolated so one failure never blanks the page.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;

  function safe(label, fn) {
    try { fn(); } catch (e) {
      if (window.console) console.error('[VM:' + label + ']', e);
    }
  }

  function boot() {
    safe('layout', function () { VM.bootLayout(); });
    safe('cards', function () { VM.cardsBoot(); });
    var page = (document.body && document.body.getAttribute('data-page')) || '';
    var fn = VM.pages && VM.pages[page];
    if (!fn && document.body) {
      var mode = document.body.getAttribute('data-mode');
      if (mode || page === 'shop') fn = VM.pages && VM.pages.catalog;
    }
    if (fn) safe('page:' + page, fn);
    /* reveal anything the page init rendered */
    safe('reveal', function () { VM.wireReveal(); });
    safe('scrollers', function () { VM.wireScrollers(); });
    /* cart badge sync when storage changes in other tabs */
    window.addEventListener('storage', function (e) {
      if (e.key === VM.CART_KEY || e.key === VM.WISH_KEY) {
        VM.cartData = VM.store.get(VM.CART_KEY, {});
        VM.wishData = VM.store.get(VM.WISH_KEY, []);
        VM.refreshHeader();
        VM.cart.fire();
        VM.wish.fire();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
