
function loadVideo(videoPlayerId, vidUrl, vidId, vidTitle) {
	var myPlayer = _V_(videoPlayerId);
	myPlayer.removeEvent("timeupdate", doProgress);
	
	// change class in fullscreen mode
	myPlayer.addEvent('fullscreenchange', switchFullScreenClass);
	
	// play video goes here!
	if (!myPlayer.paused()) {
		 myPlayer.pause();
		 
	}
	
	var srcType = "video/flv";
	if (vidUrl.indexOf(".mp4") != -1) {
		srcType = "video/mp4";
	}
	
	myPlayer.src([
                  { type: srcType, src: vidUrl},
    ]);

	initTrackVideo(vidId);
	myPlayer.addEvent("timeupdate", doProgress);
		
}

function loadFirstVideo(playerId) {
	var uniquePlayerId = playerId.substring(13);
	
	 // set up first video
    var firstUrl = jQuery('#related-'+uniquePlayerId+' a:first').children("img").attr("name");
    var firstVideoID = jQuery('#related-'+uniquePlayerId+' a:first').children("span").text();
    var firstTitle = jQuery('#related-'+uniquePlayerId+' a:first').children(".tab_vid_desc").attr("name");
    loadVideo(playerId, firstUrl, firstVideoID, firstTitle);
}

function fadeInIcons() {
	jQuery(".video-icons").removeClass("vjs-fade-out");
	jQuery(".video-icons").addClass("vjs-fade-in");
}

function fadeOutIcons() {
	jQuery(".video-icons").removeClass("vjs-fade-in");
	jQuery(".video-icons").addClass("vjs-fade-out");
}

//change class in fullscreen mode
var switchFullScreenClass = function(e) {
    if (this.isFullScreen) {
    	jQuery('#'+this.id).addClass('fullscreen');
    	jQuery('.topnav').css({'z-index':-1}); // IE fix
    }
    else {
    	jQuery('#'+this.id).removeClass('fullscreen');
    	jQuery('.topnav').css({'z-index':100}); // IE fix
    }
}

