/* ==========================================================================
   VIC MUSICAL STORE — pages-product.js
   Product detail page (product.html?id=…).
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  function hash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
    return Math.abs(h);
  }
  function pick(arr, seed) { return arr[seed % arr.length]; }

  var PALETTES = {
    guitars: ['Natural Satin', 'Vintage Sunburst', 'Gloss Black', 'Mahogany Burst', 'Ocean Blue', 'Butterscotch', 'Cherry Red'],
    drums: ['Black Sparkle', 'Blue Burst', 'Natural Maple', 'Red Wine', 'White Marine', 'Charcoal'],
    keyboards: ['Black', 'Ivory White', 'Dark Cherry', 'Slate Grey'],
    microphones: ['Black', 'Matte Silver', 'Nickel', 'Charcoal'],
    speakers: ['Black', 'White', 'Walnut', 'Charcoal'],
    headphones: ['Black', 'Midnight Blue', 'Gunmetal', 'White'],
    studio: ['Black', 'Silver', 'Dark Grey'],
    accessories: ['Black', 'Assorted', 'Natural', 'Red/Black']
  };

  var SPEC_TEMPLATES = {
    guitars: [
      ['Body Style', function (p, s) { return pick(['Dreadnought', 'Concert Cutaway', 'Solid Body', 'Hollow Body', 'Parlor'], s); }],
      ['Top Material', function (p, s) { return p.p > 600000 ? 'Solid Sitka Spruce / Maple' : 'Laminated Spruce / Mahogany'; }],
      ['Neck', function (p, s) { return pick(['Mahogany, C profile', 'Maple, modern C', 'Nato, slim D'], s); }],
      ['Fingerboard', function (p, s) { return pick(['Rosewood', 'Ebony', 'Maple', 'Pau Ferro'], s); }],
      ['Finish', function (p, s) { return pick(PALETTES.guitars, s); }],
      ['Electronics', function (p) { return p.n.toLowerCase().indexOf('electric') !== -1 || p.n.toLowerCase().indexOf('bass') !== -1 ? 'Dual humbuckers, 3-way switch' : 'Built-in EQ & tuner (optional)'; }],
      ['Weight', function (p, s) { return (1.8 + (s % 15) / 10).toFixed(1) + ' kg'; }],
      ['In the box', function () { return 'Guitar, strap buttons, truss rod key, warranty card'; }]
    ],
    drums: [
      ['Configuration', function (p, s) { return pick(['5-piece shell pack', '6-piece shell pack', 'Electronic pad kit', 'Compact 4-piece'], s); }],
      ['Shells', function (p, s) { return pick(['100% Maple', 'Birch/Poplar hybrid', 'Poplar with lacquer finish'], s); }],
      ['Hardware', function (p) { return p.n.toLowerCase().indexOf('electron') !== -1 ? 'Aluminium rack frame' : 'Double-braced hardware'; }],
      ['Finish', function (p, s) { return pick(PALETTES.drums, s); }],
      ['Heads', function (p, s) { return pick(['Coated single-ply', 'Clear two-ply', 'Mesh (electronic)'], s); }],
      ['Weight', function (p, s) { return (12 + (s % 20)) + ' kg (packed)'; }],
      ['In the box', function (p) { return p.n.toLowerCase().indexOf('electron') !== -1 ? 'Pads, module, rack, cables, sticks, drum key' : 'Shells, cymbal stands, pedal, throne, drum key'; }]
    ],
    keyboards: [
      ['Keybed', function (p, s) { return pick(['61 full-size touch keys', '88 weighted hammer keys', '76 semi-weighted keys', '25 mini synth keys', '49 velocity keys'], s); }],
      ['Sounds', function (p, s) { return (200 + ((s * 37) % 500)) + '+ voices'; }],
      ['Polyphony', function (p, s) { return (32 + ((s * 53) % 200)) + ' notes'; }],
      ['Connectivity', function (p) { return p.n.toLowerCase().indexOf('midi') !== -1 ? 'USB-C MIDI, sustain pedal input' : 'USB-MIDI, aux in/out, headphone out, sustain'; }],
      ['Finish', function (p, s) { return pick(PALETTES.keyboards, s); }],
      ['Speakers', function (p, s) { return p.p > 600000 ? 'None \u2013 studio instrument' : '2 x 6W built-in speakers'; }],
      ['Weight', function (p, s) { return (3.5 + ((s * 7) % 120) / 10).toFixed(1) + ' kg'; }]
    ],
    microphones: [
      ['Type', function (p, s) { return pick(['Large-diaphragm condenser', 'Small-diaphragm condenser', 'Dynamic moving-coil', 'Electret lavalier'], s); }],
      ['Polar Pattern', function (p, s) { return pick(['Cardioid', 'Cardioid + Figure-8', 'Supercardioid', 'Omnidirectional'], s); }],
      ['Frequency Response', function (p, s) { return pick(['20 Hz \u2013 20 kHz', '40 Hz \u2013 18 kHz', '50 Hz \u2013 15 kHz'], s); }],
      ['Connectivity', function (p, s) { return p.n.toLowerCase().indexOf('usb') !== -1 ? 'USB-C plug & play' : pick(['XLR (48V phantom)', 'XLR or 3.5mm wireless receiver', 'XLR'], s); }],
      ['Finish', function (p, s) { return pick(PALETTES.microphones, s); }],
      ['Accessories', function (p) { return p.n.toLowerCase().indexOf('usb') !== -1 ? 'Desk stand, pop filter, USB-C cable' : 'Mic clip, shock mount, wind screen'; }]
    ],
    speakers: [
      ['Type', function (p, s) { return pick(['Active studio monitor', 'Powered PA loudspeaker', 'Portable Bluetooth speaker', 'Powered subwoofer'], s); }],
      ['Power', function (p, s) { return (20 + ((s * 47) % 900)) + 'W'; }],
      ['Drivers', function (p, s) { return pick(['2-way: tweeter + 5\u201D woofer', '2-way: tweeter + 12\u201D woofer', '1-way subwoofer 15\u201D', 'Full-range with passive radiator'], s); }],
      ['Connectivity', function (p, s) { return pick(['Bluetooth 5.3 + aux', 'XLR/TRS combo inputs', 'Bluetooth + USB + aux + mic input', 'Bluetooth, AUX, USB, TF card'], s); }],
      ['Finish', function (p, s) { return pick(PALETTES.speakers, s); }],
      ['Weight', function (p, s) { return (1.2 + ((s * 11) % 280) / 10).toFixed(1) + ' kg'; }]
    ],
    headphones: [
      ['Type', function (p, s) { return pick(['Over-ear closed-back', 'Over-ear open-back', 'On-ear DJ style', 'True wireless earbuds'], s); }],
      ['Driver', function (p, s) { return pick(['40mm dynamic', '50mm dynamic', '32mm dynamic', '8mm + 10mm hybrid'], s); }],
      ['Frequency Response', function (p, s) { return '10 Hz \u2013 28 kHz'; }],
      ['Impedance', function (p, s) { return pick(['32\u03A9', '64\u03A9', '38\u03A9'], s); }],
      ['Connectivity', function (p, s) { return p.n.toLowerCase().indexOf('wireless') !== -1 || p.n.toLowerCase().indexOf('anc') !== -1 ? 'Bluetooth 5.3, ANC, USB-C charging' : pick(['Detachable coiled cable 3m', 'Straight cable 1.2m', 'Bluetooth + cable'], s); }],
      ['Finish', function (p, s) { return pick(PALETTES.headphones, s); }],
      ['Weight', function (p, s) { return pick(['254 g', '312 g', '185 g', '24 g (pair)'], s); }]
    ],
    studio: [
      ['Type', function (p, s) { return pick(['USB audio interface', 'Analog mixing console', 'Digital mixer', 'Pad controller'], s); }],
      ['Channels', function (p, s) { return pick(['2-in / 2-out', '8-in / 8-out', '16 channels', '4-in / 4-out'], s); }],
      ['Connectivity', function (p, s) { return 'USB-C bus powered, 2 x XLR/TS combo, MIDI in/out'; }],
      ['Sample Rate', function (p, s) { return pick(['24-bit / 192 kHz', '24-bit / 96 kHz', '16-bit / 44.1 kHz'], s); }],
      ['Finish', function (p, s) { return pick(PALETTES.studio, s); }],
      ['Weight', function (p, s) { return (0.8 + ((s * 9) % 140) / 10).toFixed(1) + ' kg'; }]
    ],
    accessories: [
      ['Material', function (p, s) { return pick(['Premium alloy / nylon', 'ABS composite', 'Natural wood', 'Braided copper'], s); }],
      ['Compatibility', function (p, s) { return 'Universal \u2013 fits all major brands'; }],
      ['Finish', function (p, s) { return pick(PALETTES.accessories, s); }],
      ['Weight', function (p, s) { return (0.2 + ((s * 3) % 40) / 10).toFixed(1) + ' kg'; }],
      ['In the box', function (p) { return 'Main unit, quick-start guide, warranty card'; }]
    ]
  };

  function specsFor(p) {
    var tpl = SPEC_TEMPLATES[p.t] || SPEC_TEMPLATES.accessories;
    var s = hash(p.id);
    return tpl.map(function (row) { return { k: row[0], v: row[1](p, s) }; });
  }

  function descFor(p) {
    var typeName = VM.typeName(p.t);
    var lines = [
      'The ' + p.b + ' ' + VM.esc(p.n.replace(p.b, '').trim()) + ' is one of the most requested ' + typeName.toLowerCase() + ' in the Vic Musical Store catalogue. Every unit is inspected, tested and set up by our in-store technicians before dispatch, so it arrives ready to play, record or perform.',
      'Depending on your setup, pair it with compatible accessories from the store, or take advantage of the \u201CFrequently Bought Together\u201D bundle below to save an extra 10% on essentials.'
    ];
    return lines;
  }

  function reviewsFor(p) {
    var s = hash(p.id);
    var out = [];
    for (var i = 0; i < 3; i++) {
      var r = VM.REVIEWS_POOL[(s + i) % VM.REVIEWS_POOL.length];
      var rating = p.r >= 4.8 ? 5 : (p.r >= 4.4 ? (i % 2 === 0 ? 5 : 4) : (i % 3 === 0 ? 3 : 4));
      var days = 3 + ((s * 7 + i * 11) % 60);
      out.push({
        n: r.n, c: r.c, r: rating, t: r.t, b: r.b,
        d: days + ' days ago'
      });
    }
    return out;
  }

  function lightbox(url) {
    var lb = VM.$('#vmLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.id = 'vmLightbox';
      lb.innerHTML = '<img src="" alt="product image"><button class="icon-btn" style="position:absolute;top:18px;right:18px;background:rgba(255,255,255,.12);color:#fff;width:44px;height:44px" aria-label="Close">' + VM.icon('x') + '</button>';
      document.body.appendChild(lb);
      lb.addEventListener('click', function (e) {
        if (e.target !== lb.querySelector('img')) lb.classList.remove('open');
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
    }
    lb.querySelector('img').src = url;
    lb.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    lb.querySelector('img').onload = function () { /* noop */ };
    var btn = lb.querySelector('.icon-btn');
    btn.addEventListener('click', function () { lb.classList.remove('open'); document.documentElement.style.overflow = ''; });
  }
  VM.lightbox = lightbox;

  function fillPage(p) {
    var wrap = VM.$('#pdWrap');
    if (!wrap) return;
    document.title = p.n + ' | Vic Musical Store';

    /* crumbs */
    var crumbs = VM.$('#pdCrumbs');
    if (crumbs) {
      crumbs.innerHTML = '<a href="index.html">Home</a>' + VM.icon('chevR') +
        '<a href="shop.html">Shop</a>' + VM.icon('chevR') +
        '<a href="' + VM.typeHref(p.t) + '">' + VM.esc(VM.typeName(p.t)) + '</a>' + VM.icon('chevR') +
        '<span class="here">' + VM.esc(p.n) + '</span>';
    }

    /* gallery */
    var imgs = VM.galleryImages(p);
    var main = VM.$('#pdMainImg');
    main.src = imgs[0];
    main.onerror = function () { main.src = VM.coverDataUri(p); };
    main.addEventListener('click', function () { lightbox(main.src); });
    var thumbs = VM.$('#pdThumbs');
    thumbs.innerHTML = imgs.map(function (u, i) {
      return '<button type="button" class="' + (i === 0 ? 'on' : '') + '" data-u="' + VM.esc(u) + '" aria-label="Image ' + (i + 1) + '">' +
        '<img src="' + u + '" alt="view ' + (i + 1) + '" loading="lazy"></button>';
    }).join('');
    VM.$$('#pdThumbs button').forEach(function (b) {
      b.addEventListener('click', function () {
        VM.$$('#pdThumbs button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        main.src = b.getAttribute('data-u');
      });
    });

    /* info */
    var info = VM.$('#pdInfoInner');
    var pct = VM.discountPct(p);
    var inWish = VM.wish.has(p.id);
    info.innerHTML =
      '<div class="pd-brandline"><span class="pb">' + VM.esc(p.b) + '</span>' +
      '<span class="tag tag-' + p.v + '">' + VM.esc((VM.VIBE_NAMES[p.v] || '').toUpperCase()) + '</span>' +
      (pct >= 5 ? '<span class="tag tag-sale">' + pct + '% OFF</span>' : '') +
      (p.tg && p.tg.indexOf('new') !== -1 ? '<span class="tag tag-new">New</span>' : '') +
      (p.tg && p.tg.indexOf('best') !== -1 ? '<span class="tag tag-best">' + VM.icon('flame') + ' Best Seller</span>' : '') +
      '</div>' +
      '<h1>' + VM.esc(p.n) + '</h1>' +
      '<div class="pc-meta">' + VM.starsHtml(p.r, 16) +
      '<span style="color:var(--muted)"><b>' + p.r.toFixed(1) + '</b> &middot; ' + VM.num(p.rv) + ' verified reviews</span></div>' +
      '<div class="pd-price-row"><span class="pd-price">' + VM.money(p.p) + '</span>' +
      (p.w && p.w > p.p ? '<span class="pd-was">' + VM.money(p.w) + '</span><span class="pd-save">SAVE ' + VM.money(p.w - p.p) + '</span>' : '') +
      '</div>' +
      '<div class="pd-vat">Inclusive of all taxes &middot; ' +
      '<span class="stock ' + p.s + '">' + (p.s === 'out' ? 'Currently out of stock' : p.s === 'low' ? 'Low stock \u2013 only a few left' : 'In stock \u2013 ships within 24 hours') + '</span></div>' +
      '<p class="pd-desc">' + VM.esc(VM.shortDesc(p)) + '</p>' +
      '<div class="pd-highlights">' +
      '<span class="hl">' + VM.icon('check') + ' 12-month warranty</span>' +
      '<span class="hl">' + VM.icon('check') + ' Free delivery over \u20A6500k</span>' +
      '<span class="hl">' + VM.icon('check') + ' 7-day returns</span>' +
      '<span class="hl">' + VM.icon('check') + ' Pay on delivery available</span></div>' +
      '<div class="pd-qty-row"><span>Quantity</span>' +
      '<div class="stepper"><button id="pdMinus" aria-label="Decrease quantity">' + VM.icon('minus') + '</button>' +
      '<span class="q-num" id="pdQty">1</span>' +
      '<button id="pdPlus" aria-label="Increase quantity">' + VM.icon('plus') + '</button></div></div>' +
      '<div class="pd-actions">' +
      '<button class="btn" id="pdAdd" ' + (p.s === 'out' ? 'disabled' : '') + '>' + VM.icon('bag') + (p.s === 'out' ? 'OUT OF STOCK' : 'ADD TO CART') + '</button>' +
      '<button class="btn btn-buy" id="pdBuy" ' + (p.s === 'out' ? 'disabled' : '') + '>BUY NOW</button>' +
      '<button class="btn btn-ghost" id="pdWish" style="flex:0 0 auto">' + VM.icon(inWish ? 'heartF' : 'heart') + (inWish ? ' IN WISHLIST' : ' ADD TO WISHLIST') + '</button></div>' +
      '<div class="pd-meta"><span><b>SKU:</b> VM-' + VM.esc(p.id.toUpperCase()) + '</span>&middot;' +
      '<span><b>Category:</b> <a href="' + VM.typeHref(p.t) + '" style="color:var(--brand)">' + VM.esc(VM.typeName(p.t)) + '</a></span>&middot;' +
      '<span><b>Vibe:</b> <a href="' + VM.vibeHref(p.v) + '" style="color:var(--brand)">' + VM.esc(VM.VIBE_NAMES[p.v]) + '</a></span></div>' +
      '<div class="pd-trust">' +
      '<div class="t">' + VM.icon('truck') + '<span><b>Fast nationwide</b><small>1\u20133 day delivery</small></span></div>' +
      '<div class="t">' + VM.icon('shield') + '<span><b>100% genuine</b><small>Authorized gear</small></span></div>' +
      '<div class="t">' + VM.icon('returns') + '<span><b>Easy returns</b><small>7-day window</small></span></div></div>';

    /* qty & actions */
    var qty = 1;
    var qEl = VM.$('#pdQty');
    VM.$('#pdMinus').addEventListener('click', function () { qty = Math.max(1, qty - 1); qEl.textContent = qty; });
    VM.$('#pdPlus').addEventListener('click', function () {
      var cap = p.s === 'low' ? 5 : 20;
      qty = Math.min(cap, qty + 1);
      qEl.textContent = qty;
    });
    VM.$('#pdAdd').addEventListener('click', function () {
      if (VM.cart.add(p.id, qty)) {
        var b = this;
        var old = b.innerHTML;
        b.innerHTML = VM.icon('check') + ' ADDED!';
        b.classList.add('done');
        setTimeout(function () { b.innerHTML = old; b.classList.remove('done'); }, 1500);
      }
    });
    VM.$('#pdBuy').addEventListener('click', function () {
      if (VM.cart.add(p.id, qty, true)) window.location.href = 'checkout.html';
    });
    VM.$('#pdWish').addEventListener('click', function () {
      var on = VM.wish.toggle(p.id);
      this.innerHTML = VM.icon(on ? 'heartF' : 'heart') + (on ? ' IN WISHLIST' : ' ADD TO WISHLIST');
      this.classList.toggle('on', on);
    });

    /* description + specs */
    var descBox = VM.$('#pdDescBody');
    if (descBox) {
      descBox.innerHTML = '<div class="prose"><p>' + descFor(p).join('</p><p>') + '</p>' +
        '<h4 style="margin-top:16px">Who is it for?</h4><p>' +
        (p.v === 'premium' ? 'Aspiring pros and collectors who want the flagship experience.' :
          p.v === 'rock' ? 'Gigging players, band members and bedroom shredders who like it loud.' :
            p.v === 'savage' ? 'DJs, sound engineers and bass heads chasing serious power.' :
              p.v === 'creative' ? 'Producers, beatmakers and artists experimenting with new sounds.' :
                p.v === 'professional' ? 'Recording engineers, broadcasters and working musicians.' :
                  'Everyday musicians, families and party people who love great sound.') + '</p></div>';
    }
    var specBox = VM.$('#pdSpecsBody');
    if (specBox) {
      specBox.innerHTML = '<table class="spec-table">' + specsFor(p).map(function (s) {
        return '<tr><td>' + VM.esc(s.k) + '</td><td>' + VM.esc(s.v) + '</td></tr>';
      }).join('') + '</table>' +
        '<p class="terms-note">*Specifications are representative of this product tier and may vary by production batch. Contact support for full technical sheet.</p>';
    }

    /* reviews */
    var revBox = VM.$('#pdReviewsBody');
    if (revBox) {
      var revs = reviewsFor(p);
      var pct5 = Math.round(p.r * 20);
      revBox.innerHTML =
        '<div style="display:grid;grid-template-columns:220px 1fr;gap:30px;align-items:start;margin-bottom:8px" class="rev-summary">' +
        '<div style="text-align:center;background:var(--surface-2);border-radius:14px;padding:22px 12px"><div style="font-family:var(--font-head);font-weight:800;font-size:3rem;line-height:1">' + p.r.toFixed(1) + '</div>' +
        '<div style="margin:6px 0">' + VM.starsHtml(p.r, 17) + '</div>' +
        '<div class="muted" style="font-size:.82rem">' + VM.num(p.rv) + ' reviews</div></div>' +
        '<div>' + revs.map(function (rv) {
          return '<div class="review-card" style="margin-bottom:14px">' +
            '<div class="who"><span class="av">' + VM.esc(rv.n.split(' ').map(function (w) { return w[0]; }).join('')) + '</span>' +
            '<span><b>' + VM.esc(rv.n) + '</b><small>' + VM.esc(rv.c) + ' &middot; ' + rv.d + '</small></span></div>' +
            '<div class="rc-body">' + VM.starsHtml(rv.r, 13) + '<b style="display:block;margin:6px 0 2px">' + VM.esc(rv.t) + '</b>' +
            '<p style="margin:0">' + VM.esc(rv.b) + '</p>' +
            '<span class="verified">' + VM.icon('check') + ' Verified purchase</span></div></div>';
        }).join('') + '</div></div>' +
        '<p class="muted" style="font-size:.9rem">' + pct5 + '% of buyers recommend this product. Want to leave your own review? <a href="contact.html" style="color:var(--brand);font-weight:700">Contact our team</a>.</p>';
    }
  }

  function related(p) {
    var list = VM.PRODUCTS.filter(function (o) { return o.t === p.t && o.id !== p.id; });
    list = list.concat(VM.PRODUCTS.filter(function (o) { return o.t !== p.t; }));
    var seen = {}, out = [];
    list.forEach(function (o) { if (!seen[o.id] && out.length < 8) { seen[o.id] = 1; out.push(o); } });
    var host = VM.$('#relRow');
    if (host) {
      VM.renderGrid(host, out, {});
      VM.wireReveal();
    }
  }

  function bundle(p) {
    var host = VM.$('#bundleWrap');
    if (!host) return;
    var others = VM.PRODUCTS.filter(function (o) { return o.id !== p.id && o.s !== 'out' && o.t !== p.t; });
    others.sort(function () { return 0.5 - Math.random(); });
    var items = [p].concat(others.slice(0, 2));
    var sum = items.reduce(function (a, x) { return a + x.p; }, 0);
    var save = Math.round(sum * 0.1);
    var final = sum - save;
    var rows = items.map(function (x, i) {
      return '<div class="bi"><img src="' + (VM.imgSrc(x) || VM.coverDataUri(x)) + '" alt="">' +
        '<span class="t"><b>' + VM.esc(x.n) + '</b><span>' + VM.money(x.p) + '</span></span></div>' +
        (i < items.length - 1 ? '<span class="plus">+</span>' : '');
    }).join('');
    host.innerHTML = '<div class="bundle-card reveal"><div class="bundle-items">' + rows + '</div>' +
      '<div class="bb"><div class="tot"><small>Bundle total</small><b>' + VM.money(final) + '</b></div>' +
      '<button class="btn" id="bundleAdd">ADD ALL 3 \u2014 SAVE ' + VM.money(save) + '</button></div></div>';
    VM.$('#bundleAdd').addEventListener('click', function () {
      var ok = true;
      items.forEach(function (x) { if (!VM.cart.add(x.id, 1, true)) ok = false; });
      if (ok) {
        VM.toast('Bundle added to cart', 'All 3 items \u2014 you saved ' + VM.money(save), 'ok', { label: 'View cart', fn: VM.openCart });
      }
    });
    VM.wireReveal();
  }

  VM.pages.product = function () {
    var id = VM.qs('id');
    var p = id ? VM.prodById(id) : null;
    var wrap = VM.$('#pdWrap');
    if (!wrap) return;
    if (!p) {
      wrap.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('search') + '</div>' +
        '<h2>Product not found</h2><p>The product you are looking for may have been moved or removed.</p>' +
        '<a class="btn" href="shop.html">Back to shop</a></div>';
      return;
    }
    fillPage(p);
    related(p);
    bundle(p);
    VM.wireReveal();
  };
})();
