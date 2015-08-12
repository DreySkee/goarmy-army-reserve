//  jquery scripts
//jQuery.noConflict(); // stops conflicts with prototype and other scripts that use '$'
var tabs = null;  // sets tabs variable
jQuery(document).ready(function () {
        jQuery(this).topNav();
        imgRlOvr();
        searchTxt();
        var url = location.pathname;
        if (url.indexOf("noFlash")=="-1"){
        jQuery('#mainTranscripts').css('display','none');
        }
        // Gathers images and calls preloader
        var imgLoad = new Array();
        jQuery("img[src$='i.png'],img[src$=i.gif],img[src$=i.jpg]").each(function(i){
            imgLoad[i] = jQuery(this).attr('src').replace(/i.png/,'o.png').replace(/i.gif/,'o.gif').replace(/i.jpg/,'o.jpg');
                 jQuery.preLoadImages(imgLoad[i]);
        });

        /*  SPF showtext   */
        jQuery('div.showtext').click(function(event){
            jQuery(this).next('div.showntext').css('visibility','visible');
            jQuery(this).find('span').css('cursor','default');
        });     
});



function changeImg(imgID,path) {
    var tempimg=document.getElementById(imgID);
    tempimg.src=path;
}

/* Sgt Star Question function */
function LaunchSgtStar(lpoint, question) {
    NITAgent.ShowAgent(lpoint, question);
}
;
jQuery(document).ready(function(){      
            jQuery('a').click(function(){
                if(jQuery(this).attr('href')=="/ask-sgt-star.html"||jQuery(this).attr('href')=="/content/goarmy/ask-sgt-star.html"
                        ||jQuery(this).attr('href')=="/goarmy/ask-sgt-star.html"){
                    var question = jQuery(this).text();
                    NITAgent.ShowAgent(null, question);
                    return false;
                }       
            });
});
/* End Sgt Star Question function */



//
function searchTxt(){
var searchValue = "Site Search";
jQuery(document).ready(function(){
jQuery("#siteSearch").val(searchValue);
jQuery("#siteSearch").focus(
      function(){if(jQuery(this).val() == searchValue)jQuery(this).val('')});
jQuery("#siteSearch").blur(    
      function(){if(jQuery(this).val() == ''){jQuery(this).val(searchValue);}});
});
jQuery("#globalSearch").submit(
      function(){if(jQuery("#siteSearch").val() == '' || jQuery("#siteSearch").val() == searchValue){jQuery("#siteSearch").focus(); return false;}
});
}

//  Change image on Rollover 'i.gif' & 'o.gif'     
function imgRlOvr(){
jQuery('.imgBtn').hover(
        function(){
            var mysrc = new Array();
            jQuery(this).find('img').each(function(i){
                mysrc[i] = jQuery(this).attr('src');
                if(mysrc[i].indexOf('pixel') >= 0){jQuery(this).iunfixpng()}
                jQuery(this).attr('src', function() {return this.src.replace(/i.gif/,'o.gif').replace(/i.png/,'o.png').replace(/i.jpg/,'o.jpg');});
                if(mysrc[i].indexOf('pixel') >= 0){jQuery(this).ifixpng()}
            });
                                 },
        function(){
            var mysrc = new Array();
            jQuery(this).find('img').each(function(i){
                mysrc[i] = jQuery(this).attr('src');
                if(mysrc[i].indexOf('pixel') >= 0){jQuery(this).iunfixpng()}
                jQuery(this).attr('src', function() {return this.src.replace(/o.gif/,'i.gif').replace(/o.png/,'i.png').replace(/o.jpg/,'i.jpg');});
                if(mysrc[i].indexOf('pixel') >= 0){jQuery(this).ifixpng()}
            });
                                 });
jQuery('.imgBtn').hover(
        function(){
            var mysrc = (jQuery(this).attr('src'));
            if(mysrc.indexOf('pixel') >= 0){jQuery(this).iunfixpng()}
            jQuery(this).attr('src', function() {return this.src.replace(/i.gif/,'o.gif').replace(/i.png/,'o.png').replace(/i.jpg/,'o.jpg');});
            if(mysrc.indexOf('pixel') >= 0){jQuery(this).ifixpng()}
                                    },
        function(){
            var mysrc = (jQuery(this).attr('src'));
            if(mysrc.indexOf('pixel') >= 0){jQuery(this).iunfixpng()}
            jQuery(this).attr('src', function() {return this.src.replace(/o.gif/,'i.gif').replace(/o.png/,'i.png').replace(/o.jpg/,'i.jpg');});
            if(mysrc.indexOf('pixel') >= 0){jQuery(this).ifixpng()}
                                    });
}


