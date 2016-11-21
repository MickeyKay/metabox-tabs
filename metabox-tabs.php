<?php
/**
 * Plugin Name:       Metabox Tabs
 * Plugin URI:        http://wordpress.org/plugins/metabox-tabs
 * Description:       Organize your metaboxes into tabs.
 * Version:           1.0.0
 * Author:            MIckey Kay
 * Author URI:        httpa://mickeykay.me
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       metabox-tabs
 * Domain Path:       /languages
 */

define( 'METABOX_TABS_PATH', plugin_dir_path( __FILE__ ) );
define( 'METABOX_TABS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Ensure we load this before other scripts.
 *
 * Required otherwise:
 * 	- set featured image doesn't work
 */
add_action( 'admin_enqueue_scripts', 'mt_enqueue_scripts', 5 );

function mt_enqueue_scripts() {

	wp_enqueue_script( 'jquery-ui-tabs' );
	wp_enqueue_script( 'metabox-tabs', METABOX_TABS_URL . '/js/admin.js', array( 'jquery' ) );

	wp_enqueue_style( 'metabox-tabs', METABOX_TABS_URL . '/css/admin.css' );
}