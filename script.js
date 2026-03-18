document.addEventListener('DOMContentLoaded', () => {

  // ---------- Dark Mode Toggle ----------
  const themeBtn = document.querySelectorAll('#themeToggle');
  themeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  });

  // ---------- Counter (Optional for dashboard/index) ----------
  const counterEl = document.getElementById('counter');
  if (counterEl) {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      counterEl.textContent = counter;
      if (counter >= 1200) clearInterval(interval);
    }, 1);
  }

  // ---------- Enrollment Form ----------
  const enrollForm = document.getElementById('enrollForm');
  if (enrollForm) {
    enrollForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const course = document.getElementById('course').value;
      const mode = document.querySelector('input[name="mode"]:checked')?.value;
      const date = document.getElementById('date').value;
      const comments = document.getElementById('comments').value.trim();
      const terms = document.getElementById('terms').checked;

      const formMessage = document.getElementById('formMessage');
      let errors = [];

      // ---------- Validation ----------
      if (!name) errors.push("Name is required.");
      if (!email) errors.push("Email is required.");
      if (!phone || !/^\d{10}$/.test(phone)) errors.push("Phone is required (10 digits).");
      if (!course) errors.push("Please select a course.");
      if (!mode) errors.push("Please select a mode of learning.");
      if (!date) errors.push("Start date is required.");
      if (!terms) errors.push("You must agree to the terms.");

      // Remove previous alert
      const existingAlert = document.querySelector('#topAlert');
      if (existingAlert) existingAlert.remove();

      if (errors.length > 0) {
        formMessage.textContent = errors.join(" ");
        formMessage.classList.remove('text-success');
        formMessage.classList.add('text-danger');
        return;
      }

      // ---------- Save enrollment ----------
      let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
      enrollments.push({ name, email, phone, course, mode, date, comments });
      localStorage.setItem('enrollments', JSON.stringify(enrollments));

      // ---------- Show Alert Above Form ----------
      const alertDiv = document.createElement('div');
      alertDiv.id = 'topAlert';
      alertDiv.className = 'alert alert-success text-center';
      alertDiv.textContent = `✅ Thank you ${name}, you have successfully enrolled for "${course}"!`;
      enrollForm.insertAdjacentElement('beforebegin', alertDiv);

      // Fade-in effect
      setTimeout(() => alertDiv.classList.add('show'), 10);

      // Auto-remove after 5s
      setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 500);
      }, 5000);

      // Reset form
      enrollForm.reset();
      formMessage.textContent = '';
    });
  }

});