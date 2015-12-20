'use strict';

function LoginController($location, toastr, identity, auth) {
    var vm = this;
    vm.identity = identity;

    vm.login = function (user, loginForm) {
        if (loginForm.$valid) {
            auth.login(user).then(function (success) {
                if (success) {
                    toastr.success('Successful login!');
                    $location.path('/games');
                }
                else {
                    toastr.error('Username/Password combination is not valid!');
                }
            });
        }
        else {
            toastr.error('Username and password are required fields!')
        }
    };

    vm.logout = function () {
        auth.logout().then(function () {
            toastr.success('Successful logout!');
            if (vm.user) {
                vm.user.email = '';
                vm.user.username = '';
                vm.user.password = '';
            }
            $location.path('/home');
        })
    }
}

angular.module('myApp.controllers')
    .controller('LoginController', ['$location', 'toastr', 'identity', 'auth', LoginController]);