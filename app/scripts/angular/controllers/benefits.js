angular.module('ac2rc')
.controller('benefitsCtrl', function ($scope, benefitsData, $timeout, $rootScope) {
	$scope.benefitsData = benefitsData.getBenefitsData();
	$scope.benefitCopy = $scope.benefitsData[0].copy;
	var descriptionOpen = false;

	$scope.showBenefit = function($index, $event){
		var el = $event.target;
		var animTime = 0.3;
		var lastClass = $(el).attr('class').split(' ');
		var timeoutTime = 0;
		
		if($rootScope.isMobile){
			timeoutTime = 500;
		}

		setActiveState(el, lastClass[1]);

		$timeout(function(){
			var offsetTop = $(el).offset().top;

			if(!descriptionOpen){
				openDescription($index, offsetTop, animTime);	
			} else {
				changeDescription($index, offsetTop, animTime);	
			}

			$timeout(function(){
				animatePointer(el);
			}, 350);

		}, timeoutTime);
		
	}

	$scope.closeBenefit = function(){
		var animTime = 0.2;

		$('.benefits-icons .active').removeClass('active');
		$('.benefits-icons .inactive').removeClass('inactive');

		if($rootScope.isMobile){
			$('.benefits-icons .openMobile').removeClass('openMobile');
			$('.benefits-icons .fix-icon').removeClass('fix-icon');
		}

		TweenLite.to('.benefits-icons li',animTime, {opacity: 1});
		//TweenLite.to('.benefits-icons span.icon', animTime, {scale: 0.9});
		TweenLite.to('.benefits-expanded', animTime, {height: 0});
		TweenLite.to('.benefits-expanded p', animTime -0.1, {autoAlpha: 0});	
		TweenLite.to('.benefits-expanded .arrow-down',animTime, {opacity: 0, y: -40});
		TweenLite.to('.benefits-expanded .arrow-up', animTime, {opacity: 0, y: 40});
		TweenLite.to('.benefits-expanded .close', animTime, {opacity: 0});

		descriptionOpen = false;
	}

	function setActiveState(el, lastClass){
		$('.benefits-icons .active').removeClass('active');
		$('.benefits-icons li').addClass('inactive');
		$(el).parent().removeClass('inactive').addClass('active');
		if($rootScope.isMobile){
			$scope.closeBenefit();
			$('.benefits-icons .openMobile').removeClass('openMobile');
			$('.benefits-icons .fix-icon').removeClass('fix-icon');	
			$timeout(function(){
				//$scope.closeBenefit();
				
				$('.'+lastClass).parent().addClass('openMobile');	
				if(lastClass == 'row3'){
					$('li.bottom .row3').parent().addClass('fix-icon');
				}
			}, 300)
		}
	}

	function openDescription($index, offsetTop, animTime){
		$scope.benefitCopy = $scope.benefitsData[$index].copy;
		var height = 110;
		if ($index <=7 && $index >= 4) {
			height = 131;
		}
		if($rootScope.isMobile){
			$('.benefits-expanded').offset({top: offsetTop + 170});
			TweenLite.to('.benefits-expanded', animTime, {height: 'auto'});
		} else {
			TweenLite.to('.benefits-expanded', animTime, {height: height});
		}

		if(!$rootScope.isMobile){
			//TweenLite.to('.benefits-icons span.icon', animTime, {scale: 0.75});	
		}
		
		TweenLite.to('.benefits-expanded p', animTime, {autoAlpha: 1, delay: animTime});
		TweenLite.to('.benefits-expanded .close', animTime, {opacity: 1});	
		descriptionOpen = true;	
	}

	function changeDescription($index, offsetTop, animTime){

		var height = 110;
		if ($index <=7 && $index >= 4) {
			height = 131;
		}

		if($rootScope.isMobile){
			$('.benefits-expanded').offset({top: offsetTop + 170});
		}

		TweenLite.to('.benefits-expanded p', animTime, {autoAlpha: 0, onComplete: function(){
			TweenLite.to('.benefits-expanded p', animTime, {autoAlpha: 1});		
		}});
		TweenLite.to('.benefits-expanded', animTime, {height: height});
		$timeout(function(){
			$scope.benefitCopy = $scope.benefitsData[$index].copy;	
	    }, animTime*1000);
	}

	function animatePointer(el) {
		if($(el).parent().hasClass('top') || $rootScope.isMobile){
			var elPos = $(el).offset().left;
			if($rootScope.isMobile){
				elPos = elPos + 15;	
			}
			$('.benefits-expanded .arrow-up').offset({left: elPos});
			TweenLite.to('.benefits-expanded .arrow-down', 0.3, {opacity: 0, y: -40});
			TweenLite.fromTo('.benefits-expanded .arrow-up', 0.3, {opacity: 0, y: 40}, {opacity: 1, y:0});
		} else {
			var elPos = $(el).offset().left;
			$('.benefits-expanded .arrow-down').offset({left: elPos});
			TweenLite.to('.benefits-expanded .arrow-up', 0.3, {opacity: 0, y: 40});
			TweenLite.fromTo('.benefits-expanded .arrow-down', 0.3, {opacity: 0, y: -40}, {opacity: 1, y:0});
		}	
	}
})