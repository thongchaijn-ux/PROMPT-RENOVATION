(function () {
	'use strict';

	var selector = 'video[data-scroll-scrub]';
	var homepageSelector = 'body.home .wp-block-cover video, body.front-page .wp-block-cover video, body.home .wp-block-video video, body.front-page .wp-block-video video';
	var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
	var videos = [];
	var frameRequested = false;

	function motionIsReduced() {
		return Boolean(reducedMotion && reducedMotion.matches);
	}

	function durationOf(video) {
		return Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
	}

	function clamp(value, min, max) {
		return Math.min(max, Math.max(min, value));
	}

	// Assign the requested time directly. No playback, interpolation, or easing.
	function seek(video, time) {
		var duration = durationOf(video);
		if (!duration || video.readyState < 1) {
			return;
		}

		var target = clamp(time, 0, duration);
		if (Math.abs(video.currentTime - target) < 0.001) {
			return;
		}

		try {
			video.currentTime = target;
		} catch (error) {
			// Some streaming sources do not expose a seekable frame at this time.
		}
	}

	function scrollProgress(video) {
		var rect = video.getBoundingClientRect();
		var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		var travel = viewportHeight + rect.height;
		if (!travel) {
			return 0;
		}
		return clamp((viewportHeight - rect.top) / travel, 0, 1);
	}

	function updateFromScroll() {
		frameRequested = false;
		if (motionIsReduced()) {
			return;
		}

		videos.forEach(function (video) {
			if (!video.isConnected || video._promptScrubDragging) {
				return;
			}
			seek(video, scrollProgress(video) * durationOf(video));
		});
	}

	function requestScrollUpdate() {
		if (!frameRequested) {
			frameRequested = true;
			window.requestAnimationFrame(updateFromScroll);
		}
	}

	function markVideo(video) {
		if (video._promptScrollScrubReady) {
			return;
		}
		video._promptScrollScrubReady = true;
		video.classList.add('prompt-scroll-scrubbed-video');

		// Explicitly disable autoplay and keep the media paused. currentTime
		// scrubbing does not require calling play().
		video.autoplay = false;
		video.removeAttribute('autoplay');
		video.pause();
		if (!video.hasAttribute('preload') || video.preload === 'none') {
			video.preload = 'metadata';
		}
		video.addEventListener('play', function () {
			video.pause();
		});
		video.addEventListener('loadedmetadata', requestScrollUpdate);

		video.addEventListener('pointerdown', function (event) {
			if (motionIsReduced() || event.isPrimary === false || event.button > 0) {
				return;
			}
			video._promptScrubPointer = {
				id: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				startTime: video.currentTime,
				width: Math.max(video.getBoundingClientRect().width, 1),
				active: false
			};
		});

		video.addEventListener('pointermove', function (event) {
			var drag = video._promptScrubPointer;
			if (!drag || event.pointerId !== drag.id || motionIsReduced()) {
				return;
			}

			var deltaX = event.clientX - drag.startX;
			var deltaY = event.clientY - drag.startY;
			if (!drag.active && Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
				drag.active = true;
				video._promptScrubDragging = true;
				try {
					video.setPointerCapture(event.pointerId);
				} catch (error) {
					// Pointer capture is optional; the gesture still works without it.
				}
			}
			if (drag.active) {
				event.preventDefault();
				seek(video, drag.startTime + (deltaX / drag.width) * durationOf(video));
			}
		});

		function finishPointer(event) {
			var drag = video._promptScrubPointer;
			if (!drag || (event && event.pointerId !== drag.id)) {
				return;
			}
			video._promptScrubPointer = null;
			video._promptScrubDragging = false;
			requestScrollUpdate();
		}

		video.addEventListener('pointerup', finishPointer);
		video.addEventListener('pointercancel', finishPointer);
		video.addEventListener('lostpointercapture', finishPointer);
		videos.push(video);
	}

	function initialize() {
		var isHomepage = document.body.classList.contains('home') || document.body.classList.contains('front-page');
		var candidates = Array.prototype.slice.call(document.querySelectorAll(selector));

		if (isHomepage) {
			Array.prototype.slice.call(document.querySelectorAll(homepageSelector)).forEach(function (video) {
				if (candidates.indexOf(video) === -1) {
					candidates.push(video);
				}
			});
		}

		candidates.forEach(markVideo);
		requestScrollUpdate();
	}

	window.addEventListener('scroll', requestScrollUpdate, { passive: true });
	window.addEventListener('resize', requestScrollUpdate, { passive: true });
	if (reducedMotion && typeof reducedMotion.addEventListener === 'function') {
		reducedMotion.addEventListener('change', requestScrollUpdate);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initialize, { once: true });
	} else {
		initialize();
	}
})();
