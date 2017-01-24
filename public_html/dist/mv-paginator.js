/**
 * Created by Alejandro Molina Vergel Febrero 2016
 * @author Alejandro Molina Vergel
 * @email alejandro_mover@hotmail.com
 * @version 0.0.1
 */
;
!(function (module) {
    var $page = {};
    var page_length_default = 10;
    var paginator_label_before = "before";
    var paginator_label_next = "next";
    var paginator_label_first = "first";
    var paginator_label_last = "last";
    var paginator_max_pages = 10;
    $page.elements = []
    function provider() {
        this.setPageLengthDefault = function (len) {
            page_length_default = len;
        }

        this.setConfig = function (config)
        {
            page_length_default = config.lengthDefault || page_length_default;
            paginator_label_before = config.labelBefore || paginator_label_before;
            paginator_label_next = config.labelNext || paginator_label_next;
            paginator_label_first = config.labelFirst || paginator_label_first;
            paginator_label_last = config.labelLast || paginator_label_last;
        }

        this.$get = function ($rootScope) {
            return{
                setData: function (data) {
                    $rootScope.$broadcast("com.alphonsegs.paginator::setDataProvider", data);
                },
                showNext: function (data) {
                    $rootScope.$broadcast("com.alphonsegs.paginator::setDataProvider", data);
                },
                showBefore: function (data) {
                    $rootScope.$broadcast("com.alphonsegs.paginator::setDataProvider", data);
                },
                showLast: function (data) {
                    $rootScope.$broadcast("com.alphonsegs.paginator::setDataProvider", data);
                },
                showFirst: function (data) {
                    $rootScope.$broadcast("com.alphonsegs.paginator::setDataProvider", data);
                }
            }
        }
        this.$get.$inject = ["$rootScope"];
    }



    function link(scope, element, attrs, controller, transcludeFn, $compile) {


        function _init()
        {
            scope._page = [];
            scope._pages = [];
            scope._page = scope._data
            scope.paginator_pages = [];
            scope._actualPage = 0;
            //validate page length from attributte
            if (isNaN(scope._pageLength))
            {
                scope._pageLength = page_length_default;
            }
            _initPages();
            _initListeners();
        }

        scope.setPage = function (page) {
            function moveCursorToRight() {
                if (scope._lastPage < scope.paginator_pages.length - 1)
                {
                    scope._lastPage++
                    scope.paginator_pages[scope._firstPage].visible = false;
                    scope._firstPage++
                    scope.paginator_pages[scope._firstPage].visible = true;
                    scope.paginator_pages[scope._lastPage].visible = true;
                }
            }
            function moveCursorToLeft() {
                if (scope._firstPage > 0)
                {
                    scope._firstPage--
                    scope.paginator_pages[scope._firstPage].visible = true;

                    scope.paginator_pages[scope._lastPage].visible = false;
                    scope._lastPage--
                    scope.paginator_pages[scope._lastPage].visible = true;
                }
            }
            
            if (page == 0)
            {
                for (var i = 0; i < scope.paginator_pages.length; i++)
                {
                    scope.paginator_pages[i].visible = (i < paginator_max_pages);
                }
                scope._firstPage = 0;
                scope._lastPage = paginator_max_pages - 1;

            } else if (page == scope._pages.length - 1)
            {
                for (var i = scope.paginator_pages.length - 1; i >= 0; i--)
                {
                    scope.paginator_pages[i].visible = (i > (scope.paginator_pages.length - paginator_max_pages));
                }

                scope._lastPage = scope.paginator_pages.length - 1;
                scope._firstPage = scope._lastPage - paginator_max_pages - 1;
            } else
            {
                
                if (scope._actualPage < page)
                {
                    moveCursorToRight()
                } else
                {
                    moveCursorToLeft()
                }
            }
            if (scope.paginator_pages[page])
            {
                scope.paginator_pages[scope._actualPage].isActive = false;
                scope._actualPage = page;
                scope._page = scope._pages[scope._actualPage]
                scope.paginator_pages[scope._actualPage].isActive = true;
            }
            
        }
        scope.first = function () {
            scope.setPage(0)
        }
        scope.before = function () {
            scope.setPage(scope._actualPage - 1)
        }
        scope.next = function () {
            scope.setPage(scope._actualPage + 1)
        }
        scope.last = function () {
            scope.setPage(scope._pages.length - 1)

        }

        function _initListeners()
        {
            scope.$on("com.alphonsegs.paginator::setDataProvider", function (evt, data) {
                scope._data = data;
                _initPages();
            })
            scope.$on("com.alphonsegs.paginator::next", function (evt, data) {
                scope.next();
            })
            scope.$on("com.alphonsegs.paginator::before", function (evt, data) {
                scope.before();
            })
            scope.$on("com.alphonsegs.paginator::last", function (evt, data) {
                scope.last();
            })
            scope.$on("com.alphonsegs.paginator::first", function (evt, data) {
                scope.first();
            })
            scope.$on("com.alphonsegs.paginator::changePage", function (evt, data) {
                scope.setPage(data);
            })
        }
        function _initPages()
        {
            for (var i = 0; i < scope._data.length; i++)
            {
                scope._pages.push(scope._data.splice(0, scope._pageLength))
            }
            for (var i = 0; i < scope._pages.length; i++)
            {
                var page = {pageIndex: i, isActive: scope._actualPage == i, visible: false};
                page.visible = (i < paginator_max_pages - 1);
                scope.paginator_pages.push(page)
            }
            scope.setPage(0)

        }

        function compile($compile, element, attrs) {
            var item = element[0].children[0];
            item.setAttribute("ng-repeat", "$paginator_item in _page")
            var html = "<ul class='paginator'>";
            html += "<li ng-click=\"first()\"><a href=\"javascript:void(0)\">" + paginator_label_first + "</a></li>"
            html += "<li ng-click=\"before()\"><a href=\"javascript:void(0)\">" + paginator_label_before + "</a></li>"
            html += "<li ng-click=\"setPage(page.pageIndex)\" ng-class=\"{active:page.isActive,hidden:!page.visible}\" ng-repeat=\"page in paginator_pages\">"
            html += "<a href=\"javasscript:void(0)\">{{page.pageIndex+1}}</a>"
            html += "</li>";
            html += "<li ng-click=\"next()\"><a href=\"javascript:void(0)\">" + paginator_label_next + "</a></li>"
            html += "<li ng-click=\"last()\"><a href=\"javascript:void(0)\">" + paginator_label_last + "</a></li>"
            html += "</ul>"

            var paginador = angular.element(html)

            element.append(item);
            element.append(paginador)

            var compiled = $compile(element, null, 5000);
            return function (scope) {
                compiled(scope);
            }
        }


        _init();
        compile($compile, element, attrs)(scope)
    }

    directive.$inject = ["$compile"]
    function directive($compile) {
        return  {
            restrict: 'E',
            priority: 5000,
            //Terminal prevents compilation of any other directive on first pass
            terminal: true,
            scope: {
                _data: '=pagedata',
                _pageLength: "=length",
            },
            link: function (scope, element, attrs, controller, transcludeFn) {
                link(scope, element, attrs, controller, transcludeFn, $compile);
            },
        }
    }
    module.provider("paginator", provider)
    module.directive("paginator", directive);
})(angular.module('com.alphonsegs.paginator', []));
