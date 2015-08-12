angular.module('ac2rc')
.controller('navCtrl', function ($scope, $rootScope, $timeout, $state, $location) {
	
	$rootScope.screenSm = 740;
	$rootScope.isMobile = false;

	if($(window).width() <= $rootScope.screenSm){
		$('body').addClass('mobile');
		$rootScope.isMobile = true;
	}

	$(window).resize(function(){
	 	if($(window).width() <= $rootScope.screenSm){
			$('body').addClass('mobile');
			$rootScope.isMobile = true;
		} else {
			$('body').removeClass('mobile');	
			$rootScope.isMobile = false;
		}
	});
	
	$scope.sectionTitle = "";

	$scope.openMobileNav = function(){
		$('.mobile-header').toggleClass('open');
		$('#ac2rc-wrap').toggleClass('open-mobile-nav');
		$('body').toggleClass('no-scroll');	
	}

	$scope.showMobileSection = function(id){

		$('.section-ac2rc').fadeOut(250).css({'left': '100%', 'position' : 'absolute'});
		$('#'+id).delay(255).css({'left': 0, 'position' : 'relative'}).fadeIn(250);

		$('.mobile-header').removeClass('open');
		$('#ac2rc-wrap').removeClass('open-mobile-nav');
		$('body').removeClass('no-scroll');	
		$('.mobile-header-inside').removeClass('home');

		if(id == 'intro'){
			$('.desktop-nav').delay(255).fadeIn(250);	
		} else {
			$('.desktop-nav').hide();
		}

		$timeout(function(){
			switch(id){
				case "intro":
					$scope.sectionTitle = "";
					$('.mobile-header-inside').addClass('home');
				break;
				case "benefits":
					$scope.sectionTitle = "Transition Benefits";
				break;
				case "success":
					$scope.sectionTitle = "Soldier Stories";
				break;
				case "locations":
					$scope.sectionTitle = "Locations & Careers";
				break;
				case "stepGuide":
					$scope.sectionTitle = "How to transition";
				break;
			}	
		});

		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	$scope.showSection = function(stateName){
		if(!$rootScope.isMobile) {
			$('html, body').animate({
				scrollTop: $('#'+stateName).offset().top - 40
			}, 500);	
		} else {
			$timeout(function(){
				$scope.showMobileSection(stateName);
			});
		}

		$state.go('intro.'+stateName);	
	}

	var nav = $("#ac2rc-nav");
	var navHeight = nav.outerHeight();
	var eTop = nav.offset().top;
	var scrollHeight = $(document).height();

	$(window).scroll(function() {
		var curPos = $(this).scrollTop();
		var distToNav = eTop - curPos;
		var scrollPosition = $(this).height() + curPos;
	 	
	 	// Sticky nav
	 	if(distToNav <= 0 && !$rootScope.isMobile){
	 		nav.addClass('fixed');	
	 	} else {
	 		$("#ac2rc-nav.fixed").removeClass('fixed');	
	 	}

	 	// Change active state on scroll
		$('.section-ac2rc').each(function() {
			var top = $(this).offset().top - 250;
			var bottom = top + $(this).outerHeight();
			var stateId = $(this).attr('id');
			
			if (curPos >= top && curPos <= bottom) {
				nav.find('li').removeClass('active');
				$('.section-ac2rc').removeClass('active');

				$(this).addClass('active');
				nav.find('li[sectionId="' + stateId + '"]').addClass('active');
				
				if(!$rootScope.isMobile) {
					$state.go('intro.'+stateId);	
				}
			}
		});

		// Make last section active if scrolled to the very bottom
		if ((scrollHeight - scrollPosition) / scrollHeight < 0.015 && !$rootScope.isMobile) {
			nav.find('li').removeClass('active');
			$('.section-ac2rc').removeClass('active');

			$('#step-guide.section').addClass('active');
		    nav.find('li[sectionId="stepGuide"]').addClass('active');
		}
	});
	
	if ($state.current.name !== "intro") {
		var stateName = $state.current.name.split('.')[1];
		$scope.showSection(stateName);
	}
	
})