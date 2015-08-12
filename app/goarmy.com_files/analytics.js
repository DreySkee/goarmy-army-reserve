/*  USER TRACKING ANALYTICS  */
var locVar = "";
var url = location.pathname;
var trackUrl = new Array();
trackUrl = url.split("/");                    
var truncSec = new Array();
for(i=1; i<trackUrl.length; i++) { 
                truncSec[i] = trackUrl[i].substr(0,5)
                if (truncSec[i].indexOf('.') != -1) {
                    truncSec[i] = truncSec[i].substring(0,truncSec[i].indexOf('.'))
                }                       
}
locVar = truncSec.join('+').replace(/\+/,"");
//  Flash Location Variable
var flashLocVar = locVar.replace(/\+/g,"%2D") + "||videoplayer_starts";


var vidPlayer;
var curvid = "";
var curvidshort = "xxxxxx";
var playerName = "";
var tracked = 0;

function initPlayerTracking(thePlayer, thePlayerName) {
    vidPlayer = thePlayer;
    playerName = thePlayerName;
}

function initTrackVideo(theVidId) {
    curvid = theVidId;
    tracked = 0;
}

var doProgress = function() {
    
//  if ((parseInt((this.video.currentTime / this.video.duration) * 100) >= 1) && time == 0) { tracklink(videoname + '-video_start_player'); time++ }
//    if ((parseInt(this.video.currentTime) >= 10) && time == 1) { tracklink(videoname + '-10_seconds'); time++ }
    
     var perc = Math.round( 100 * (vidPlayer.currentTime()/vidPlayer.duration()) );
    
     if (curvid.length >= 6)  {
         curvidshort = curvid.substring(curvid.length-6, curvid.length);     
     }
    
    if (perc >= 1 && tracked == 0 ) {
        vidPlayer.removeEvent("timeupdate", doProgress);
        s.linkTrackVars="prop6,eVar13,events,eVar5,prop2";
        s.linkTrackEvents="event9";
        s.events = "event9";
        s.prop6 = locVar+"||" + curvidshort +"+vp_start";
        s.eVar13 = curvid;
        s.tl('true','o',playerName);
        s.events = s.prop6 = s.eVar13 = "";
        tracked++;
        setTimeout( function() {vidPlayer.addEvent("timeupdate", doProgress);} , 3000);
    } else if (perc >= 25 && tracked == 1) {
        vidPlayer.removeEvent("timeupdate", doProgress);
        s.linkTrackVars="prop7,eVar13,events,eVar5,prop2";
        s.linkTrackEvents="event15";
        s.events = "event15";
        s.prop7 = locVar+"||" + curvidshort +"+vp_25";
        s.eVar13 = curvid;
        s.tl('true','o',playerName);
        s.events = s.eVar13 = "";
        tracked++;
        setTimeout( function() {vidPlayer.addEvent("timeupdate", doProgress);} , 3000);
    } else if (perc >= 50 && tracked == 2) {
        vidPlayer.removeEvent("timeupdate", doProgress);
        s.linkTrackVars="prop8,eVar13,events,eVar5,prop2";
        s.linkTrackEvents="event16";
        s.events = "event16";
        s.prop8 = locVar+"||" + curvidshort +"+vp_50";
        s.eVar13 = curvid;
        s.tl('true','o',playerName);
        s.events = s.eVar13 = "";
        tracked++;
        setTimeout( function() {vidPlayer.addEvent("timeupdate", doProgress);} , 3000);
    } else if (perc >= 75 && tracked == 3) {
        vidPlayer.removeEvent("timeupdate", doProgress);
        s.linkTrackVars="prop9,eVar13,events,eVar5,prop2";
        s.linkTrackEvents="event17";
        s.events = "event17";
        s.prop9 = locVar+"||" + curvidshort +"+vp_75";
        s.eVar13 = curvid;
        s.tl('true','o',playerName);
        s.events = s.eVar13 = "";
        tracked++;
        setTimeout( function() {vidPlayer.addEvent("timeupdate", doProgress);} , 3000);
    } else if (perc >= 100 && tracked == 4) {
        vidPlayer.removeEvent("timeupdate", doProgress);
        s.linkTrackVars="prop10,eVar13,events,eVar5,prop2";
        s.linkTrackEvents="event10";
        s.events = "event10";
        s.prop10 = locVar+"||" + curvidshort +"+vp_comp";
        s.eVar13 = curvid;
        s.tl('true','o',playerName);
        s.events = s.eVar13 = "";
        //tracked++;
        tracked = 0;
        setTimeout( function() {vidPlayer.addEvent("timeupdate", doProgress);} , 3000);
   }
    
    

      
    };

    function myCallbackFunction (event,service)
    {
     
        var customLinkValue = "shareButton_"+service;
        s.linkTrackVars="eVar13,eVar12,eVar5,prop2";
        s.eVar13 = curvid;
        s.eVar12 = customLinkValue;
        s.tl('true','o',playerName);

        //alert("service called is:"+service+" video is "+curvid); //the service shared by user. e.g. facebook
    }

