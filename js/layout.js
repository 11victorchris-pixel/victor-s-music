/* ==========================================================================
   VIC MUSICAL STORE — layout.js
   Renders chrome (topbar, header, footer, overlays) and wires global UI:
   nav, dropdowns, mobile menu, search overlay, cart drawer, newsletter.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;

  /* ---------- page helpers ---------- */
  function link(page) { return page === 'index' ? 'index.html' : page + '.html'; }
  function typeHref(t) { return 'shop.html?type=' + encodeURIComponent(t.key); }
  function vibeHref(v) { return 'shop.html?vibe=' + encodeURIComponent(v.key); }
  VM.typeHref = function (key) {
    var t = VM.TYPES.filter(function (x) { return x.key === key; })[0];
    return typeHref(t || { key: key });
  };
  VM.vibeHref = function (key) { return vibeHref(VM.VIBES.filter(function (x) { return x.key === key; })[0] || { key: key }); };

  var PAGES = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'shop', label: 'Shop', href: 'shop.html' },
    { key: 'sales', label: 'Sales', href: 'sales.html' },
    { key: 'new', label: 'New Arrivals', href: 'new-arrivals.html' },
    { key: 'best', label: 'Best Sellers', href: 'best-sellers.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  /* ---------- brand ---------- */
  function brandHtml(footer) {
    return '<a class="brand" href="index.html" aria-label="Vic Musical Store home">' +
      '<span class="mark">' + VM.icon('logo') + '</span>' +
      '<span class="name">VIC MUSICAL STORE<span>One Store \u00B7 Many Vibes \u00B7 Endless Sound</span></span></a>';
  }

  /* ---------- header ---------- */
  function headerHtml() {
    var page = document.body.getAttribute('data-page') || '';
    var nav = PAGES.map(function (p) {
      var on = p.key === page ? ' active' : '';
      return '<a href="' + p.href + '"' + on + '>' + VM.esc(p.label) + '</a>';
    }).join('');
    var vibes = VM.VIBES.map(function (v) {
      return '<a href="' + vibeHref(v) + '"><span class="vibe-dot dot-' + v.key + '"></span>' + v.title + '</a>';
    }).join('');
    var types = VM.TYPES.map(function (t) {
      return '<a href="' + typeHref(t) + '"><span class="em">' + VM.icon(t.ic) + '</span>' + t.name + '</a>';
    }).join('');

    return '<div class="page-wrap nav-row">' + brandHtml() +
      '<nav class="main-nav" aria-label="Main navigation">' +
      '<a href="index.html" class="' + (page === 'home' ? 'active' : '') + '">Home</a>' +
      '<a href="shop.html" class="' + ((page === 'shop' || page === 'product') ? 'active' : '') + '">Shop</a>' +
      '<div class="has-dd"><a href="#" aria-haspopup="true" class="cat-link">Categories ' + VM.icon('chevD', 'dd-caret') + '</a>' +
      '<div class="mega" role="menu">' +
      '<div><h4>Shop by Music Vibe</h4><div class="links vibe-panel">' + vibes + '</div></div>' +
      '<div><h4>Shop by Instrument</h4><div class="links">' + types + '</div></div>' +
      '</div></div>' +
      '<a href="new-arrivals.html" class="' + (page === 'new' ? 'active' : '') + '">New Arrivals</a>' +
      '<a href="best-sellers.html" class="' + (page === 'best' ? 'active' : '') + '">Best Sellers</a>' +
      '<a href="sales.html" class="' + (page === 'sales' ? 'active' : '') + '">Sales</a>' +
      '<a href="about.html" class="' + (page === 'about' ? 'active' : '') + '">About</a>' +
      '<a href="contact.html" class="' + (page === 'contact' ? 'active' : '') + '">Contact</a>' +
      '</nav>' +
      '<div class="nav-cta">' +
      '<button class="icon-btn" data-action="search" aria-label="Search products">' + VM.icon('search') + '</button>' +
      '<a class="icon-btn" href="account.html" aria-label="My account" title="My account">' + VM.icon('user') + '</a>' +
      '<a class="icon-btn" href="wishlist.html" aria-label="Wishlist">' + VM.icon('heart') +
      '<span class="badge wish-badge" style="display:none">0</span></a>' +
      '<a class="icon-btn cart-btn" href="cart.html" data-action="cart" aria-label="Shopping cart">' + VM.icon('bag') +
      '<span class="badge cart-badge" style="display:none">0</span></a>' +
      '<button class="icon-btn burger" data-action="menu" aria-label="Open menu">' + VM.icon('menu') + '</button>' +
      '</div></div>';
  }

  function topbarHtml() {
    return '<div class="page-wrap">' +
      '<span class="msg">' + VM.icon('bolt') + ' Flash Sale Live &mdash; up to <b>&nbsp;50% OFF&nbsp;</b> selected gear</span>' +
      '<span class="msg hide-msg">' + VM.icon('truck') + ' Free delivery on orders over \u20A6500,000</span>' +
      '<span class="right"><a href="sales.html">Hot Deals</a><a href="contact.html">Help &amp; Support</a></span>' +
      '</div>';
  }

  /* ---------- footer ---------- */
  function footerHtml() {
    var types = VM.TYPES.map(function (t) {
      return '<li><a href="' + typeHref(t) + '">' + VM.icon('chevR') + t.name + '</a></li>';
    }).join('');
    var socials = [
      { k: 'fb', l: 'Facebook' }, { k: 'ig', l: 'Instagram' }, { k: 'tt', l: 'TikTok' },
      { k: 'xico', l: 'X' }, { k: 'yt', l: 'YouTube' }
    ].map(function (s) {
      return '<a class="soc" href="#" aria-label="' + s.l + '">' + VM.icon(s.k) + '</a>';
    }).join('');
    return '<div class="page-wrap footer-main">' +
      '<div class="footer-brand">' + brandHtml(true) +
      '<p>One Music Store. Different Vibes. Endless Sound. Instruments, sound systems, studio gear and accessories for every musician and creator.</p>' +
      '<div class="socials">' + socials + '</div></div>' +
      '<div class="footer-col"><h4>Quick Links</h4><ul>' +
      '<li><a href="index.html">Home</a></li><li><a href="shop.html">Shop</a></li>' +
      '<li><a href="new-arrivals.html">New Arrivals</a></li><li><a href="best-sellers.html">Best Sellers</a></li>' +
      '<li><a href="sales.html">Sales</a></li><li><a href="about.html">About Us</a></li>' +
      '<li><a href="contact.html">Contact</a></li><li><a href="wishlist.html">My Wishlist</a></li>' +
      '<li><a href="account.html">My Account</a></li><li><a href="admin.html">Admin</a></li></ul></div>' +
      '<div class="footer-col"><h4>Shop by Instrument</h4><ul>' + types + '</ul></div>' +
      '<div class="footer-col"><h4>Get In Touch</h4><ul class="footer-contact">' +
      '<li>' + VM.icon('pin') + '<span>22 Rhythm Avenue, Ikeja,<br>Lagos, Nigeria</span></li>' +
      '<li>' + VM.icon('phone') + '<a href="tel:+2348012345678">+234 801 234 5678</a></li>' +
      '<li>' + VM.icon('mail') + '<a href="mailto:hello@vicmusical.ng">hello@vicmusical.ng</a></li>' +
      '<li>' + VM.icon('clock') + '<span>Mon &ndash; Sat: 9am &ndash; 8pm</span></li></ul>' +
      '<div class="footer-news"><b>Stay in the rhythm</b><p>New arrivals, deals &amp; gear tips. No spam.</p>' +
      '<form class="news-form" novalidate><input type="email" placeholder="Enter your email" required aria-label="Email address">' +
      '<button type="submit">SUBSCRIBE</button></form></div></div></div>' +
      '<div class="footer-bottom"><div class="page-wrap">' +
      '<span>\u00A9 2026 Vic Musical Store. All Rights Reserved.</span>' +
      '<span class="foot-links"><a href="policy.html?p=privacy">Privacy Policy</a> &nbsp;\u00B7&nbsp; <a href="policy.html?p=terms">Terms &amp; Conditions</a> &nbsp;\u00B7&nbsp; <a href="policy.html?p=returns">Returns Policy</a></span>' +
      '<span class="pay"><span>VISA</span><span>MASTERCARD</span><span>VERVE</span><span>PAYSTACK</span><span>BANK TRANSFER</span></span>' +
      '</div></div>';
  }

  /* ---------- overlays: mobile menu ---------- */
  function mobileMenuHtml() {
    var vibes = VM.VIBES.map(function (v) {
      return '<a href="' + vibeHref(v) + '"><span class="vibe-dot dot-' + v.key + '"></span>' + v.title + '</a>';
    }).join('');
    var types = VM.TYPES.map(function (t) {
      return '<a href="' + typeHref(t) + '">' + VM.icon(t.ic) + ' ' + t.name + '</a>';
    }).join('');
    return '<div class="mobile-nav" id="vmMobileNav" aria-hidden="true">' +
      '<div class="scrim" data-close="menu"></div>' +
      '<div class="panel" role="dialog" aria-label="Menu">' +
      '<div class="panel-head"><a class="brand" href="index.html"><span class="mark">' + VM.icon('logo') + '</span>' +
      '<span class="name">VIC MUSICAL STORE<span>Menu</span></span></a>' +
      '<button class="icon-btn" data-close="menu" aria-label="Close menu">' + VM.icon('x') + '</button></div>' +
      '<div class="panel-body">' +
      '<a class="row-link" href="index.html">Home</a><a class="row-link" href="shop.html">Shop All</a>' +
      '<a class="row-link" href="sales.html">Sales</a><a class="row-link" href="new-arrivals.html">New Arrivals</a>' +
      '<a class="row-link" href="best-sellers.html">Best Sellers</a>' +
      '<div class="group-title">Music Vibes</div><div class="mini">' + vibes + '</div>' +
      '<div class="group-title">Instruments</div><div class="mini">' + types + '</div>' +
      '<div class="group-title">Store</div>' +
      '<a class="row-link" href="account.html">My Account</a><a class="row-link" href="admin.html">Admin</a>' +
      '<a class="row-link" href="wishlist.html">My Wishlist</a><a class="row-link" href="cart.html">Cart</a>' +
      '<a class="row-link" href="about.html">About Us</a><a class="row-link" href="contact.html">Contact</a>' +
      '</div>' +
      '<div class="panel-foot">One Music Store. Different Vibes. Endless Sound. \u00A9 2026</div>' +
      '</div></div>';
  }

  /* ---------- overlays: cart drawer ---------- */
  function cartDrawerHtml() {
    return '<div class="drawer-scrim" id="vmCartScrim" data-close="cart"></div>' +
      '<aside class="drawer" id="vmCartDrawer" role="dialog" aria-label="Cart">' +
      '<div class="drawer-head"><h3>' + VM.icon('bag') + ' Your Cart</h3>' +
      '<button class="icon-btn" data-close="cart" aria-label="Close cart">' + VM.icon('x') + '</button></div>' +
      '<div class="drawer-body" id="vmCartBody"></div>' +
      '<div class="drawer-foot" id="vmCartFoot" style="display:none"></div>' +
      '</aside>';
  }

  /* ---------- overlays: search ---------- */
  function searchHtml() {
    return '<div class="search-layer" id="vmSearch" aria-hidden="true">' +
      '<div class="scrim" data-close="search"></div>' +
      '<div class="search-box" role="dialog" aria-label="Search">' +
      '<form class="search-form" action="shop.html" method="get">' +
      VM.icon('search') +
      '<input type="search" name="q" id="vmSearchInput" placeholder="Search guitars, drums, speakers, keyboards, mics\u2026" autocomplete="off" aria-label="Search products">' +
      '<button type="button" class="icon-btn search-close" data-close="search" aria-label="Close search">' + VM.icon('x') + '</button></form>' +
      '<div class="search-sugg" id="vmSearchSugg"><h5>Popular right now</h5><div class="terms" id="vmSearchPopular"></div>' +
      '<div class="search-results-nowrap" id="vmSearchResults"></div></div>' +
      '</div></div>';
  }

  /* ---------- search logic ---------- */
  function popularTerms() {
    return ['Electric Guitar', 'Acoustic Guitar', 'Guitar Strings', 'Drum Kit', 'Condenser Microphone', 'Bluetooth Speaker', 'Digital Piano', 'Headphones', 'MIDI Keyboard', 'Subwoofer'];
  }
  function findMatches(q, limit) {
    q = String(q || '').trim().toLowerCase();
    if (!q) return [];
    var words = q.split(/\s+/);
    var hits = VM.PRODUCTS.filter(function (p) {
      var hay = (p.n + ' ' + p.b + ' ' + p.t + ' ' + (VM.VIBE_NAMES[p.v] || '')).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });
    hits.sort(function (a, b) {
      var as = a.n.toLowerCase().indexOf(q), bs = b.n.toLowerCase().indexOf(q);
      if (as === 0 && bs !== 0) return -1;
      if (bs === 0 && as !== 0) return 1;
      return b.rv - a.rv;
    });
    return hits.slice(0, limit || 6);
  }

  function renderSearchResults(q) {
    var box = VM.$('#vmSearchResults');
    var pop = VM.$('#vmSearchPopular');
    if (!box) return;
    var input = VM.$('#vmSearchInput');
    q = (input.value || '').trim();
    if (!q) {
      box.innerHTML = '';
      if (pop) pop.innerHTML = popularTerms().map(function (t) {
        return '<button type="button" class="chip" data-term="' + VM.esc(t) + '">' + VM.esc(t) + '</button>';
      }).join('');
      if (pop) VM.$$('#vmSearchPopular .chip').forEach(function (c) {
        c.addEventListener('click', function () {
          input.value = c.getAttribute('data-term');
          renderSearchResults();
          submitSearch();
        });
      });
      return;
    }
    var hits = findMatches(q, 6);
    if (!hits.length) {
      box.innerHTML = '<div class="sr-empty muted" style="padding:14px 8px 4px;font-size:.9rem">No matches yet &mdash; press Enter to see all results.</div>';
    } else {
      box.innerHTML = hits.map(function (p) {
        return '<a class="sr-item" href="product.html?id=' + p.id + '">' +
          '<img src="' + (VM.imgSrc(p) || VM.coverDataUri(p)) + '" alt="">' +
          '<span class="t"><b>' + VM.esc(p.n) + '</b><small>' + VM.esc(p.b) + ' &middot; ' + VM.esc(VM.TYPES.filter(function (t2) { return t2.key === p.t; })[0].name) + '</small></span>' +
          '<span class="p">' + VM.money(p.p) + '</span></a>';
      }).join('');
      VM.$$('#vmSearchResults img').forEach(function (im) {
        im.addEventListener('error', function () { im.src = VM.coverDataUri(hits[0]); });
      });
    }
    if (pop) pop.innerHTML = '';
  }
  function submitSearch() {
    var input = VM.$('#vmSearchInput');
    var q = (input.value || '').trim();
    window.location.href = 'shop.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  }

  /* ---------- drawer render ---------- */
  VM.renderCartDrawer = function () {
    var body = VM.$('#vmCartBody');
    var foot = VM.$('#vmCartFoot');
    if (!body) return;
    var lines = VM.cart.lines();
    if (!lines.length) {
      body.innerHTML = '<div class="drawer-empty">' + VM.icon('bag') +
        '<p style="font-weight:700;color:var(--ink)">Your cart is empty</p>' +
        '<p style="font-size:.88rem">Find something that makes a beautiful noise.</p>' +
        '<a class="btn btn-sm" href="shop.html" style="margin-top:10px">Start Shopping</a></div>';
      foot.style.display = 'none';
      return;
    }
    var items = lines.map(function (l) {
      var p = l.p;
      return '<div class="drawer-item" data-id="' + p.id + '">' +
        '<a href="product.html?id=' + p.id + '"><img src="' + (VM.imgSrc(p) || VM.coverDataUri(p)) + '" alt="' + VM.esc(p.n) + '"></a>' +
        '<div class="di-b"><a class="di-name" href="product.html?id=' + p.id + '">' + VM.esc(p.n) + '</a>' +
        '<span class="di-price">' + VM.money(p.p) + '</span>' +
        '<div class="di-ctl">' +
        '<div class="qty"><button data-act="dq" data-id="' + p.id + '" data-d="1" aria-label="Decrease">' + VM.icon('minus') + '</button>' +
        '<span class="q-num">' + l.q + '</span>' +
        '<button data-act="iq" data-id="' + p.id + '" data-d="1" aria-label="Increase">' + VM.icon('plus') + '</button></div>' +
        '<button class="di-rm" data-act="rm" data-id="' + p.id + '">' + VM.icon('trash') + ' Remove</button>' +
        '</div></div></div>';
    }).join('');
    body.innerHTML = items;
    var sub = VM.cart.subtotal();
    var free = VM.cart.delivery() === 0;
    var need = Math.max(0, VM.FREE_DELIVERY_FROM - sub);
    foot.style.display = 'block';
    foot.innerHTML = (free
      ? '<div class="freebar">' + VM.icon('check') + ' You\u2019ve unlocked <b>FREE delivery</b>! <span style="float:right">' + VM.icon('truck') + '</span></div>'
      : '<div class="freebar">Add <b>' + VM.money(need) + '</b> more for <b>free delivery</b></div>') +
      '<div class="df-row"><span>Subtotal</span><span>' + VM.money(sub) + '</span></div>' +
      '<div class="df-row"><span>Delivery</span><span>' + (free ? 'FREE' : VM.money(VM.cart.delivery())) + '</span></div>' +
      '<div class="df-row total"><span>Total</span><span>' + VM.money(VM.cart.total()) + '</span></div>' +
      '<div class="df-actions"><a class="btn btn-sm" href="cart.html">View Cart</a>' +
      '<a class="btn btn-sm btn-ghost" href="checkout.html">Checkout</a></div>';
  };

  /* ---------- header refresh ---------- */
  var lastCartN = -1, lastWishN = -1;
  VM.refreshHeader = function () {
    var cb = VM.$('.cart-badge');
    var n = VM.cart.count();
    if (cb) {
      cb.textContent = n;
      cb.style.display = n ? 'flex' : 'none';
      cb.classList.remove('badge-pop');
      if (n) { void cb.offsetWidth; cb.classList.add('badge-pop'); }
    }
    var wb = VM.$('.wish-badge');
    var wn = VM.wishData.length;
    if (wb) { wb.textContent = wn; wb.style.display = wn ? 'flex' : 'none'; }
    /* micro-feedback: shake the bag when items are added, beat the heart when something is saved */
    var cartBtn = VM.$('.cart-btn');
    if (cartBtn && n > lastCartN && lastCartN >= 0) {
      cartBtn.classList.remove('nudge');
      void cartBtn.offsetWidth;
      cartBtn.classList.add('nudge');
    }
    lastCartN = n;
    var wishBtn = VM.$('.icon-btn[href="wishlist.html"]');
    if (wishBtn && wn > lastWishN && lastWishN >= 0) {
      wishBtn.classList.remove('pulse');
      void wishBtn.offsetWidth;
      wishBtn.classList.add('pulse');
    }
    lastWishN = wn;
    if (VM.$('#vmCartBody')) VM.renderCartDrawer();
  };

  /* ---------- burger <-> close morph ---------- */
  function setBurger(open) {
    var b = VM.$('.burger');
    if (!b) return;
    b.classList.toggle('open', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    b.innerHTML = VM.icon(open ? 'x' : 'menu');
  }

  /* ---------- open / close ---------- */
  function lockBody(on) {
    document.documentElement.style.overflow = on ? 'hidden' : '';
  }
  function closeAll() {
    VM.$$('.mobile-nav.open, .search-layer.open, .drawer.open, .drawer-scrim.open').forEach(function (el) { el.classList.remove('open'); });
    setBurger(false);
    lockBody(false);
  }
  VM.closeAll = closeAll;
  VM.openCart = function () {
    closeAll();
    VM.renderCartDrawer();
    var d = VM.$('#vmCartDrawer'), s = VM.$('#vmCartScrim');
    if (d) d.classList.add('open');
    if (s) s.classList.add('open');
    lockBody(true);
  };
  VM.openSearch = function () {
    closeAll();
    var l = VM.$('#vmSearch');
    if (l) {
      l.classList.add('open');
      var inp = VM.$('#vmSearchInput');
      if (inp) setTimeout(function () { inp.focus(); renderSearchResults(); }, 60);
    }
    lockBody(true);
  };

  /* ---------- global event delegation ---------- */
  function wireGlobals() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      var actEl = t.closest ? t.closest('[data-action],[data-close]') : null;
      if (actEl) {
        var act = actEl.getAttribute('data-action');
        if (act === 'search') { e.preventDefault(); VM.openSearch(); return; }
        if (act === 'cart') { e.preventDefault(); VM.openCart(); return; }
        if (act === 'menu') {
          e.preventDefault();
          var m = VM.$('#vmMobileNav');
          if (m) {
            closeAll();
            m.classList.add('open');
            lockBody(true);
            setBurger(true);
          }
          return;
        }
        var close = actEl.getAttribute('data-close');
        if (close) {
          e.preventDefault();
          closeAll();
          if (close === 'filters') {
            var fp = VM.$('#filterPanel');
            if (fp) fp.classList.remove('open');
          }
          return;
        }
      }
      /* cart drawer interactions */
      var b = t.closest ? t.closest('[data-act]') : null;
      if (b && VM.$('#vmCartDrawer') && VM.$('#vmCartDrawer').classList.contains('open')) {
        var id = b.getAttribute('data-id');
        var act2 = b.getAttribute('data-act');
        e.preventDefault();
        if (act2 === 'iq') { var p1 = VM.prodById(id); var cap = p1 && p1.s === 'low' ? 5 : 20; if ((VM.cartData[id] || 1) < cap) VM.cart.setQty(id, (VM.cartData[id] || 1) + 1); else VM.toast('Max quantity reached', p1 ? p1.n : '', 'warn'); }
        if (act2 === 'dq') { if ((VM.cartData[id] || 1) > 1) VM.cart.setQty(id, VM.cartData[id] - 1); else VM.cart.remove(id); }
        if (act2 === 'rm') VM.cart.remove(id);
        VM.renderCartDrawer();
        VM.refreshHeader();
      }
      /* categories dropdown click-away */
      if (!actEl && !t.closest('.has-dd')) {
        VM.$$('.mega').forEach(function (m) { /* css hover handles it */ });
      }
    });
    /* global broken-image fallback: cover up any failed remote image */
    document.addEventListener('error', function (e) {
      var el = e.target;
      if (!el || el.tagName !== 'IMG' || el.__vmFb) return;
      el.__vmFb = true;
      try {
        var p = null;
        if (el.closest) {
          var holder = el.closest('[data-id]');
          if (holder) p = VM.prodById(holder.getAttribute('data-id'));
        }
        if (!p) p = { t: el.getAttribute('data-ty') || 'accessories', v: el.getAttribute('data-vb') || '' };
        el.src = VM.coverDataUri(p);
      } catch (err) { }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
      var inp = VM.$('#vmSearchInput');
      if (inp && document.activeElement === inp) {
        if (e.key === 'Enter') { e.preventDefault(); submitSearch(); }
      }
    });
    /* search typing */
    var input = VM.$('#vmSearchInput');
    if (input) {
      input.addEventListener('input', function () { renderSearchResults(); });
      input.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowDown') {
          var first = VM.$('#vmSearchResults .sr-item');
          if (first) { e.preventDefault(); first.focus(); }
        }
      });
    }
    VM.$$('form.search-form').forEach(function (f) {
      f.addEventListener('submit', function (e) { e.preventDefault(); submitSearch(); });
    });
    /* newsletter (footer + any page) — saves to backend when online */
    VM.$$('.news-form').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var inp = f.querySelector('input[type=email]');
        var v = inp && inp.value.trim();
        if (!v || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
          VM.toast('Check your email', 'Please enter a valid email address.', 'err');
          return;
        }
        function done() {
          var list = VM.store.get('vm_news_v1', []);
          if (list.indexOf(v) === -1) list.push(v);
          VM.store.set('vm_news_v1', list);
          inp.value = '';
          VM.toast('You\u2019re in the rhythm!', 'Welcome to the Vic Musical Store newsletter', 'ok');
        }
        if (VM.api && VM.api.online !== false) {
          VM.api.newsletter(v).then(done).catch(function (err) {
            if (/already/i.test(err.message)) done();
            else VM.toast('Could not subscribe', err.message, 'err');
          });
        } else { done(); }
      });
    });
  }

  /* ---------- boot ---------- */
  VM.layout = { renderHeader: headerHtml, renderFooter: footerHtml };
  VM.bootLayout = function () {
    var top = VM.$('#vmTopbar');
    if (top) top.innerHTML = topbarHtml();
    var hd = VM.$('#vmHeader');
    if (hd) hd.innerHTML = headerHtml();
    var ft = VM.$('#vmFooter');
    if (ft) ft.innerHTML = footerHtml();
    var ov = VM.$('#vmOverlays');
    if (ov) ov.innerHTML = mobileMenuHtml() + cartDrawerHtml() + searchHtml();

    /* inject SVG icons into static [data-ic] placeholders (emoji-free markup) */
    VM.$$('[data-ic]').forEach(function (el) {
      el.innerHTML = VM.icon(el.getAttribute('data-ic'));
    });

    /* dropdown parent links should not navigate */
    VM.$$('.has-dd > a').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
    });
    wireGlobals();
    VM.cart.on(function () { VM.refreshHeader(); });
    VM.refreshHeader();

    /* sticky header: elevate with a shadow once the page scrolls */
    var hdr = VM.$('.site-header');
    function syncHeader() {
      if (!hdr) return;
      hdr.classList.toggle('scrolled', (window.pageYOffset || document.documentElement.scrollTop) > 6);
    }
    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
  };
})();
