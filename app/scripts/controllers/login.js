'use strict';

angular
    .module('HTTPBasicAuth')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'Auth', function ($scope, $rootScope, $state, Auth) {
        Auth.clearCredentials();

        $scope.login = function() {
            $scope.dataLoading = true;
            Auth.login($scope.username, $scope.password, $rootScope.baseUrl + '/system/whoami')
                .success(function () {
                    Auth.setCredentials($scope.username, $scope.password);
                    $rootScope.message = { text: $scope.username + ' successfully logged in.' , success: true };
                    $state.go('main');
                })
                .error(function () {
                    $scope.password = '';
                    $rootScope.message = { text: 'Login failed.' , success: false };
                    $scope.dataLoading = false;
                });
        };
    }]);
