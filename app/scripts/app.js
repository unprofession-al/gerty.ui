'use strict';

angular.module('HTTPBasicAuth', []);

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
    'ngSanitize',
    'ngTouch',
    'ncy-angular-breadcrumb',
    'ui.router',
    'restangular',
    'HTTPBasicAuth'
  ])
  .config(['$urlRouterProvider', '$stateProvider',  function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('main');

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'MainCtrl',
        ncyBreadcrumb: { label: 'Main' }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        ncyBreadcrumb: { label: 'Login' }
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        ncyBreadcrumb: { label: 'Logout' }
      })
      .state('graph', {
        url: '/graph',
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl',
        ncyBreadcrumb: { label: 'Graph' }
      })
      .state('roles', {
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        ncyBreadcrumb: { label: 'Roles' }
      })
      .state('role', {
        url: '/role/:role',
        templateUrl: 'views/role.html',
        controller: 'RoleCtrl',
        ncyBreadcrumb: { label: 'Role' }
      })
      .state('nodes', {
        url: '/nodes',
        templateUrl: 'views/nodes.html',
        controller: 'NodesCtrl',
        ncyBreadcrumb: { label: 'Nodes' }
      })
      .state('node', {
        url: '/nodes/:node',
        templateUrl: 'views/node.html',
        controller: 'NodeCtrl',
        ncyBreadcrumb: { label: 'Node' }
      });
    }])
  .run(['Restangular', '$rootScope', '$location', '$cookieStore', '$http', function (Restangular, $rootScope, $location, $cookieStore, $http) {
    $rootScope.baseUrl = 'http://inventory.stxt.media.int:3030/api/v1';
    Restangular.setBaseUrl($rootScope.baseUrl);

    var authdata = $cookieStore.get('authdata');
    if (authdata) {
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
    } else {
      $location.path('/login');
    }

  }]);
