/**
 * Created by kroket on 2017/1/22.
 */
define(function(require,exports,module){
    var $ = require('jquery');
    var angular = require('angular');
    require('../three/angular/1.5.6/module/angular-ui-router.js');
    require('../three/angular/1.5.6/module/oclazyload.js')(angular);
    var homeModule = angular.module('homeModule',['ui.router','oc.lazyLoad']);

    // require('../common/service/indexService.js')(homeModule);
    homeModule.config(function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
        $urlRouterProvider.otherwise('/index');

        $stateProvider
        .state('home',{
            url:'/index',
            views:{
                'header':{
                    templateUrl:'./view/header.html',
                    controller:'headerCtrl',
                },
                'body':{
                    templateUrl:'./view/index.html',
                    controller:'indexCtrl',
                },
                'footer':{
                    templateUrl:'./view/footer.html',
                    controller:'footerCtrl',
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        './controller/header.js',
                        './controller/footer.js',
                        './controller/indexCtrl.js',
                        './common/service/indexService.js',
                        './common/base/getDateBase.js'
                    ]);
                }]
            }
        })
        .state('personCenter',{
            url:'/personCenter',
            views:{
                'header':{
                    templateUrl:'./view/header.html',
                    controller:'headerCtrl',
                },
                'body':{
                    templateUrl:'./view/personCenter.html',
                    // controller:'indexCtrl',
                },
                'footer':{
                    templateUrl:'./view/footer.html',
                    controller:'footerCtrl',
                },
                // 'select@home':{
                //     templateUrl:'./select.html',
                //     controller:'selectCtrl',
                // },
                // 'content@home':{
                //     templateUrl:'./content.html',
                //     controller:'contentCtrl',
                // }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad','$injector',function($ocLazyLoad,$injector){
                    return $ocLazyLoad.load([
                        './controller/header.js',
                        './controller/footer.js',
                        './controller/personCenterCtrl.js'
                    ])
                    // .then(function(){
                    //     var $footerCtrl = $injector.get("footerCtrl");
                    //     $footerCtrl.init(homeModule);
                    // });
                }]
            }
        })
        .state('articleDetails',{
            url:'/articleDetails',
            views:{
                'header':{
                    templateUrl:'./view/header.html',
                    controller:'headerCtrl',
                },
                'body':{
                    templateUrl:'./view/articleDetails.html',
                    controller:'articleDetailsCtrl',
                },
                'footer':{
                    templateUrl:'./view/footer.html',
                    controller:'footerCtrl',
                }
            },
            resolve:{
                loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                    return $ocLazyLoad.load([
                        './controller/header.js',
                        './controller/footer.js',
                        './controller/articleDetailsCtrl.js'
                    ]);
                }]
            }
        })
    });
    homeModule.controller('homeCtrl', ['$scope','$ocLazyLoad', function($scope,$ocLazyLoad){

    }])

    return {
        init: function(){
            angular.bootstrap($('#homeApp'),['homeModule']);
        }
    }
})