# mv.paginator

Angular plugin for easy paginate any element.
```
DEMO: https://jsfiddle.net/alphonse92/esoszz8a/
```
##Instalation:

### Using NPM:
```
  npm install mv-paginator
```
###Using BOWER:

```
  bower install mv-paginator
```

##HTML impl

The innerHTML especifies the template, basically the plugin add a ng-repeat to the first element. $paginator_item is the item's array, and name is the property for this object.

```html
  <paginator pagedata="pagedata">
       <div>{{$paginator_item.name}}</div>
  </paginator>
```

##config

```javascript
.config(['paginatorProvider',function(paginatorProvider){
                paginatorProvider.setConfig({
                    lengthDefault:5, /* five elements per page*/
                    labelBefore:"<",
                    labelNext:">",
                    labelFirst:"<<",
                    labelLast:">>"
                })
        }])
```

##Controller

```javascript
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
```

## Preview
![alt tag](https://github.com/alphonse92/mv.paginator/raw/master/public_html/assets/images/example.jpg)




