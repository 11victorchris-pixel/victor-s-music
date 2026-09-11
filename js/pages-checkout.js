/* ==========================================================================
   VIC MUSICAL STORE — pages-checkout.js
   Demo checkout — NO real payment is processed or claimed.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  function renderSummary() {
    var host = VM.$('#ckSummary');
    if (!host) return;
    var lines = VM.cart.lines();
    host.innerHTML = lines.map(function (l) {
      return '<div class="ck-order-item"><img src="' + (VM.imgSrc(l.p) || VM.coverDataUri(l.p)) + '" alt="">' +
        '<div class="oi-b"><b>' + VM.esc(l.p.n) + '</b><small>Qty ' + l.q + ' &times; ' + VM.money(l.p.p) + '</small></div>' +
        '<div class="oi-p">' + VM.money(l.p.p * l.q) + '</div></div>';
    }).join('') +
      '<div class="sum-row" style="margin-top:8px"><span class="lbl">Subtotal</span><span>' + VM.money(VM.cart.subtotal()) + '</span></div>' +
      '<div class="sum-row"><span class="lbl">Delivery</span><span>' + (VM.cart.delivery() === 0 ? '<b style="color:var(--ok)">FREE</b>' : VM.money(VM.cart.delivery())) + '</span></div>' +
      '<div class="sum-row big"><span>Total</span><span>' + VM.money(VM.cart.total()) + '</span></div>';
    var pt = VM.$('#placeTotal');
    if (pt) pt.textContent = VM.num(VM.cart.total());
  }

  function bindPayTabs() {
    VM.$$('.pay-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        VM.$$('.pay-tab').forEach(function (t) { t.classList.remove('on'); });
        VM.$$('.pay-form').forEach(function (f) { f.classList.remove('on'); });
        tab.classList.add('on');
        var form = VM.$('#pay-' + tab.getAttribute('data-pay'));
        if (form) form.classList.add('on');
      });
    });
  }

  VM.pages.checkout = function () {
    var main = VM.$('#checkoutMain');
    var summary = VM.$('#ckSummaryWrap');
    if (!main) return;
    if (!VM.cart.lines().length) {
      main.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('bag') + '</div>' +
        '<h2>Nothing to check out yet</h2><p>Your cart is empty \u2014 add some gear first, then come back to complete your order.</p>' +
        '<a class="btn" href="shop.html">Browse the store</a></div>';
      if (summary) summary.style.display = 'none';
      return;
    }
    renderSummary();
    bindPayTabs();

    var form = VM.$('#checkoutForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var btn = VM.$('#placeOrder');
      var original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = VM.icon('bolt') + ' PROCESSING\u2026';

      var payTab = VM.$('.pay-tab.on');
      var payload = {
        customer: {
          name: (VM.$('#cfName') || {}).value || '',
          email: (VM.$('#cfEmail') || {}).value || '',
          phone: (VM.$('#cfPhone') || {}).value || '',
          address: (VM.$('#cfAddr') || {}).value || '',
          city: (VM.$('#cfCity') || {}).value || '',
          state: (VM.$('#cfState') || {}).value || '',
          country: (VM.$('#cfCountry') || {}).value || 'Nigeria',
        },
        payment: payTab ? payTab.getAttribute('data-pay') : 'card',
        items: VM.cart.lines().map(function (l) { return { id: l.p.id, qty: l.q }; }),
      };

      function showSuccess(orderNo, live) {
        VM.cart.clear();
        main.innerHTML = '<div class="ck-success panel" style="max-width:640px;margin:0 auto">' +
          '<div class="big-ic">' + VM.icon('check') + '</div>' +
          '<h2>Order Confirmed</h2>' +
          '<p>Thank you for shopping with Vic Musical Store.</p>' +
          '<div class="order-id">' + VM.esc(orderNo) + '</div>' +
          (live
            ? '<div class="demo-note" style="text-align:left;max-width:420px;margin:0 auto 20px;border-color:var(--ok)">' + VM.icon('check') +
              '<span><b>Saved to our system.</b> Track it any time on the <a href="account.html">My Account</a> page.</span></div>'
            : '<div class="demo-note" style="text-align:left;max-width:420px;margin:0 auto 20px">' + VM.icon('info') +
              '<span><b>Offline demo order:</b> the backend was unreachable, so this order was recorded locally only.</span></div>') +
          '<p>A confirmation email would normally be sent to <b>' + VM.esc(payload.customer.name) + '</b>. Our team will call to confirm delivery within 24 hours.</p>' +
          '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<a class="btn" href="shop.html">Continue Shopping</a>' +
          '<a class="btn btn-ghost" href="account.html">Track Order</a></div></div>';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.disabled = false;
        btn.innerHTML = original;
      }

      if (VM.api) {
        VM.api.createOrder(payload).then(function (r) {
          showSuccess(r.number, true);
        }).catch(function (err) {
          VM.toast('Checkout problem', err.message, 'err');
          btn.disabled = false;
          btn.innerHTML = original;
        });
      } else {
        setTimeout(function () {
          showSuccess('VM-' + Date.now().toString(36).toUpperCase(), false);
        }, 800);
      }
    });
  };
})();
