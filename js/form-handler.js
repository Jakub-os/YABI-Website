document.addEventListener("DOMContentLoaded", () => {
  attachNewsletterFormHandler();
  attachContactFormHandler();
});

function attachNewsletterFormHandler() {
  const newsletterForm = document.querySelector(".newsletter_form");

  if (!newsletterForm) {
    return;
  }

  const emailInput = newsletterForm.querySelector('input[name="email"]');
  const formContainer = newsletterForm.closest(".w-form");
  const errorDiv = formContainer ? formContainer.querySelector(".w-form-fail") : null;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = (emailInput ? emailInput.value : "").trim();

    clearMessage(errorDiv);

    if (!isValidEmail(email)) {
      showError(errorDiv, "Please enter a valid email.");
      return;
    }

    showError(errorDiv, "Form submissions are currently disabled.");
  });
}

function attachContactFormHandler() {
  const contactForm = document.querySelector(".form_wrap");

  if (!contactForm) {
    return;
  }

  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('textarea[name="field"]');
  const privacyCheckbox = contactForm.querySelector('input[name="consent-contact-response"]');

  const formContainer = contactForm.closest(".w-form");
  const errorDiv = formContainer ? formContainer.querySelector(".w-form-fail") : null;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = (nameInput ? nameInput.value : "").trim();
    const email = (emailInput ? emailInput.value : "").trim();
    const message = (messageInput ? messageInput.value : "").trim();
    const consent_privacy = Boolean(privacyCheckbox && privacyCheckbox.checked);

    clearMessage(errorDiv);

    if (!name) {
      showError(errorDiv, "Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      showError(errorDiv, "Please enter a valid email.");
      return;
    }

    if (!message) {
      showError(errorDiv, "Please enter your message.");
      return;
    }

    if (!consent_privacy) {
      showError(errorDiv, "You must accept the privacy consent.");
      return;
    }

    showError(errorDiv, "Form submissions are currently disabled.");
  });
}

function showError(errorElement, message) {
  if (!errorElement) {
    return;
  }

  const messageNode = errorElement.querySelector("div");

  if (messageNode) {
    messageNode.textContent = message;
  } else {
    errorElement.textContent = message;
  }

  errorElement.style.display = "block";
}

function clearMessage(errorElement) {
  if (!errorElement) {
    return;
  }

  errorElement.style.display = "none";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
