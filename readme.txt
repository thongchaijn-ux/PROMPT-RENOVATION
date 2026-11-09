=== PROMPT Scroll-Scrubbed Live Photo Hero ===
Contributors: prompt
Tags: video, scroll, cover, hero, animation
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Scrub video frames directly from page scroll position, without autoplay or easing.

== Description ==

On the front page, the first video inside a Cover or Video block is controlled by scroll position. Add the data-scroll-scrub attribute to any video to enable the same behavior on other pages or for additional videos.

Video time is mapped linearly to the amount the video has moved through the viewport. Native touch scrolling and swiping update the same position. Videos are not played automatically. When the visitor requests reduced motion, automatic scroll scrubbing is disabled.

== Installation ==

1. Upload the plugin ZIP through Plugins > Add New Plugin > Upload Plugin, or extract the plugin directory into /wp-content/plugins/.
2. Activate PROMPT Scroll-Scrubbed Live Photo Hero in the Plugins screen.
3. Use a video in a Cover or Video block on the front page, or mark a video element with data-scroll-scrub.

== Frequently Asked Questions ==

= How do I enable scrubbing for a video outside the front-page hero? =

Add data-scroll-scrub to its video element. For example: <video data-scroll-scrub src="example.mp4"></video>

= Does the plugin autoplay video? =

No. The video remains paused; the browser's currentTime is set directly from scroll position.

= What happens when reduced motion is enabled? =

Scroll scrubbing is disabled and the plugin does not change video playback position.

== Changelog ==

= 1.0.0 =
* Initial release.