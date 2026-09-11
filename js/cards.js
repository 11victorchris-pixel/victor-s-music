/* ==========================================================================
   VIC MUSICAL STORE — cards.js
   Product cards, grid rendering, quick view, scrollers, countdown timer.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;

  function typeName(t) {
    var T = VM.TYPES.filter(function (x) { return x.key === t; })[0];
    return T ? T.name : t;
  }
  VM.typeName = typeName;
  function vibeChip(v) {
    return '<span class="tag tag-' + v + '">' + VM.esc((VM.VIBE_NAMES[v] || '').toUpperCase()) + '</span>';
  }

  /* ---------- product card ---------- */
  VM.cardHtml = function (p, opts) {
    opts = opts || {};
    var url = 'product.html?id=' + p.id;
    var badges = '';
    var pct = VM.discountPct(p);
    if (p.tg) {
      if (p.tg.indexOf('new') !== -1) badges += '<span class="tag tag-new">New</span>';
      if (p.tg.indexOf('best') !== -1) badges += '<span class="tag tag-best">' + VM.icon('flame') + ' Best Seller</span>';
    }
    if (pct >= 5) badges += '<span class="tag tag-sale">-' + pct + '%</span>';
    var wishOn = VM.wish.has(p.id);
    var stockTxt = p.s === 'out' ? 'Out of stock' : (p.s === 'low' ? 'Only a few left' : 'In stock');
    var priceHtml = '<span class="pc-price">' + VM.money(p.p) + '</span>' +
      (p.w && p.w > p.p ? '<span class="pc-was">' + VM.money(p.w) + '</span>' : '') +
      (pct >= 5 ? '<span class="pc-off">' + pct + '% OFF</span>' : '');

    var addBtn;
    if (p.s === 'out') {
      addBtn = '<button class="btn btn-sm pc-add" disabled>Out of Stock</button>';
    } else {
      addBtn = '<button class="btn btn-sm pc-add" data-act="add" data-id="' + p.id + '" aria-label="Add ' + VM.esc(p.n) + ' to cart">' +
        VM.icon('bag') + 'ADD TO CART</button>';
    }
    return '<article class="prod-card reveal">' +
      '<div class="pc-img-wrap"><a href="' + url + '" aria-label="View ' + VM.esc(p.n) + '">' +
      VM.imgTag(p, 'pc-img', p.n) + '</a>' +
      '<div class="pc-badges">' + badges + '</div>' +
      '<div class="pc-actions">' +
      '<button class="pc-act pc-wish' + (wishOn ? ' on' : '') + '" data-act="wish" data-id="' + p.id + '" aria-label="Toggle wishlist" title="Add to wishlist">' + VM.icon(wishOn ? 'heartF' : 'heart') + '</button>' +
      '<button class="pc-act" data-act="qv" data-id="' + p.id + '" aria-label="Quick view" title="Quick view">' + VM.icon('eye') + '</button>' +
      '</div></div>' +
      '<div class="pc-body">' +
      '<span class="pc-brand">' + VM.esc(p.b) + '</span>' +
      '<a class="pc-name" href="' + url + '">' + VM.esc(p.n) + '</a>' +
      '<div class="pc-meta">' + VM.starsHtml(p.r, 13) + '<span style="color:var(--muted)">' + VM.num(p.rv) + '</span>' +
      '<span class="dot"></span><span class="stock ' + p.s + '">' + stockTxt + '</span></div>' +
      '<div class="pc-prices">' + priceHtml + '</div>' +
      '<div class="pc-foot">' + addBtn + '</div>' +
      '</div></article>';
  };

  /* ---------- grid render ---------- */
  VM.renderGrid = function (container, list, opts) {
    opts = opts || {};
    if (!container) return;
    if (!list || !list.length) {
      container.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('search') + '</div>' +
        '<h3>No products found</h3><p>Try adjusting your filters or search for something else.</p>' +
        '<a class="btn" href="shop.html">Browse all products</a></div>';
      return;
    }
    container.innerHTML = list.map(function (p) { return VM.cardHtml(p, opts); }).join('');
  };

  /* related product images for gallery: unique pool urls of same type + fallbacks */
  VM.galleryImages = function (p) {
    var urls = [];
    if (VM.imgSrc(p)) urls.push(VM.imgSrc(p));
    VM.PRODUCTS.forEach(function (o) {
      if (o.t === p.t && o.id !== p.id) {
        var u = VM.imgSrc(o);
        if (u && urls.indexOf(u) === -1 && urls.length < 4) urls.push(u);
      }
    });
    if (!urls.length) urls.push(VM.coverDataUri(p));
    return urls.slice(0, 4);
  };

  /* ---------- quick view modal ---------- */
  function qvMarkup() {
    var div = document.createElement('div');
    div.className = 'modal-scrim';
    div.id = 'vmQv';
    div.innerHTML = '<div class="modal" role="dialog" aria-label="Quick view" aria-modal="true">' +
      '<button class="modal-x" data-qv-close aria-label="Close">' + VM.icon('x') + '</button>' +
      '<div class="qv-grid">' +
      '<div class="qv-media"><img id="qvMain" src="" alt=""><div class="qv-thumbs" id="qvThumbs"></div></div>' +
      '<div class="qv-info" id="qvInfo"></div>' +
      '</div></div>';
    document.body.appendChild(div);
    div.addEventListener('click', function (e) {
      if (e.target === div || e.target.closest('[data-qv-close]')) VM.qvClose();
    });
  }
  VM.qvClose = function () {
    var m = VM.$('#vmQv');
    if (m) m.classList.remove('open');
    document.documentElement.style.overflow = '';
  };
  VM.qvOpen = function (id) {
    var p = VM.prodById(id);
    if (!p) return;
    var m = VM.$('#vmQv');
    if (!m) qvMarkup(), m = VM.$('#vmQv');
    var imgs = VM.galleryImages(p);
    var main = VM.$('#qvMain');
    main.src = imgs[0];
    main.onerror = function () { main.src = VM.coverDataUri(p); };
    VM.$('#qvThumbs').innerHTML = imgs.map(function (u, i) {
      return '<img class="' + (i === 0 ? 'on' : '') + '" src="' + u + '" alt="view ' + (i + 1) + '" data-u="' + VM.esc(u) + '">';
    }).join('');
    VM.$$('#qvThumbs img').forEach(function (th) {
      th.addEventListener('click', function () {
        VM.$$('#qvThumbs img').forEach(function (x) { x.classList.remove('on'); });
        th.classList.add('on');
        main.src = th.getAttribute('data-u');
      });
    });
    var pct = VM.discountPct(p);
    var inWish = VM.wish.has(p.id);
    VM.$('#qvInfo').innerHTML =
      '<span class="pc-brand">' + VM.esc(p.b) + ' &middot; ' + VM.esc(typeName(p.t)) + '</span>' +
      '<h3 style="margin:0;font-size:1.35rem">' + VM.esc(p.n) + '</h3>' +
      '<div class="pc-meta">' + VM.starsHtml(p.r, 14) + '<span style="color:var(--muted)">' + VM.num(p.rv) + ' reviews</span>' +
      '<span class="dot"></span><span class="stock ' + p.s + '">' + (p.s === 'out' ? 'Out of stock' : p.s === 'low' ? 'Only a few left' : 'In stock') + '</span></div>' +
      '<div class="pc-prices" style="margin-top:8px"><span class="pc-price" style="font-size:1.6rem">' + VM.money(p.p) + '</span>' +
      (p.w && p.w > p.p ? '<span class="pc-was" style="font-size:1.05rem">' + VM.money(p.w) + '</span>' : '') +
      (pct >= 5 ? '<span class="tag tag-sale">Save ' + pct + '%</span>' : '') + '</div>' +
      '<p class="pd-desc" style="margin:10px 0 0">' + VM.esc(shortDesc(p)) + '</p>' +
      '<div class="pd-actions" style="margin:18px 0 0">' +
      '<button class="btn qv-add" data-act="add" data-id="' + p.id + '" ' + (p.s === 'out' ? 'disabled' : '') + '>' + VM.icon('bag') + (p.s === 'out' ? 'OUT OF STOCK' : 'ADD TO CART') + '</button>' +
      '<button class="btn btn-ghost qv-wish" data-act="wish" data-id="' + p.id + '">' + (inWish ? VM.icon('heartF') : VM.icon('heart')) + (inWish ? ' IN WISHLIST' : ' WISHLIST') + '</button>' +
      '</div>' +
      '<a class="btn btn-sm btn-ghost" href="product.html?id=' + p.id + '" style="margin-top:12px">View full details \u2192</a>';
    m.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
  };

  /* short descriptive copy generator */
  function shortDesc(p) {
    return 'The ' + p.b + ' ' + p.n.replace(p.b, '') + ' delivers ' + qualityPhrase(p) + ' \u2014 trusted by ' + VM.num(Math.max(9, p.rv)) + '+ musicians across Nigeria.';
  }
  function qualityPhrase(p) {
    if (p.v === 'premium') return 'flagship craftsmanship and refined, studio-grade performance';
    if (p.p >= 800000) return 'pro-grade performance built for serious sessions';
    if (p.p >= 250000) return 'reliable, stage-ready performance with a rich tone';
    return 'easy, dependable performance perfect for practice and play';
  }
  VM.shortDesc = shortDesc;

  /* ---------- document-level action delegation ---------- */
  function wireActions() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b) return;
      var act = b.getAttribute('data-act');
      var id = b.getAttribute('data-id');
      if (act === 'add') {
        e.preventDefault();
        if (VM.cart.add(id, 1)) {
          b.classList.add('done');
          var old = b.innerHTML;
          b.innerHTML = VM.icon('check') + ' ADDED';
          setTimeout(function () {
            b.classList.remove('done');
            if (!VM.prodById(id) || VM.prodById(id).s === 'out') return;
            b.innerHTML = old;
          }, 1400);
        }
        return;
      }
      if (act === 'wish') {
        e.preventDefault();
        var on = VM.wish.toggle(id);
        var p = VM.prodById(id);
        VM.$$('[data-act="wish"][data-id="' + id + '"]').forEach(function (el) {
          el.classList.toggle('on', on);
          el.innerHTML = VM.icon(on ? 'heartF' : 'heart');
        });
        if (p) {
          var lbl = VM.$('#qvInfo .qv-wish');
          if (lbl) lbl.innerHTML = VM.icon(on ? 'heartF' : 'heart') + (on ? ' IN WISHLIST' : ' WISHLIST');
        }
        return;
      }
      if (act === 'qv') {
        e.preventDefault();
        VM.qvOpen(id);
      }
    });
  }

  /* ---------- horizontal scrollers ---------- */
  VM.wireScrollers = function () {
    VM.$$('.h-scroll').forEach(function (sc) {
      var id = sc.getAttribute('data-scroll');
      var wrap = sc.parentElement;
      var next = wrap.querySelector('[data-scroll-next="' + id + '"]');
      var prev = wrap.querySelector('[data-scroll-prev="' + id + '"]');
      function upd() {
        if (prev) prev.disabled = sc.scrollLeft < 8;
        if (next) next.disabled = sc.scrollLeft >= sc.scrollWidth - sc.clientWidth - 8;
      }
      if (next) next.addEventListener('click', function () { sc.scrollBy({ left: sc.clientWidth * 0.85, behavior: 'smooth' }); });
      if (prev) prev.addEventListener('click', function () { sc.scrollBy({ left: -sc.clientWidth * 0.85, behavior: 'smooth' }); });
      sc.addEventListener('scroll', upd);
      upd();
    });
  };

  /* ---------- countdown ---------- */
  VM.flashDeadline = function () {
    var end = VM.store.get('vm_flash_end', 0);
    var now = Date.now();
    if (!end || end < now) { end = now + (2 * 24 * 3600 + 2 * 3600 + 14 * 60 + 36) * 1000; VM.store.set('vm_flash_end', end); }
    return end;
  };
  VM.startCountdown = function (host) {
    if (!host) return;
    var boxes = host.querySelectorAll('[data-cd]');
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var diff = Math.max(0, VM.flashDeadline() - Date.now());
      var s = Math.floor(diff / 1000);
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      boxes.forEach(function (b) {
        var k = b.getAttribute('data-cd');
        b.textContent = k === 'h' ? pad(h) : k === 'm' ? pad(m) : pad(sec);
      });
    }
    tick();
    setInterval(tick, 1000);
  };

  /* ---------- reveal on scroll ---------- */
  VM.wireReveal = function () {
    if (!('IntersectionObserver' in window)) {
      VM.$$('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.04 });
    VM.$$('.reveal').forEach(function (el) { io.observe(el); });
  };

  /* ---------- boot ---------- */
  VM.cardsBoot = function () {
    qvMarkup();
    wireActions();
    VM.$$('[data-countdown]').forEach(function (el) { VM.startCountdown(el); });
  };
})();
