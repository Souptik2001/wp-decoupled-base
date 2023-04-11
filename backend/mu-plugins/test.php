<?php
/**
 * Customize WordPress REST API as required.
 *
 * @package wp-decoupled-sample
 */

/**
 * Registers required post types.
 */
function register_custom_post_types() {
	$labels = array(
		'name'                  => _x( 'Blogs', 'Post type general name', 'test' ),
		'singular_name'         => _x( 'Blog', 'Post type singular name', 'test' ),
		'menu_name'             => _x( 'Blogs', 'Admin Menu text', 'test' ),
		'name_admin_bar'        => _x( 'Blog', 'Add New on Toolbar', 'test' ),
		'add_new'               => __( 'Add New', 'test' ),
		'add_new_item'          => __( 'Add New Blog', 'test' ),
		'new_item'              => __( 'New Blog', 'test' ),
		'edit_item'             => __( 'Edit Blog', 'test' ),
		'view_item'             => __( 'View Blog', 'test' ),
		'all_items'             => __( 'All Blogs', 'test' ),
		'search_items'          => __( 'Search Blogs', 'test' ),
		'parent_item_colon'     => __( 'Parent Blogs:', 'test' ),
		'not_found'             => __( 'No Blogs found.', 'test' ),
		'not_found_in_trash'    => __( 'No Blogs found in Trash.', 'test' ),
		'featured_image'        => _x( 'Blog Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'test' ),
		'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'test' ),
		'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'test' ),
		'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'test' ),
		'archives'              => _x( 'Blog archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'test' ),
		'insert_into_item'      => _x( 'Insert into Blog', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'test' ),
		'uploaded_to_this_item' => _x( 'Uploaded to this Blog', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'test' ),
		'filter_items_list'     => _x( 'Filter Blogs list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'test' ),
		'items_list_navigation' => _x( 'Blogs list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'test' ),
		'items_list'            => _x( 'Blogs list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'test' ),
	);

	$args = array(
		'labels'       => $labels,
		'public'       => true,
		'menu_icon'    => 'dashicons-welcome-write-blog',
		'supports'     => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' ),
		'show_in_rest' => true,
		'rest_base'    => 'blogs',
	);

	register_post_type( 'blog', $args );
}

/**
 * Registers required custom taxonomies.
 */
function register_custom_taxonomies() {

	$labels = array(
		'name'              => _x( 'Types', 'taxonomy general name', 'test' ),
		'singular_name'     => _x( 'Type', 'taxonomy singular name', 'test' ),
		'search_items'      => __( 'Search Types', 'test' ),
		'all_items'         => __( 'All Types', 'test' ),
		'parent_item'       => __( 'Parent Type', 'test' ),
		'parent_item_colon' => __( 'Parent Type:', 'test' ),
		'edit_item'         => __( 'Edit Type', 'test' ),
		'update_item'       => __( 'Update Type', 'test' ),
		'add_new_item'      => __( 'Add New Type', 'test' ),
		'new_item_name'     => __( 'New Type Name', 'test' ),
		'menu_name'         => __( 'Type', 'test' ),
	);

	$args = array(
		'hierarchical' => true,
		'labels'       => $labels,
		'show_ui'      => true,
		'show_in_rest' => true,
	);

	register_taxonomy(
		'blog_type',
		'blog',
		$args
	);

}

/**
 * Register custom meta fields.
 */
function register_meta_fields() {
	register_post_meta(
		'blog',
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
add_action( 'init', 'register_custom_post_types' );
add_action( 'init', 'register_custom_taxonomies' );
