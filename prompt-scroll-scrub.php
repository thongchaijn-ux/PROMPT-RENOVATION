<?php
/**
 * Plugin Name: PROMPT Scroll-Scrubbed Live Photo Hero
 * Description: Scrubs video frames directly from page scroll position on a front-page hero or marked videos.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL-2.0-or-later
 * Text Domain: prompt-scroll-scrubbed-live-photo-hero
 *
 * @package PromptScrollScrubbedLivePhotoHero
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the front-end scroll-scrubbing assets.
 *
 * @return void
 */
function prompt_scroll_scrubbed_live_photo_hero_enqueue_assets() {
	$plugin_version = '1.0.0';

	wp_enqueue_style(
		'prompt-scroll-scrubbed-live-photo-hero',
		plugins_url( 'assets/css/scroll-scrub.css', __FILE__ ),
		array(),
		$plugin_version
	);

	wp_enqueue_script(
		'prompt-scroll-scrubbed-live-photo-hero',
		plugins_url( 'assets/js/scroll-scrub.js', __FILE__ ),
		array(),
		$plugin_version,
		true
	);

	wp_add_inline_script(
		'prompt-scroll-scrubbed-live-photo-hero',
		'window.PromptScrollScrub = ' . wp_json_encode(
			array(
				'isFrontPage' => is_front_page(),
			)
		) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'prompt_scroll_scrubbed_live_photo_hero_enqueue_assets' );