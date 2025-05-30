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