/**
 * Created by kroket on 2017/1/18.
 */
define(
    function(require, exports, module) {

        var $ = require("jquery");
        var angular = require("angular");
        require("layer")($);
        require('../three/FontAwesome/font-awesome.css');
        require('../three/laydate/laydate.js');
        require('../three/angular/1.5.6/module/angular-ui-router.js');
        require('../three/angular/1.5.6/module/oclazyload.js')(angular);
        var mapModule = angular.module('mapApp', ['ui.router','oc.lazyLoad']);
        layer.config({
            path: 'three/layer/'
        });

        mapModule.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider.otherwise('/map');

            $stateProvider
                .state('map', {
                    url: '/map',
                    views: {
                        'mainContent': {
                            templateUrl: './view/mapView.html',
                            controller: 'mapViewCtrl',
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './common/directive/mapDirective.js',
                                './controller/mapViewCtrl.js',
                                './common/service/mapService.js',
                                './common/base/getDateBase.js',
                            ]);
                        }]
                    }
                })
                .state('regist', {
                    url: '/regist',
                    views: {
                        'mainContent': {
                            templateUrl: './view/regist.html',
                            controller: 'registCtrl',
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './controller/registCtrl.js',
                                // './common/service/otherService.js',
                                './common/base/getDateBase.js',
                            ]);
                        }]
                    }
                })
                .state('editUser', {
                    url: '/editUser',
                    views: {
                        'mainContent': {
                            templateUrl: './view/editUser.html',
                            controller: 'editUserCtrl',
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                './controller/editUserCtrl.js',
                                // './common/service/otherService.js',
                                './common/base/getDateBase.js',
                            ]);
                        }]
                    }
                })
            
        })

        mapModule.controller('mapControl', ["$scope", function($scope, mapService) {

        }])

        //AngularJs的初始化
        return {
            init: function() {
                angular.bootstrap($("body"), ["mapApp"]);
            }
        };
    }
)
