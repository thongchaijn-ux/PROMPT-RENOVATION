(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotion.matches) {
    return;
  }

  function initializeScrollScrubbing() {
    var videos = Array.prototype.slice.call(
      document.querySelectorAll('video[data-scroll-scrub]')
    );
    var settings = window.PromptScrollScrub || {};

    if (settings.isFrontPage) {
      var firstHeroVideo = document.querySelector(
        '.wp-block-cover video, .wp-block-video video'
      );

      if (firstHeroVideo && videos.indexOf(firstHeroVideo) === -1) {
        videos.push(firstHeroVideo);
      }
    }

    if (!videos.length) {
      return;
    }

    function updateVideoFrames() {
      var viewportHeight = window.innerHeight;

      videos.forEach(function (video) {
        var duration = video.duration;

        if (
          !Number.isFinite(duration) ||
          duration <= 0 ||
          video.readyState < HTMLMediaElement.HAVE_METADATA
        ) {
          return;
        }

        var bounds = video.getBoundingClientRect();
        var travelDistance = viewportHeight + bounds.height;
        var progress = (viewportHeight - bounds.top) / travelDistance;
        var targetTime = Math.min(1, Math.max(0, progress)) * duration;

        if (video.currentTime !== targetTime) {
          video.currentTime = targetTime;
        }
      });
    }

    videos.forEach(function (video) {
      video.classList.add('prompt-scroll-scrubbed');
      video.autoplay = false;
      video.removeAttribute('autoplay');
      video.pause();
      video.addEventListener('loadedmetadata', updateVideoFrames);
    });

    window.addEventListener('scroll', updateVideoFrames, { passive: true });
    window.addEventListener('resize', updateVideoFrames, { passive: true });
    window.addEventListener('touchmove', updateVideoFrames, { passive: true });
    updateVideoFrames();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollScrubbing);
  } else {
    initializeScrollScrubbing();
  }
}());