const featuredScroll = document.querySelector('.featured-scroll');
const leftArrow = document.querySelector('.scroll-arrow-left');
const rightArrow = document.querySelector('.scroll-arrow-right');

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

// EVENT LISTENER: Update arrow visibility when user scrolls
featuredScroll.addEventListener('scroll', updateArrowVisibility);

// INITIAL CALL: Set correct arrow visibility on page load
updateArrowVisibility();
