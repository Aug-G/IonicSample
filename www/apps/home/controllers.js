/**
 * Created by august on 15/8/20.
 */
'use strict';
angular.module('civil.home')
    .controller('AppCtrl', AppCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('HomeDetailCtrl',HomeDetailCtrl)
    .controller('LoginCtrl', LoginCtrl);

function AppCtrl($scope, $state, $ionicModal){
    $ionicModal.fromTemplateUrl('apps/home/templates/login.html', function(modal){
       $scope.loginModal = modal;
    },{
        scope:$scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.$on('$destroy', function(){
       $scope.loginModal.remove();
    });
}


function HomeCtrl($scope, HomeService){
    console.log('sdasd');
    $scope.getData = function(){
        HomeService.getUserInfo().then(function(data){
            $scope.data = data;
            console.log($scope.data);
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
    $scope.message = "";
    $scope.user = {
        username: null,
        password: null
    };

    $scope.login = function(){
        console.log("start login");
        Auth.login($scope.user);
    };


    $scope.$on('event:auth-loginRequired', function(e, rejection) {
        console.log('handling login required');
        $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
        $scope.user = null;
        $scope.loginModal.hide();
    });

    $scope.$on('event:auth-login-failed', function(e, status) {
        var error = e;
        $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function() {
        console.log("logout complete");
        $state.go('app.home', {}, {reload: true, inherit: false});
    });
}
