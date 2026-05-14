const featuredScroll = document.querySelector('.featured-scroll');
const leftArrow = document.querySelector('.scroll-arrow-left');
const rightArrow = document.querySelector('.scroll-arrow-right');
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('#primary-navigation');
const newsletterForm = document.querySelector('#newsletter-form');
const formFeedback = document.querySelector('#form-feedback');
const cursor = document.querySelector('.custom-cursor');
const revealElements = document.querySelectorAll('[data-reveal]');


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

if (newsletterForm && formFeedback) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    formFeedback.textContent = 'Joining the list...';
    formFeedback.classList.remove('sr-only');
    
    setTimeout(() => {
      formFeedback.textContent = `Thank you! ${email} has been added to the list.`;
      newsletterForm.reset();
      setTimeout(() => formFeedback.classList.add('sr-only'), 5000);
    }, 1000);
  });
}


const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const interactiveElements = document.querySelectorAll('a, button, input, .product-card, .featured-item, .journal-card');

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

if (dot && ring) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    dot.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;
    
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX - 17}px, ${ringY - 17}px, 0)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('active');
      ring.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
      ring.classList.remove('active');
    });
  });
}


const products = {
  'boardroom-clog': {
    name: 'The Boardroom Clog',
    price: 220,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836873/8jNEqDk_wfwotv.jpg',
    desc: 'Leather upper, cushioned sole, zero apologies.'
  },
  'soft-life-loafer': {
    name: 'The Soft Life Loafer',
    price: 385,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836858/zbaZuxg_naoftx.jpg',
    desc: 'For the minimalist who wants to look effortless but also spent forty minutes picking this exact shoe.'
  },
  'asics-edit': {
    name: 'The ASICS Edit',
    price: 165,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836858/42hBL1P_r6hedo.jpg',
    desc: 'Some days you want to make a statement and some days you want the shoe to do the talking.'
  },
  'chaos-heel': {
    name: 'The Chaos Heel',
    price: 445,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836855/qeOMjIZ_bfbvqf.jpg',
    desc: 'Not for the faint-hearted. Definitely for the well-heeled.'
  },
  'last-word-mule': {
    name: 'The Last Word Mule',
    price: 700,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836855/7vasdMM_uwlbqz.jpg',
    desc: 'Sheer enough to be interesting, structured enough to be serious.'
  },
  'luxury-slide': {
    name: 'The Quiet Luxury Slide',
    price: 120,
    image: 'https://res.cloudinary.com/dnkfg07ov/image/upload/q_auto/f_auto/v1775836855/ufH4Wui_jmri1p.jpg',
    desc: 'This is the shoe you wear when you want everyone to know you have money.'
  }
};

let cart = [];
const productModal = document.querySelector('#product-modal');
const modalBody = productModal ? productModal.querySelector('.modal-body') : null;
const cartDrawer = document.querySelector('#cart-drawer');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total-amount');
const checkoutBtn = document.querySelector('#checkout-btn');
const checkoutFeedback = document.querySelector('#checkout-feedback');

const closeProductModal = () => {
  if (!productModal) return;
  productModal.classList.remove('active');
  document.body.style.overflow = '';
};

document.querySelectorAll('.product-card').forEach(card => {
  const openModal = () => {
    const productId = card.dataset.id;
    const product = products[productId];
    
    if (modalBody && product) {
      modalBody.innerHTML = `
        <div class="modal-grid">
          <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="modal-info">
            <h2>${product.name}</h2>
            <p class="price">$${product.price}</p>
            <p>${product.desc}</p>
            <button class="add-to-cart-btn" type="button" onclick="addToCart('${productId}')">Add To Selection</button>
          </div>
        </div>
      `;
      productModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  card.querySelector('.card-image').addEventListener('click', openModal);
  card.querySelector('h3').addEventListener('click', openModal);
  card.querySelector('.view-btn').addEventListener('click', openModal);
});

if (productModal) {
  productModal.querySelector('.close-modal').addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (event) => {
    if (event.target === productModal) closeProductModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal && productModal.classList.contains('active')) {
    closeProductModal();
  } else if (event.key === 'Escape' && cartDrawer && cartDrawer.classList.contains('active')) {
    toggleCart(false);
  }
});


window.addToCart = (id) => {
  const product = products[id];
  cart.push(product);
  updateCartUI();
  closeProductModal();
  toggleCart(true);
};

window.removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartUI();
};

const updateCartUI = () => {
  if (cartCount) cartCount.textContent = cart.length;
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <span class="price">$${item.price}</span>
          <button class="remove-item" type="button" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `).join('');
  }
  
const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
};

const cartToggleBtn = document.querySelector('.cart-toggle');
const closeCartBtn = document.querySelector('.close-cart');

const toggleCart = (open) => {
  if (cartDrawer) {
    cartDrawer.classList.toggle('active', open);
    cartDrawer.setAttribute('aria-hidden', String(!open));
  }
  if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', String(open));
  if (checkoutFeedback && open) checkoutFeedback.textContent = '';
};

if (cartToggleBtn) cartToggleBtn.addEventListener('click', () => toggleCart(true));
if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
if (checkoutBtn && checkoutFeedback) {
  checkoutBtn.addEventListener('click', () => {
    checkoutFeedback.textContent = cart.length
      ? 'This is a portfolio demo, so no payment or order will be submitted.'
      : 'Add a pair first to preview the demo cart flow.';
  });
}
