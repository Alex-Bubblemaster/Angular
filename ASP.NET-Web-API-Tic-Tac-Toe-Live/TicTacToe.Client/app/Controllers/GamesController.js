'use strict';

function GamesController(GamesService, $location, toastr, identity) {
    var vm = this;
    var user = identity.getCurrentUser();
    if(!user){
        toastr.error("You must login!");
        $location.path('/home');
    }
    vm.addNewGame = function () {
        GamesService.addGame()
            .then(function (res) {
                toastr.success("New Game Created!");
                $location.path('/game/' + res.data);
            }, function (err) {
                toastr.error(err.Message);
            });
    };

    vm.joinGame = function (Id) {

        GamesService.joinGame(Id)
            .then(function (res) {
                toastr.success("You joined a game!");
                $location.path('/game/' + res);
            }, function (err) {
                handleJoiningGames(Id);
                if(err.Message){
                    toastr.error(err.Message);
                }
            })
    };

    GamesService.getAllGames()
        .then(function (res) {
            vm.games = res.data;
        });

    function handleJoiningGames(gameId) {
        var currentUser = identity.getCurrentUser().userName;
        var ownGame = vm.games.some(function (game) {
            return game.Id === gameId && game.FirstPlayer.Email === currentUser && !game.SecondPlayer;
        });

        var ownGameInProgress = vm.games.some(function (game) {
            if (game.SecondPlayer && game.State) {
                return game.Id === gameId && game.SecondPlayer.Email === currentUser || game.FirstPlayer.Email === currentUser;
            }
        });

        if (ownGameInProgress) {
            $location.path('/game/' + gameId);
            toastr.info("You are being redirected to your game");
        }

        if (ownGame) {
            toastr.error("You cannot join your own game!")
        }
    }
}

angular.module('myApp.controllers')
    .controller('GamesController', ['GamesService', '$location', 'toastr', 'identity', GamesController]);