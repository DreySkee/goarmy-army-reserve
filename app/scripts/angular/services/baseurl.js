'use strict';

/**
 * @ngdoc service
 * @name lifeExperienceApp.baseUrl
 * @description
 * # baseUrl
 * Constant in the lifeExperienceApp.
 */
angular.module('ac2rc')
  .constant('baseUrl', (function(){
    if(window.location.port == 3000) {
      return '';
    }
    return '/content/dam/goarmy/marquee_experience/ac2rc';
  })());