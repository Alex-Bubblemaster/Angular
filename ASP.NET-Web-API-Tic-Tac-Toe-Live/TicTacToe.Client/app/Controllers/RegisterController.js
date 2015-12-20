'use strict';

function RegisterController($location, auth, toastr) {
    var vm = this;
    vm.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    vm.register = function (user) {
        auth.signup(user).then(function () {
            toastr.success("Registration successful!");
            $location.path('/');
        })
    }
}

angular.module('myApp.controllers')
    .controller('RegisterController', ['$location', 'auth', 'toastr', RegisterController]);