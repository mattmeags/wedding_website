function initMobileNav() {
    var navButtons = document.querySelectorAll('[data-nav-button]');
    var nav = document.querySelector('.nav');
    for (var navButton of navButtons) {
        navButton.addEventListener('click', function () {
            nav.classList.toggle('fade--active');
            nav.classList.toggle('nav--active');
        });
    }
}

function initTextFade() {
    var fadeIn = document.querySelectorAll('[data-fade-in]'),
        Fade = [];
    // TODO: use for each
    for (var fadeInEl of fadeIn) {
        Fade.push({'node': fadeInEl, 'distance': fadeInEl.offsetHeight});
    }
    window.etbm.fade = Fade;
    window.etbm.nextFade = Fade[0];
    
}

function handleScrollFade() {
    if (this.scrollY >= this.etbm.nextFade.distance - 50) {
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
    
}

(function() {
    console.log('hello world');
    init();
})();