angular.module('ac2rc')
.controller('introCtrl', function ($scope, $timeout, $rootScope) {

	$scope.scrollTimer = null;

	$(window).scroll(function() {
		clearTimeout($scope.scrollTimer);
		showCtaBar();

		$scope.scrollTimer = setTimeout(function() {
			hideCtaBar();
		}, 3000);
		
	});	
	
	$('#call-to-action').hover(function() {
		clearTimeout($scope.scrollTimer);
	}); 

	$('#call-to-action').click(function() {
		clearTimeout($scope.scrollTimer);
	});
 
	function showCtaBar() {
		if($('#ac2rc-nav').hasClass('fixed') && !$rootScope.isMobile){
		    TweenLite.to('#call-to-action', 0.5, {bottom: 0});
		}
	}

	function hideCtaBar() {
		TweenLite.to('#call-to-action', 0.9, {bottom: -140});
	}
})