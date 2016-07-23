var app = angular.module('stvOnlineApp', ['ngFileUpload']);
app.factory('userArea', [function () {
    var o = {
        posts: [],
        categories: []
    };
    return o;
}]);

app.controller('UserAreaCtrl', ['$scope', 'userArea', '$http', '$window', 'Upload', function ($scope, userArea, $http, $window, Upload) {
    var path = '/public/partialviews/userArea/';
    $scope.userAreaContent = path + 'about.html';
    $scope.onLoad = function () {
        console.log('Onload(): ');
        $http.get('/posts')
            .success(function (data, status, headers, config) {
                userArea.posts = data;
                $scope.posts = userArea.posts;

            });
        $http.get('/categories')
            .success(function (data, status, headers, config) {
                userArea.categories = data.categories;
                $scope.categories = userArea.categories;

            });
        console.log(userArea.posts);
    }

    $scope.uploadFiles = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/upload',
                data: { file: file }
            });

            file.upload.then(function (response) {
                setTimeout(function () {
                    file.result = response.data;
                    $scope.post.preview_image = '/' + response.data.destination + response.data.filename;
                    console.log( $scope.post.preview_image);
                    console.log(response);
                }, 0);
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }

    $scope.setUserAreaContent = function (filename) {
        $scope.userAreaContent = path + filename;
    };

    $scope.getEdit = function (post) {
        $scope.post = post;
        console.log($scope.post);

        $scope.userAreaContent = path + 'newPost.html';
    }
    $scope.getNewPost = function () {
        $scope.post = {};
        $scope.userAreaContent = path + 'newPost.html';
    }
    $scope.addPost = function (post) {
        console.log("$scope.addPost : ");
        console.log(post);
        //Luu vao factory
        //Goi Http luu vao database
        $http.post('/posts', { post: post })
            .success(function (data, status, headers, config) {
                $scope.posts.push(data.post);
                $window.alert(data.msg);

            })
            .error(function (data, status, headers, config) {
                $window.alert(data.msg);
            })
    };
    $scope.doDelete = function(post){
        console.log("angular: ");
        console.log(post._id);
        $http.delete("/posts/:_id",{_id:post._id})
        .success(function(data,status,headers,config){
            alert(data.msg);
        })
        .error(function(data,status,headers,config){
            alert(data.msg);
        })
    }
    $scope.addCategory = function (category) {
        console.log("addCategory: " + category.title + " " + category.description + " " + category.preview_image);
        console.log('addCategory - push ' + $scope.categories);
        $http.post('/categories', category)
            .success(function (data, status, headers, config) {
                category.title = '';
                category.description = '';
                $scope.categories.push(data.category);
                $window.alert(data.msg);
            })
            .error(function (data, status, headers, config) {
                $window.alert(data.msg);
            })
    };

}]);
app.controller('AuthCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    var pathAuth = '/public/partialviews/userArea/';
    $scope.content = pathAuth + 'login.html';
    $scope.setContent = function (filename) {
        $scope.content = pathAuth + filename;
    };

    $scope.doSignup = function () {
        $http.post('/user', {
            displayName: $scope.displayName,
            email: $scope.email,
            password: $scope.password
        })
            .success(function (data, status, headers, config) {
                $scope.setContent(pathAuth + 'login.html');
            })
            .error(function (data, status, headers, config) {
                $window.alert(data.msg);
            })
    };
}]);


