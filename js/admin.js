/**
 * NerdWallet Content Series public JS.
 */

var tabsJson = {
	'postbox-container-1': {
		location: 'bottom',
		metaboxes: [
			{
				id: 'categorydiv',
				icon: 'admin-generic'
			},
			{
				id: 'tagsdiv-post_tag',
				icon: 'dashboard'
			},
			{
				id: 'postimagediv',
				icon: 'share'
			},
			{
				id: 'archiver_post',
				icon: 'share'
			}
		],
	},
	'postbox-container-2': {
		location: 'top',
		metaboxes: [
			{
				id: 'authordiv',
				icon: 'admin-generic'
			},
			{
				id: 'revisionsdiv',
				icon: 'dashboard'
			},
			{
				id: 'wpseo_meta',
				icon: 'share'
			}
		]
	}
}

var metaboxTabs = ( function( $ ) {

	var init = function() {
		initializeMetaboxTabs( tabsJson );
	}

	var initializeMetaboxTabs = function( tabsJson ) {

		$.each( tabsJson, function( postboxId, atts ) {
			var $postbox          = $( `#${postboxId}` );
				$tabsContainer    = $( '<div class="metabox-tabs postbox">' ),
				$tabsNavContainer = $( '<ul>' ).prependTo( $tabsContainer );

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

				// Force index to start at 1.
				index = index + 1;
				metabox.icon = metabox.icon || 'admin-general';

				var $metabox    = $( `#${metabox.id}` ),
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
				$tabsNavContainer.append( `<li><a href="#tabs-${index}">${icon}<span class="title">${tabTitle}</span></a></li>` );

				// Add tab.
				$tabContainer = $( `<div id="tabs-${index}">` ).appendTo( $tabsContainer );
				$tabContents.appendTo( $tabContainer );
			});

		});

		$( '.metabox-tabs' ).tabs();

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