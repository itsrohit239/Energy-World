/*
 * Energy World - Main JavaScript
 * Core functionality and page transitions
 * Author: Rohit Vadher
 */

// Document Ready
$(document).ready(function () {
  "use strict";

  // ========================================
  // SMOOTH PAGE TRANSITIONS WITH AJAX
  // ========================================

  /**
   * Handle smooth page transitions
   * Prevents default link behavior and loads content via AJAX
   */
  $(".page-link").on("click", function (e) {
    e.preventDefault();

    const targetUrl = $(this).attr("href");

    // Skip if clicking current page
    if ($(this).hasClass("active")) {
      return;
    }

    // Add loading animation
    $("body").addClass("page-transitioning");
    $("body").fadeOut(300, function () {
      // Navigate to new page after fade out
      window.location.href = targetUrl;
    });
  });

  // Remove transitioning class on page load
  $("body").removeClass("page-transitioning").hide().fadeIn(500);

  // ========================================
  // SMOOTH SCROLLING
  // ========================================

  /**
   * Smooth scroll to anchor links
   */
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));

    if (target.length) {
      e.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
          "swing"
        );
    }
  });

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================

  /**
   * Add shadow to navbar on scroll
   */
  let lastScroll = 0;
  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    if (currentScroll > 50) {
      $(".navbar").css("box-shadow", "0 4px 20px rgba(0, 0, 0, 0.1)");
    } else {
      $(".navbar").css("box-shadow", "0 2px 8px rgba(0, 0, 0, 0.08)");
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // MOBILE MENU AUTO-CLOSE
  // ========================================

  /**
   * Close mobile menu when clicking on a link
   */
  $(".navbar-nav .nav-link").on("click", function () {
    if ($(window).width() < 992) {
      $(".navbar-collapse").collapse("hide");
    }
  });

  // ========================================
  // CONTACT FORM HANDLING
  // ========================================

  /**
   * Handle contact form submission
   * Note: This is a front-end only demo. Integrate with backend for actual functionality
   */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
    };

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show a success message
    console.log("Form Data:", formData);

    // Show success message
    $("#formSuccess").fadeIn();

    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(function () {
      $("#formSuccess").fadeOut();
    }, 5000);

    /* 
        // Example AJAX submission (uncomment when backend is ready)
        $.ajax({
            url: 'process-contact.php', // Your backend endpoint
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#formSuccess').fadeIn();
                    $('#contactForm')[0].reset();
                    setTimeout(function() {
                        $('#formSuccess').fadeOut();
                    }, 5000);
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function() {
                alert('An error occurred. Please try again later.');
            }
        });
        */
  });

  // ========================================
  // FORM INPUT ANIMATIONS
  // ========================================

  /**
   * Add focus animations to form inputs
   */
  $(".form-control").on("focus", function () {
    $(this).parent().addClass("input-focused");
  });

  $(".form-control").on("blur", function () {
    $(this).parent().removeClass("input-focused");
  });

  // ========================================
  // BUTTON RIPPLE EFFECT
  // ========================================

  /**
   * Add ripple effect to buttons on click
   */
  $(".btn-ripple").on("click", function (e) {
    const $button = $(this);
    const $ripple = $('<span class="ripple"></span>');

    // Get click position
    const x = e.pageX - $button.offset().left;
    const y = e.pageY - $button.offset().top;

    // Set ripple position
    $ripple.css({
      top: y + "px",
      left: x + "px",
    });

    // Add ripple to button
    $button.append($ripple);

    // Remove ripple after animation
    setTimeout(function () {
      $ripple.remove();
    }, 600);
  });

  // ========================================
  // LAZY LOADING FOR IMAGES
  // ========================================

  /**
   * Lazy load images when they come into viewport
   */
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // BACK TO TOP BUTTON (Optional)
  // ========================================

  /**
   * Show/hide back to top button
   */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  // Back to top click handler
  $(".back-to-top").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  // ========================================
  // PRELOADER (Optional)
  // ========================================

  /**
   * Hide preloader when page is fully loaded
   */
  $(window).on("load", function () {
    $(".preloader").fadeOut(500);
  });

  // ========================================
  // PRODUCT CARD INTERACTIONS
  // ========================================

  /**
   * Add hover effects to product cards
   */
  $(".product-card").hover(
    function () {
      $(this).find(".product-image").addClass("zoom");
    },
    function () {
      $(this).find(".product-image").removeClass("zoom");
    }
  );

  // ========================================
  // CONSOLE BRANDING
  // ========================================

  /**
   * Display developer info in console
   */
  console.log(
    "%c Energy World Website ",
    "background: linear-gradient(135deg, #1B3C53 0%, #234C6A 100%); color: white; font-size: 20px; padding: 10px;"
  );
  console.log(
    "%c Developed with ❤️ | Energy World Solar Solutions ",
    "background: #456882; color: white; font-size: 14px; padding: 5px;"
  );
  console.log(
    "%c Visit us in Una, Gujarat! ",
    "background: #234C6A; color: white; font-size: 14px; padding: 5px;"
  );
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
