/**
 * Created by august on 15/8/20.
 */
'use strict';
angular.module('civil.home')
    .controller('HomeCtrl', HomeCtrl)
    .controller('HomeDetailCtrl',HomeDetailCtrl);

function HomeCtrl($scope, HomeService){
    $scope.getData = function(){
        HomeService.getData().then(function(data){
            $scope.data = data;
        });
    };
    $scope.getData();
}

function HomeDetailCtrl($scope, $stateParams, HomeService){
    $scope.getData = function(){
        HomeService.getDetailData($stateParams.id).then(function(data){
            $scope.item = data;
        })
    };

    $scope.getData();
}