jQuery(document).ready(function () {
    
// HEADER TABS
    
    jQuery("#heroNav a").each(function () {
        if(jQuery(this).text().length >= 18){
            jQuery(this).css("padding", "5px 15px 15px");
            jQuery(this).css("width", "95px"); 
        }
        jQuery(this).bind('click', function () {
        	
        	var selected = jQuery("#heroNav a.on");	
        	var selectedTabId = selected.attr("id");
            // if leaving the videos page, force reset swf player so the videos stop playing on IE
            
            	if (selected.hasClass('video')) {
        		//console.log('video tab');
        		
        		var playerId = jQuery('#content .'+selectedTabId+' .header-video-player').attr('id');
        		var myPlayer = _V_(playerId);
        		
        		if (!myPlayer.paused()) {
        			myPlayer.currentTime(0);
        			myPlayer.pause();
            	}
            }
            	
            
            
            
            // give selected tab and content off state
            selected.removeClass("on");
            selected.addClass("off");
            selected.css("background", "url('/static/images/header_tabbed/header_tab_bg.jpg') repeat-x");
            jQuery("div." + selectedTabId).removeClass("on2");
            jQuery("div." + selectedTabId).addClass("off");
            
            // give new tab and content on state
           
            var newTabId = jQuery(this).attr("id");
            
            if (jQuery(this).hasClass('video')) {
            	var playerId = jQuery('#content .'+newTabId+' .header-video-player').attr('id');
            	loadFirstVideo(playerId);
            	
            	jQuery(".video-js.vjs-default-skin.vjs-playing").removeClass("vjs-playing").addClass("vjs-paused");  
      		  	jQuery(".vjs-big-play-button").css("display","block");
      		  	
            }
            
            jQuery(this).addClass("on");
            jQuery(this).removeClass("off");
            jQuery(this).css("background", "url('/static/images/header_tabbed/header_tab_bg_active.jpg') repeat-x");
            jQuery("div." + newTabId).removeClass("off");
            jQuery("div." + newTabId).addClass("on2");
            return false;
         });
    });
	
    jQuery(".related_videos a").click(function () {
        var newTitle = jQuery(this).children(".tab_vid_desc").attr("name");
        jQuery(this).closest(".headervideo").find(".video_title").text(newTitle);
        var newUrl = jQuery(this).children("img").attr("name");
        var videoID = jQuery(this).children("span").text();
        var videoPlayerId = jQuery(this).attr("name");
       
        loadVideo(videoPlayerId, newUrl, videoID, newTitle);
        _V_(videoPlayerId).play();
        return false;
    });
    
    jQuery(".vid-thumbs-horiz a").click(function() {
    	var newUrl = jQuery(this).children("img").attr("name");
        var videoID = jQuery(this).children("span").text();
        
        var vidExt = newUrl.split('.');
		vidExt = vidExt[vidExt.length-1]
        
        var playerHtml = '<div class="video-close-btn"></div><video id="' + videoID + '" class="video-js vjs-timeline-skin"' +
		'controls preload="auto" autoplay  width="560" height="320">' +			       
         '<source src="' + newUrl + '" type="video/' + vidExt + '" /></video>';
		
		jQuery('#header-video-overlay').fadeIn();
		jQuery('#header-video-overlay #popup-video').html(playerHtml);

		try {
			_V_(videoID);	// Initialize videoJs
		} catch (err) {
			console.log(err);
		}

		// Firefox and IE fix
		_V_(videoID).ready(function(){
	       /* this.onEnded(function(){		            
	            setTimeout(function(){$('.vjs-loading-spinner').css({'display':'none'});}, 75);
	        });*/
	    });
        
        //console.log('play '+videoID+' url '+newUrl);
    });
    
    jQuery('.video-close-btn').live("click", function(){

 		
 		var vidId = jQuery('#header-video-overlay .video-js').attr('id');
 		var player = _V_(vidId); 
 		// Destroy video player
		player.destroy();
		jQuery('#popup-video').html('');
		jQuery('#header-video-overlay').fadeOut(); 
 	});
    
	// videoJs player volume control
	jQuery(".vjs-mute-control").live({
       mouseenter: function() {
		   jQuery('.vjs-volume-control').stop('true','true').fadeIn();
	   }
	});    	
	jQuery(".vjs-volume-control").live({
		mouseleave: function() {    		
	       jQuery(this).stop('true','true').fadeOut();
	   }
	}); 
	
	jQuery('.header-video-player').each(function() {
		
		var playerId = jQuery(this).attr("id");
		var uniquePlayerId = playerId.substring(13);

		// setup video player
		// determine if any of the videos is flv format ... to change techOrder param
		var flashPlayer = false;
		jQuery('#related-'+uniquePlayerId+' a').each(function() {
			var url = jQuery(this).children("img").attr("name");
			if (url.indexOf(".flv") != -1 || url.indexOf(".f4v") != -1) {
				flashPlayer = true;
			}
		});
		
		console.log('using flash player '+flashPlayer);
		console.log('player id '+playerId);
		console.log('unque player id '+uniquePlayerId);
		var myPlayer;
		
		if (flashPlayer) {
			myPlayer = _V_(playerId, {
				  techOrder: ["flash"]
			});
		} else {
			myPlayer = _V_(playerId);
		}
		
		
		 // set up first video
	    loadFirstVideo(playerId);
	    
		initPlayerTracking(myPlayer, 'subpageVideoPlayer');
		
		myPlayer.ready(function(){
			   jQuery('#'+playerId).append('<div class="video-icons"><span class="header-vid-share" id="'+uniquePlayerId+'-share" ></span></div>');
			   
			   //st_url="http://www.goarmy.com'+window.location.pathname+'" st_image="http://offload.goarmy.com/content/dam/goarmy/logo/army_logo.gif"
				   
			   stWidget.addEntry({
			        "service":"sharethis",
			        "element":document.getElementById(uniquePlayerId+'-share'),
			        "url":'http://www.goarmy.com'+window.location.pathname,
			        "title":document.title,
			        "type":"chicklet",
			        "text":"Share this video" ,
			        "onhover":"false",
			        "image":"http://offload.goarmy.com/content/dam/goarmy/logo/army_logo.gif",
			        "summary":document.title
			    });
			   
		myPlayer.addEvent("mouseover", fadeInIcons);
		myPlayer.addEvent("mouseout", fadeOutIcons);
	    
			  });
		
	    
    jQuery('.headervideo').each(function () {
    	
    	numVids = jQuery(this).find(".relatedScroll").children("a").length;
    	if (numVids > 4) {
            jQuery(this).find(".related").commScroller(206);
    	}
    	
    });
	    
	    
	}); 
    
    
    
    jQuery('.job').vidInfoPop();
    
    // Left Nav for active pages to display open
    jQuery('#left_nav li').each(function(){
        if(jQuery(this).hasClass('down-arrow')){
                
            jQuery(this).find('ul').not('li.arrow ul').css("display", "block");
            jQuery('.subactive').removeClass('arrow').addClass('down-arrow');
        } else if(jQuery(this).hasClass('arrow')){ 
                           BindLeftNavMouseEvents(jQuery(this));
                     }
              
    });
    
    jQuery('.events .tti .vertical p:last').css('border-bottom', 'none');
    
	if (jQuery(".jquery-selectbox").length > 0) {

	    jQuery(".jquery-selectbox").selectbox();
	    

	    if( jQuery('.jquery-selectbox').is(':visible') ) {
	        jQuery(".item-0").hide();
	        jQuery(".jquery-selectbox .jquery-selectbox-list").css("width", "100%");
	        jQuery(".jquery-selectbox .jquery-selectbox-currentItem").css("padding", "1px 0 0 3px;");
	        jQuery(".jquery-selectbox .jquery-selectbox-moreButton, .jquery-selectbox.jobs .jquery-selectbox-currentItem").click(function () {
	        var count = jQuery(".jquery-selectbox .jquery-selectbox-list span").length;
	        for(var i = 0; i < (count + 1); i++){
	        if (jQuery(".jquery-selectbox option:selected").val() == jQuery(".jquery-selectbox .jquery-selectbox-list span:eq("+i+")").text()) {
	            jQuery(".jquery-selectbox .jquery-selectbox-list span:eq("+i+")").hide();
	            jQuery(".jquery-selectbox .jquery-selectbox-list span:lt("+i+")").show();
	            jQuery(".jquery-selectbox .jquery-selectbox-list span:gt("+i+")").show();
	        }
	        }
	    });
	    }
	        }
	    
	        
    // Get the height of the highest <li> element 
    var maxHeight = Math.max.apply(null, jQuery("ul.job-results li").map(function (){return jQuery(this).height();}).get());
    // Make all <li> elements flush with each other
    jQuery("ul.job-results li").height(maxHeight);
    // Make the height fixed to avoid jumping on rollover 
    jQuery(".jobsfeatured ").height(maxHeight + 80);
	
	
	    
	    //Hide jobs category links div - for search engine crawler to find links that are in select dropdowns
	    jQuery(".hidden-jobcategory-links").hide();
    
}); //end of document ready

 //mouse event slide function for LEFT NAV

