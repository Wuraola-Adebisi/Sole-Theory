
function initMobileNav() {
  const header = document.querySelector('.main-header');
  const nav = document.querySelector('nav');
  
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  
  header.insertBefore(hamburger, nav);
  
  nav.classList.add('mobile-nav');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

initMobileNav();

const newsletterForm = document.querySelector('#newsletter form');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const submitButton = newsletterForm.querySelector('button[type="submit"]');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(message) {
  const existingError = newsletterForm.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  emailInput.parentElement.appendChild(errorDiv);
  emailInput.classList.add('error');
  
  setTimeout(() => {
    emailInput.classList.remove('error');
  }, 3000);
}

function showSuccess() {
  const existingMessage = newsletterForm.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = '✓ You\'re on the list! Check your email.';
  newsletterForm.appendChild(successDiv);
  
  emailInput.value = '';

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();

  if (email === '') {
    showError('Please enter your email address');
    return;
  }
  
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address');
    return;
  }

  showSuccess();
  
  console.log('Email submitted:', email);
});

emailInput.addEventListener('input', () => {
  const errorMessage = newsletterForm.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
  emailInput.classList.remove('error');
});

const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTop() {

  if (window.scrollY > 400) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

toggleBackToTop();

const navLinks = document.querySelectorAll('nav a[href^="#"]');
const headerHeight = document.querySelector('.main-header').offsetHeight;

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get target section
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      
      const targetPosition = targetSection.offsetTop - headerHeight;
      
    
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const heroButton = document.querySelector('.hero-btn');
if (heroButton) {
  heroButton.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#collections');
    if (targetSection) {
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
}

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


const sections = document.querySelectorAll('section[id]');
const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNavLink() {
  
  const scrollPosition = window.scrollY + headerHeight + 100;
  
 
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
   
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

      navigationLinks.forEach(link => {
        link.classList.remove('active');
      });
      

      const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

updateActiveNavLink();

const featuredScroll = document.querySelector('.featured-scroll');
const leftArrow = document.querySelector('.scroll-arrow-left');
const rightArrow = document.querySelector('.scroll-arrow-right');

function scrollByContainerWidth(direction) {
  // Get the width of the scroll container
  const containerWidth = featuredScroll.offsetWidth;
  
  const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
  
  // Scroll the container smoothly
  featuredScroll.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

function updateArrowVisibility() {

  const currentScroll = featuredScroll.scrollLeft;
  
  const maxScroll = featuredScroll.scrollWidth - featuredScroll.offsetWidth;
  

  if (currentScroll === 0) {
    leftArrow.classList.add('hidden');
  } else {
    leftArrow.classList.remove('hidden');
  }
  
  if (Math.ceil(currentScroll) >= maxScroll) {
    rightArrow.classList.add('hidden');
  } else {
    rightArrow.classList.remove('hidden');
  }
}

leftArrow.addEventListener('click', () => {
  scrollByContainerWidth('left');
});

rightArrow.addEventListener('click', () => {
  scrollByContainerWidth('right');
});

featuredScroll.addEventListener('scroll', updateArrowVisibility);

updateArrowVisibility();

const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
    
      img.classList.add('loaded');
      
  
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px' 
});

images.forEach(img => {
  imageObserver.observe(img);
});


const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      return;
    }
    
    card.classList.add('clicked');
    
    setTimeout(() => {
      card.classList.remove('clicked');
    }, 300);
    
  
    console.log('Product card clicked:', card.querySelector('h4').textContent);
  });
  
  const cardNumber = card.querySelector('.card-number');
  if (cardNumber) {
    card.addEventListener('mouseenter', () => {
      cardNumber.style.color = 'var(--accent)';
    });
    
    card.addEventListener('mouseleave', () => {
      cardNumber.style.color = 'var(--text-dim)';
    });
  }
});
