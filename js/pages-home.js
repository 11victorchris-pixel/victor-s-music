/* ==========================================================================
   VIC MUSICAL STORE — pages-home.js
   Populates homepage sections.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  var VIBE_ART = { premium: 'kp2', rock: 'eg1', savage: 'sp2', creative: 'scn_creative', professional: 'scn_pro', energetic: 'hp1' };

  function vibeCards() {
    var host = VM.$('#vibeGrid');
    if (!host) return;
    host.innerHTML = VM.VIBES.map(function (v) {
      var art = VIBE_ART[v.key];
      var artUrl = VM.IMGS[art] || '';
      var veilClass = 'vc-veil';
      var img = artUrl
        ? '<img class="vc-bg" src="' + artUrl + '" alt="' + VM.esc(v.title) + '" loading="lazy" onerror="this.style.display=\'none\'">'
        : '<div class="vc-bg" style="background:linear-gradient(160deg,#D4AF37,#0B0B08)"></div>';
      return '<a class="vibe-card reveal" data-vibe="' + v.key + '" href="' + VM.vibeHref(v.key) + '" aria-label="Shop the ' + VM.esc(v.title) + ' vibe">' +
        img + '<div class="' + veilClass + '"></div>' +
        '<div class="vc-in"><span class="vc-icon">' + VM.icon(v.ic) + '</span><div style="margin-top:auto">' +
        '<h3>' + v.title.toUpperCase() + '</h3>' +
        '<p>' + VM.esc(v.tagline) + '</p>' +
        '<span class="vc-go">Explore ' + v.title + ' ' + VM.icon('arrowR') + '</span></div></div></a>';
    }).join('');
  }

  function instTiles() {
    var host = VM.$('#instGrid');
    if (!host) return;
    host.innerHTML = VM.TYPES.map(function (t) {
      var list = VM.productsByType(t.key);
      var p = list.filter(function (x) { return VM.imgSrc(x); })[0] || list[0];
      var img = p && VM.imgSrc(p) ? VM.imgSrc(p) : (p ? VM.coverDataUri(p) : '');
      return '<a class="inst-tile reveal" href="' + VM.typeHref(t.key) + '">' +
        '<div class="it-img"><img src="' + img + '" alt="' + VM.esc(t.name) + '" loading="lazy" onerror="this.onerror=null;this.closest(\'.it-img\').style.background=\'var(--tint)\'">' +
        '<span class="it-em" style="position:absolute;left:10px;bottom:8px;font-size:1.6rem;text-shadow:0 2px 8px rgba(0,0,0,.4)" aria-hidden="true">' + VM.icon(t.ic) + '</span></div>' +
        '<div class="it-body"><span><h3>' + t.name + '</h3>' +
        '<span class="count">' + VM.num(list.length) + ' products</span></span>' +
        '<span class="arrow">' + VM.icon('arrowR') + '</span></div></a>';
    }).join('');
  }

  function rowInto(sel, list, cap) {
    var host = VM.$(sel);
    if (!host) return;
    VM.renderGrid(host, list.slice(0, cap || list.length), {});
  }

  function testimonials() {
    var host = VM.$('#testiGrid');
    if (!host) return;
    host.innerHTML = VM.TESTIMONIALS.slice(0, 3).map(function (t) {
      var initials = t.n.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase();
      return '<div class="testi-card reveal">' +
        '<div class="quote-ic">' + VM.icon('sparkle') + '</div>' +
        '<div class="tc-stars">' + VM.starsHtml(t.r, 15) + '</div>' +
        '<p>\u201C' + VM.esc(t.q) + '\u201D</p>' +
        '<div class="who"><span class="av">' + initials + '</span>' +
        '<span><b>' + VM.esc(t.n) + '</b><small>' + VM.esc(t.c) + ', Nigeria &middot; <span class="verified">' + VM.icon('check') + ' Verified buyer</span></small></span></div>' +
        '</div>';
    }).join('');
  }

  VM.pages.home = function () {
    vibeCards();
    instTiles();
    rowInto('#rowNew', VM.tagged('new'), 10);
    rowInto('#rowBest', VM.tagged('best'), 10);
    var flash = VM.discounted().slice().sort(function (a, b) { return VM.discountPct(b) - VM.discountPct(a); });
    rowInto('#flashGrid', flash, 4);
    testimonials();
    VM.wireReveal();
  };
})();
