/*global jsyaml */

'use strict';

/**
 * @ngdoc function
 * @name gertyuiApp.controller:NodeCtrl
 * @description
 * # NodeCtrl
 * Controller of the gertyuiApp
 */
angular.module('gertyuiApp')
.controller('NodeCtrl', [
    '$scope',
    'Restangular',
    '$state',
    '$stateParams',
    function ($scope, Restangular, $state, $stateParams) {
        $scope.name = $stateParams.node;
        $scope.yamlVars = {};
        var baseNode = Restangular.one('nodes/',  $scope.name);
        $scope.reloadScope = function() {
            baseNode.get().then(function(node) {
                $scope.node = node;
            }, function errorCallback() {
                console.log('Failed to fetch node from server');
            });

            var vars = Restangular.service('vars', baseNode);
            vars.getList().then(function(nodeVars) {
                $scope.nodeVars = nodeVars;

                for (var i = 0; i < $scope.nodeVars.length; i++) {
                    var varKey = $scope.nodeVars[i].key;
                    $scope.yamlVars[varKey] = jsyaml.safeDump($scope.nodeVars[i].value);
                }

            }, function errorCallback() {
                console.log('Failed to fetch node vars from server');
            });
        };



        $scope.reloadScope();
    }]);
