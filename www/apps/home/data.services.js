/**
 * Created by august on 15/8/20.
 */
'use strict';
angular.module('civil.home', [])
.factory('HomeService', HomeService);

HomeService.$inject  = ['$http', 'config'];

function HomeService($http, config){
    return {
        getData:getData,
        getDetailData:getDetailData,
    };


    function getData(){
        return $http.get(config.API+"/news/latest").then(function(response){
            return response.data;
        });
    }

    function getDetailData(id){
        return $http.get(config.API+"/news/"+id).then(function(response){
            return response.data;
        });
    }
}