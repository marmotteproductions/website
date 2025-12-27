"use strict";

var HeroCarousel = {
  carousel: null,
  slides: [],
  currentIndex: 0,
  intervalId: null,
  intervalDuration: 5000, // 5 seconds

  init: function() {
    this.carousel = document.getElementById('hero-carousel');
    if (!this.carousel) {
      return;
    }

    this.slides = this.carousel.querySelectorAll('.carousel-slide');
    if (this.slides.length <= 1) {
      return; // No need for carousel with 0 or 1 slide
    }

    this.startAutoRotation();
  },

  startAutoRotation: function() {
    var self = this;
    this.intervalId = setInterval(function() {
      self.nextSlide();
    }, this.intervalDuration);
  },

  nextSlide: function() {
    var currentSlide = this.slides[this.currentIndex];
    var nextIndex = (this.currentIndex + 1) % this.slides.length;
    var nextSlide = this.slides[nextIndex];

    // Add exiting class to current slide (slides left)
    currentSlide.classList.add('exiting');
    currentSlide.classList.remove('active');

    // Activate next slide (slides in from right)
    nextSlide.classList.add('active');

    // Clean up exiting class after transition completes
    var self = this;
    setTimeout(function() {
      currentSlide.classList.remove('exiting');
    }, 600); // Match CSS transition duration

    this.currentIndex = nextIndex;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    HeroCarousel.init();
  });
} else {
  HeroCarousel.init();
}
