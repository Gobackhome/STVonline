 var app = angular.module('StvWebApp', []);
 app.factory('indexArea', [function() {
     var o = {
         newposts: [],
         viewPosts: [],
         featurePost: [],
         categories: []
     };
     return o;
     
 }]);

 app.controller('Index', ['$scope', 'indexArea', '$http', '$window', function($scope, userArea, $http, $window) {

     $scope.onLoad = function() {
         $http.get('/post')
             .success(function(data, status, headers, config) {
                 userArea.posts = data;
             });
         $http.get('/category')
             .success(function(data, status, headers, config) {
                 userArea.categories = data;
             });
         $scope.posts = userArea.posts;
         $scope.categories = userArea.categories;
         console.log(userArea.categories);
     }

 }]);
 