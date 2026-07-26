/* =====================================================
   RADIO.JS — Comportements spécifiques à radio.html
   (onglets programme, mini-player, compteurs, fade-in,
   ancres douces, retour en haut)
   Le menu (burger + dropdowns) est géré par navbar.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== ANIMATIONS AU SCROLL (fade-in) ===== */
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        fadeObserver.observe(el);
    });

    /* ===== SMOOTH SCROLL (ancres internes) ===== */
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

    /* ===== RETOUR EN HAUT ===== */
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

    /* ===== ONGLETS DU PROGRAMME (jours de la semaine) ===== */
    var dayTabs = document.querySelectorAll('.day-tab');
    var schedulePanels = document.querySelectorAll('.schedule-panel');

    dayTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var day = tab.getAttribute('data-day');

            dayTabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            schedulePanels.forEach(function (panel) {
                panel.classList.toggle('active', panel.getAttribute('data-day') === day);
            });
        });
    });

    /* ===== MINI PLAYER FLOTTANT ===== */
    var miniPlayer = document.getElementById('miniPlayer');
    var miniPlayerBtn = document.getElementById('miniPlayerBtn');
    var miniPlayerIcon = miniPlayerBtn ? miniPlayerBtn.querySelector('i') : null;
    var isPlaying = false;

    // Apparition du mini-player après un léger défilement
    window.addEventListener('scroll', function () {
        if (miniPlayer) {
            if (window.scrollY > 400) {
                miniPlayer.classList.add('visible');
            } else {
                miniPlayer.classList.remove('visible');
            }
        }
    });

    function setPlayingState(state) {
        isPlaying = state;
        if (!miniPlayer || !miniPlayerIcon) return;
        miniPlayer.classList.toggle('playing', isPlaying);
        miniPlayerIcon.classList.toggle('fa-play', !isPlaying);
        miniPlayerIcon.classList.toggle('fa-pause', isPlaying);
    }

    if (miniPlayerBtn) {
        miniPlayerBtn.addEventListener('click', function () {
            setPlayingState(!isPlaying);
        });
    }

    // Le bouton "play" central du hero synchronise le mini-player
    var heroPlayBtn = document.getElementById('heroPlayBtn');
    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', function () {
            setPlayingState(true);
            if (miniPlayer) miniPlayer.classList.add('visible');
        });
    }

    /* ===== COMPTEURS ANIMÉS (statistiques) ===== */
    var counters = document.querySelectorAll('[data-count]');

    var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { countObserver.observe(el); });

    function animateCount(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1500;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var value = Math.floor(progress * target);
            el.textContent = value.toLocaleString('fr-FR') + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString('fr-FR') + suffix;
            }
        }
        window.requestAnimationFrame(step);
    }
});
