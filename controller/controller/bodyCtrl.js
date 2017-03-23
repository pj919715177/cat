/**
 * Created by kroket on 2017/1/22.
 */
angular.module('homeModule').controller('bodyCtrl',['$scope',function($scope){
    $scope.msg = 'this is body';
}]);
// angular.module('homeModule').config(function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
//     $stateProvider.state('one',{
//         url:'/',
//         views:{
//             'select':{
//                 templateUrl:'select.html',
//                 // controller:'selectCtrl'
//             },
//             'centent':{
//                 templateUrl:'centent.html',
//                 // controller:'contentCtrl'
//             }
//         },
//         // resolve:{
//         //     loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
//         //         return $ocLazyLoad.load([
//         //             './js/select.js',
//         //             './js/content.js'
//         //         ]);
//         //     }]
//         // }
//     })
// })