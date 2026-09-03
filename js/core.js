/* ==========================================================================
   VICTOR'S MUSIC — core.js
   Shared helpers: icons, formatting, storage, cart & wishlist, toasts,
   generated product cover fallbacks, theme switching.
   ========================================================================== */
(function () {
  'use strict';
  var VM = (window.VM = window.VM || {});

  /* ---------- tiny DOM helpers ---------- */
  VM.$ = function (sel, root) { return (root || document).querySelector(sel); };
  VM.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  VM.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  };

  /* ---------- storage (safe for file:// & private modes) ---------- */
  VM.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  /* ---------- formatting ---------- */
  VM.money = function (n) {
    n = Math.round(Number(n) || 0);
    return '\u20A6' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  VM.num = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  VM.starsHtml = function (rating, size) {
    rating = Math.max(0, Math.min(5, rating || 0));
    var pct = Math.round((rating / 5) * 100);
    var fs = size || 15;
    return '<span class="star-row" style="font-size:' + fs + 'px" aria-label="' + rating.toFixed(1) + ' out of 5 stars">' +
      '<span class="back">\u2605\u2605\u2605\u2605\u2605</span>' +
      '<span class="fill" style="width:' + pct + '%"><span>\u2605\u2605\u2605\u2605\u2605</span></span></span>';
  };

  /* ---------- icons (svg) ---------- */
  var IC = {
    logo: '<path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/><circle fill="currentColor" cx="6" cy="18" r="3"/><circle fill="currentColor" cx="18" cy="15" r="3"/><path fill="currentColor" d="M14 7h6v3h-6z"/>',
    search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M20 20l-3.5-3.5"/>',
    heart: '<path d="M12 21s-7.5-4.9-10-9.5C.6 8.3 2.4 4.8 5.7 4.3c2-.3 3.9.5 5.1 2.1L12 8l1.2-1.6c1.2-1.6 3.1-2.4 5.1-2.1 3.3.5 5.1 4 3.7 7.2-2.5 4.6-10 9.5-10 9.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    heartF: '<path d="M12 21s-7.5-4.9-10-9.5C.6 8.3 2.4 4.8 5.7 4.3c2-.3 3.9.5 5.1 2.1L12 8l1.2-1.6c1.2-1.6 3.1-2.4 5.1-2.1 3.3.5 5.1 4 3.7 7.2-2.5 4.6-10 9.5-10 9.5z" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2"/>',
    menu: '<path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M4 6.5h16M4 12h16M4 17.5h16"/>',
    x: '<path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>',
    chevD: '<path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/>',
    chevR: '<path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6"/>',
    arrowR: '<path stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15m-6-6l6 6-6 6"/>',
    check: '<path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.5l5 5 10-11"/>',
    plus: '<path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M12 5v14M5 12h14"/>',
    minus: '<path stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m4 0l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 11v6M14 11v6"/>',
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/>',
    returns: '<path d="M3 12a9 9 0 1 0 3-6.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M3 4v5h5"/>',
    support: '<path d="M4 13a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="4" height="6" rx="2" fill="currentColor"/><rect x="17" y="13" width="4" height="6" rx="2" fill="currentColor"/><path d="M20 19a3 3 0 0 1-3 3h-3" fill="none" stroke="currentColor" stroke-width="2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7l8 6 8-6"/>',
    pin: '<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 7v5l3.5 2"/>',
    flame: '<path d="M12 23c4.4 0 7-3 7-7 0-4-3-6-4.5-9C13 4.5 13 2 13 2s-1 2-2 4c-2 4-8 5.5-8 10 0 4 2.6 7 9 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 23c1.5 0 3-1 3-3 0-2-2-3-3-5-1 2-3 3-3 5 0 2 1.5 3 3 3z" fill="currentColor"/>',
    tag: '<path d="M20 13l-7 7a2 2 0 0 1-2.8 0L3 12.8V3h9.8l7.2 7.2a2 2 0 0 1 0 2.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.6" fill="currentColor"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 8l9 5 9-5M12 13v9"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    filter: '<path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M7 12h10M10 18h4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>',
    info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 11v5"/><circle cx="12" cy="8" r="1" fill="currentColor"/>',
    bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor"/>',
    music: '<path fill="currentColor" d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    sparkle: '<path fill="currentColor" d="M12 2l2.2 7.3L22 12l-7.8 2.7L12 22l-2.2-7.3L2 12l7.8-2.7L12 2z"/>',
    fb: '<path fill="currentColor" d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8z"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>',
    tt: '<path fill="currentColor" d="M16.6 3c.4 2 1.6 3.4 3.4 3.6v2.6c-1.3 0-2.5-.4-3.4-1v6.6a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v2.7a3.3 3.3 0 1 0 2.4 3.2V3h2.6z"/>',
    xico: '<path fill="currentColor" d="M17.5 3h3l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.3 21h-3l7.2-8.2L2.5 3h6.3l4.4 5.8L17.5 3zm-1 16h1.7L7.6 4.7H5.8L16.5 19z"/>',
    yt: '<rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10.2 9.5v5l4.6-2.5-4.6-2.5z"/>'
  };
  VM.icon = function (name, cls) {
    var s = IC[name] || IC.music;
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + s + '</svg>';
  };

  /* ---------- cart ---------- */
  VM.CART_KEY = 'vm_cart_v1';
  VM.WISH_KEY = 'vm_wish_v1';
  VM.cartData = VM.store.get(VM.CART_KEY, {});
  VM.wishData = VM.store.get(VM.WISH_KEY, []);
  VM.cartListeners = [];

  VM.cart = {
    save: function () { VM.store.set(VM.CART_KEY, VM.cartData); VM.cart.fire(); },
    fire: function () { for (var i = 0; i < VM.cartListeners.length; i++) { try { VM.cartListeners[i](); } catch (e) { } } },
    on: function (fn) { VM.cartListeners.push(fn); },
    count: function () { var n = 0, k; for (k in VM.cartData) if (VM.cartData.hasOwnProperty(k)) n += VM.cartData[k]; return n; },
    lines: function () {
      var out = [], k;
      for (k in VM.cartData) if (VM.cartData.hasOwnProperty(k) && VM.cartData[k] > 0) {
        var p = VM.prodById(k);
        if (p) out.push({ p: p, q: VM.cartData[k] });
      }
      return out;
    },
    add: function (id, qty, silent) {
      var p = VM.prodById(id);
      if (!p) return false;
      if (p.s === 'out') { VM.toast('Out of stock', 'This item is currently unavailable.', 'err'); return false; }
      qty = qty || 1;
      var stockCap = p.s === 'low' ? 5 : 20;
      VM.cartData[id] = Math.min(stockCap, (VM.cartData[id] || 0) + qty);
      VM.cart.save();
      if (!silent) {
        VM.toast('Added to cart', p.n, 'ok', { label: 'View cart', fn: function () { VM.openCart(); } });
      }
      return true;
    },
    setQty: function (id, q) {
      if (q <= 0) delete VM.cartData[id]; else VM.cartData[id] = q;
      VM.cart.save();
    },
    remove: function (id) { delete VM.cartData[id]; VM.cart.save(); },
    clear: function () { VM.cartData = {}; VM.cart.save(); },
    subtotal: function () {
      var t = 0;
      VM.cart.lines().forEach(function (l) { t += l.p.p * l.q; });
      return t;
    },
    delivery: function () { return VM.cart.subtotal() >= VM.FREE_DELIVERY_FROM ? 0 : VM.DELIVERY_FEE; },
    total: function () { return VM.cart.subtotal() + VM.cart.delivery(); }
  };

  VM.wish = {
    save: function () { VM.store.set(VM.WISH_KEY, VM.wishData); VM.wish.fire(); },
    fire: function () { for (var i = 0; i < VM.cartListeners.length; i++) { try { VM.cartListeners[i](); } catch (e) { } } },
    on: function (fn) { VM.cartListeners.push(fn); },
    has: function (id) { return VM.wishData.indexOf(id) !== -1; },
    add: function (id) { if (!VM.wish.has(id)) VM.wishData.push(id); VM.wish.save(); },
    remove: function (id) { VM.wishData = VM.wishData.filter(function (x) { return x !== id; }); VM.wish.save(); },
    toggle: function (id, silent) {
      if (VM.wish.has(id)) { VM.wish.remove(id); if (!silent) VM.toast('Removed from wishlist', VM.prodById(id) ? VM.prodById(id).n : '', 'heart'); return false; }
      VM.wish.add(id);
      if (!silent) VM.toast('Saved to wishlist', VM.prodById(id) ? VM.prodById(id).n : '', 'heart', { label: 'View list', fn: function () { window.location.href = 'wishlist.html'; } });
      return true;
    },
    items: function () { return VM.wishData.map(VM.prodById).filter(Boolean); }
  };

  /* ---------- toasts ---------- */
  VM.toast = function (title, msg, kind, action) {
    var host = VM.$('.toasts');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toasts';
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    var t = document.createElement('div');
    t.className = 'toast';
    var ick = kind === 'err' ? 'ic-err' : (kind === 'warn' ? 'ic-warn' : (kind === 'heart' ? 'ic-heart' : ''));
    var icn = kind === 'heart' ? 'heartF' : (kind === 'ok' || !kind ? 'check' : (kind === 'err' ? 'x' : 'sparkle'));
    t.innerHTML = '<span class="t-ic ' + ick + '">' + VM.icon(icn) + '</span>' +
      '<span><b>' + VM.esc(title) + '</b>' + (msg ? '<small>' + VM.esc(msg) + '</small>' : '') + '</span>' +
      (action ? '<button class="t-act">' + VM.esc(action.label) + '</button>' : '');
    if (action) t.querySelector('.t-act').addEventListener('click', function () { action.fn(); });
    host.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () {
      t.classList.remove('in');
      setTimeout(function () { t.remove(); }, 350);
    }, 3400);
  };

  /* ---------- generated cover fallback ---------- */
  VM.VIBE_GRADS = {
    premium: ['#3a3117', '#0d0c09'], rock: ['#7a1505', '#140b0d'], savage: ['#0f4d05', '#0a120b'],
    creative: ['#5b0d99', '#7c1d8f'], professional: ['#0f3d91', '#0a2149'], energetic: ['#b35500', '#201205']
  };
  VM.TYPE_EMOJI = { guitars: '\u{1F3B8}', drums: '\u{1F941}', keyboards: '\u{1F3B9}', microphones: '\u{1F3A4}', speakers: '\u{1F50A}', headphones: '\u{1F3A7}', studio: '\u{1F39B}\uFE0F', accessories: '\u{1F50C}' };
  VM.coverDataUri = function (p) {
    var g = VM.VIBE_GRADS[p.v] || ['#0A1F44', '#06152E'];
    var em = VM.TYPE_EMOJI[p.t] || '\u{1F3B5}';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="660">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + g[0] + '"/><stop offset="1" stop-color="' + g[1] + '"/></linearGradient></defs>' +
      '<rect width="720" height="660" fill="url(#g)"/>' +
      '<circle cx="360" cy="330" r="200" fill="rgba(255,255,255,.08)"/>' +
      '<circle cx="360" cy="330" r="150" fill="rgba(255,255,255,.07)"/>' +
      '<circle cx="360" cy="330" r="98" fill="rgba(255,255,255,.10)"/>' +
      '<text x="360" y="392" font-size="150" text-anchor="middle">' + em + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };
  VM.imgSrc = function (p) {
    if (!p) return '';
    var u = p.img ? (VM.IMGS && VM.IMGS[p.img]) : '';
    if (typeof u === 'string' && u) return u;
    if (typeof p.img === 'string' && p.img.indexOf('http') === 0) return p.img;
    return '';
  };
  VM.imgTag = function (p, cls, alt) {
    var src = VM.imgSrc(p);
    var tag = '<img class="' + (cls || '') + '" alt="' + VM.esc(alt || p.n) + '" loading="lazy" decoding="async" data-ty="' + (p.t || '') + '" data-vb="' + (p.v || '') + '"';
    if (src) { tag += ' src="' + src + '" onerror="VM.imgErr(this)">'; }
    else { tag += ' src="' + VM.coverDataUri(p) + '">'; }
    return tag;
  };
  VM.imgErr = function (img) {
    if (!img || img.__fallback) return;
    img.__fallback = true;
    try {
      var cover = VM.coverDataUri({ t: img.getAttribute('data-ty') || 'accessories', v: img.getAttribute('data-vb') || '' });
      img.src = cover;
    } catch (e) { }
  };

  /* ---------- themes ---------- */
  VM.themeOf = function (vibe) { return vibe || 'navy'; };
  VM.setTheme = function (vibe) {
    var t = VM.themeOf(vibe);
    if (t === 'navy') document.body.removeAttribute('data-theme');
    else document.body.setAttribute('data-theme', t);
  };
  /* soft fade so theme swap feels smooth */
  VM.softFade = function (el) {
    if (!el) return;
    el.style.transition = 'opacity .18s ease';
    el.style.opacity = '0';
    setTimeout(function () { el.style.opacity = '1'; }, 30);
  };

  /* ---------- misc ---------- */
  VM.qs = function (name) {
    try {
      var p = new URLSearchParams(window.location.search);
      return p.get(name);
    } catch (e) {
      var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
    }
  };
  VM.initials = function (name) {
    return String(name || 'VM').replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w[0]; }).join('').toUpperCase() || 'VM';
  };
})();
