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
            .state('tab.declare-object', {
                url: '/declare/:type/:action',
                views: {
                    'tab-declare': {
                        templateUrl: 'apps/declare/templates/object_list.html',
                        controller: 'DeclareObjectCtrl'
                    }
                }
            })

            .state('tab.declare-object-new', {
                url: '/declare/:type/new',
                views: {
                    'tab-declare': {
                        templateUrl: 'apps/declare/templates/object_new.html',
                        controller: 'DeclareObjectNewCtrl'
                    }
                }
            })
            .state('tab.declare-object-detail', {
                url: '/declare/:type/:id',
                views: {
                    'tab-declare': {
                        templateUrl: 'apps/declare/templates/object_detail.html',
                        controller: 'DeclareObjectDetailCtrl'
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
            .state('tab.management-object', {
                url: '/management/:type/:action',
                views: {
                    'tab-management': {
                        templateUrl: 'apps/declare/templates/object_list.html',
                        controller: 'DeclareObjectCtrl'
                    }
                }
            })

            .state('tab.management-object-new', {
                url: '/management/:typ/new',
                views: {
                    'tab-management': {
                        templateUrl: 'apps/declare/templates/object_new.html',
                        controller: 'DeclareObjectNewCtrl'
                    }
                }
            })
            .state('tab.management-object-detail', {
                url: '/management/:type/:id',
                views: {
                    'tab-management': {
                        templateUrl: 'apps/declare/templates/object_detail.html',
                        controller: 'DeclareObjectDetailCtrl'
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
