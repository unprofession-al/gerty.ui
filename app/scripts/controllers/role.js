/*global jsyaml */

'use strict';

/**
 * @ngdoc function
 * @name gertyuiApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the gertyuiApp
 */
angular.module('gertyuiApp')
.controller('RoleCtrl', [
    '$scope',
    'Restangular',
    '$state',
    '$stateParams',
    function ($scope, Restangular, $state, $stateParams) {
        $scope.name = $stateParams.role;
        $scope.yamlVars = {};
        var baseRole = Restangular.one('roles/',  $scope.name);
        $scope.reloadScope = function() {
            baseRole.get().then(function(role) {
                $scope.role = role;

                for (var i = 0; i < $scope.role.vars.length; i++) {
                    var bucketName = $scope.role.vars[i].name;
                    $scope.yamlVars[bucketName] = jsyaml.safeDump($scope.role.vars[i].vars);
                }
            }, function errorCallback() {
                console.log('Failed to fetch role from server');
            });

        };



        $scope.reloadScope();
    }]);
