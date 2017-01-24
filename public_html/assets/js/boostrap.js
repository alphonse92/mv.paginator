angular.module('app', ['com.alphonsegs.paginator'])
        .config(['paginatorProvider',function(paginatorProvider){
                paginatorProvider.setConfig({
                    lengthDefault:5,
                    labelBefore:"<",
                    labelNext:">",
                    labelFirst:"<<",
                    labelLast:">>"
                })
        }])
        .controller("mainController", function ($scope) {
            $scope.pagedata = [];
            $scope.loadata = function () {

                for (var i = 0; i < 500; i++)
                {
                    $scope.pagedata.push({name: "alejandro-" + i})
                }
            }
            $scope.loadata();
        })

