'use strict';

function displayFilter(){
    return function(boardCell){
        switch(boardCell){
            case '-': return ' ';
            case 'X': return 'X';
            case 'O': return 'O';
        }
    }
}

angular.module('myApp')
    .filter('displayFilter', displayFilter);
