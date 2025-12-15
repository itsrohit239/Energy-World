/*
 * Energy World - Developer Info Module
 * Handles developer information modal/box functionality
 * Author: Rohit Vadher
 */

(function () {
  "use strict";

  // ========================================
  // DEVELOPER INFO MODAL CONTROLLER
  // ========================================

  /**
   * Developer Info Modal Class
   * Handles opening, closing, and interactions with the developer info modal
   */
  class DeveloperInfoModal {
    constructor() {
      // DOM Elements
      this.modal = document.getElementById("devModal");
      this.openBtn = document.getElementById("devBtn");
      this.closeBtn = document.getElementById("closeModal");

      // Check if elements exist (modal only on contact page)
      if (!this.modal || !this.openBtn || !this.closeBtn) {
        return;
      }

      // Initialize
      this.init();
    }

    /**
     * Initialize event listeners
     */
    init() {
      // Open modal on button click
      this.openBtn.addEventListener("click", () => this.open());

      // Close modal on close button click
      this.closeBtn.addEventListener("click", () => this.close());

      // Close modal on overlay click
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });

      // Close modal on ESC key press
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.modal.classList.contains("active")) {
          this.close();
        }
      });

      // Prevent modal box clicks from closing the modal
      const modalBox = this.modal.querySelector(".developer-box");
      if (modalBox) {
        modalBox.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    }

    /**
     * Open the modal
     */
    open() {
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scroll

      // Add opening animation
      const modalBox = this.modal.querySelector(".developer-box");
      if (modalBox) {
        modalBox.style.animation = "none";
        setTimeout(() => {
          modalBox.style.animation = "scaleIn 0.3s ease";
        }, 10);
      }

      // Track modal open event (for analytics)
      this.trackEvent("Developer Info Modal", "Open", "User Interest");
    }

    /**
     * Close the modal
     */
    close() {
      const modalBox = this.modal.querySelector(".developer-box");

      if (modalBox) {
        // Add closing animation
        modalBox.style.animation = "scaleOut 0.2s ease";

        setTimeout(() => {
          this.modal.classList.remove("active");
          document.body.style.overflow = ""; // Restore scroll
        }, 200);
      } else {
        this.modal.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Track modal close event
      this.trackEvent("Developer Info Modal", "Close", "User Action");
    }

    /**
     * Track events (for analytics integration)
     * Replace with your analytics tracking code
     */
    trackEvent(category, action, label) {
      // Example: Google Analytics
      // if (typeof gtag !== 'undefined') {
      //     gtag('event', action, {
      //         'event_category': category,
      //         'event_label': label
      //     });
      // }

      console.log(`Event Tracked: ${category} - ${action} - ${label}`);
    }
  }

  // ========================================
  // SOCIAL MEDIA LINK TRACKING
  // ========================================

  /**
   * Track social media link clicks
   */
  function trackSocialLinks() {
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const platform = this.classList.contains("whatsapp")
          ? "WhatsApp"
          : this.classList.contains("instagram")
          ? "Instagram"
          : this.classList.contains("facebook")
          ? "Facebook"
          : this.classList.contains("github")
          ? "GitHub"
          : "Unknown";

        console.log(`Social Link Clicked: ${platform}`);

        // Add analytics tracking here
        // Example: gtag('event', 'click', {
        //     'event_category': 'Social Media',
        //     'event_label': platform
        // });
      });
    });
  }

  // ========================================
  // DEVELOPER INFO TOOLTIP
  // ========================================

  /**
   * Show tooltip on developer button hover
   */
  function initDeveloperTooltip() {
    const developerBtn = document.getElementById("devBtn");

    if (!developerBtn) return;

    let tooltip = null;

    developerBtn.addEventListener("mouseenter", function () {
      // Create tooltip
      tooltip = document.createElement("div");
      tooltip.className = "developer-tooltip";
      tooltip.textContent = "Developer Info";
      tooltip.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                z-index: 998;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

      document.body.appendChild(tooltip);

      // Fade in
      setTimeout(() => {
        tooltip.style.opacity = "1";
      }, 10);
    });

    developerBtn.addEventListener("mouseleave", function () {
      if (tooltip) {
        tooltip.style.opacity = "0";
        setTimeout(() => {
          if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      }
    });
  }

  // ========================================
  // ADD SCALE OUT ANIMATION
  // ========================================

  /**
   * Add scale out animation to CSS
   */
  function addAnimations() {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes scaleOut {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0.8);
                }
            }
        `;
    document.head.appendChild(style);
  }

  // ========================================
  // INITIALIZE ON DOM READY
  // ========================================

  document.addEventListener("DOMContentLoaded", function () {
    // Add animations
    addAnimations();

    // Initialize developer info modal
    new DeveloperInfoModal();

    // Initialize social link tracking
    trackSocialLinks();

    // Initialize developer tooltip
    initDeveloperTooltip();
  });
})();
