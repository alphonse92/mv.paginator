angular.module('app', ['com.alphonsegs.paginator'])
        .config(['paginatorProvider', function (paginatorProvider) {
                paginatorProvider.setConfig({
                    lengthDefault: 5,
                    labelBefore: "<",
                    labelNext: ">",
                    labelFirst: "<<",
                    labelLast: ">>"
                })
            }])
        .controller("mainController", function ($scope, $http) {
            $scope.pagedata = [];


            $scope.loadata = function () {
                $http.get("https://jsonplaceholder.typicode.com/posts")
                        .then(function (data) {
                            $scope.pagedata=data.data;
                        })
            }

            $scope.loadata();
        })

