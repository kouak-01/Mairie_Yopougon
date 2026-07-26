/* =====================================================
   NAVBAR.JS — Gère le menu mobile (burger + accordéon)
   et les sous-menus multi-niveaux (dropdown + flyout)
   Utilisé par TOUTES les pages du site
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');
    var navOverlay = document.getElementById('navOverlay');
    var navbar = document.getElementById('navbar');

    var MOBILE_BREAKPOINT = 900;
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    /* ===== OUVERTURE / FERMETURE DU MENU MOBILE ===== */
    function openMobileNav() {
        mainNav.classList.add('active');
        hamburger.classList.add('active');
        navOverlay.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        mainNav.classList.remove('active');
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        closeAllDropdowns();
    }

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            if (mainNav.classList.contains('active')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileNav);
    }

    /* ===== FERMER TOUS LES SOUS-MENUS OUVERTS ===== */
    function closeAllDropdowns(exceptEl) {
        document.querySelectorAll('.main-nav li.open').forEach(function (li) {
            if (!exceptEl || (!li.contains(exceptEl) && li !== exceptEl)) {
                li.classList.remove('open');
                var toggle = li.querySelector(':scope > .nav-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ===== GESTION DES TOGGLES (niveau 2 et niveau 3) ===== */
    var toggles = document.querySelectorAll('.nav-toggle');

    toggles.forEach(function (toggle) {
        var parentLi = toggle.closest('li');

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var isOpen = parentLi.classList.contains('open');

            // Ferme les menus "frères" du même niveau pour rester lisible
            var siblingList = parentLi.parentElement;
            siblingList.querySelectorAll(':scope > li.open').forEach(function (sibling) {
                if (sibling !== parentLi) {
                    sibling.classList.remove('open');
                    var siblingToggle = sibling.querySelector(':scope > .nav-toggle');
                    if (siblingToggle) siblingToggle.setAttribute('aria-expanded', 'false');
                }
            });

            parentLi.classList.toggle('open', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    /* ===== SURVOL AU CLAVIER / DESKTOP (confort) ===== */
    var topLevelItems = document.querySelectorAll('.main-nav > ul > li');

    topLevelItems.forEach(function (li) {
        li.addEventListener('mouseenter', function () {
            if (!isMobile()) {
                closeAllDropdowns(li);
                var toggle = li.querySelector(':scope > .nav-toggle');
                if (toggle) {
                    li.classList.add('open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        });

        li.addEventListener('mouseleave', function () {
            if (!isMobile()) {
                li.classList.remove('open');
                li.querySelectorAll('li.open').forEach(function (sub) {
                    sub.classList.remove('open');
                });
                var toggle = li.querySelector(':scope > .nav-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    var level2Items = document.querySelectorAll('.dropdown-menu > li');
    level2Items.forEach(function (li) {
        li.addEventListener('mouseenter', function () {
            if (!isMobile() && li.querySelector(':scope > .flyout-menu')) {
                var parentList = li.parentElement;
                parentList.querySelectorAll(':scope > li.open').forEach(function (sib) {
                    if (sib !== li) sib.classList.remove('open');
                });
                li.classList.add('open');
            }
        });
    });

    /* ===== FERMETURE EN CLIQUANT À L'EXTÉRIEUR ===== */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.main-nav')) {
            closeAllDropdowns();
        }
    });

    /* ===== FERMER LE MENU MOBILE QUAND ON CLIQUE UN LIEN FINAL ===== */
    document.querySelectorAll('.main-nav a:not(.nav-toggle)').forEach(function (link) {
        link.addEventListener('click', function () {
            if (isMobile()) {
                closeMobileNav();
            }
        });
    });

    /* ===== FERMER LES DROPDOWNS SI ON REDIMENSIONNE VERS DESKTOP ===== */
    window.addEventListener('resize', function () {
        if (!isMobile()) {
            mainNav.classList.remove('active');
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* ===== EFFET DE SCROLL SUR LA NAVBAR ===== */
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});
