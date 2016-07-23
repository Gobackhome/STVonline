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
         //newest
         $http.get('/posts')
             .success(function(data, status, headers, config) {
                 indexArea.newposts = data;
             });
        //list category
         $http.get('/category')
             .success(function(data, status, headers, config) {
                 indexArea.categories = data;
             });
        //feature
        $http.get('/posts/feature')
            .success(function(data,status,headers,config){
                indexArea.featurePost = data;
            });
     }

 }]);
 