/*  Set IOM code   */
function initIom(sbc,iom) {
    var currIom=getCookie('iom')||''
    if (currIom=='' && iom!=undefined && iom!='null') {
        setCookie('sbc', sbc, null, '/');
        setCookie('iom', iom, null, '/');
    }
}
/*  function for PreLoading Images  */
(function ($){
    var cache = [];
    $.preLoadImages = function(){
        var args_len = arguments.length;
        for (var i = args_len;i--;){
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }
})(jQuery)

/*  Open Augmented Reality Game */
function openRaceForStrength(){window.open('/home/augmented-reality-game-race-for-strength/game.html','raceForStrength','width=800,height=600');}


//FLICKR SLIDESHOW

var currentFlickr = 0;
var ssTime;

function flickrSlides(divNum) {
        var slideShowNext = jQuery(".flickrthumb:eq(" + divNum + ")").attr("name");
        var slideTitleNext = jQuery(".flickrthumb:eq(" + divNum + ")").children("img").attr("name").replace("'","\\'");
        jQuery(".bigImg").fadeOut(2000);
        jQuery(".bigTitle").fadeOut(2000);
        setTimeout("jQuery('.bigImg').attr('src', '"+slideShowNext+"')", 2000);
        setTimeout("jQuery('.bigTitle').text('"+slideTitleNext+"')", 2000);
        jQuery(".bigImg").fadeIn(2000);
        jQuery(".bigTitle").fadeIn(2000);
        currentFlickr = divNum;
        var next = divNum + 1;
        ssTime = setTimeout("slideDelay("+next+")", 8000);
}

function slideDelay(starter) {
    clearTimeout(ssTime);
    var i = starter;
    if (i < (jQuery(".flickrthumb").length)){
        flickrSlides(i);
    }
    else if (i >= (jQuery(".flickrthumb").length)){
        i = 0;
        clearTimeout(ssTime);
        flickrSlides(i);
    }
}

function locationGet() {
    for(var j = 0; j <= jQuery(".flickrthumb").length; j++){
        if(jQuery(".flickrthumb:eq(" + j + ")").hasClass("current")){
            currentFlickr = j;
            jQuery(".flickrthumb:eq(" + j + ")").removeClass("current");
        }
    }
    setTimeout("slideDelay("+(currentFlickr+1)+")", 4000);
}

function preLoadFlickr() {
    var p = 0;
    var q = 0;
    for(p; p < jQuery(".flickrthumb").length; p++){
        var flickr_load = jQuery(".flickrthumb:eq(" + p + ")").attr("name");
        jQuery(".flickrFeed #flickr_preload").append("<img src='" + flickr_load + "' />");
    }
    for(q; q < jQuery(".flickrFeed #flickr_preload img").length; q++){
        if(jQuery(".flickrFeed #flickr_preload img:eq(" + q + ")").height() > 175){
            jQuery(".flickrthumb:eq(" + q + ")").remove();
            jQuery(".flickrFeed #flickr_preload img:eq(" + q + ")").remove();
            q = q-2;
        }
    }
}

function showSelected() {
    var selected = jQuery("#contact-interest option:selected");
    if (selected.val() == 'R' || jQuery("#contact-interest").length == 0) {
        showROTC();
    } else {
        showNormal();
    }
}

function showNormal() {
    jQuery("#zip-code").show();
    jQuery("#state-list").hide();
}

function showROTC() {
    jQuery("#zip-code").hide();
    jQuery("#state-list").show();
}

function submitJAG() {
	var patt = /^\d{5}$/;
	var zipCode = jQuery("#zip-code").val();
    if (!patt.test(zipCode)) {
        jQuery('#search-form-errors').html("Please enter a valid zip code.");
        return;
    }
    window.open ('https://www.jagcnet.army.mil/sites/jaro.nsf/homeContent.xsp?open&documentId=046ADFADDF259A4485257B2D0059BC37','fsowindow','location=false,status=1,scrollbars=1,width=625,height=600');
}

function submitContactUs(rectype) {
    
    var zipCode = jQuery("#zip-code").val();
    var state = jQuery("#contact-location option:selected").val();
    
    // validate zip here
    if (rectype != 'R') {
        var patt = /^\d{5}$/;
        if (!patt.test(zipCode)) {
            jQuery('#search-form-errors').html("Please enter a valid zip code.");
            return;
        }
        
    } else {
        // validate state for ROTC
        zipCode = "nozip";
        
        if (state == 'NA') {
            jQuery('#search-form-errors').html("Please select a state.");
            return;
        } 
    }   
    
    var selectorStr = rectype + "-R"; // active duty only
    selectorStr = selectorStr + "-" + state + "-" + zipCode;
    
    this.location.href = "/locate-a-recruiter."+ selectorStr + ".result.html";
}

jQuery(document).ready(function () {

    var speed = 10;
    var dist = 2;
    jQuery.fn.commScroller = function(height){
        jQuery(this).addClass('scrollParent');
        jQuery('.scrollArea',this).height(height);
        jQuery('.scrollArea h4').css('display','none');
        var timerId;
        var scrollPrev = jQuery('.comScrollControls .prev',this);
        var scrollNext = jQuery('.comScrollControls .next',this);
        scrollNext.fadeIn(400);
        scrollNext.hover(function(){
            var nextBtn = jQuery(this);
                var scrollBox = jQuery(this).parents('.scrollParent').find('.scrollArea');
                var top = scrollBox.scrollTop();
                var height = scrollBox.children('div').height();
                jQuery(this).siblings().fadeIn(400);
                timerId = setInterval(function(){scrollBox.scrollTop(top+=dist);
                            if(top>=(height-scrollBox.height())){nextBtn.fadeOut(400);}},speed); 
            },function(){clearInterval(timerId);});
        scrollPrev.hover(function(){
            var prevBtn = jQuery(this);
                var scrollBox = jQuery(this).parents('.scrollParent').find('.scrollArea');
                var top = scrollBox.scrollTop();
                var height = scrollBox.children('div').height();
                jQuery(this).siblings().fadeIn(400);
                timerId = setInterval(function(){scrollBox.scrollTop(top-=dist);
                    if(parseInt(top)<=0){prevBtn.fadeOut(400);}},speed); 
            },function(){clearInterval(timerId);});};

    if(jQuery('.box').has('.scrollTrue')) {
        jQuery('.scrollTrue .comTab').commScroller(362);
        jQuery('.scrollTrue .comContainer').commScroller(410);
    }

    if(jQuery(".flickrFeed #slide_show").length) {
        if(jQuery('.box').has('.flickrFeed')) {
            jQuery('.more_flickr').commScroller(130);
        }

        ssTime=setTimeout("slideDelay(1)", 8000);
    
        jQuery(".ssPause").click(function () {
            clearTimeout(ssTime);
            jQuery(this).css("display", "none");
            jQuery(".ssPlay").css("display", "inline");
            return false
        });
    
        jQuery(".ssPlay").click(function () {
            locationGet();
            jQuery(this).css("display", "none");
            jQuery(".ssPause").css("display", "inline");
            return false;
        });
    
        jQuery(".ssPrev").click(function () {
            clearTimeout(ssTime);
            jQuery(".ssPause").css("display", "none");
            jQuery(".ssPlay").css("display", "inline");
            if (currentFlickr>0){
                currentFlickr--;
                var slideShowNext = jQuery(".flickrthumb:eq(" + currentFlickr + ")").attr("name");
                var slideTitleNext = jQuery(".flickrthumb:eq(" + currentFlickr + ")").children("img").attr("name");
                jQuery('.bigImg').attr('src', slideShowNext);
                jQuery('.bigTitle').text(slideTitleNext);
            }
            return false;
        });
    
        jQuery(".ssNext").click(function () {
            clearTimeout(ssTime);
            jQuery(".ssPause").css("display", "none");
            jQuery(".ssPlay").css("display", "inline");
            if (currentFlickr < (jQuery(".flickrthumb").length-1)){
                currentFlickr++;
                var slideShowNext = jQuery(".flickrthumb:eq(" + currentFlickr + ")").attr("name");
                var slideTitleNext = jQuery(".flickrthumb:eq(" + currentFlickr + ")").children("img").attr("name");
                jQuery('.bigImg').attr('src', slideShowNext);
                jQuery('.bigTitle').text(slideTitleNext);
            }
            return false;
        });
    
        jQuery(".ssInfo").click(function () {
            jQuery(".bigTitle").toggle(400);
            return false
        });
    
        jQuery(".flickrthumb").each(function () {
            jQuery(this).bind('click', function () {
                clearTimeout(ssTime);
                var newBigImg = jQuery(this).attr("name");
                var newBigTitle = jQuery(this).children("img").attr("name").replace("'","\\'");
                jQuery(this).addClass("current");
                for(var p = 0; p <= jQuery(".flickrthumb").length; p++){
                    if(jQuery(".flickrthumb:eq(" + p + ")").hasClass("current")){
                        currentFlickr = p;
                    }
                }
                jQuery(this).removeClass("current");
                jQuery(".bigImg").fadeOut(2000);
                jQuery(".bigTitle").fadeOut(2000);
                setTimeout("jQuery('.bigImg').attr('src', '"+newBigImg+"')", 2000);
                setTimeout("jQuery('.bigTitle').text('"+newBigTitle+"')", 2000);
                jQuery(".bigImg").fadeIn(2000);
                jQuery(".bigTitle").fadeIn(2000);
                jQuery(".ssPause").css("display", "none");
                jQuery(".ssPlay").css("display", "inline");
                return false;
            });
        });
        preLoadFlickr();
        setTimeout("preLoadFlickr()", 7000);
    }
    
    
    
    if( jQuery('.jquery-selectbox').is(':visible') ) {
    	try {
        jQuery("#contact-interest").selectbox();
        jQuery("#contact-location").selectbox();
        jQuery("#video-category").selectbox();
        
         jQuery(".item-0").hide();
            jQuery(".jquery-selectbox").css("width", "120px");
            jQuery(".jquery-selectbox .jquery-selectbox-list").css("width", "100%");
            jQuery(".jquery-selectbox .jquery-selectbox-currentItem").css("padding", "1px 0 0 3px;");
            
        } catch (err) {console.log(err);}
    } 
    
    jQuery("#contact-interest").change(function(){
        showSelected();
        jQuery(".search-error").text('');
    });
    jQuery("#contact").submit(function() {
        jQuery(".search-error").text('');
        var selected;
        
        if (jQuery("#contact-interest").length > 0) {
        	selected = jQuery("#contact-interest option:selected").val();
        } else {
        	selected = 'R';
        }
        
        if (selected == '') {
            jQuery('.search-error').html("Please select an area of interest.");
        } else if (selected == "J") {
            submitJAG();
        } else {
            submitContactUs(selected);
        }
        return false;
    }); 
    
    if (jQuery("#contact-interest").length > 0) {
    showSelected();
    }
    
    
    jQuery('ul.tab-header').each(function(){
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var active, content, links = jQuery(this).find('a');
    
        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        active = links[0];
        jQuery(active).addClass('active');
      
        var tabId = jQuery(active).attr('href'); // get ID of active tab
        
        jQuery(tabId + ' li, '+ tabId ).addClass('visible-touts'); 
        jQuery('li.visible-touts, '+ tabId).css('z-index', '10'); // show active touts 
        
        jQuery(active).parent().parent().addClass('active');
        //content = jQuery(active).attr('href');
    

       
        jQuery(this).find('a').click(function(e){
        	
        	if(jQuery(this).hasClass('active')){
        		e.preventDefault();
        	} else {
        		// Make the old tab inactive.
                jQuery(active).parent().parent().removeClass('active');
                 jQuery(active).removeClass('active');
                 	
                 // Update the variables with the new link and content
                 active = jQuery(this);
                 tabId = jQuery(this).attr('href');
                
                 jQuery('.spfreflist li, .spf-tab').css('z-index', '5'); // hide non-active touts behind
                 jQuery('.visible-touts').css('z-index', '6'); // make sure that current touts stay on top
                 
                 // Make the tab active.
                 jQuery(active).addClass('active');
                 jQuery(active).parent().parent().addClass('active').css("opacity", "0").animate({opacity:'1'}, 500);                 
                 jQuery(active).parent().parent().addClass('active');
                 
                 jQuery(tabId).css('z-index', '10'); // Show tout container
                 
                 // Loop through new selected touts and place them on top of current touts
                 jQuery(tabId + ' li').hide().css('z-index', '10').each(function(index) {
                 	jQuery(this).delay(200*index).fadeIn(500);
                 });
                 
                 jQuery('.visible-touts').removeClass('visible-touts');		  
                 jQuery(tabId + ' li, '+ tabId).addClass('visible-touts');	  
                
                 // Prevent the anchor's default click action
                 e.preventDefault();
        	}
            
        });
       
    });
    
    // video category dropdown
    jQuery("#video-category").change(function() {
    	var selected = jQuery("#video-category option:selected").val();
    	if (selected != 'Jump to ...') {
    		var url = "/army-videos.cat-"+selected+".html";
    		document.location = url;
    	}
    });
    
    try {

    	jQuery.fn.formLabels('#zip-code');

    	} catch (err) {

    	}
    	
    	jQuery("ul.marqButtons a").hover(function(){
        	jQuery(this).find("img.hover-marq").fadeIn(250);
         }, function(){
        	 jQuery(this).find("img.hover-marq").fadeOut(250);  	    
         });
    	
	   // Crossbrowser fadeIn - fadeOut hover effect for SGT star button
	   jQuery(".sgt-star-button").find("span").hide().end().hover(function() {
	        jQuery(this).find("span").stop(true, true).fadeIn(200);
	    }, function() {
	        jQuery(this).find("span").stop(true, true).fadeOut(200);
	    });
}); //end of document ready