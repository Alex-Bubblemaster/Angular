'use strict';

 function ErrorHandlerService(toastr) {
    return {
        processError: function(serverError) {
            if (serverError['error_description']) {
                toastr.error(serverError['error_description']);
            }

            if (serverError['message']) {
                toastr.error(serverError['message']);
            }

            if (serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for(var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for(var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        toastr.error(trimmedName + ' - ' + currentError);
                    }
                }
            }
        }
    }
}

angular.module('myApp.services')
    .factory('errorHandler', ['toastr',ErrorHandlerService]);