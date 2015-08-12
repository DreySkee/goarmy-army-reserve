
///  Related Videos 
(function($){
    $.fn.relatedVid = function(forward){
        this.bind('click',function(){
            var displayVid = jQuery(this).attr('href').replace("#","");
            jQuery('.vidInfo').css('display','none');
            jQuery('#vid-'+displayVid).css('display','block');
            if (forward) {
            	jQuery('#vid-'+displayVid).next('.vidInfo').css('display', 'block');
            } else {
            	jQuery('#vid-'+displayVid).prev('.vidInfo').css('display', 'block');
            }
            
            
            return true;
        });
    };
})(jQuery);
function vidRelatedVidsAjax(vidId){
    jQuery('#related_videos').css({'display':'none'});
    jQuery('#related_videos').load("/army-videos.videoreporelatedinfo.vid-"+vidId +".html #RelArmyVids",
            function() {
              jQuery(this).fadeIn(250);
    });
}
///  End Related Videos 


