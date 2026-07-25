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
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!requestForm.reportValidity()) {
      return;
    }

    const submitButton = requestForm.querySelector('button[type="submit"]');
    const defaultLabel = submitButton?.textContent || "Отправить обращение";
    const data = new FormData(requestForm);
    const name = String(data.get("name") || "").trim();

    data.set("_subject", `Новое обращение с сайта zashita55.online от ${name}`);
    formStatus.textContent = "Отправляем обращение...";
    requestForm.setAttribute("aria-busy", "true");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Отправляем...";
    }

    try {
      const endpoint = requestForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error("Submission failed");
      }

      requestForm.reset();
      formStatus.textContent = "Обращение отправлено. Юрист свяжется с вами по указанному телефону.";
    } catch {
      formStatus.textContent = "Не удалось отправить обращение. Позвоните по номеру +7 (909) 199-85-50.";
    } finally {
      requestForm.removeAttribute("aria-busy");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultLabel;
      }
    }
  });
}
document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
