//ETBM - eager to be meagher namespace
function initMobileNav() {
    var navButtons = document.querySelectorAll('[data-nav-button]');
    var nav = document.querySelector('.nav');

    for (var navButton of navButtons) {
        navButton.addEventListener('click', function () {
            nav.classList.toggle('nav--active');
            initNavFade();
        });
    }
}

function initNavFade() {
    var navFade = document.querySelector('[data-nav-fade]');
    navFade.classList.toggle('fade--active');
    navFade.classList.toggle('fade--static-sm-only');
}

function initDesktopNav() {
    var navLinks = document.querySelectorAll('[data-nav-action]');
    for (var navLink of navLinks) {
        navLink.addEventListener('click', navClick);
    }
}

function navClick(e) {
    e.preventDefault();
    var destination = document.querySelector(this.getAttribute('href'));
    var nav = document.querySelector('.navbar');

    nav.classList.remove('.nav--active');
    initNavFade();
    if (destination) {
        destination.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }
}

function initTextFade() {
    var fadeIn = document.querySelectorAll('[data-fade-in]'),
        Fade = [];
    for (var fadeInEl of fadeIn) {
        Fade.push({'node': fadeInEl, 'distance': fadeInEl.getBoundingClientRect().top});
    }
    window.etbm.fade = Fade;
    window.etbm.nextFade = Fade[0];
    
}

function handleScrollFade() {
    //We want the height of the window and how much we have scrolled from top
    //500 is just a little buffer
    var scollCal = this.innerHeight + this.scrollY - 500;
    if (scollCal >= this.etbm.nextFade.distance) {
       this.etbm.nextFade.node.classList.add('fade--active');
       this.etbm.fade.shift();
       this.etbm.nextFade = {};
       if (this.etbm.fade.length) {
           this.etbm.nextFade = this.etbm.fade[0];
       }
    }
}

function handleScrollNav(nav) {
    if (this.scrollY >= 50) {
        if (!nav.classList.contains('nav--scroll')) {
            nav.classList.add('nav--scroll');
            nav.classList.remove('nav--top');
        }
    } else {
        if (!nav.classList.contains('nav--top')) {
            nav.classList.add('nav--top');
            nav.classList.remove('nav--scroll');
        }
    }
}

function initScrollingEvents() {
    var nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        handleScrollFade.call(this);
        handleScrollNav.call(this, nav);
    });
}

function init() {
    window.etbm = {};
    initScrollingEvents();
    initMobileNav();
    //initNavScroll();
    initTextFade();
    initDesktopNav();
    
}

(function() {
    console.log('hello world');
    init();
})();