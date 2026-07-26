/* =====================================================
   CONSTRUCTION.JS — Comportements spécifiques à
   encoursdeconstruction.html
   (particules flottantes, barre de progression animée,
   formulaire de notification, fade-in, scroll-to-top)
   Le menu (burger + dropdowns) est géré par navbar.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== GÉNÉRATION DES PARTICULES FLOTTANTES ===== */
    var particlesContainer = document.getElementById('particles');
    var particleIcons = ['fa-solid fa-gear', 'fa-solid fa-helmet-safety', 'fa-solid fa-screwdriver-wrench', 'fa-solid fa-ruler-combined'];

    if (particlesContainer) {
        var count = window.innerWidth < 768 ? 8 : 16;
        for (var i = 0; i < count; i++) {
            var span = document.createElement('i');
            span.className = 'particle ' + particleIcons[i % particleIcons.length];
            span.style.left = Math.random() * 100 + '%';
            span.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
            span.style.animationDuration = (9 + Math.random() * 10) + 's';
            span.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(span);
        }
    }

    /* ===== BARRE DE PROGRESSION ANIMÉE À L'ENTRÉE ===== */
    var progressFill = document.getElementById('progressFill');
    var progressValue = document.getElementById('progressValue');

    if (progressFill) {
        var target = parseInt(progressFill.getAttribute('data-progress'), 10) || 0;
        setTimeout(function () {
            progressFill.style.width = target + '%';
        }, 400);

        // Compteur numérique synchronisé
        var current = 0;
        var duration = 1600;
        var steps = 40;
        var stepTime = duration / steps;
        var increment = target / steps;

        var counter = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            if (progressValue) progressValue.textContent = Math.round(current) + '%';
        }, stepTime);
    }

    /* ===== FORMULAIRE DE NOTIFICATION (visuel) ===== */
    var notifyForm = document.getElementById('notifyForm');
    var notifySuccess = document.getElementById('notifySuccess');

    if (notifyForm) {
        notifyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = this.querySelector('button');
            var originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Merci !';
            if (notifySuccess) notifySuccess.classList.add('visible');
            var form = this;
            setTimeout(function () {
                btn.innerHTML = originalHTML;
                form.reset();
                if (notifySuccess) notifySuccess.classList.remove('visible');
            }, 4000);
        });
    }

    /* ===== FADE IN AU SCROLL ===== */
    var fadeElements = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(function (el) { observer.observe(el); });

    /* ===== SCROLL TO TOP ===== */
    var scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
