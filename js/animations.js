/*
 * Energy World - Animation Controller
 * Professional & Minimalist
 * Handles intersection observers for scroll effects
 */

(function () {
  "use strict";

  // Initialize Interserction Observer for Fade Animations
  document.addEventListener("DOMContentLoaded", function () {
    // Check for IntersectionObserver support
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll("[data-aos]")
        .forEach((el) => el.classList.add("aos-animate"));
      return;
    }

    // Observer Options - Trigger slightly before element is fully in view
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    // Primary Scroll Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
          // Optional: Stop observing once animated
          // observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all elements with data-aos attribute
    document.querySelectorAll("[data-aos]").forEach((element) => {
      observer.observe(element);
    });

    // Count Up Animation (Simplified & Smoother)
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    });

    document
      .querySelectorAll("[data-count]")
      .forEach((el) => countObserver.observe(el));
  });

  // Smooth Count Up Function
  function animateValue(obj) {
    const target = parseInt(obj.dataset.count);
    const duration = 2000;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
})();
