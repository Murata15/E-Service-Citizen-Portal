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

// Auth functions
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  checkLoginStatus();
  
  // Handle modal login form submission
  const modalLoginForm = document.getElementById('modalLoginForm');
  if (modalLoginForm) {
    modalLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('modalEmail').value;
      const password = document.getElementById('modalPassword').value;
      
      // Try to login
      if (loginUser(email, password)) {
        // Get the redirect URL from sessionStorage
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
        
        // Clear the redirect URL
        sessionStorage.removeItem('redirectAfterLogin');
        
        // Redirect to the original page or home
        window.location.href = redirectUrl;
      } else {
        document.getElementById('loginMessage').textContent = 'Invalid email or password';
      }
    });
  }
  
  // Add click handlers to all protected links
  document.querySelectorAll('[data-protected]').forEach(link => {
    link.addEventListener('click', function(e) {
      if (!isLoggedIn()) {
        e.preventDefault();
        // Store the intended destination
        sessionStorage.setItem('redirectAfterLogin', this.href);
        // Show login modal
        document.getElementById('loginPopup').style.display = 'block';
      }
    });
  });
});

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Check login status and update UI
function checkLoginStatus() {
  const authLinks = document.querySelector('.auth-links');
  if (!authLinks) return;
  
  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    authLinks.innerHTML = `
      <span>Welcome, ${user.email}</span>
      <a href="#" class="btn-logout" id="logoutBtn">Logout</a>
    `;
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
  }
}

// Login function
function loginUser(email, password) {
  // Get stored user data
  const userData = JSON.parse(localStorage.getItem(email));
  
  // Check if user exists and password matches
  if (userData && userData.password === password) {
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      // other user data you want to store
    }));
    return true;
  }
  return false;
}

// Logout function
function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.reload();
}

document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.add('clicked');
  });
});