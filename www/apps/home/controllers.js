/**
 * Created by august on 15/8/20.
 */
'use strict';
angular.module('civil.home')
    .controller('HomeCtrl', HomeCtrl)
    .controller('HomeDetailCtrl',HomeDetailCtrl)
    .controller('LoginCtrl', LoginCtrl);

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

LoginCtrl.$inject = ['$scope', 'Auth', '$state'];
function LoginCtrl($scope, Auth, $state){
    $scope.data = {};
    $scope.login = function(){
        Auth.login($scope.data).then(function(message){
            if (!Auth.isAuthenticated()) {
                alert(message);
            }else{
               $state.go('tab.home');
            }
         });

    }
}
