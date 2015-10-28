/**
 *
 * Created by august on 15/8/22.
 */

(function(){
    'use strict';
    angular.module('civil.declare')
        .factory('DeclareService', DeclareService);


    function DeclareService($http, config, $rootScope, $cordovaFileTransfer){
        return{
            getProjects:getProjects,
            getObjects:getObjects,
            getObjectDetail:getObjectDetail,
            getObjectFiles:getObjectFiles,
            setObject:setObject,
            setObjectImage:setObjectImage,
            auditObject:auditObject
        };

        function getProjects(){
            return $http.get(config.API+'/declare/project').then(
                function(response){
                    return response.data;
                }
            ).catch(error);
        }

        function getObjects(type, action, page){
            return $http.get(config.API+'/declare/'+type+'/list/'+action, {params:{page: page}}).then(function(response){
                return response.data;
            }).catch(error)
        }

        function getObjectDetail(type,id){
           return $http.get(config.API+'/declare/'+type+'/'+id).then(function(response){
               return response.data;
           }).catch(error);
        }

        function getObjectFiles(type, id){
            return $http.get(config.API+'/declare/'+type+'/'+id+'/files').then(function(response){
                return response.data;
            }).catch(error);
        }

        function setObject(type, object){
            return $http.post(config.API+'/declare/'+type, object).then(function(response){
               return response.data;
            }).catch(error);
        }

        function setObjectImage(type, id, image){
            var options = {
                fileName: image.substring(image.lastIndexOf('/')+1, image.length),
                mimeType: 'image/png'
            };
            console.log(options);
            return $cordovaFileTransfer.upload(config.API+'/declare/'+type+'/upload/'+id, image, options).then(function(response){
                return response.data;
            }).catch(error);
        }

        function auditObject(type, id, object){
            return $http.post(config.API+'/declare/'+type+'/audit/'+id, object).then(function(response){
                return response.data;
            }).catch(error);
        }


        function error(data, status, headers, config){
            $rootScope.$broadcast('event:auth-loginRequired', data, status);
        }
    }
})();
