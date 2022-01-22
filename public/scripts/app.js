/**
 * 
 * EagerToBeMeagher javascript
 * Uses a global object etbm on the window object for local storage
 * This was just for fun and I didn't want to deal with a compiler so I'm using browser readable JSs
 * 
 */

 /**
  * Handle open and close of mobile nav
  */
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

/**
 * Fades in mobile nav links
 */
function initNavFade() {
    var navFade = document.querySelector('[data-nav-fade]');
    navFade.classList.toggle('fade--active');
    navFade.classList.toggle('fade--static-sm-only');
}

/**
 * Adds click event to our nav links
 */
function initDesktopNav() {
    var navLinks = document.querySelectorAll('[data-nav-action]');
    for (var navLink of navLinks) {
        navLink.addEventListener('click', navClick);
    }
}

/**
 * Scrolls to appropriate section on nav link click
 * @param {object} e - event 
 */
function navClick(e) {
    e.preventDefault();
    var destination = document.querySelector(this.getAttribute('href'));
    var nav = document.querySelector('[data-nav]');

    nav.classList.remove('nav--active');
    initNavFade();
    if (destination) {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
}

/**
 * Adds items w/ data-fade-in and their distance from top to global etbm object
 */
function initTextFade() {
    var fadeIn = document.querySelectorAll('[data-fade-in]'),
        Fade = [];
    for (var fadeInEl of fadeIn) {
        Fade.push({'node': fadeInEl, 'distance': fadeInEl.getBoundingClientRect().top});
    }
    window.etbm.fade = Fade;
    window.etbm.nextFade = Fade[0];
    
}

/**
 * Read etbm object for next element to fade in and fade it in
 */
function handleScrollFade() {
    //We want the height of the window and how much we have scrolled from top
    //250 is just a little buffer
    var scollCal = this.innerHeight + this.scrollY - 250;
    if (scollCal >= this.etbm.nextFade.distance) {
       this.etbm.nextFade.node.classList.add('fade--active');
       this.etbm.fade.shift();
       this.etbm.nextFade = {};
       if (this.etbm.fade.length) {
           this.etbm.nextFade = this.etbm.fade[0];
       }
    }
}

/**
 * Footer fade is different than others because we can't scroll past it
 */
function handleFooterFade() {
    var footerFadeIn = document.querySelector('[data-footer-fade-in]');
    footerFadeIn.classList.add('fade--active');
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

/**
 * Add event listener for scrolling
 */
function initScrollingEvents() {
    var nav = document.querySelector('[data-nav]');
    window.addEventListener('scroll', function() {
        handleScrollFade.call(this);
        handleScrollNav.call(this, nav);

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            handleFooterFade();
        }
    });
}

/**
 * On render of our site do some pretty animations
 */
function handleInitialAnimations() {
    var nav = document.querySelector('[data-nav]'),
        navLinks = nav.querySelectorAll('.nav__item'),
        navAnimationInterval,
        interval = 1,
        iconAnimationTimeout,
        mainAnimationTimeout;
    
    var navAnimationTimeout = window.setTimeout(function(){
        new Promise(function (resolve, reject) {
            navAnimationInterval = window.setInterval(function () {
                for (var navLink of navLinks) {
                    if (!navLink.classList.contains('nav__item--active') && !navLink.classList.contains('nav__item--extra')) {
                        interval++;
                        navLink.classList.add('nav__item--active');
                        if (interval === navLinks.length) {
                            resolve();
                        }
                        break;
                    }
                }
            }, 50);
        }).then(function() {
            clearInterval(navAnimationInterval);
            clearTimeout(navAnimationTimeout);
            var mainAnimationPromise = new Promise(function(resolve, reject) {
                mainAnmiationTimeout = window.setTimeout(function () {
                    document.querySelector('[data-main-fade]').classList.add('fade--active');
                    resolve();
                }, 400);
            });
            return mainAnimationPromise;
        }).then(function() {
            clearTimeout(mainAnimationTimeout);
            var iconAnimationPromise = new Promise(function(resolve, reject) {
                iconAnimationTimeout = window.setTimeout(function () {
                    document.querySelector('.nav__item--extra').classList.add('nav__item--active');
                    resolve();
                }, 600);
            });
           return iconAnimationPromise;
        }).then(function(){
            clearTimeout(iconAnimationTimeout);
        });
    }, 200);   
}

function initNav() {
    initMobileNav();
    initDesktopNav();
}

/**
 * General init function to get our JS running
 */
function init() {
    window.etbm = window.etbm ? window.etbm : {};
    initScrollingEvents();
    initNav()
    initTextFade();
    handleInitialAnimations();
}

(function() {
    console.log('Welcome to EagerToBeMeagher.com!');
    console.log('If you are reading this you are probably a developer.')
    init();
})();