/**
 * Created by kroket on 2017/1/18.
 */
define(
    function(require, exports, module) {

        var $ = require("jquery");
        var jQuery = $;
        require("../three/jquery/ajaxfileupload.js");
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
                                './common/service/mapService.js',
                                './common/base/getDateBase.js',
                            ]);
                        }]
                    }
                })
            
        })

        mapModule.controller('mapControl', ["$scope", function($scope, mapService) {
            // $scope.getUser = function(){
            //     $.ajax({
            //         url: 'interface/logout.php',
            //         type: 'POST',
            //         dataType: 'JSON',
            //         async: false,
            //         data:{
            //             email:'123@qq.com'
            //         },
            //         success: function(data) {
            //             console.log(data)
            //         },
            //         error: function() {
            //             console.log('getaActivityData--DateBase获取失败');
            //         }
            //     })
            // }
            $scope.goImg = function(){

                            $.ajaxFileUpload
            (
                {
                    url: './interface/ImgCtrl.php?opt=addToSpare', //用于文件上传的服务器端请求地址
                    secureuri: false, //是否需要安全协议，一般设置为false
                    fileElementId: 'file', //文件上传域的ID
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status)  //服务器成功响应处理函数
                    {
                        console.log(data)
                    },
                    error: function (data, status, e)//服务器响应失败处理函数
                    {
                        console.log(e);
                    }
                }
            )

            }
        }])

        //AngularJs的初始化
        return {
            init: function() {
                angular.bootstrap($("body"), ["mapApp"]);
            }
        };
    }
)
