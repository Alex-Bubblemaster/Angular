'use strict';

function ErrorHandlerHttpInterceptorService($q, errorHandler) {
    return {
        'responseError': function (serverError) {
            errorHandler.processError(serverError.data);
            return $q.reject(serverError);
        }
    }
}

angular.module('myApp.services')
    .factory('errorHandlerHttpInterceptor', ['$q', 'errorHandler', ErrorHandlerHttpInterceptorService]);