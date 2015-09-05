/**
 * Created by august on 15/8/24.
 */
(function () {
    angular.module('civil.core')
        .factory('Auth', Auth);

    Auth.$inject = ['$rootScope', '$http', 'config', '$localstorage', 'authService'];

    function Auth($rootScope, $http, config, $localstorage, authService) {
        var USERNAME_TOKEN = 'AUTH_USER_NAME';
        var PASSWORD_TOKEN = 'AUTH_PASSWORD';

        var user;

        return {
            isAuthenticated: isAuthenticated,
            login: login
        };


        function getUserInfo() {
            return $http.get(config.API + "/user/info").then(function (response) {
                return response.data;
            });
        }

        function isAuthenticated() {
            if (user) {
                return user;
            }
            getUserInfo().then(function (data) {
                if (data.statusCode === '200') {
                    user = data.message;
                    return user;
                } else {
                    return autoLogin();
                }
            });
        }


        function login(user) {
            console.log(user);
            return $http.post(config.API + '/user/login', user, {ignoreAuthModule: true}).success(function (data, status, headers, config) {
                var token = data.token;
                $http.defaults.headers.common.Authorization = token;
                $localstorage.set('authorizationToken', token);
                authService.loginConfirmed(data, function (config) {
                    config.headers.Authorization = data.token;
                });
            }).error(function (data, status, headers, config) {
                $rootScope.$broadcast('event:auth-login-failed', data, status);
            })

        }
    }
})();
