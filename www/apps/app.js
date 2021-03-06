angular.module('civil', ['ionic', 'ngCordova', 'http-auth-interceptor', 'civil.core', 'civil.config', 'civil.home', 'civil.declare', 'civil.management', 'civil.report'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                }
            }
        });
    })
    .run(function ($ionicPlatform, $rootScope, $ionicLoading, Auth, $state, $localstorage, $timeout, $http) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

        });
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({template: '正在加载...'})
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            var token = $localstorage.get('authorizationToken');
            console.log(token);
            if(!token || token == 'undefined'){
                $timeout(function(){
                    $rootScope.$broadcast('event:auth-loginRequired');
                });
            }else{
                $http.defaults.headers.common['Authorization'] = token;
            }
        });
    });

