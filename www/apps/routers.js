/**
 * Created by august on 15/8/22.
 */
(function () {
    'use strict';
    angular.module('civil')
        .config(getRoutes);

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
    function getRoutes($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '',
                abstract: true,
                controller: 'AppCtrl',
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'apps/home/templates/index.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('tab.home-detail', {
                url: '/home/:id',
                views: {
                    'tab-home': {
                        templateUrl: 'apps/home/templates/detail.html',
                        controller: 'HomeDetailCtrl'
                    }
                }
            })

            .state('tab.declare', {
                url: '/declare',
                views: {
                    'tab-declare': {
                        templateUrl: 'apps/declare/templates/index.html',
                        controller: 'DeclareCtrl'
                    }
                }
            })
            .state('tab.management', {
                url: '/management',
                views: {
                    'tab-management': {
                        templateUrl: 'apps/management/templates/index.html',
                        controller: 'ManagementCtrl'
                    }
                }
            })

            .state('tab.report', {
                url: '/report',
                views: {
                    'tab-report': {
                        templateUrl: 'apps/report/templates/index.html',
                        controller: 'ReportCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
        $ionicConfigProvider.tabs.position('bottom');
    }
})();
