angular
    .module('App', ['ngUtils'])
    .controller('AppCtrl', ['$scope', function($scope){
         $scope.date = new Date();
    }]);


