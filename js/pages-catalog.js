/* ==========================================================================
   VIC MUSICAL STORE — pages-catalog.js
   Powers shop.html (all / type / vibe / search views), sales.html,
   new-arrivals.html and best-sellers.html.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  var SORT_OPTIONS = [
    { k: 'popular', l: 'Most Popular' },
    { k: 'newest', l: 'Newest' },
    { k: 'plow', l: 'Price: Low to High' },
    { k: 'phigh', l: 'Price: High to Low' },
    { k: 'rating', l: 'Highest Rated' }
  ];

  var state = {
    mode: 'shop',           /* shop | sales | new | best */
    q: null, type: null, vibe: null, sale: false, brand: '',
    types: {}, rating: 0, inStock: false, priceMin: 0, priceMax: 0,
    sort: 'popular', visible: 24, list: [], activeVibe: null
  };

  VM.catState = state;

  function listAll() {
    var out = VM.PRODUCTS.slice();
    if (state.mode === 'new') out = VM.tagged('new').slice();
    else if (state.mode === 'best') out = VM.tagged('best').slice();
    else if (state.mode === 'sales') out = VM.discounted().slice();
    return out;
  }

  function applyFilters(base) {
    var list = base.slice();
    if (state.q) {
      var words = state.q.toLowerCase().split(/\s+/);
      list = list.filter(function (p) {
        var hay = (p.n + ' ' + p.b + ' ' + p.t + ' ' + (VM.VIBE_NAMES[p.v] || '') + ' ' + (p.n)).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
    }
    if (state.type && !state.types[state.type]) list = list.filter(function (p) { return p.t === state.type; });
    else if (Object.keys(state.types).length) {
      list = list.filter(function (p) { return state.types[p.t]; });
    }
    if (state.vibe) list = list.filter(function (p) { return p.v === state.vibe; });
    if (state.sale) list = list.filter(function (p) { return VM.discountPct(p) >= 5; });
    if (state.brand) list = list.filter(function (p) { return p.b === state.brand; });
    if (state.rating) list = list.filter(function (p) { return p.r >= state.rating; });
    if (state.inStock) list = list.filter(function (p) { return p.s !== 'out'; });
    if (state.priceMin > 0) list = list.filter(function (p) { return p.p >= state.priceMin; });
    if (state.priceMax > 0) list = list.filter(function (p) { return p.p <= state.priceMax; });
    return list;
  }

  function sortList(list) {
    var s = state.sort;
    list.sort(function (a, b) {
      if (s === 'plow') return a.p - b.p;
      if (s === 'phigh') return b.p - a.p;
      if (s === 'rating') return b.r - a.r;
      if (s === 'newest') {
        var na = a.tg && a.tg.indexOf('new') !== -1 ? 1 : 0;
        var nb = b.tg && b.tg.indexOf('new') !== -1 ? 1 : 0;
        if (na !== nb) return nb - na;
        return b.id.localeCompare(a.id);
      }
      return b.rv - a.rv; /* most popular */
    });
    return list;
  }

  var heroStaticHtml = null;

  /* ---------- render ---------- */
  function gridEl() { return VM.$('#catGrid'); }
  function countEl() { return VM.$('#catCount'); }
  function moreBtn() { return VM.$('#catMore'); }

  function showCount(list) {
    var el = countEl();
    if (!el) return;
    var txt = '';
    if (state.q) txt = 'Search results for <b>\u201C' + VM.esc(state.q) + '\u201D</b>';
    el.innerHTML = txt + ' &mdash; <b>' + VM.num(list.length) + '</b> product' + (list.length === 1 ? '' : 's');
  }

  function renderGrid(list) {
    var grid = gridEl();
    if (!grid) return;
    VM.renderGrid(grid, list.slice(0, state.visible), {});
    showCount(list);
    var more = moreBtn();
    if (more) {
      more.style.display = state.visible < list.length ? 'flex' : 'none';
      more.setAttribute('data-total', list.length);
    }
    if (state.visible < list.length && grid) {
      /* leave more visible */
    }
    VM.wireReveal();
  }

  function apply() {
    var base = listAll();
    if (state.mode === 'sales') {
      renderSalesSections();
      return;
    }
    var list = sortList(applyFilters(base));
    state.list = list;
    renderGrid(list);
    renderChips();
    syncUI();
  }

  /* ---------- active filter chips ---------- */
  function chip(label, clearFn) {
    var c = document.createElement('span');
    c.className = 'active-chip';
    c.innerHTML = VM.esc(label) + '<button aria-label="Remove filter">' + VM.icon('x') + '</button>';
    c.querySelector('button').addEventListener('click', function () { clearFn(); apply(); });
    return c;
  }
  function renderChips() {
    var host = VM.$('#catActive');
    if (!host) return;
    host.innerHTML = '';
    if (state.q) host.appendChild(chip('Search: ' + state.q, function () { state.q = null; var i = VM.$('#vmSearchInput'); if (i) i.value = ''; }));
    if (state.vibe) host.appendChild(chip(VM.VIBE_NAMES[state.vibe] + ' vibe', function () { state.vibe = null; setHeroState(); }));
    if (state.type) host.appendChild(chip((typeMeta(state.type) || {}).name || state.type, function () { state.type = null; }));
    Object.keys(state.types).forEach(function (k) {
      host.appendChild(chip((typeMeta(k) || {}).name || k, function () { delete state.types[k]; }));
    });
    if (state.brand) host.appendChild(chip('Brand: ' + state.brand, function () { state.brand = ''; }));
    if (state.sale) host.appendChild(chip('On sale only', function () { state.sale = false; }));
    if (state.rating) host.appendChild(chip(state.rating + '\u2605 & up', function () { state.rating = 0; }));
    if (state.inStock) host.appendChild(chip('In stock', function () { state.inStock = false; }));
    if (state.priceMin || state.priceMax) {
      var lbl = 'Price: ' + (state.priceMin ? VM.money(state.priceMin) : '\u20A60') + ' \u2013 ' + (state.priceMax ? VM.money(state.priceMax) : '\u221E');
      host.appendChild(chip(lbl, function () { state.priceMin = 0; state.priceMax = 0; }));
    }
  }

  /* ---------- sync sidebar UI ---------- */
  function syncUI() {
    var i;
    VM.$$('.cat-type-check').forEach(function (cb) {
      cb.checked = !!state.types[cb.value];
    });
    VM.$$('.vibe-f-item').forEach(function (b) {
      b.classList.toggle('on', state.vibe === b.getAttribute('data-v'));
    });
    VM.$$('input[name=fRate]').forEach(function (r) {
      r.checked = Number(r.value) === state.rating;
    });
    var st = VM.$('#fStock');
    if (st) st.checked = state.inStock;
    var br = VM.$('#fBrand');
    if (br) br.value = state.brand || '';
    var mn = VM.$('#fMin'), mx = VM.$('#fMax');
    if (mn) mn.value = state.priceMin || '';
    if (mx) mx.value = state.priceMax || '';
    VM.$$('.price-q').forEach(function (b) {
      var on = Number(b.getAttribute('data-min')) === state.priceMin && Number(b.getAttribute('data-max')) === state.priceMax;
      b.classList.toggle('on', on);
    });
    var so = VM.$('#catSort');
    if (so) so.value = state.sort;
    var isVibe = !!state.vibe;
    VM.$$('[data-f-only]').forEach(function (el) {
      var only = el.getAttribute('data-f-only');
      el.style.display = (only === 'vibe' && !isVibe) || (only === 'plain' && isVibe) ? 'none' : '';
    });
    if (state.type) {
      VM.$$('.cat-type-check').forEach(function (cb) { if (cb.value === state.type) cb.checked = true; });
    }
  }

  function typeMeta(k) {
    var t = VM.TYPES.filter(function (x) { return x.key === k; })[0];
    return t || { key: k, name: k };
  }

  function setHeroState() {
    var vibe = state.vibe;
    VM.setTheme(vibe || null);
    var hero = VM.$('#catHero');
    if (!hero) return;
    hero.classList.toggle('vibe-hero', !!vibe);
    if (vibe) {
      var vb = VM.VIBES.filter(function (v) { return v.key === vibe; })[0];
      var art = VM.IMGS[VIBE_ART[vibe]] || '';
      hero.innerHTML = vibeHeroHtml(vb, art);
      var sw = hero.querySelector('.vibe-switch');
      if (sw) VM.$$('button', sw).forEach(function (b) {
        b.addEventListener('click', function () {
          window.location.href = VM.vibeHref(b.getAttribute('data-v'));
        });
      });
    } else if (state.q || state.type || state.sale) {
      hero.innerHTML = plainHeroHtml();
    } else if (heroStaticHtml) {
      hero.innerHTML = heroStaticHtml;
    }
  }

  /* ---------- heroes ---------- */
  var VIBE_ART = { premium: 'kp2', rock: 'eg1', savage: 'sp2', creative: 'scn_creative', professional: 'scn_pro', energetic: 'hp1' };

  function vibeHeroHtml(vb, art) {
    if (!art || art === 'scn_creative') art = '';
    var artTag = art
      ? '<div class="vh-art"><img src="' + art + '" alt="' + VM.esc(vb.title) + ' collection" onerror="this.style.display=\'none\'"></div>'
      : '';
    var switchChips = VM.VIBES.map(function (v) {
      return '<button class="chip' + (v.key === vb.key ? ' on' : '') + '" data-v="' + v.key + '">' + VM.icon(v.ic) + ' ' + v.title + '</button>';
    }).join('');
    return '<div class="page-wrap"><div class="vh-grid">' +
      '<div><span class="vh-tag">' + VM.icon(vb.ic) + ' ' + vb.name + ' Vibe</span>' +
      '<h1>Shop the <span style="color:var(--accent)">' + VM.esc(vb.title) + '</span> Vibe</h1>' +
      '<p class="lead">' + VM.esc(vb.desc) + '</p>' +
      '<div class="vh-stats"><div><div class="n">' + VM.num(VM.productsByVibe(vb.key).length) + '+</div><div class="l">curated products</div></div>' +
      '<div><div class="n">4.7\u2605</div><div class="l">average rating</div></div>' +
      '<div><div class="n">24h</div><div class="l">delivery</div></div></div>' +
      '<div class="vibe-switch">' + switchChips + '</div></div>' + artTag + '</div></div>';
  }

  function plainHeroHtml() {
    var title = 'Shop Everything';
    var lead = 'Browse the full Vic Musical Store catalogue \u2014 instruments, sound systems, studio gear and accessories for every musician and creator.';
    var crumb = 'Home / Shop';
    var extra = '';
    if (state.type) {
      var tm = typeMeta(state.type);
      title = tm.name;
      lead = tm.blurb + '. ' + VM.num(VM.productsByType(state.type).length) + ' products in this range, ready to ship nationwide.';
      crumb = 'Home / Shop / ' + tm.name;
      extra = '<div class="mini" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">' + tm.subs.map(function (s) {
        return '<a class="chip" href="shop.html?type=' + state.type + '&q=' + encodeURIComponent(s) + '">' + s + '</a>';
      }).join('') + '</div>';
    } else if (state.q) {
      title = 'Results for \u201C' + state.q + '\u201D';
      lead = 'Everything we found matching your search across the catalogue.';
      crumb = 'Home / Shop / Search';
    } else if (state.sale) {
      title = 'On Sale';
      lead = 'Every discounted product currently live in the store.';
      crumb = 'Home / Shop / Sale';
    }
    return '<div class="page-wrap"><div class="crumbs">' + crumb.split(' / ').map(function (c, i, a) {
      if (i === 0) return '<a href="index.html">Home</a>';
      if (i === a.length - 1) return '<span class="here">' + c + '</span>';
      return '<span>' + VM.icon('chevR') + '</span><a href="shop.html">' + c + '</a>';
    }).join('<span>' + VM.icon('chevR') + '</span>') + '</div>' +
      '<h1>' + title + '</h1><p class="lead">' + lead + '</p>' + extra + '</div>';
  }

  /* ---------- sales page ---------- */
  function renderSalesSections() {
    var host = VM.$('#salesSections');
    if (!host) return;
    var discounted = sortList(VM.discounted().slice());
    var def = function (tag) { return discounted.filter(function (p) { return p.tg && p.tg.indexOf(tag) !== -1; }); };
    var hot = discounted.filter(function (p) { return p.tg && p.tg.indexOf('hot') !== -1; });
    var flash = def('flash');
    if (flash.length < 6) {
      discounted.slice(0, 10).forEach(function (p) {
        if (flash.length < 6 && flash.indexOf(p) === -1) flash.push(p);
      });
    }
    var big = discounted.filter(function (p) { return VM.discountPct(p) >= 25; });
    var sections = [
      { id: 'hot', ic: 'flame', title: 'Hot Deals', sub: 'Our most-wanted gear, marked down now', list: hot.slice(0, 8), link: 'shop.html?sale=1' },
      { id: 'flash', ic: 'bolt', title: 'Flash Sales', sub: 'Limited-time lightning prices \u2014 gone fast', list: flash.slice(0, 8), link: 'shop.html?sale=1' },
      { id: 'big', ic: 'sparkle', title: 'Big Discounts', sub: 'Up to 50% off across the catalogue', list: big.slice(0, 8), link: 'shop.html?sale=1' },
      { id: 'guitar', ic: 'guitar', title: 'Guitar Sales', sub: 'Six strings on sale', list: discounted.filter(function (p) { return p.t === 'guitars'; }).slice(0, 8), link: 'shop.html?type=guitars&sale=1' },
      { id: 'drum', ic: 'drum', title: 'Drum Sales', sub: 'Kits, cymbals & percussion deals', list: discounted.filter(function (p) { return p.t === 'drums'; }).slice(0, 8), link: 'shop.html?type=drums&sale=1' },
      { id: 'mic', ic: 'mic', title: 'Microphone Deals', sub: 'Capture every take for less', list: discounted.filter(function (p) { return p.t === 'microphones'; }).slice(0, 8), link: 'shop.html?type=microphones&sale=1' },
      { id: 'speaker', ic: 'speaker', title: 'Speaker Deals', sub: 'Big sound, smaller price tags', list: discounted.filter(function (p) { return p.t === 'speakers'; }).slice(0, 8), link: 'shop.html?type=speakers&sale=1' },
      { id: 'key', ic: 'piano', title: 'Keyboard Deals', sub: 'Pianos & synths at key prices', list: discounted.filter(function (p) { return p.t === 'keyboards'; }).slice(0, 8), link: 'shop.html?type=keyboards&sale=1' }
    ];
    var nav = '<div class="anchor-nav page-wrap">' + sections.map(function (s) {
      return '<a href="#sale-' + s.id + '">' + VM.icon(s.ic) + ' ' + s.title + '</a>';
    }).join('') + '</div>';
    var html = nav + sections.map(function (s) {
      var cards = s.list.map(function (p) { return VM.cardHtml(p); }).join('');
      return '<section class="sale-sect" id="sale-' + s.id + '"><div class="page-wrap">' +
        '<div class="ss-head"><span class="em">' + VM.icon(s.ic) + '</span><div><h2>' + s.title + '</h2>' +
        '<p>' + s.sub + '</p></div><a class="btn btn-sm btn-ghost" style="margin-left:auto" href="' + s.link + '">View All</a></div>' +
        '<div class="prod-grid">' + cards + '</div></div></section>';
    }).join('');
    host.innerHTML = html;
    var count = VM.$('#catCount');
    if (count) count.innerHTML = '<b>' + VM.num(discounted.length) + '</b> products currently on sale';
    VM.wireReveal();
  }

  /* ---------- event wiring ---------- */
  function wireFilters() {
    var panel = VM.$('.shop-filters');
    var btn = VM.$('.mobile-filter-btn');
    if (btn) btn.addEventListener('click', function () { if (panel) panel.classList.add('open'); });
    if (panel) {
      var close = panel.querySelector('.filter-close');
      if (close) close.addEventListener('click', function () { panel.classList.remove('open'); });
      panel.addEventListener('click', function (e) {
        if (e.target === panel) panel.classList.remove('open');
      });
    }
    VM.$$('.cat-type-check').forEach(function (cb) {
      cb.addEventListener('change', function () {
        state.type = null;
        if (cb.checked) state.types[cb.value] = 1; else delete state.types[cb.value];
        state.visible = 24; apply();
      });
    });
    VM.$$('.vibe-f-item').forEach(function (b) {
      b.addEventListener('click', function () {
        state.vibe = b.getAttribute('data-v') === state.vibe ? null : b.getAttribute('data-v');
        state.visible = 24;
        setHeroState();
        apply();
        var grid = gridEl();
        if (grid) VM.softFade(grid);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    VM.$$('input[name=fRate]').forEach(function (r) {
      r.addEventListener('change', function () { state.rating = Number(r.value); state.visible = 24; apply(); });
    });
    var st = VM.$('#fStock');
    if (st) st.addEventListener('change', function () { state.inStock = st.checked; state.visible = 24; apply(); });
    var br = VM.$('#fBrand');
    if (br) br.addEventListener('change', function () { state.brand = br.value; state.visible = 24; apply(); });
    VM.$$('.price-q').forEach(function (b) {
      b.addEventListener('click', function () {
        state.priceMin = Number(b.getAttribute('data-min'));
        state.priceMax = Number(b.getAttribute('data-max'));
        state.visible = 24; apply();
      });
    });
    var mn = VM.$('#fMin'), mx = VM.$('#fMax');
    if (mn && mx) {
      function applyRange() {
        state.priceMin = Number(mn.value) || 0;
        state.priceMax = Number(mx.value) || 0;
        state.visible = 24; apply();
      }
      mn.addEventListener('change', applyRange);
      mx.addEventListener('change', applyRange);
    }
    var reset = VM.$('#fReset');
    if (reset) reset.addEventListener('click', function () {
      state.q = null; state.type = null; state.types = {}; state.vibe = null;
      state.brand = ''; state.rating = 0; state.inStock = false; state.sale = false;
      state.priceMin = 0; state.priceMax = 0; state.sort = 'popular'; state.visible = 24;
      setHeroState();
      apply();
    });
    var so = VM.$('#catSort');
    if (so) so.addEventListener('change', function () { state.sort = so.value; state.visible = 24; apply(); });
    var more = moreBtn();
    if (more) more.addEventListener('click', function () {
      state.visible += 24;
      renderGrid(state.list);
    });
  }

  /* ---------- boot ---------- */
  VM.pages.catalog = function () {
    var hero = VM.$('#catHero');
    if (hero) heroStaticHtml = hero.innerHTML;
    var mode = document.body.getAttribute('data-mode') || 'shop';
    state.mode = mode;
    state.q = VM.qs('q');
    state.type = VM.qs('type');
    state.vibe = VM.qs('vibe');
    state.sale = VM.qs('sale') === '1' || VM.qs('sale') === 'true';
    state.brand = VM.qs('brand') || '';
    if (mode !== 'shop') { state.q = null; state.type = null; state.vibe = null; }
    if (state.type) state.types = {};
    var sort = VM.qs('sort');
    if (sort && SORT_OPTIONS.some(function (o) { return o.k === sort; })) state.sort = sort;
    else if (mode === 'new') state.sort = 'newest';

    /* filters sidebar markup (static in html) + wire */
    wireFilters();

    /* populate brand select + type counts */
    var br = VM.$('#fBrand');
    if (br) {
      var opts = ['<option value="">All brands</option>'].concat(VM.brands().map(function (b) {
        return '<option value="' + VM.esc(b) + '">' + VM.esc(b) + '</option>';
      }));
      br.innerHTML = opts.join('');
    }
    VM.$$('.cat-type-check').forEach(function (cb) {
      var cnt = VM.productsByType(cb.value).length;
      var label = cb.closest('.check-row');
      if (label) {
        var c = label.querySelector('.cnt');
        if (c) c.textContent = VM.num(cnt);
      }
    });
    VM.$$('.vibe-f-item').forEach(function (b) {
      var cnt = VM.productsByVibe(b.getAttribute('data-v')).length;
      var c = b.querySelector('.cnt');
      if (c) c.textContent = VM.num(cnt);
    });
    var heading = VM.$('#catTypeCount');
    if (heading) {
      if (state.type) heading.textContent = VM.num(VM.productsByType(state.type).length) + ' products';
      else if (state.mode === 'new') heading.textContent = VM.num(VM.tagged('new').length) + ' just landed';
      else if (state.mode === 'best') heading.textContent = VM.num(VM.tagged('best').length) + ' crowd favourites';
    }

    if (state.mode === 'shop') {
      setHeroState();
      apply();
    } else if (state.mode === 'sales') {
      VM.setTheme(null);
      apply(); /* renders sections */
    } else {
      VM.setTheme(null);
      apply();
    }
  };

  /* expose for 'view all' from sections etc. */
  VM.goShop = function (params) {
    var qs = [];
    for (var k in params) if (params[k]) qs.push(k + '=' + encodeURIComponent(params[k]));
    window.location.href = 'shop.html' + (qs.length ? '?' + qs.join('&') : '');
  };
})();
