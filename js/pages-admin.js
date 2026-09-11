/* ==========================================================================
   VIC MUSICAL STORE — pages-admin.js (admin dashboard: overview, orders, products)
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  function headers() {
    return { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (VM.api.token() || '') };
  }
  function req(method, path, body) {
    return fetch(VM.api.base + path, {
      method: method, headers: headers(), body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok) throw new Error((d && d.error) || ('Failed (' + r.status + ')'));
        return d;
      });
    });
  }

  VM.pages.admin = function () {
    var box = VM.$('#adminMain');
    if (!box) return;
    if (!VM.api || !VM.api.token()) {
      box.innerHTML = '<div class="empty-state"><h2>Admin login required</h2><p><a href="login.html">Log in</a> with an admin account.</p></div>';
      return;
    }
    box.innerHTML = '<p class="muted">Loading dashboard…</p>';
    req('GET', '/admin/overview').then(function (o) {
      box.innerHTML =
        '<div class="prod-grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:16px">' +
        [['Products', o.products], ['Orders', o.orders], ['Revenue', VM.money(o.revenue)], ['Customers', o.users]].map(function (s) {
          return '<div class="panel" style="text-align:center"><div class="num" style="font:800 1.5rem var(--font-head)">' + s[1] + '</div><div class="lbl muted">' + s[0] + '</div></div>';
        }).join('') + '</div>' +
        '<div class="panel" style="margin-bottom:16px"><h3 class="panel-title">Recent Orders</h3><div id="adOrders">' +
        (o.recent.length ? o.recent.map(function (x) {
          return '<div class="sum-row"><span class="lbl">' + VM.esc(x.number) + ' · ' + VM.esc(x.name) + '</span><span>' + VM.money(x.total) + ' · ' + VM.esc(x.status) + '</span></div>';
        }).join('') : '<p class="muted">No orders yet.</p>') + '</div></div>' +
        '<div class="panel" style="margin-bottom:16px"><h3 class="panel-title">Update Order Status</h3>' +
        '<div class="field-row"><div class="field"><label>Order ID</label><input id="adOrderId" type="number" placeholder="e.g. 1"></div>' +
        '<div class="field"><label>Status</label><select id="adStatus"><option>pending</option><option>confirmed</option><option>shipped</option><option>delivered</option><option>cancelled</option></select></div></div>' +
        '<button class="btn btn-sm" id="adSetStatus">Update</button></div>' +
        '<div class="panel"><h3 class="panel-title">Add / Update Product</h3>' +
        '<div class="field-row"><div class="field"><label>ID *</label><input id="apId" placeholder="x01"></div>' +
        '<div class="field"><label>Name *</label><input id="apName" placeholder="Product name"></div></div>' +
        '<div class="field-row"><div class="field"><label>Brand</label><input id="apBrand" placeholder="Brand"></div>' +
        '<div class="field"><label>Type</label><select id="apType"><option>guitars</option><option>drums</option><option>keyboards</option><option>microphones</option><option>speakers</option><option>headphones</option><option>studio</option><option>accessories</option></select></div></div>' +
        '<div class="field-row"><div class="field"><label>Price (₦) *</label><input id="apPrice" type="number" min="0"></div>' +
        '<div class="field"><label>Image URL</label><input id="apImg" placeholder="https://…"></div></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-sm" id="apSave">Save Product</button>' +
        '<button class="btn btn-sm btn-ghost" id="apDel">Delete by ID</button></div></div>';

      VM.$('#adSetStatus').addEventListener('click', function () {
        req('PATCH', '/admin/orders/' + VM.$('#adOrderId').value, { status: VM.$('#adStatus').value })
          .then(function () { VM.toast('Order updated', '', 'ok'); })
          .catch(function (e) { VM.toast('Failed', e.message, 'err'); });
      });
      VM.$('#apSave').addEventListener('click', function () {
        req('POST', '/admin/products', {
          id: VM.$('#apId').value.trim(), name: VM.$('#apName').value.trim(),
          brand: VM.$('#apBrand').value.trim(), type: VM.$('#apType').value,
          price: Number(VM.$('#apPrice').value), img: VM.$('#apImg').value.trim(),
        }).then(function () { VM.toast('Product saved', 'It is live in the store.', 'ok'); })
          .catch(function (e) { VM.toast('Failed', e.message, 'err'); });
      });
      VM.$('#apDel').addEventListener('click', function () {
        var id = VM.$('#apId').value.trim();
        if (!id) return;
        req('DELETE', '/admin/products/' + encodeURIComponent(id))
          .then(function () { VM.toast('Deleted', id, 'ok'); })
          .catch(function (e) { VM.toast('Failed', e.message, 'err'); });
      });
    }).catch(function (e) {
      box.innerHTML = '<div class="empty-state"><h2>Admin only</h2><p>' + VM.esc(e.message) + '</p><a class="btn" href="login.html">Log In</a></div>';
    });
  };
})();
