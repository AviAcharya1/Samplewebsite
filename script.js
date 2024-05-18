// Cart functionality
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart');
const cartList = document.getElementById('cart-list');
const totalCost = document.getElementById('total-cost');

let cart = [];
let total = 0;

// Toggle cart sidebar
cartToggle.addEventListener('click', () => {
  cartSidebar.classList.toggle('show');
});

// Buy Now button functionality
const buyNowButtons = document.querySelectorAll('.buy-button');
buyNowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentNode.querySelector('h3').textContent;
    alert(`You clicked 'Buy Now' for ${productName}`);
    // Redirect to a checkout page or handle the buy process
  });
});

// Add to Cart button functionality
const addToCartButtons = document.querySelectorAll('.buy-button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentNode.querySelector('h3').textContent;
    const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.match(/\d+(\.\d+)?/)[0]);
    const item = { name: productName, price: productPrice };
    cart.push(item);
    total += productPrice;
    updateCart();
  });
});

// Update cart display
function updateCart() {
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  totalCost.textContent = `₹${total.toFixed(2)}`;
}

// ... (existing code) ...

// Image slider functionality
let slideIndex = 1;
showSlide(slideIndex);

function prevSlide() {
  showSlide(slideIndex -= 1);
}

function nextSlide() {
  showSlide(slideIndex += 1);
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


// Endless carousel functionality
const carousel = document.querySelector('.carousel-container');
const slides = Array.from(carousel.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

slides.forEach(setSlidePosition);

const moveToSlide = (carousel, currentSlide, targetSlide) => {
  carousel.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateCarousel = () => {
  const currentSlide = carousel.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  const nextSlide = currentSlide.nextElementSibling || slides[0];

  prevSlide.style.left = `-${slideWidth}px`;
  nextSlide.style.left = `${slideWidth * (slides.length)}px`;

  moveToSlide(carousel, currentSlide, nextSlide);
};

slides[0].classList.add('current-slide');
setInterval(updateCarousel, 2000); // Change the carousel every 3 seconds