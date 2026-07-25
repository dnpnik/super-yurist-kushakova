const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const requestForm = document.querySelector("[data-request-form]");
const formStatus = document.querySelector("[data-form-status]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (header && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateNavigation = () => {
  const marker = Math.min(window.innerHeight * 0.35, 250);
  let activeSection = null;

  observedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= marker) {
      activeSection = section;
    }
  });

  navLinks.forEach((link) => {
    const active = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
    if (active) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

updateNavigation();
window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation, { passive: true });

if (requestForm && formStatus) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(requestForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const recipient = requestForm.dataset.mailTo || "kushakovajulia@mail.ru";
    const subject = `Обращение с сайта «Супер Юрист» от ${name}`;
    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      "",
      "Текст обращения:",
      message,
    ].join("\n");

    formStatus.textContent = "Открываем почтовое приложение...";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
