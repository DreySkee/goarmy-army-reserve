angular.module('ac2rc')
.controller('locationsCtrl', function($scope, distance, GeoCoder, $timeout, baseUrl, $rootScope, analytics) {
	$scope.mapInit = {center: '41.850033, -87.6500523', zoom: '4'}
	$scope.hasresults = true;
	$scope.imgpath = baseUrl;

	// This is to make sure map is loaded before hiding it's container on mobile
  	if($rootScope.isMobile){
  		if(window.innerHeight > 400){
  			$('#locations .map-wrapper map').height(window.innerHeight - 60);
  		} else {
  			$('#locations .map-wrapper map').height(400);
  		}
  	}


	var markerIcon = baseUrl+ '/images/locations/marker.png';

	$scope.careerCategories = [
		{name: 'Aviation'},
		{name: 'Chaplain'},
		{name: 'Chemical'},
		{name: 'Civil Affairs'},
		{name: 'Drill Sergeant'},
		{name: 'Combat Arms'},
		{name: 'Engineers'},
		{name: 'Information Operations'},
		{name: 'JAG (Legal)'},
		{name: 'Logistics'},
		{name: 'Medical'},
		{name: 'Military Information Support Operations'},
		{name: 'Military Intelligence'},
		{name: 'Military Police'},
		{name: 'Postal Personnel and Finance'},
		{name: 'Public Affairs'},
		{name: 'Signal'},
	];
	
	$scope.$on('mapInitialized', function(event, map) {

	  jQuery.getJSON(baseUrl+'/data/tpu.geojson', function(data) {
	  	map.data.addGeoJson(data);
	  });


	  google.maps.event.trigger(map, "resize");

      $scope.infoWindow = map.infoWindows[1];
      $scope.infoWindow.setOptions({
      		pixelOffset: new google.maps.Size(0, -30),
      		disableAutoPan: true 
      });

      $scope.mapClicked = function(event) {

      	$scope.address = event.feature.getProperty("Address");
      	$scope.city = event.feature.getProperty("City");
      	$scope.state = event.feature.getProperty("State");
      	$scope.zip = event.feature.getProperty("Zip");

      	var position = event.feature.getGeometry().get();
      	$scope.infoWindow.setPosition(position);

      	// adjust position of pan according to window width
      	var lngAdjust = 0;
      	if (window.innerWidth < 1400 && window.innerWidth > 1000) {
      		lngAdjust = 0.3;
      	}

	if (window.innerWidth < 1000 && window.innerWidth > 640) {
      		lngAdjust = 0.7;
      	}

      	
      	$scope.map.panTo({lat: position.lat()+.5, lng: position.lng()-lngAdjust}); 
      	$scope.infoWindow.open($scope.map); 


      	var trackValue = $scope.address+'|'+$scope.city+'|'+$scope.state;
      	analytics.track(trackValue);

      };

      $scope.map.data.setStyle(function(feature) {
      	var isVisible = feature.getProperty("isVisible");
      	if (typeof isVisible === 'undefined') isVisible = false;

      	return {
      		visible: isVisible,
      		//visible: true,
      		icon: markerIcon 
      	};
      }) 
    });

	$scope.openSearch = function() {
        $scope.infoWindow.close();

        if($rootScope.isMobile){
            TweenLite.set('.search-message', {autoAlpha: 1}, 0.5);
            TweenLite.to('.search-message', .5, {left: -110});
            TweenLite.to('.search-window', .5, {left: "5%"});
        }
	}

    
	$scope.filter = function(search) {
        $scope.infoWindow.close(); 


		// total hacky way to do it!!!
		$scope.formsubmitted = true;
		$scope.categorymissing = false;
 
		

		if ($scope.isMobile) {
			$scope.selectedCategory = jQuery('.ac2rc-select option:selected').text();
		} else {
			$scope.selectedCategory = jQuery('span.jquery-selectbox-currentItem').text();
		}
		
		if ($scope.selectedCategory == 'All Careers' || $scope.searchForm.zip.$error.required || $scope.searchForm.zip.$invalid) {
			if ($scope.selectedCategory == 'All Careers') { $scope.categorymissing = true;}
			return;
		}

		analytics.trackEvent($scope.selectedCategory, search.zip);
  
		GeoCoder.geocode({address: search.zip}).then(function(result) {

			var bounds = $scope.map.getBounds();
			var radius = 300; //distance.calcDistance(bounds.getCenter().lat(), bounds.getCenter().lng(), bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
			$scope.calculatedRadius = radius;


			var location = result[0]['geometry']['location'];
			var closestLocation;

			$scope.closestPost = 9999;
			$scope.hasresults = false;

			$scope.location = location;

			$scope.map.data.forEach(function(feature) {
			    var category = feature.getProperty('Category;');
			    var howFar = distance.calcDistance(location.lat(), location.lng(), feature.getGeometry().get().lat(), feature.getGeometry().get().lng());
 				if (howFar < $scope.closestPost) {
 					$scope.closestPost = howFar;
 					closestLocation = feature.getGeometry().get();
 				}

			    var show = howFar <= radius && category.indexOf($scope.selectedCategory) >= 0;
			    $scope.hasresults = $scope.hasresults || show;

			    feature.setProperty('isVisible', show);			    
			});    

			
			$scope.map.setZoom(8);
			location.lat(location.lat()+5);
			$scope.map.panTo(location);


			if($rootScope.isMobile && $scope.hasresults){
				TweenLite.set('.search-message', {autoAlpha: 1});
				TweenLite.to('.search-message', .5, {left: 0});
				TweenLite.to('.search-window', .5, {left: "100%"});
			}
		}); 
	}

	// init selectBox only on desktop
	if(!$rootScope.isMobile) {
		$timeout(function(){
			selectBoxInit();	
		});	
	}

	function selectBoxInit() {
		if ($(".jquery-selectbox").length > 0) {
		    $(".jquery-selectbox").selectbox();
		}
	}

	// Change dummie select box text on select option change
	$( "select.ac2rc-select" )
	  .change(function () {
	    var str = "";
	    $( "select option:selected" ).each(function() {
	      str += $( this ).text() + " ";
	    });
	    $( ".dummie-dd span" ).text( str );
	  })
	  .change();
});  