(function () {
    'use strict';

    angular.module('myApp.controllers', []);
    angular.module('myApp.services', []);

    angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies', 'myApp.controllers', 'myApp.services'])
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

            $httpProvider.interceptors.push('errorHandlerHttpInterceptor');
            var CONTROLLER_VIEW_MODEL_NAME = 'vm';
            var routeUserChecks = {
                authenticated: {
                    authenticate: function (auth) {
                        return auth.isAuthenticated();
                    }
                }
            };
            $routeProvider
                .when('/register', {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'GamesController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/game/:id',{
                    templateUrl: 'views/currentgame.html',
                    controller: 'CurrentGameController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }])
        .run(function ($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
                if (rejection === 'not authorized') {
                    $location.path('/unauthorized');
                }
            })
        })
        .constant('baseServiceUrl', 'http://localhost:33257')
        .constant('gamesServiceUrl','http://localhost:33257/api/games' )
        .value('toastr', toastr);
}());
