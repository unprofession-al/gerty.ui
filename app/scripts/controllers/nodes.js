'use strict';

/**
 * @ngdoc function
 * @name gertyuiApp.controller:NodesCtrl
 * @description
 * # NodesCtrl
 * Controller of the gertyuiApp
 */
angular.module('gertyuiApp')
.controller('NodesCtrl', [
    '$scope',
    'Restangular',
    function ($scope, Restangular) {
        var baseNodes = Restangular.all('nodes');
        $scope.reloadScope = function() {
            baseNodes.getList().then(function(nodes) {
                $scope.nodes = nodes;
            }, function errorCallback() {
                console.log('Failed to fetch nodes from server');
            });
        };

        $scope.search = function (row) {
            return (angular.lowercase(row.name).indexOf($scope.query || '') !== -1 || angular.lowercase(row.description).indexOf($scope.query || '') !== -1 || angular.lowercase(row.cidr).indexOf($scope.query || '') !== -1 || angular.lowercase(row.dc).indexOf($scope.query || '') !== -1 || angular.lowercase(row.vlan.id).indexOf($scope.query || '') !== -1);
        };

        $scope.reloadScope();
    }]);
