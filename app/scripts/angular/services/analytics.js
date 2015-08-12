angular.module('ac2rc')
.factory('analytics', function($log) { 
	
	var service = {};
	
	service.track = function(customLinkValue) {

		try {
	        s.tl(true,'o', locVar + '||'  + customLinkValue.split(" ").join("_"));
	      } catch (err) {
	      	$log.error('track: '+customLinkValue.split(" ").join("_"));
	        // working local, no s
	      }
	}           

	service.trackEvent = function(category, zip) {

		try {
			s.linkTrackVars="prop11,prop13";
        	s.linkTrackEvents="event19";

		    s.events = "event19";
        	s.prop13 = category.split(" ").join("_");
        	s.prop11 = zip;
        	s.eVar19 = "Locator_Search_Now_Button";
        	s.tl('true','o','search_now');
        	s.events = s.prop13 = s.prop11 = s.eVar19 = "";
		} catch (err) {
      		$log.error('track event: '+category+" "+zip); 
        	// working local, no s
      	}
	}  


	return service;
});