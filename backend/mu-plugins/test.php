<?php
/**
 * Customize WordPress REST API as required.
 *
 * @package wp-decoupled-sample
 */

/**
 * Register custom meta fields.
 */
function register_meta_fields() {
	register_post_meta(
		'post',
		'post_views',
		array(
			'type'         => 'integer',
			'single'       => true,
			'default'      => 0,
			'show_in_rest' => true,
		)
	);
}

add_action( 'init', 'register_meta_fields' );
