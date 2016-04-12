'use strict';

/**
 * @ngdoc overview
 * @name gertyuiApp
 * @description
 * # gertyuiApp
 *
 * Main module of the application.
 */
angular
  .module('gertyuiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/nodes', {
        templateUrl: 'views/nodes.html',
        controller: 'NodesCtrl',
        controllerAs: 'nodes'
      })
      .when('/graph', {
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl',
        controllerAs: 'graph'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
