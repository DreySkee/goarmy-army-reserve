angular.module('ac2rc')
.controller('stepGuideCtrl', function ($scope, stepsData, $timeout, $state, $rootScope, $log) {

	$scope.$state = $state;
	$scope.test = 'Amity';

	var fill_rotation = 180;
	var fix_rotation = fill_rotation*2;
	var animTime = 0.1;
	var clickedIndex = 0;
	var stepNavTl = new TimelineMax({paused: true});

	$scope.initStepNav = function(state){
		
		resetTimeLine();

		clickedIndex = 0;

		switch(state){
			case 'intro.stepNav1': 
				$scope.stepsDataAll = stepsData.getStepsData1();
				$scope.stepTitle = "ETS & Retirement";
				break;
			case 'intro.stepNav2':
				$scope.stepsDataAll = stepsData.getStepsData2();
				$scope.stepTitle = "Enlisted Separation";
				break;
			case 'intro.stepNav3':
				$scope.stepsDataAll = stepsData.getStepsData3();
				$scope.stepTitle = "Officer Separation";
				break;
		}
		$scope.stepsDataCopy = $scope.stepsDataAll[0];

		TweenLite.to('.steps-intro', 0.5, {autoAlpha: 0});
		TweenLite.set('.steps-intro', {position: 'absolute', delay: 0.5});
		TweenLite.to('.steps-wrap', 0.5, {autoAlpha: 1, delay: 0.5});
		TweenLite.set('.steps-wrap', {position: 'relative', delay: 0.5});

		$timeout(function(){
			
			$(".step:not(.first) .radial-progress").each(function(i){
				
				var circle = $(this);
				var line = 	circle.prev('.line').find('.progress');
				var circleFill = circle.find('.fill:not(.fix)');
				var circleMask = circle.find('.mask.full');
				var circleFillMix = circle.find('.fill.fix');
				var circleNumber = circle.next('p');
				stepNavTl.to(line, animTime/2, {width: "100%"})
					.to(circle, animTime, {rotation: "-="+fill_rotation}, "fillCircle-"+i+"")
					.to([circleFill, circleMask], animTime, {rotation: fill_rotation}, "fillCircle-"+i+"")
					.to(circleFillMix, animTime, {rotation: fix_rotation}, "fillCircle-"+i+"")
					.to(circleNumber, animTime, {color: "rgb(255,213,48)"}, "fillCircle-"+i+"")
					.set(circleFillMix, {rotation: fix_rotation}, "stopPoint-"+i+"");
			});	

			startingAnim();
		}, 500);	
	}

	$scope.goToClickedStep = function($event){
		var el = $event.target;
		var parentEl = $(el).prev('.radial-progress'); // Getting .radial-progress
		//console.log(parentEl);
		if(parentEl.hasClass('active')){
			return false;
		}

		clickedIndex = parseInt(parentEl.attr('data-index'));
		animateCircleToDefault();
		animateCopyChange(clickedIndex);
		
		if(!$rootScope.isMobile){
			stepNavTl.tweenTo("stopPoint-"+(clickedIndex-1)+"", {onComplete: animateCircleToActive, onCompleteParams:[parentEl]});
		} else {
			stepNavTl.timeScale(10);
			stepNavTl.tweenTo("stopPoint-"+(clickedIndex-1)+"", {onComplete: animateCircleToActive, onCompleteParams:[parentEl]});
		}
	}

	$scope.goToStep = function(direction){

		if(direction == "next"  && clickedIndex < 7){
			animateCircleToDefault();
			var circle = $('.radial-progress[data-index="'+(clickedIndex+1)+'"]');
			animateCopyChange(clickedIndex+1);
			stepNavTl.tweenTo("stopPoint-"+(clickedIndex)+"", {onComplete: animateCircleToActive, onCompleteParams:[circle]});
			clickedIndex++;
		} else if(direction == "prev" && clickedIndex > 0) {
			animateCircleToDefault();
			var circle = $('.radial-progress[data-index="'+(clickedIndex-1)+'"]');
			animateCopyChange(clickedIndex-1);
			stepNavTl.tweenTo("stopPoint-"+(clickedIndex-2)+"", {onComplete: animateCircleToActive, onCompleteParams:[circle]});
			clickedIndex--;
		}
	}

	$scope.goBack = function(){
		TweenLite.to('.steps-wrap', 0.5, {autoAlpha: 0});
		TweenLite.set('.steps-wrap', {position: 'absolute', delay: 0.5});
		TweenLite.to('.steps-intro', 0.5, {autoAlpha: 1, delay: 0.5});
		TweenLite.set('.steps-intro', {position: 'relative', delay: 0.5});
	}

	function animateCircleToDefault(){
		var activeIndex = $('.step .radial-progress.active').attr('data-index');
			
		if(activeIndex > clickedIndex) {
			animateToDefaultAnim('forward'); 
		} else {
			animateToDefaultAnim('back'); 	
		}
		$('.radial-progress.active').removeClass('active');
		$('.step.active').removeClass('active');
	}

	function animateCopyChange(index){
		var animTime = 0.5;
		TweenLite.to('.step-copy-inside', animTime, {alpha: 0});
		$timeout(function(){
			$scope.stepsDataCopy = $scope.stepsDataAll[index];
		}, animTime*1000);	
		TweenLite.to('.step-copy-inside',animTime, {alpha: 1, delay: animTime});	
	}

	function animateCircleToActive(el) {
		var index = parseInt(el.attr('data-index')) + 1;
		el.addClass('active');
		el.parent().addClass('active');

		var innerCircle = el.find('.inner-circle');
		var inset = el.find('.inset');
		var circle = el.find('.circle');
		var mask = el.find('.mask');
		var fill = el.find('.fill');
		var number = el.next('p');

		TweenLite.set(number, {color: "rgb(250,250,250)", fontSize: 20})
		TweenLite.to(innerCircle, animTime/2, {scale: 0});	
		TweenLite.to(el, animTime, {scale: 1.3, zIndex: 10, ease: Back.easeOut});	
	}

	function animateToDefaultAnim(direction){
		var mainCircle = $('.radial-progress.active');
		var innerCircle = $('.radial-progress.active').find('.inner-circle');
		var inset = $('.radial-progress.active').find('.inset');
		var number = $('.radial-progress.active').next('p');

		TweenLite.to(innerCircle, animTime/2, {scale: 1})
		if(direction == "back"){
			TweenLite.set(number, {color: "rgb(255,213,48)", fontSize: 18});
		} else {
			TweenLite.set(number, {color: "rgb(198,197,196)", fontSize: 18});	
		}
		TweenLite.to(mainCircle, animTime, {scale: 1, zIndex: 1, ease: Bounce.easeOut});
	}	

	function startingAnim(){
		var arrowWidth = 400;
		if(window.innerWidth < 780){
			arrowWidth = 325;
		}

		if(!$rootScope.isMobile){
			TweenLite.fromTo('.step-nav', 0.5, {alpha: 0}, {alpha: 1});
			TweenLite.fromTo('.step-nav .arrow', 0.6, {width: arrowWidth}, {width: 30, delay: 0.2});
			TweenLite.fromTo('.step-copy-inside', 1, {alpha: 0}, {alpha: 1, delay: 0.2});
		} else {
			TweenLite.set('.step-nav', {alpha: 1});
			TweenLite.set('.step-nav .arrow', {width: 30});
			TweenLite.set('.step-copy-inside', {alpha: 1});	
		}	
	}

	function resetTimeLine(){
		stepNavTl.progress(0);
		stepNavTl.remove();
		var number = $('.step:not(.first) .radial-progress').next('p');
		animateCircleToDefault();
		TweenLite.set(number, {color: "rgb(198,197,196)", fontSize: 18});
		stepNavTl = new TimelineMax({paused: true});	

		animateCircleToActive($('.step.first .radial-progress'));
	}
})