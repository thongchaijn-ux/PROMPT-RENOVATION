=== PROMPT Scroll-Scrubbed Live Photo Hero ===
Contributors: prompt
Tags: video, scroll, swipe, hero, animation
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Scrub video frames directly with page scroll or a horizontal swipe. No autoplay, easing, or smoothing.

== Description ==

This plugin maps the page scroll position directly to the current frame time of supported videos. A horizontal swipe or drag across a supported video scrubs its frames in either direction.

Supported videos:

* WordPress Cover block and Video block videos on the homepage (including a static front page).
* Any video element marked with the data-scroll-scrub attribute, on any front-end page.

The plugin does not call play() and removes the autoplay attribute from supported videos. It respects the visitor's prefers-reduced-motion setting by disabling scroll and swipe scrubbing while reduced motion is requested. Video poster, source, and other block settings remain under the control of WordPress and the site editor.

== Installation ==

1. In WordPress Admin, go to Plugins > Add New Plugin > Upload Plugin.
2. Upload the ZIP package and choose Install Now.
3. Activate PROMPT Scroll-Scrubbed Live Photo Hero.
4. Add a video to a Cover or Video block on the homepage, or add the data-scroll-scrub attribute to a video element.

For a custom video element, add the attribute in the markup, for example:

<video data-scroll-scrub preload="metadata" playsinline>
  <source src="your-video.mp4" type="video/mp4">
</video>

== Usage notes ==

* Use a video source that supports seeking (for example, an MP4 file served with byte-range support).
* The scroll mapping runs while the video element crosses the viewport, from the element entering at the bottom to leaving at the top.
* Swipe or drag horizontally across the video: moving right advances and moving left reverses.
* Videos stay paused; changing currentTime is used to request the corresponding frame.
* With prefers-reduced-motion enabled, scrubbing is disabled and the video remains paused.
* The plugin only enqueues front-end assets. It does not edit the active theme, pages, snippets, or website content.

== Frequently Asked Questions ==

= Why does a video not scrub? =

The video must have loaded metadata and its source must be seekable. Check that the source is available and supports byte-range requests. Some adaptive streams do not allow arbitrary seeking.

= Does the plugin play the video? =

No. It seeks by assigning currentTime and does not call play(). Supported videos have autoplay disabled.

= Which videos are selected automatically? =

Cover and Video block videos on the homepage are selected automatically. To opt in another video, add data-scroll-scrub to its video element.

== Changelog ==

= 1.0.0 =
* Initial release: direct scroll and horizontal pointer swipe frame scrubbing.
* Respect prefers-reduced-motion and disable autoplay on supported videos.
