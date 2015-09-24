/**
 * Created by august on 15/8/20.
 */

angular.module('civil.config', [])
.factory('config', config);

function config(){
    var api = getAPI();
    return {
       API:api
    };
    function getAPI(){
        if (!ionic.Platform.isWebView()){
            return 'v1';
        }else{
            return 'http://localhost:8080/api';
        }
    }
}