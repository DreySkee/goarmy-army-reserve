angular.module('ac2rc')
.controller('successCtrl', function ($scope, ac2rcData, $timeout, baseUrl, $rootScope, analytics) {
	var soldierIndex = 0;

	$scope.successData = ac2rcData.getSuccessData();
	
	// adjust avatar image url
	$scope.successData.forEach(function(soldier) {
		soldier.avatarImg = baseUrl + soldier.avatarImg;
	})


	$scope.soldierInfo = $scope.successData[soldierIndex];

	$scope.visible = true;
	TweenLite.set('.circle-faces', {scale: 0.8});

	$scope.showSoldier = function($index, $event){
		var el = $event.target;
		
		$('.circle-faces').addClass('disableClick');
		$('.circle-faces.active').removeClass('active');
		$('.circle-faces img.active').removeClass('active'); // IE9
		$(el).addClass('active');

		soldierIndex = $index;
		changeBg(soldierIndex);
		changeCopy(soldierIndex);	
	}

	$scope.swipeAction = function(direction){
		
		if(direction == "left" && (soldierIndex < $scope.successData.length-1)){
			soldierIndex++;
			changeBg(soldierIndex);
			changeCopy(soldierIndex);	
		} else if(direction == "right" && (soldierIndex > 0)){
			soldierIndex--;
			changeBg(soldierIndex);
			changeCopy(soldierIndex);	
		}

		if(soldierIndex < $scope.successData.length-1 && soldierIndex > 0){
			$('.mobile-avatar-wrap .arrow').fadeIn();
		}

		analytics.track($scope.successData[soldierIndex].name+"_testimonial");

		if(soldierIndex == $scope.successData.length-1){
			$('.mobile-avatar-wrap .arrow.right').fadeOut();
		} else if(soldierIndex == 0){
			$('.mobile-avatar-wrap .arrow.left').fadeOut();
		}

		$('.circle-faces.active').removeClass('active');
		$('ul.soldier-nav li:nth-child('+(soldierIndex+1)+')').addClass('active');
	}

	// Test for IE
	function isIE() {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	var ieTest = isIE();


	function changeCopy(index){
		TweenLite.to('.soldier-info', 0.5, {autoAlpha: 0});
		TweenLite.to('.mobile-avatar', 0.5, {alpha: 0});

		$timeout(function(){
			$scope.soldierInfo = $scope.successData[index];
			TweenLite.to('.soldier-info', 0.1, {autoAlpha: 1});
			showCopy();
	    }, 500);
	}

	function showCopy(){
		if(!$rootScope.isMobile){
			TweenLite.fromTo('.heading-section', 0.3, {height: 0, top: 27}, {height: 60, top: 0});
			TweenLite.fromTo(['.heading-section h2', '.heading-section h3'], 0.5, {alpha: 0}, {alpha: 1,  delay: 0.3, onComplete: function(){
				$('.circle-faces.disableClick').removeClass('disableClick');
			}});
			TweenLite.fromTo('.soldier-info p', 0.5, {alpha: 0}, {alpha: 1, delay: 0.7});
		} else {
			TweenLite.fromTo('.mobile-avatar', 0.3, {alpha: 0}, {alpha: 1});
			TweenLite.fromTo('.heading-section', 0.3, {alpha: 0}, {alpha: 1});
			TweenLite.fromTo(['.heading-section h2', '.heading-section h3'], 0.5, {alpha: 0}, {alpha: 1, onComplete: function(){
				$('.circle-faces.disableClick').removeClass('disableClick');
			}});
			TweenLite.fromTo('.soldier-info p', 0.5, {alpha: 0}, {alpha: 1});
		}
	}

	function changeBg(index){
		var newBg = $('<div class="scalable-bg next">');
		newBg.insertAfter('.scalable-bg');
		
		if(!$rootScope.isMobile){
			newBg.css({backgroundImage: 'url('+baseUrl+$scope.successData[index].bgImg+')'});
		} else {
			newBg.css({backgroundImage: 'url('+baseUrl+$scope.successData[index].mobileBgImg+')'});
		}
		

		TweenLite.to(newBg, 0.5, {autoAlpha: 1, onComplete:function(){
			newBg.prev('.scalable-bg').remove();
		}});  
		if(!$rootScope.isMobile && (ieTest != 9)){
			TweenLite.to(newBg, 10, {scale: 1.1});		
		}
	}
})