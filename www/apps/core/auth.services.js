/**
 * Created by august on 15/8/24.
 */
(function(){
    angular.module('civil.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$http', 'config', '$localstorage'];

    function Auth($http, config, $localstorage){
        var USERNAME_TOKEN = 'AUTH_USER_NAME';
        var PASSWORD_TOKEN = 'AUTH_PASSWORD';

        var user;

        return {
            isAuthenticated: isAuthenticated,
            login:login
        };



        function isAuthenticated(){
            return (user)? user : false;
        }

        function login(data){
           if(data.username === '' || data.password === ''){
               data.username = $localstorage.get(USERNAME_TOKEN);
               data.password = $localstorage.get(PASSWORD_TOKEN);
           }
           return $http.post(config.API+'/user/login', data).then(function(response){
               console.log(response);
               if (response.data.statusCode == '200'){
                   user = response.data.message;
                   return "登陆成功";
               }else{
                   user = undefined;
                   return response.data.message;
               }
            })

        }
    }
})();
