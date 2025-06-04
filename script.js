document.querySelector('.search-container button').addEventListener('click', () => {
  const searchTerm = document.querySelector('.search-container input').value;
  if (searchTerm.trim() !== '') {
    alert(`Searching for: "${searchTerm}"`); // Replace with actual search logic
  }
});


const chatbotIcon = document.querySelector('.chatbot-icon');
chatbotIcon.addEventListener('click', () => {
  alert("Chatbot: How can I help you today?"); // Replace with a modal or API integration
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const serviceCards = document.querySelectorAll('.service-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s, transform 0.5s';
  observer.observe(card);
});

// Additiona Login Popup
const loginPopup = document.getElementById('loginPopup');
const serviceButtons = document.querySelectorAll('.service-btn, .service-card');
const closeModal = document.querySelector('.close-modal');
const modalLoginForm = document.getElementById('modalLoginForm');

// Auth check replacement pa
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true'; // Possible auth replacement 
}

// Show login popup when clicking services
serviceButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      loginPopup.style.display = 'block';
      document.body.style.overflow = 'hidden'; 
    }
  });
});

closeModal.addEventListener('click', () => {
  loginPopup.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === loginPopup) {
    loginPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

modalLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('modalEmail').value;
  const password = document.getElementById('modalPassword').value;
  
  // Possible modification for this pa
  if (email && password) {
    // Simulate successful login
    localStorage.setItem('isLoggedIn', 'true');
    loginPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const clickedButton = document.querySelector('.service-btn.clicked');
    if (clickedButton) {
      window.location.href = clickedButton.href;
    }
  } else {
    alert('Please enter both email and password');
  }
});

document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.add('clicked');
  });
});