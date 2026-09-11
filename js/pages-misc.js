/* ==========================================================================
   VIC MUSICAL STORE — pages-misc.js
   Contact form (demo) + policy pages + small shared page behaviours.
   ========================================================================== */
(function () {
  'use strict';
  var VM = window.VM;
  VM.pages = VM.pages || {};

  VM.pages.contact = function () {
    var form = VM.$('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = VM.$('#cfName').value.trim();
      var payload = {
        name: name,
        email: (VM.$('#cfEmail') || {}).value || '',
        subject: (VM.$('#cfSubject') || {}).value || '',
        message: (VM.$('#cfMsg') || {}).value || '',
      };
      function done() {
        var box = VM.$('#contactDone');
        form.style.display = 'none';
        if (box) {
          box.style.display = 'block';
          box.querySelector('.done-name').textContent = name;
        }
        VM.toast('Message sent', 'Thanks ' + name + ' \u2014 we\u2019ll reply within 24 hours.', 'ok');
        window.scrollTo({ top: box.offsetTop - 160, behavior: 'smooth' });
        form.reset();
      }
      if (VM.api) {
        VM.api.contact(payload).then(done).catch(function (err) {
          VM.toast('Could not send', err.message, 'err');
        });
      } else { done(); }
    });
  };

  var POLICIES = {
    privacy: {
      title: 'Privacy Policy',
      ic: 'lock',
      updated: 'September 2026',
      body: [
        ['What we collect', 'When you shop or contact Vic Musical Store we may collect your name, email address, phone number, delivery address and order history. This is a demo storefront \u2014 data entered is stored only in your own browser (localStorage) and never transmitted to any server.'],
        ['How we use it', 'We use your details to process demo orders, arrange delivery, respond to enquiries and (with your consent) send the newsletter. We never sell your personal information to third parties.'],
        ['Cookies & storage', 'This site stores cart contents and preferences locally on your device so the shopping experience stays smooth. You can clear this at any time by clearing your browser\u2019s site data.'],
        ['Your rights', 'You may request a copy or deletion of the information you have shared with us at any time by contacting hello@vicmusical.ng.']
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      ic: 'doc',
      updated: 'September 2026',
      body: [
        ['General', 'These terms govern your use of the Vic Musical Store website and the demo ordering flow. By browsing or ordering you agree to them. This project is an academic/demo build; product listings are illustrative sample data.'],
        ['Orders & pricing', 'All prices are displayed in Nigerian Naira and include taxes where stated. A demo order does not create a legally binding contract \u2014 no real payment is collected through this site.'],
        ['Delivery', 'We aim to deliver within 1\u20133 business days within Lagos, Abuja and Port Harcourt, and 3\u20137 days nationwide. Delivery is free on orders above \u20A6500,000, otherwise a \u20A65,000 flat fee applies.'],
        ['Returns', 'Most items can be returned within 7 days of delivery provided they are in resellable condition with original packaging. See the Returns Policy for details.'],
        ['Intellectual property', 'All brand names used on this demo site are fictional. Photographs are used under free licenses from Wikimedia Commons, with AI reference imagery where credited by the original instruction.'],
        ['Liability', 'Vic Musical Store is not liable for indirect losses arising from use of the site, and is not responsible for any third-party content linked from it.']
      ]
    },
    returns: {
      title: 'Returns Policy',
      ic: 'returns',
      updated: 'September 2026',
      body: [
        ['7-day returns', 'Changed your mind? You can return most items within 7 days of delivery for a refund or exchange, as long as the product is unused and in its original packaging with all accessories.'],
        ['Damaged or faulty items', 'If your order arrives damaged or develops a fault within 30 days, we will repair or replace it free of charge \u2014 just send photos and your order number to returns@vicmusical.ng.'],
        ['Non-returnable items', 'Consumables such as strings, picks, drumsticks and opened hygiene products (earbuds, in-ear monitors) cannot be returned unless faulty.'],
        ['How to return', 'Contact our support team or visit any Vic Musical Store store with your proof of purchase. Refunds are processed within 5\u20137 business days after we receive the returned item.'],
        ['Demo orders', 'Because this is a demo storefront, returns above are illustrative. No real transactions take place on this website.']
      ]
    }
  };

  VM.pages.policy = function () {
    var key = VM.qs('p') || 'privacy';
    var pol = POLICIES[key] || POLICIES.privacy;
    var titleEl = VM.$('#polTitle');
    var emEl = VM.$('#polEmoji');
    var updEl = VM.$('#polUpdated');
    var bodyEl = VM.$('#polBody');
    if (titleEl) titleEl.textContent = pol.title;
    if (emEl) emEl.innerHTML = VM.icon(pol.ic);
    if (updEl) updEl.textContent = 'Last updated: ' + pol.updated;
    if (bodyEl) {
      bodyEl.innerHTML = pol.body.map(function (sec) {
        return '<h3>' + VM.esc(sec[0]) + '</h3><p>' + VM.esc(sec[1]) + '</p>';
      }).join('');
    }
    var link = VM.$('#polBack');
    if (link) link.href = VM.qs('from') || 'index.html';
  };

  VM.pages.about = function () { /* static content only */ };
})();
