/**
 * Created by august on 15/8/22.
 */
(function () {
    'use strict';
    angular.module('civil.declare')
        .controller('DeclareCtrl', DeclareCtrl)
        .controller('DeclareObjectCtrl', DeclareObjectCtrl)
        .controller('DeclareObjectNewCtrl', DeclareObjectNewCtrl)
        .controller('DeclareObjectDetailCtrl', DeclareObjectDetailCtrl)

    function DeclareCtrl($scope) {

    }


    var OBJECT_TYPE = {
        'floor': '底板',
        'wall': '墙板',
        'roof': '顶板',
        'struct': '结构验收',
        'complte': '竣工验收'
    };

    var ACTION_TYPE = {
        'declare': '申报',
        'management': '管理'
    };

    function DeclareObjectCtrl($scope, DeclareService, $stateParams) {
        $scope.type = $stateParams.type;
        $scope.action = $stateParams.action;
        $scope.type_name = OBJECT_TYPE[$scope.type] + ACTION_TYPE[$scope.action];
        $scope.objects = [];
        $scope.can_be_load = true;


        var page = 1;

        $scope.getObjects = function () {
            DeclareService.getObjects($scope.type, $scope.action, page).then(function (data) {
                if (data.length > 0) {

                    console.log(page);
                    angular.forEach(data, function (item) {
                        $scope.objects.push(item);
                    });
                    page += 1;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    console.log(page);
                } else {
                    console.log(page);
                    $scope.can_be_load = false;
                }

            });
        };

    }

    function DeclareObjectNewCtrl($scope, DeclareService, $state, $stateParams, $timeout, $cordovaImagePicker) {
        $scope.type = $stateParams.type;
        $scope.type_name = OBJECT_TYPE[$scope.type];
        $scope.object = {
            project: null,
            addr: null
        };
        $scope.images = [];

        DeclareService.getProjects().then(function (data) {
            console.log(data);
            $scope.projects = data;
        });

        $scope.imagePick = function () {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.images = results;
                }, function (error) {
                    // error getting photos
                });
        };

        $scope.submit = function () {
            var object = {
                project_id: $scope.object.project.id,
                addr: $scope.object.addr
            };
            DeclareService.setObject($stateParams.type, object).then(function (data) {
                if ($scope.images.length > 0) {
                    $timeout(function () {
                        angular.forEach($scope.images, function (image) {
                            console.log(image);
                            $timeout(function () {
                                DeclareService.setObjectImage($scope.type, data.id, image).then(function (data) {
                                    console.log(data);
                                })
                            });
                        })
                    });
                }
                $state.go("tab.declare-object", {type: $scope.type, action: 'declare'});
            })
        };
    }

    function DeclareObjectDetailCtrl($scope, $stateParams, DeclareService, $cordovaImagePicker) {
        $scope.type = $stateParams.type;
        $scope.type_name = OBJECT_TYPE[$scope.type];
        DeclareService.getObjectDetail($stateParams.type, $stateParams.id).then(function (data) {
            console.log(data);
            $scope.object = data;
        });


        $scope.getFiles = function(){
           DeclareService.getObjectFiles($scope.type, $stateParams.id).then(function(data){
               console.log(data);
               $scope.files = data;
           })
        };

        $scope.getFiles();


        $scope.imagePick = function () {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.images = results;
                    $timeout(function () {
                        DeclareService.setObjectImage($scope.type, $stateParams.id, results).then(function (data) {
                            console.log(data);
                        })
                    });
                }, function (error) {
                    // error getting photos
                });
        };

    }
})();
