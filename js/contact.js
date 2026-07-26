/* =====================================================
   CONTACT.JS — Comportements spécifiques à contact.html
   (accordéon FAQ, fade-in au scroll, ancres douces, formulaire)
   Le menu (burger + dropdowns) est géré par navbar.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== ACCORDÉON FAQ ===== */
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');

            // Ferme les autres questions pour garder la liste lisible
            faqItems.forEach(function (other) {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                    other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = null;
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

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

    /* ===== SMOOTH SCROLL (ancres internes + liens rapides du hero) ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 90;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    /* ===== FORMULAIRE DE CONTACT ===== */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = this.querySelector('.btn-submit');
            var originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé avec succès !';
            btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            var form = this;
            setTimeout(function () {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

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
