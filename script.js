// DOM Elements
const featuredScroll = document.querySelector('.featured-scroll');
const leftArrow = document.querySelector('.scroll-arrow-left');
const rightArrow = document.querySelector('.scroll-arrow-right');
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('#primary-navigation');
const newsletterForm = document.querySelector('#newsletter-form');
const formFeedback = document.querySelector('#form-feedback');
const cursor = document.querySelector('.custom-cursor');
const revealElements = document.querySelectorAll('[data-reveal]');

/**
 * 1. Intersection Observer for Reveal Animations
 */
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 2. Scroll Functionality for Featured Section
 */
if (featuredScroll && leftArrow && rightArrow) {
  function scrollByContainerWidth(direction) {
    const containerWidth = featuredScroll.offsetWidth;
    const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
    
    featuredScroll.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  function updateArrowVisibility() {
    const currentScroll = featuredScroll.scrollLeft;
    const maxScroll = featuredScroll.scrollWidth - featuredScroll.offsetWidth;
    
    if (currentScroll <= 5) {
      leftArrow.classList.add('hidden');
    } else {
      leftArrow.classList.remove('hidden');
    }
    
    if (Math.ceil(currentScroll) >= maxScroll - 5) {
      rightArrow.classList.add('hidden');
    } else {
      rightArrow.classList.remove('hidden');
    }
  }

  leftArrow.addEventListener('click', () => scrollByContainerWidth('left'));
  rightArrow.addEventListener('click', () => scrollByContainerWidth('right'));
  featuredScroll.addEventListener('scroll', updateArrowVisibility);
  updateArrowVisibility();
  window.addEventListener('resize', updateArrowVisibility);
}

/**
 * 3. Mobile Navigation Toggle
 */
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    primaryNav.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 4. Newsletter Form Handling
 */
if (newsletterForm && formFeedback) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    formFeedback.textContent = 'Joining the list...';
    formFeedback.classList.remove('sr-only');
    
    setTimeout(() => {
      formFeedback.textContent = `Thank you! ${email} has been added to the list.`;
