 var app = angular.module('StvWebApp', []);
 app.factory('userArea', [function() {
     var o = {
         posts: [],
         categories: []
     };
     return o;
     
 }]);

 app.controller('UserAreaCtrl', ['$scope', 'userArea', '$http', '$window', function($scope, userArea, $http, $window) {
     var path = '/public/partialviews/userArea/';
     $scope.userAreaContent = path + 'about.html';

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
     $scope.setUserAreaContent = function(filename) {
         $scope.userAreaContent = path + filename;
     };
     $scope.addPost = function(post) {
         //Luu vao factory
         $scope.posts.push(post);
         //Goi Http luu vao database
         $http.post('/posts', post)
             .success(function(data, status, headers, config) {
                 $window.alert(data.msg);
             })
             .error(function(data, status, headers, config) {
                 $window.alert(data.msg);
             })
     };
     $scope.addCategory = function(category) {
         $scope.categories.push(category);
         $http.post('/categories', category)
             .success(function(data, status, headers, config) {
                 $window.alert(data.msg);
             })
             .error(function(data, status, headers, config) {
                 $window.alert(data.msg);
             })
     };

 }]);
 app.controller('AuthCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
     var pathAuth = '/public/partialviews/user/';
     $scope.content = pathAuth + 'login.html';
     $scope.setContent = function(filename) {
         $scope.content = pathAuth + filename;
     };

     $scope.doSignup = function() {
         $http.post('/user', {
                 displayName: $scope.displayName,
                 email: $scope.email,
                 password: $scope.password
             })
             .success(function(data, status, headers, config) {
                 $scope.setContent(pathAuth + 'login.html');
             })
             .error(function(data, status, headers, config) {
                 $window.alert(data.msg);
             })
     };
 }]);
 //
 //app.controller('FileController', function($scope, $resource) {
 //
 //    var Files = $resource('/files/:id', { id: "@id" });
 //
 //    angular.extend($scope, {
 //
 //        post: { file: null },
 //
 //        upload: function(post) {
 //            Files.prototype.$save.call(post.file, function(self, headers) {
 //                // Handle server response
 //                console.log(post.file);
 //            });
 //        }
 //    });
 //});