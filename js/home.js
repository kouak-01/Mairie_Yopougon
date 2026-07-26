/* =====================================================
   HOME.JS — Comportements spécifiques à index.html
   (slider hero, scroll-to-top, fade-in, formulaire, ancre active)
   Le menu (burger + dropdowns) est géré par navbar.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    var scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (scrollTopBtn) {
            if (window.scrollY > 100) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ===== HERO SLIDER ===== */
    var slides = document.querySelectorAll('.hero-slide');
    var currentSlide = 0;

    function nextSlide() {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length) {
        setInterval(nextSlide, 5000);
    }

    /* ===== FADE IN ANIMATION ===== */
    var fadeElements = document.querySelectorAll('.fade-in');

    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) { observer.observe(el); });

    /* ===== SMOOTH SCROLL (ancres internes) ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    /* ===== FORM HANDLING ===== */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = this.querySelector('.btn-submit');
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé avec succès !';
            btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            var form = this;
            setTimeout(function () {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }
});
