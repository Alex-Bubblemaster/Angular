'use strict';

function CurrentGameController($routeParams, GamesService, toastr, $interval, $location) {
    var vm = this;
    var gameId = $routeParams.id;

    GamesService.getGameStatus(gameId)
        .then(function (gameInfo) {
            vm.Id = gameInfo.Id;
            vm.Board = gameInfo.Board;
            vm.FirstPlayerName = gameInfo.FirstPlayerName;
            vm.SecondPlayerName = gameInfo.SecondPlayerName;
            vm.State = gameInfo.State;
        });

    vm.play = function (row, col, gameId) {
        GamesService.play(row, col, gameId)
            .then(function () {
                updateGame();
                switch (vm.State){
                    case 1:
                        toastr.success("Success!");
                        toastr.info("It's player O's turn");
                        break;
                    case 2:
                        toastr.success("Success!");
                        toastr.info("It's player X's turn");
                        break;
                }
            }, function (res) {
                toastr.error((res.Message));
            });

        function updateGame() {
            var checkStatus = $interval(function () {
                if ($routeParams.id !== undefined) {
                    GamesService.getGameStatus(gameId)
                        .then(function (currentGame) {
                            vm.Board = currentGame.Board;
                            vm.State = currentGame.State;

                            switch (currentGame.State) {
                                case 3:
                                    toastr.success("Game won by " + vm.FirstPlayerName);
                                    $interval.cancel(checkStatus);
                                    $location.path('/games');
                                    break;
                                case 4:
                                    toastr.success("Game won by " + vm.SecondPlayerName);
                                    $interval.cancel(checkStatus);
                                    $location.path('/games');
                                    break;
                                case 5:
                                    toastr.success("Draw");
                                    $interval.cancel(checkStatus);
                                    $location.path('/games');
                                    break;
                            }

                        });
                }
            }, 2000);
        }
    };
}

angular.module('myApp.controllers')
    .controller('CurrentGameController', ['$routeParams', 'GamesService', 'toastr', '$interval', '$location', CurrentGameController]);
