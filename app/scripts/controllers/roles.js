'use strict';

/**
 * @ngdoc function
 * @name gertyuiApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the gertyuiApp
 */
angular.module('gertyuiApp')
.controller('RolesCtrl', [
    '$scope',
    'Restangular',
    function ($scope, Restangular) {
        var baseRoles = Restangular.all('roles/');
        $scope.reloadScope = function() {
            baseRoles.getList().then(function(roles) {
                $scope.roles = roles;
            }, function errorCallback() {
                console.log('Failed to fetch roles from server');
            });
        };

        $scope.search = function (row) {
            return (angular.lowercase(row.name).indexOf($scope.query || '') !== -1 || angular.lowercase(row.description).indexOf($scope.query || '') !== -1 || angular.lowercase(row.cidr).indexOf($scope.query || '') !== -1 || angular.lowercase(row.dc).indexOf($scope.query || '') !== -1 || angular.lowercase(row.vlan.id).indexOf($scope.query || '') !== -1);
        };

        $scope.reloadScope();
    }]);
