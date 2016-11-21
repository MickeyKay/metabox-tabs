/**
 * NerdWallet Content Series public JS.
 */

var tabsJson = {
	'postbox-container-1': {
		location: 'top',
		metaboxes: [
			{
				id: 'categorydiv',
				icon: 'admin-generic'
			},
			{
				id: 'tagsdiv-post_tag',
				icon: 'admin-generic'
			},
			{
				id: 'customsidebars-mb',
				icon: 'admin-generic'
			},
			{
				id: 'gn-genrediv',
				icon: 'admin-generic'
			},
			{
				id: 'nw_content_seriesdiv',
				icon: 'admin-generic'
			}
		]
	},
	'postbox-container-2': {
		location: 'top',
		title: 'Basic Options',
		metaboxes: [
			{
				id: '_nw_schema_options',
				icon: 'admin-generic'
			},
			{
				id: '_nw_post_options',
				icon: 'admin-generic'
			},
			{
				id: 'coauthorsdiv',
				icon: 'admin-generic'
			},
			{
				id: 'wpseo_meta',
				icon: 'admin-generic'
			},
			{
				id: '_nw_syndication_options',
				icon: 'admin-generic'
			},
			{
				id: '_nw_tool_options',
				icon: 'admin-generic'
			},
			{
				id: '_nw_disable_cache',
				icon: 'admin-generic'
			},
			{
				id: 'postexcerpt',
				icon: 'admin-generic'
			},
			{
				id: 'postcustom',
				icon: 'admin-generic'
			},
			{
				id: 'slugdiv',
				icon: 'admin-generic'
			},
			{
				id: 'zopim_post_meta',
				icon: 'admin-generic'
			},
			{
				id: 'edit-flow-editorial-comments',
				icon: 'admin-generic'
			}
		]
	}
}

var metaboxTabs = ( function( $ ) {

	// Set up global vars.
	var $metaboxTabContainers

	var init = function() {
		initializeMetaboxTabs( tabsJson );
		setUpEventHandlers();
	}

	var initializeMetaboxTabs = function( tabsJson ) {

		$.each( tabsJson, function( postboxId, atts ) {
			var $postbox          = $( `#${postboxId}` );
				$tabsContainer    = $( '<div class="metabox-tabs postbox">' ),
				$tabsNavContainer = $( '<ul class="metabox-tabs-nav">' ).prependTo( $tabsContainer );

			// Prepend title if specified.
			if ( atts.title ) {
				$tabsContainer.prepend( `<h2 class="hndle">${atts.title}</h2>` );
			}

			// Bail if the postbox doesn't exist.
			if ( $postbox.length <= 0 ) {
				return true;
			}

			if ( 'top' == atts.location ) {
				$tabsContainer.prependTo( $postbox )
			} else {
				$tabsContainer.appendTo( $postbox )
			}

			$.each( atts.metaboxes, function( index, metabox ) {

				metabox.icon = metabox.icon || 'admin-general';

				var $metabox    = $( `#${metabox.id}` ).not( '.hide-if-js' ),
					icon        = `<span class="dashicons dashicons-${metabox.icon}"></span>`,
					tabTitle    = $metabox.find( 'h2 span' ).text(),
					$tabContents = $metabox.detach(),
					$tabContainer;

				// Bail if the metabox doesn't exist.
				if ( $metabox.length <= 0 ) {
					return true;
				}

				// Remove original metabox.
				$metabox.remove();

				// Add nav link.
				$tabsNavContainer.append( `<li data-metabox-tab-index="${index}"><a href="#" title="${tabTitle}">${icon}<span class="title">${tabTitle}</span></a></li>` );

				// Add tab.
				$tabContainer = $( `<div id="metabox-tabs-tab-${index}" class="metabox-tabs-tab">` ).appendTo( $tabsContainer );
				$tabContents.appendTo( $tabContainer );

			});

			// Select first item.
			$metaboxTabContainers = $( '.metabox-tabs' );
			$metaboxTabContainers.each( function() {
				var $metaboxTabContainer = $( this );
				$metaboxTabContainer.find( '.metabox-tabs-nav li' ).first().attr( 'aria-selected', true );
				$metaboxTabContainer.find( '.metabox-tabs-tab' ).first().attr( 'aria-selected', true );
			});
		});
	}

	var setUpEventHandlers = function() {

		$metaboxTabContainers.on( 'click', '.metabox-tabs-nav a', function(e) {

			e.preventDefault();

			var $link             = $( this ),
				$activeNavItem    = $link.parent( 'li' ),
				$inactiveNavItems = $activeNavItem.siblings(),
				index             = $activeNavItem.attr( 'data-metabox-tab-index' ),
				$tabContainer     = $activeNavItem.closest( '.metabox-tabs' ),
				$activeTab        = $tabContainer.find( `#metabox-tabs-tab-${index}` ),
				$inactiveTabs     = $activeTab.siblings();

			// Deactivate tabs.
			$inactiveNavItems.attr( 'aria-selected', false );
			$inactiveTabs.attr( 'aria-selected', false );

			// Activate current tab.
			$activeNavItem.attr( 'aria-selected', true );
			$activeTab.attr( 'aria-selected', true );
		});
	}

	return {
		init: init,
	};

})( jQuery );

/**
 * Start the party.
 */
jQuery( document ).ready( function() {
	metaboxTabs.init();
});