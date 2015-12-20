'use strict';

function gamesService($http, $q, authorization, gamesServiceUrl) {

    var headers = authorization.getAuthorizationHeader();

    function addGame() {
        var req = {
            method: 'POST',
            url: gamesServiceUrl + '/create',
            headers: headers
        };
        var deferred = $q.defer();
        $http(req)
            .then(function success(res) {
                deferred.resolve(res);
            }, function error(err) {
                deferred.reject(err.data);
            });

        return deferred.promise;
    }

    function getAllGames() {
        var req = {
            method: 'GET',
            url: gamesServiceUrl + '/all',
            headers: headers
        };

        var deferred = $q.defer();

        $http(req)
            .then(function success(res) {
                deferred.resolve(res);
            }, function err(err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function joinGame(id) {
        var deferred = $q.defer();
        $http.post(gamesServiceUrl + '/join/' + id,{}, {headers: headers} )
            .then(function success(res) {
                deferred.resolve(res.data);
            }, function error(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getGameStatus(gameId) {
        var req = {
            method: 'GET',
            url: gamesServiceUrl + '/status/' + gameId,
            headers: headers
        };

        var deferred = $q.defer();
        $http(req)
            .then(function success(res) {
                deferred.resolve(res.data);
            }, function error(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function play(row, col, gameId) {
        row += 1;
        col+=1;
        var request = {
            GameId: gameId,
            Row: row,
            Col: col
        };

        var deferred = $q.defer();
        $http.post(gamesServiceUrl + '/play/', request, {headers:headers})
            .then(function success(res) {
                deferred.resolve(res.data);
            }, function error(err) {
                deferred.reject(err.data);
            });

        return deferred.promise;
    }

    return {
        addGame: addGame,
        getAllGames: getAllGames,
        joinGame: joinGame,
        getGameStatus: getGameStatus,
        play: play
    }
}

angular.module('myApp.services')
    .factory('GamesService', ['$http', '$q', 'authorization', 'gamesServiceUrl', gamesService]);
