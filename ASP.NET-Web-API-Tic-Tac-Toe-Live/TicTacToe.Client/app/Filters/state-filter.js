'use strict';

function gameStateFilter() {
    return function(game) {
        switch (game) {
            case 0:
            {
                return "Available"
            }
            case 1:
            {
                return "TurnX";
            }
            case 2:
            {
                return "TurnO";
            }
            case 3:
            {
                return "WonByX";
            }
            case 4:
            {
                return "WonByO";
            }
            case 5:
            {
                return "Draw"
            }
        }
    }
}

angular.module('myApp')
    .filter('stateFilter', gameStateFilter);