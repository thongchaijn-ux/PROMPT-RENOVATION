<?php
/**
 * Plugin Name: PROMPT Scroll-Scrubbed Live Photo Hero
 * Description: Scrub video frames directly with page scroll or a horizontal swipe—without autoplay or easing.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: PROMPT
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: prompt-scroll-scrubbed-live-photo-hero
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load the front-end scrubber. It only acts on homepage Cover/Video blocks
 * and videos explicitly marked with data-scroll-scrub.
 */
function prompt_sslph_enqueue_assets() {
	if ( is_admin() ) {
		return;
	}

	$version = '1.0.0';
	$base_url = plugin_dir_url( __FILE__ );

	wp_enqueue_style(
		'prompt-scroll-scrubbed-live-photo-hero',
		$base_url . 'assets/css/scroll-scrubbed-live-photo-hero.css',
		array(),
		$version
	);

	wp_enqueue_script(
		'prompt-scroll-scrubbed-live-photo-hero',
		$base_url . 'assets/js/scroll-scrubbed-live-photo-hero.js',
		array(),
		$version,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'prompt_sslph_enqueue_assets' );
