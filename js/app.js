/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

var Navigation = document.querySelector('.navbar__menu');
var Navlist = document.getElementById('navbar__list');
var Toggler = document.getElementById('nav-toggle');
var sections = Array.from(document.querySelectorAll('section'));
var topbtn = document.getElementById('js-sc-top');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function buildNavi() {
  sections.forEach((section) => {
    Navlist.innerHTML += `<li><a href="#${section.id}" id="${section.id}__link" class="menu__link">${section.dataset.nav}</a></li>`;
  });
}

// Uncheck the checkbox input to close the nav
function unCheck(e) {
  if (e.target.classList.contains('menu__link')) {
    Toggler.checked = false;
  }
}

// Check if the element is in viewport
// Returns true when "40"% of the element is visible
function inViewport(element, visiblePercent = 40) {
  let rect = element.getBoundingClientRect(),
    windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(
      100 - ((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100
    ) < visiblePercent ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
      visiblePercent
  );
}

// Smooth scroll to section
function smoothSc(el) {
  if (el.target.classList.contains('menu__link')) {
    el.preventDefault();
    document.querySelector(el.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  }
}

// ScrollToTop helper func
const scrollFunc = () => {
  let positionY = window.scrollY;

  if (positionY > 0) {
    topbtn.className = 'sc-top show';
  } else {
    topbtn.className = 'sc-top hide';
  }
};

const BackToTop = () => {
  // Set a variable for number of pixels we are from top of  document.
  const x = document.documentElement.scrollTop || document.body.scrollTop;

  if (x > 0) {
    window.requestAnimationFrame(BackToTop);
    // ScrollTo takes  x and  y coordinate.
    // Increase '15' value to make scrolling smoother
    window.scrollTo(0, x - x / 15);
  }
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
buildNavi();

/**
 * End Main Functions
 * Begin Events
 *
 *
 *
 */

// close mobile nav when the link is clicked
Navigation.addEventListener('click', unCheck);
// Scroll to section on link click
Navlist.addEventListener('click', smoothSc);

// Set sections as active
window.addEventListener('scroll', function (ev) {
  for (let x = 0; x < sections.length; x++)
    if (inViewport(sections[x])) {
      sections[x].classList.add('js--active');
    } else {
      sections[x].classList.remove('js--active');
    }
});

// Scroll to top
window.addEventListener('scroll', scrollFunc);

// When the button is clicked, execute BacktoTop func
topbtn.addEventListener('click', function (e) {
  e.preventDefault();
  BackToTop();
});
