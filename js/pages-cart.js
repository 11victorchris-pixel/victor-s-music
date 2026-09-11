/* ==========================================================================
   VIC MUSICAL STORE — pages-cart.js
   Full cart page (cart.html) and wishlist page (wishlist.html).
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  /* ---------- cart page ---------- */
  function renderCartPage() {
    var wrap = VM.$('#cartInner');
    if (!wrap) return;
    var lines = VM.cart.lines();
    if (!lines.length) {
      wrap.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('bag') + '</div>' +
        '<h2>Your cart is empty</h2><p>Looks like you haven\u2019t added anything yet. Explore the catalogue and find your sound.</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn" href="shop.html">Start Shopping</a>' +
        '<a class="btn btn-ghost" href="best-sellers.html">See Best Sellers</a></div></div>';
      return;
    }
    var rows = lines.map(function (l) {
      var p = l.p;
      var pct = VM.discountPct(p);
      return '<div class="ct-row" data-id="' + p.id + '">' +
        '<a href="product.html?id=' + p.id + '"><img src="' + (VM.imgSrc(p) || VM.coverDataUri(p)) + '" alt="' + VM.esc(p.n) + '"></a>' +
        '<div class="ct-name"><a href="product.html?id=' + p.id + '"><b>' + VM.esc(p.n) + '</b></a>' +
        '<div class="cat">' + VM.esc(p.b) + ' &middot; ' + VM.esc(VM.typeName(p.t)) + '</div>' +
        '<div class="ct-price">' + VM.money(p.p) +
        (pct >= 5 ? '<span class="was">' + VM.money(p.w) + '</span>' : '') + '</div></div>' +
        '<div class="ct-ctl">' +
        '<div class="qty"><button data-ct="minus" data-id="' + p.id + '" aria-label="Decrease">' + VM.icon('minus') + '</button>' +
        '<span class="q-num">' + l.q + '</span>' +
        '<button data-ct="plus" data-id="' + p.id + '" aria-label="Increase">' + VM.icon('plus') + '</button></div>' +
        '<div class="ct-line">' + VM.money(p.p * l.q) + '</div>' +
        '<button class="di-rm" data-ct="rm" data-id="' + p.id + '">' + VM.icon('trash') + ' Remove</button>' +
        '</div></div>';
    }).join('');
    wrap.innerHTML = '<div class="cart-layout"><div><div class="cart-table">' +
      '<div class="ct-head"><span>Product</span><span style="margin-right:6px">Item total</span></div>' +
      rows + '</div>' +
      '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">' +
      '<a class="btn btn-ghost" href="shop.html">&larr; Continue Shopping</a>' +
      '<a class="btn btn-ghost" href="wishlist.html">View Wishlist</a></div></div>' +
      '<aside class="summary-card" id="cartSummary"></aside></div>';
    renderCartSummary();
    VM.$$('.cart-table [data-ct]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-id');
        var act = b.getAttribute('data-ct');
        var p = VM.prodById(id);
        var q = VM.cartData[id] || 1;
        if (act === 'plus') {
          var cap = p && p.s === 'low' ? 5 : 20;
          if (q < cap) VM.cart.setQty(id, q + 1);
          else VM.toast('Max quantity reached', p.n, 'warn');
        } else if (act === 'minus') {
          VM.cart.setQty(id, q > 1 ? q - 1 : 0);
        } else if (act === 'rm') {
          VM.cart.remove(id);
        }
        renderCartPage();
      });
    });
  }

  function renderCartSummary() {
    var host = VM.$('#cartSummary');
    if (!host) return;
    var sub = VM.cart.subtotal();
    var del = VM.cart.delivery();
    var free = del === 0;
    var need = Math.max(0, VM.FREE_DELIVERY_FROM - sub);
    host.innerHTML = '<h3>' + VM.icon('bag') + ' Order Summary</h3>' +
      (free ? '<div class="free-del">' + VM.icon('check') + ' &nbsp;Free delivery unlocked!</div>'
        : '<div class="free-del">Add <b>' + VM.money(need) + '</b> more to get <b>FREE delivery</b></div>') +
      '<div class="sum-row"><span class="lbl">Subtotal (' + VM.num(VM.cart.count()) + ' items)</span><span>' + VM.money(sub) + '</span></div>' +
      '<div class="sum-row"><span class="lbl">Delivery</span><span>' + (free ? '<b style="color:var(--ok)">FREE</b>' : VM.money(del)) + '</span></div>' +
      '<div class="sum-row big"><span>Total</span><span>' + VM.money(VM.cart.total()) + '</span></div>' +
      '<a class="btn btn-block" href="checkout.html" style="margin-top:16px">Proceed to Checkout</a>' +
      '<div class="divider-note" style="margin:18px 0 12px">Secure checkout</div>' +
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
      '<span class="tag" style="background:#1A1F71;color:#fff">VISA</span>' +
      '<span class="tag" style="background:#EB001B;color:#fff">MASTERCARD</span>' +
      '<span class="tag" style="background:#5E2D91;color:#fff">VERVE</span>' +
      '<span class="tag" style="background:#00A3E0;color:#fff">PAYSTACK</span></div>' +
      '<p class="terms-note" style="text-align:center">Cash on delivery available in Lagos, Abuja &amp; Port Harcourt.</p>';
  }

  /* ---------- wishlist page ---------- */
  function renderWishPage() {
    var wrap = VM.$('#wishInner');
    if (!wrap) return;
    var items = VM.wish.items();
    var cnt = VM.$('#wishCount');
    if (cnt) cnt.textContent = VM.num(items.length) + ' saved';
    if (!items.length) {
      wrap.innerHTML = '<div class="empty-state"><div class="es-ic">' + VM.icon('heart') + '</div>' +
        '<h2>Your wishlist is empty</h2><p>Tap the \u2665 icon on any product to save it here for later.</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<a class="btn" href="shop.html">Browse Products</a>' +
        '<a class="btn btn-ghost" href="new-arrivals.html">See New Arrivals</a></div></div>';
      return;
    }
    var stocked = items.filter(function (p) { return p.s !== 'out'; });
    wrap.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:20px;flex-wrap:wrap">' +
      '<p class="muted" style="margin:0">Products you\u2019ve saved \u2014 add them to your cart whenever you\u2019re ready.</p>' +
      (stocked.length ? '<button class="btn" id="wishAddAll">' + VM.icon('bag') + ' Add All (' + stocked.length + ') to Cart</button>' : '') +
      '</div>' +
      '<div class="prod-grid" id="wishGrid"></div>';
    VM.renderGrid(VM.$('#wishGrid'), items, {});
    var btn = VM.$('#wishAddAll');
    if (btn) btn.addEventListener('click', function () {
      var added = 0;
      items.forEach(function (p) {
        if (p.s !== 'out' && VM.cart.add(p.id, 1, true)) added++;
      });
      VM.toast(added + ' item' + (added === 1 ? '' : 's') + ' added to cart', 'From your wishlist', 'ok', { label: 'View cart', fn: VM.openCart });
      renderWishPage();
    });
    VM.wireReveal();
  }

  VM.pages.cart = function () {
    if (!VM.__cartPageBound) VM.__cartPageBound = true, VM.cart.on(renderCartPage);
    renderCartPage();
  };
  VM.pages.wishlist = function () {
    if (!VM.__wishCartBound) VM.__wishCartBound = true, VM.cart.on(renderWishPage);
    if (!VM.__wishBound) VM.__wishBound = true, VM.wish.on(renderWishPage);
    renderWishPage();
  };
})();
