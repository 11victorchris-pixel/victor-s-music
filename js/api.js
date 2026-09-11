/* ==========================================================================
   VIC MUSICAL STORE — api.js
   Backend client. Works with the Express API when it is reachable,
   otherwise the site keeps running on the bundled catalogue (data.js).
   ========================================================================== */
(function () {
  'use strict';
  var VM = (window.VM = window.VM || {});

  function detectBase() {
    // Same-origin /api when served by the backend; otherwise try localhost:5000.
    try {
      if (window.location.protocol.startsWith('http')) {
        var host = window.location.hostname || 'localhost';
        var port = window.location.port;
        if (port === '5000' || !port) return window.location.origin + '/api';
        return 'http://' + host + ':5000/api';
      }
    } catch (e) { /* ignore */ }
    return 'http://localhost:5000/api';
  }

  var BASE = detectBase();
  var TOKEN_KEY = 'vm_token_v1';
  var api = (VM.api = { base: BASE, online: false });

  api.token = function (t) {
    if (t === undefined) { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } }
    try {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (e) { /* ignore */ }
    return t;
  };

  api.req = function (method, path, body, needsAuth) {
    var headers = { 'Content-Type': 'application/json' };
    var tok = api.token();
    if (tok) headers.Authorization = 'Bearer ' + tok;
    return fetch(BASE + path, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      return r.json().catch(function () { return { error: 'Bad response' }; }).then(function (data) {
        if (!r.ok) throw new Error((data && data.error) || ('Request failed (' + r.status + ')'));
        return data;
      });
    });
  };

  api.get = function (p) { return api.req('GET', p); };
  api.post = function (p, b) { return api.req('POST', p, b); };

  api.register = function (d) { return api.post('/auth/register', d); };
  api.login = function (d) { return api.post('/auth/login', d); };
  api.me = function () { return api.req('GET', '/auth/me', null, true); };
  api.createOrder = function (d) { return api.post('/orders', d); };
  api.myOrders = function () { return api.req('GET', '/orders/mine', null, true); };
  api.newsletter = function (email) { return api.post('/newsletter', { email: email }); };
  api.contact = function (d) { return api.post('/contact', d); };
  api.addReview = function (id, d) { return api.post('/products/' + encodeURIComponent(id) + '/reviews', d); };

  api.user = function () {
    try { return JSON.parse(localStorage.getItem('vm_user_v1') || 'null'); }
    catch (e) { return null; }
  };
  api.setUser = function (u) {
    try {
      if (u) localStorage.setItem('vm_user_v1', JSON.stringify(u));
      else localStorage.removeItem('vm_user_v1');
    } catch (e) { /* ignore */ }
  };
  api.logout = function () { api.token(''); api.setUser(null); };

  /* Sync catalogue from backend so prices/stock are live.
     Falls back silently to the bundled data.js catalogue. */
  api.syncCatalogue = function () {
    return api.get('/products?limit=60&page=1').then(function (first) {
      var total = first.total || 0;
      var pages = first.pages || 1;
      var all = first.items || [];
      var jobs = [];
      for (var p = 2; p <= Math.min(pages, 6); p++) {
        jobs.push(api.get('/products?limit=60&page=' + p).then(function (r) { return r.items || []; }));
      }
      return Promise.all(jobs).then(function (rest) {
        rest.forEach(function (arr) { all = all.concat(arr); });
        if (all.length) {
          // Normalise backend shape to the VM.PRODUCTS shape used by cards/pages.
          VM.PRODUCTS = all.map(function (x) {
            if (x.id && (x.n || x.name)) {
              return x.n ? x : {
                id: x.id, n: x.name, b: x.brand, t: x.type, v: x.vibe,
                p: x.price, w: x.was, r: x.rating, rv: x.reviews,
                s: x.stock, tg: x.tags || [], img: x.img || '',
              };
            }
            return x;
          });
          // Backend already resolves full image URLs; keep IMGS for local keys.
          api.online = true;
          try { document.body.setAttribute('data-api', 'live'); } catch (e) { /* ignore */ }
        }
        return VM.PRODUCTS;
      });
    }).catch(function () {
      api.online = false; // offline demo mode — bundled catalogue stays
      return VM.PRODUCTS || [];
    });
  };
})();
