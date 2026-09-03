/* ==========================================================================
   VICTOR'S MUSIC — pages-checkout.js
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
      setTimeout(function () {
        var name = (VM.$('#cfName') ? VM.$('#cfName').value : 'Valued Customer').trim();
        var orderNo = 'VM-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
        VM.cart.clear();
        main.innerHTML = '<div class="ck-success panel" style="max-width:640px;margin:0 auto">' +
          '<div class="big-ic">' + VM.icon('check') + '</div>' +
          '<h2>Order Confirmed \u{1F389}</h2>' +
          '<p>Thank you for shopping with Victor\u2019s Music.</p>' +
          '<div class="order-id">' + orderNo + '</div>' +
          '<div class="demo-note" style="text-align:left;max-width:420px;margin:0 auto 20px">' + VM.icon('info') +
          '<span><b>Demo checkout notice:</b> no payment was charged. This is a school/demo project \u2014 a real payment gateway is not connected. Your order details were recorded locally only.</span></div>' +
          '<p>A confirmation email would normally be sent to <b>' + VM.esc(name) + '</b>. Our team will call to confirm delivery within 24 hours.</p>' +
          '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
          '<a class="btn" href="shop.html">Continue Shopping</a>' +
          '<a class="btn btn-ghost" href="index.html">Back to Home</a></div></div>';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.disabled = false;
        btn.innerHTML = original;
      }, 1400);
    });
  };
})();
