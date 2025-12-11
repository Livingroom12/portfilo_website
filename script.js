(function () {
  emailjs.init("ozirpe4oDpR07zmlw");
})();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const progressCircle = document.getElementById("progressCircle");
  const cursor = document.querySelector(".cursor");
  const form = document.getElementById("form");

  // Scroll progress + back to top
  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;

    const setProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight ? scrollTop / docHeight : 0;
      const offset = circumference - scrollPercent * circumference;
      progressCircle.style.strokeDashoffset = offset;
      if (scrollBtn) scrollBtn.style.display = scrollTop > 120 ? "flex" : "none";
    };

    window.addEventListener("scroll", setProgress);
    setProgress();
  }

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Sticky header
  const setHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", setHeader);
  setHeader();

  // Mobile nav toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Cursor follow
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
  }

  // Contact form with EmailJS + SweetAlert
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      emailjs
        .sendForm("service_iecnrr8", "template_vjpm9uv", form)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Message sent!",
            text: "I'll get back to you shortly.",
            confirmButtonColor: "#4f46e5",
          });
          form.reset();
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send message. Please try again later.",
            confirmButtonColor: "#d33",
          });
        });
    });
  }
});

