/**
 * Created by itunu.babalola on 1/11/17.
 */
define(
    [
        "angular",
        "Services",
        "Controllers",
        "Directives"
    ],

    function Manager(angular,Services, Controllers,Directives) {

        var initialize = function () {
            var app = angular.module("contactApp",['ngRoute','ngResource'], ['$routeProvider','$locationProvider'  ,function ($routeProvider,$locationProvider,$window) {

                $routeProvider.when('/',{
                    templateUrl: '../templates/login.html'
                });

                $routeProvider.when('/user/:userId',{
                   templateUrl: '../templates/contact.html'
                });

                $routeProvider.when('/:contactId/action',{
                    templateUrl :function (params) {
                        var url ='';
                        switch (params.action){
                            case 'delete':url = '../templates/contact.html' ;break;
                            case 'update':url = '../templates/contact.html' ;break;
                            default: url ='../templates/contact.html' ;
                        }

                        return url;
                    }

                });


                $routeProvider.otherwise({
                    redirectTo :'/'
                });

                //$locationProvider.html5Mode(true);
                $routeProvider.caseInsensitiveMatch = true;

            }]);

            app.service(Services);
            app.directive('myDirectives',myDirectives);
            app.controller('userCtrl',userCtrl);
            app.controller('contactCtrl',contactCtrl);





            angular.bootstrap(document,["contactApp"]);


        };

        return{
            initialize :initialize
        };
    });