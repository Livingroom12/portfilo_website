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



document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("testiTrack");
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.getElementById("testiDots");
    const prevBtn = document.getElementById("testiPrev");
    const nextBtn = document.getElementById("testiNext");

    let currentIndex = 0;
    let autoPlay;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("testimonial-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            goToSlide(index);
            resetAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".testimonial-dot");

    // Update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        currentIndex =
            (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Button events
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
    });

    // Auto play
    function startAutoplay() {
        autoPlay = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    // Reset autoplay on interaction
    function resetAutoplay() {
        clearInterval(autoPlay);
        startAutoplay();
    }

    // Pause on hover
    track.addEventListener("mouseenter", () => {
        clearInterval(autoPlay);
    });

    track.addEventListener("mouseleave", () => {
        startAutoplay();
    });

    // Touch swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = startX - endX;

        if (diff > 50) {
            nextSlide();
        } else if (diff < -50) {
            prevSlide();
        }

        resetAutoplay();
    }

    // Init
    updateSlider();
    startAutoplay();
});