function BindLeftNavMouseEvents(Element){
    jQuery(Element).bind('mouseenter',function(){
        jQuery(this).removeClass('arrow').addClass('down-arrow');
         navslide = setTimeout("jQuery('#left ul.one li.down-arrow ul.two').slideDown(400)", 600);
         navslide = setTimeout("jQuery('#left ul.two li.down-arrow ul.three').slideDown(400)", 600);
    });

    jQuery(Element).bind('mouseleave', function(){
        jQuery(this).removeClass("down-arrow").addClass("arrow");
        jQuery(Element).children('ul.two, ul.three').slideUp("slow");
        clearTimeout(navslide);
    });    
}



//vid info hover
(function($){
    $.fn.vidInfoPop = function(){
        this.hover(function(){
            var vidInfo = $('.career-info',this);
            var vidImg = $('img',this);
            var jobTitle = $('h4.job-title',this); 
            var jobThumbHeight = $('img',this).outerHeight(true);
            
            $(this).css({'z-index':'5'});
            jobTitle.hide();
            vidImg.stop(true, true).animate({'margin-top': '-40px'}, 200, 'linear');
            vidInfo.css({'left':'-10px', 'top':'-50px', 'padding-top':jobThumbHeight + 10}).stop(true, true).fadeIn(350);
            
        },
        function(){
        	var vidInfo = $('.career-info',this);
        	var vidImg = $('img',this);
        	var jobTitle = $('h4.job-title',this); 
        	
        	vidInfo.stop(true, true).fadeOut(200);
        	jobTitle.show();
        	vidImg.stop(true, true).animate({'margin-top': '0'}, 200, 'linear');
        	$(this).css({'z-index':'1'});
          // if($.browser.msie)$(this).css('position','static');
        }
);  
    }
})(jQuery);

       