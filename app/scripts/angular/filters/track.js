angular.module('ac2rc')
.filter('track', function(analytics) {
    return function(entry, value) {

        analytics.track(value);
        return; 
    }
})
.filter('strack', function(analytics, $log) {
    return function(entry, myscope, value) {

        analytics.track(myscope.stepTitle+value);
        return; 
    } 
}); 