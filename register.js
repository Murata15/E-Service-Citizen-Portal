document.addEventListener("DOMContentLoaded", () => {
  const steps = [...document.querySelectorAll(".form-section")];
  const stepCircles = [...document.querySelectorAll(".steps-indicator .step")];
  let current = 0;

  const showStep = idx => {
    steps.forEach((s,i) => s.classList.toggle("active", i === idx));
    stepCircles.forEach((c,i) => c.classList.toggle("active", i === idx));
  };

  document.querySelectorAll(".next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      const inputs = steps[current].querySelectorAll("input[required], textarea[required]");
      for (let inp of inputs) {
        if (!inp.checkValidity()) { inp.reportValidity(); return; }
      }
      if (current < steps.length-1) {
        current++;
        if (current === steps.length-1) populateReview();
        showStep(current);
      }
    });
  });

  document.querySelectorAll(".prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      if (current > 0) {
        current--;
        showStep(current);
      }
    });
  });

  document.getElementById("registrationForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Submitted! Reference #: APS-"+Date.now().toString().slice(-6));
    this.reset();
    current = 0;
    showStep(0);
  });

  function populateReview() {
    const form = document.getElementById("registrationForm");
    document.getElementById("review-service").textContent = form.service.value;
    document.getElementById("review-name").textContent = form.fullname.value;
    document.getElementById("review-contact").textContent = form.contact.value;
    document.getElementById("review-email").textContent = form.email.value;
    document.getElementById("review-address").textContent = form.address.value;
  }
});
