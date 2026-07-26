/* =====================================================
   MAIRE.JS — Comportements spécifiques à maire_adama_bictogo.html
   (fade-in au scroll, ancres douces)
   Le menu (burger + dropdowns) est géré par navbar.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== ANIMATIONS AU SCROLL ===== */
    var observerOptions = { threshold: 0.1 };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });

    /* ===== SMOOTH SCROLL (ancres internes) ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
