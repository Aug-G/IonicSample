/**
 * Created by august on 15/8/20.
 */
'use strict';
angular.module('civil.home')
    .factory('HomeService', HomeService);

HomeService.$inject = ['$http', 'config', '$rootScope'];

function HomeService($http, config, $rootScope) {
    return {
        getUserInfo: getUserInfo,
        getDetailData: getDetailData
    };


    function getUserInfo() {
        return $http.get(config.API + "/user/info").then(function (response) {
            return response.data;

        }).catch(function (data, status, headers, config) {
            $rootScope.$broadcast('event:auth-loginRequired', data, status);
        });
    }

    function getDetailData(id) {
        return $http.get(config.API + "/news/" + id).then(function (response) {
            return response.data;
        });
    }
}