jQuery(document).ready(function(){
        if(jQuery.fn.jquery !== '1.4.3') {
            var newerJQuery = jQuery.noConflict( true );
        }
        
        jQuery('a').live('click', function(){
            if (jQuery(this).hasClass('no-track')) {return false;} 
        
            var trackLink = jQuery(this).attr('href') + '?' + locVar;
            var linkCode = jQuery(this).attr('name');
            var linkText = jQuery(this).text();
            linkText = jQuery.trim(linkText);
            if (linkText.length == 0) {             
                //jQuery(this).children('img').attr('alt'); 
                linkText = jQuery(this).children('[title]').attr('title');
            }
            
                    
            linkText = (linkText!=null?
                    linkText.replace(/ /g,'+').replace(/&/g,'and').replace(/[^a-zA-Z 0-9:\.\/_-]/g,'_').replace(/__/g,'').toLowerCase():
                        "noLinkText"); 
            
            
            
             if (linkCode) {
                 linkCode = linkCode.replace(/ /g,'_').replace(/&/g,'and').replace(/[^a-zA-Z 0-9:\.\/+_-]/g,'_').replace(/__/g,'').toLowerCase();
                 linkText = linkText+'+'+linkCode;
             }
             
             // only first 100 chars
             linkText = linkText.substr(0, 100)
             
             var linkHref = jQuery(this).attr('href');
             var customLinkValue = locVar + '||' +  linkText;
             var customLinkValueTn = customLinkValue + '+tn';
             var customLinkValueLn = customLinkValue + '+ln';
             var customLinkValueAtn = customLinkValue + '+atn';
             var customLinkValueBn = customLinkValue + '+bn';
             var customLinkValueFoot = customLinkValue + '+footer';
             
                     
             
             if (jQuery(this).closest('div#left_nav').attr('id')=='left_nav'){
                 s.tl(this,'o',customLinkValueLn);
                 //alert(customLinkValueLn);
             }
             else if (jQuery(this).closest('div#ucm').attr('id') == 'ucm' ||
                     jQuery(this).closest('div#ucmSmall').attr('id') == 'ucmSmall'){
                 s.tl(this,'o',customLinkValueAtn);
                 //alert(customLinkValueRn);
             }
             else if (jQuery(this).closest('div#menu').attr('id') == 'menu' || 
                     jQuery(this).closest('div#menuSmall').attr('id') == 'menuSmall'){
                 s.tl(this,'o',customLinkValueTn);
                 //alert(customLinkValueTn);
             }  
             else if (jQuery(this).closest('div#footer').attr('id') == 'footer'){
                 s.tl(this,'o',customLinkValueFoot);
                 //alert(customLinkValueTn);
             }  
             else if (jQuery(this).closest('div#bottom_nav').attr('id') == 'bottom_nav'){
                 s.tl(this,'o',customLinkValueBn);
                 //alert(customLinkValueTn);
             }  
             
             else if(linkHref.match(/#.*/)){
                 s.tl(true,'o',customLinkValue);
                 //alert(customLinkValue);
                 if (linkHref == '#') {
                     return false;
                 }
                 
             }
             else{
                 s.tl(this,'o',customLinkValue);
                 //alert(customLinkValue);
             }
            return true;
        });

        jQuery('#globalSearch').live('submit', function(){
            var customLinkValueSearch = locVar + "||" + "globalsearch";
            s.tl(true,'o',customLinkValueSearch);
            //alert(customLinkValueSearch);         
        }); 
        
        jQuery('#ArmyJobsExplorer').live('submit', function(){
            s.tl(true,'o',locVar + "||submit_myi");
        }); 
        
        // tracking for image maps
        jQuery('area').live('click', function() {
            var areaName = jQuery(this).attr("name");
            var trackVal = areaName.replace(/ /g,'_').replace(/&/g,'and').replace(/[^a-zA-Z 0-9:\.\/+_-]/g,'_').replace(/__/g,'').toLowerCase();
            var customLinkValue = locVar + '||' +  trackVal;
            s.tl(this, 'o', customLinkValue);
        });
        
       
        
});
        
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-39617427-1', 'goarmy.com');
ga('require', 'displayfeatures');
ga('send', 'pageview');
        /*  END USER TRACKING ANALYTICS  */