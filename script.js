/* Mananda CBO — interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav background on scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Photo placeholder fallback:
  // If a real image fails to load (file not yet added), hide the <img>
  // so the labelled placeholder behind it shows through.
  document.querySelectorAll(".js-photo").forEach(function (img) {
    function fail() { img.style.display = "none"; }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
    // When a real image DOES load, hide its sibling placeholder.
    img.addEventListener("load", function () {
      if (img.naturalWidth > 0) {
        var ph = img.parentElement.querySelector(
          ".hero__placeholder, .photo-card__placeholder, .card__placeholder, .gallery__placeholder"
        );
        if (ph) ph.style.display = "none";
      }
    });
  });

  // Contact form: POST to a form service if configured, else fall back to
  // the visitor's email app via a mailto: link. Either way it does something.
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var el = form.elements;
      function val(n) { var f = el.namedItem(n); return f ? (f.value || "").trim() : ""; }
      var data = {
        name: val("name"),
        email: val("email"),
        interest: val("interest"),
        message: val("message")
      };
      var endpoint = form.getAttribute("data-endpoint");

      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (r) {
            if (r.ok) { form.reset(); if (note) note.textContent = "Thank you — your message has been sent."; }
            else throw new Error("bad status");
          })
          .catch(function () { if (note) note.textContent = "Sorry, something went wrong. Please email us directly."; });
        return;
      }

      // mailto fallback
      var to = form.getAttribute("data-email") || "hello@mananda.org";
      var subject = "Mananda enquiry: " + data.interest;
      var body =
        "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Interest: " + data.interest + "\n\n" +
        data.message;
      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      if (note) note.textContent = "Opening your email app to send…";
    });
  }

  // Scroll reveal
  var revealTargets = document.querySelectorAll(
    ".section__title, .lead, .photo, .pillar, .card, .gallery__item, .involved__card, .contact__form"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
