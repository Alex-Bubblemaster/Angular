'use strict';

function IdentityService($cookieStore) {
    var cookieStorageUserKey = 'currentApplicationUser';
    var currentUser;
    return {
        getCurrentUser: function () {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if (savedUser) {
                return savedUser;
            }
             console.log(currentUser);
            return currentUser;
        },
        setCurrentUser: function (user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function () {
            return !!this.getCurrentUser();
        }
    }
}
angular.module('myApp.services')
    .factory('identity', ['$cookieStore', IdentityService]);