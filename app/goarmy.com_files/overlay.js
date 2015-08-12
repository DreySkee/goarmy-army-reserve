jQuery(document).ready(function(){
	/*  Bookmark Modal */		
	if(getCookie('iPlanetDirectoryPro') != null) {
			jQuery('.accountBased').css('display','block');
		}
		jQuery('<div id="bookmarkOverlay" />').appendTo('body');
	    jQuery('a#sharePage').click(function(){
	    	jQuery('#bookmarkOverlay').css({'opacity':0.75,'background-color':'#ffffff'}).fadeIn(750);
	        jQuery('#AddBookmark').fadeIn(750).hAlign().vAlign();
	    	jQuery('select').addClass('hiddenSelect');
	    	jQuery('html').css('overflow','hidden');
	        return false;
	    });
	    jQuery('a.popup_closebox,div#bookmarkOverlay').click(function(){
	        jQuery('#AddBookmark,#bookmarkOverlay').fadeOut(750,
						        		function(){jQuery('select').removeClass('hiddenSelect');
								    			jQuery('html').css('overflow','auto');
								    		});
	        return false;
	    });
		/*  End Bookmark Modal */
		/*  Share This Page Modal */
	    jQuery('a#shareThisPage').click(function(){
	    	jQuery('#bookmarkOverlay').css({'opacity':0.75,'background-color':'#000000'}).fadeIn(750);
	        jQuery('#sharePageDivID').fadeIn(750).hAlign().vAlign();
	    	jQuery('select').addClass('hiddenSelect');
	    	jQuery('html').css('overflow','hidden');
	        return false;
	    });
	    jQuery('a.closeShareBtn,div#bookmarkOverlay').click(function(){
	        jQuery('#sharePageDivID,#bookmarkOverlay').fadeOut(750,
	        								function(){jQuery('select').removeClass('hiddenSelect');
												    	jQuery('html').css('overflow','auto');
												    });
	        return false;
	    });
		/*  End Share This Page Modal */
});

(function (jQuery) {
jQuery.fn.vAlign = function() {
	var st = jQuery(window).scrollTop();
	return this.each(function(i){
	var oh = jQuery(this).outerHeight();
	var mt = oh / 2 + st;	
	var mtop = jQuery(this).css("margin-top");	
	jQuery(this).css("position", "absolute");	
	jQuery(this).css("top", mt + "px");
	});	
};
})(jQuery);
(function (v) {
jQuery.fn.hAlign = function() {
	return this.each(function(i){
	var w = jQuery(this).width();
	var ow = jQuery(this).outerWidth();	
	var ml = ow / 2;	
	jQuery(this).css("margin-left", "-" + ml + "px");
	jQuery(this).css("left", "50%");
	jQuery(this).css("position", "absolute");
	});
};
})(jQuery);

