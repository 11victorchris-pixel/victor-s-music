/* ==========================================================================
   VIC MUSICAL STORE — pages-auth.js
   Login / register / account (orders) — backed by the Express API.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  function redirectIfLoggedIn() {
    if (VM.api && VM.api.token() && VM.api.user()) {
      window.location.href = 'account.html';
      return true;
    }
    return false;
  }

  VM.pages.login = function () {
    if (redirectIfLoggedIn()) return;
    var form = VM.$('#loginForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      VM.api.login({ email: VM.$('#liEmail').value.trim(), password: VM.$('#liPass').value })
        .then(function (r) {
          VM.api.token(r.token);
          VM.api.setUser(r.user);
          VM.toast('Welcome back', r.user.name, 'ok');
          window.location.href = r.user.role === 'admin' ? 'admin.html' : 'account.html';
        })
        .catch(function (err) {
          VM.toast('Login failed', err.message, 'err');
          btn.disabled = false;
        });
    });
  };

  VM.pages.register = function () {
    if (redirectIfLoggedIn()) return;
    var form = VM.$('#regForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (VM.$('#rgPass').value !== VM.$('#rgPass2').value) {
        VM.toast('Passwords differ', 'Repeat the same password twice.', 'err');
        return;
      }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      VM.api.register({
        name: VM.$('#rgName').value.trim(),
        email: VM.$('#rgEmail').value.trim(),
        phone: VM.$('#rgPhone').value.trim(),
        password: VM.$('#rgPass').value,
      }).then(function (r) {
        VM.api.token(r.token);
        VM.api.setUser(r.user);
        VM.toast('Account created', 'Welcome to Vic Musical Store, ' + r.user.name + '!', 'ok');
        window.location.href = 'account.html';
      }).catch(function (err) {
        VM.toast('Could not register', err.message, 'err');
        btn.disabled = false;
      });
    });
  };

  VM.pages.account = function () {
    var box = VM.$('#accountMain');
    if (!box) return;
    if (!VM.api || !VM.api.token()) {
      box.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('user') + '</div>' +
        '<h2>Login required</h2><p>Log in to see your profile and track your orders.</p>' +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn" href="login.html">Log In</a><a class="btn btn-ghost" href="register.html">Create Account</a></div></div>';
      return;
    }
    box.innerHTML = '<p class="muted">Loading your account…</p>';
    VM.api.me().then(function (r) {
      VM.api.setUser(r.user);
      var u = r.user;
      box.innerHTML =
        '<div class="panel" style="margin-bottom:16px"><h3 class="panel-title">' + VM.icon('user') + ' ' + VM.esc(u.name) + '</h3>' +
        '<p class="muted" style="margin:6px 0 12px">' + VM.esc(u.email) + (u.phone ? ' &middot; ' + VM.esc(u.phone) : '') +
        ' &middot; member since ' + VM.esc((u.created_at || '').slice(0, 10)) + '</p>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        (u.role === 'admin' ? '<a class="btn btn-sm" href="admin.html">Open Admin Dashboard</a>' : '') +
        '<button class="btn btn-sm btn-ghost" id="logoutBtn">Log Out</button></div></div>' +
        '<div class="panel"><h3 class="panel-title">' + VM.icon('receipt') + ' My Orders</h3><div id="myOrders"><p class="muted">Loading…</p></div></div>';
      VM.$('#logoutBtn').addEventListener('click', function () {
        VM.api.logout();
        window.location.href = 'index.html';
      });
      return VM.api.myOrders();
    }).then(function (r) {
      var host = VM.$('#myOrders');
      if (!host) return;
      if (!r.orders.length) {
        host.innerHTML = '<p class="muted">No orders yet. <a href="shop.html">Find your sound →</a></p>';
        return;
      }
      host.innerHTML = r.orders.map(function (o) {
        return '<div class="ck-order-item" style="align-items:flex-start"><span class="f-ic">' + VM.icon('receipt') + '</span>' +
          '<div class="oi-b"><b>' + VM.esc(o.number) + '</b>' +
          '<small>' + VM.esc((o.created_at || '').slice(0, 16).replace('T', ' ')) + ' &middot; ' + VM.money(o.total) +
          ' &middot; <b>' + VM.esc(o.status.toUpperCase()) + '</b></small></div>' +
          '<a class="btn btn-sm btn-ghost" href="account.html?order=' + VM.esc(o.number) + '">View</a></div>';
      }).join('');
      // order detail view (?order=JM-…)
      var m = (window.location.search.match(/[?&]order=([^&]+)/) || [])[1];
      if (m && VM.api) {
        VM.api.get('/orders/' + encodeURIComponent(decodeURIComponent(m))).then(function (d) {
          var items = d.items.map(function (i) {
            return '<div class="sum-row"><span class="lbl">' + VM.esc(i.name) + ' × ' + i.qty + '</span><span>' + VM.money(i.price * i.qty) + '</span></div>';
          }).join('');
          host.innerHTML = '<p><a href="account.html">← All orders</a></p>' +
            '<div class="sum-row"><span class="lbl">Order</span><span><b>' + VM.esc(d.order.number) + '</b></span></div>' + items +
            '<div class="sum-row"><span class="lbl">Delivery</span><span>' + VM.money(d.order.delivery) + '</span></div>' +
            '<div class="sum-row big"><span>Total</span><span>' + VM.money(d.order.total) + '</span></div>' +
            '<p class="muted">Ship to: ' + VM.esc(d.order.address + ', ' + d.order.city + ', ' + d.order.state) + '</p>';
        }).catch(function () { /* ignore */ });
      }
    }).catch(function (err) {
      VM.api.logout();
      box.innerHTML = '<div class="empty-state"><h2>Session expired</h2><p>' + VM.esc(err.message) + '</p>' +
        '<a class="btn" href="login.html">Log In Again</a></div>';
    });
  };
})();
