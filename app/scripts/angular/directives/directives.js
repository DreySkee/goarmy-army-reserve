angular.module('ac2rc')
.filter('unsafe', function($sce) { return $sce.trustAsHtml; }) 
.directive('backImg', function($rootScope, baseUrl){
    //this uses the attribute 'back-img' like ng-src on inline images
    //they'll load when ready
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            var url = value;
            if (url.indexOf(baseUrl) < 0) url = baseUrl + value;
            element.css({
                'background-image': 'url('+ url +')'
            }); 
            $(window).resize(function(){
                if(!$rootScope.isMobile){
                var url = value;
                if (url.indexOf(baseUrl) < 0) url = baseUrl + value;
                     element.css({
                        'background-image': 'url('+ url +')'
                    });
                }
            });
        });
    }; 
})
.directive('backImgMobile', function($rootScope, baseUrl){
    return function(scope, element, attrs){
        attrs.$observe('backImgMobile', function(value) {
            if($rootScope.isMobile){
                var url = value;
                if (url.indexOf(baseUrl) < 0) url = baseUrl + value;
                 element.css({
                    'background-image': 'url(' + url +')'
                });
            }
            $(window).resize(function(){
                 if($rootScope.isMobile){
                    var url = value;
                    if (url.indexOf(baseUrl) < 0) url = baseUrl + value;
                     element.css({
                        'background-image': 'url(' + url +')'
                    });
                }
            });
        });
    };
})
.directive('uiFadeToggle', function(){
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.uiFadeToggle, function(val, oldVal) {
                if(val === oldVal) return; // Skip inital call
                var elClass = "."+element[0].className;


                if(val){
                    
                    
                    $(elClass).fadeIn(1000);
                    $('.scalable-bg').addClass('active');
                } else {
                    
                    $(elClass).fadeOut(1000);   
                }
            });
        }
    }
}); 