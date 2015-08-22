/**
 * Created by august on 15/8/20.
 */

angular.module('civil.config', [])
.factory('config', config);

function config(){
    return {
       //API:'v1'
       API:"http://news-at.zhihu.com/api/4"
    };
}