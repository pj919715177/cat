/**
 * Created by kroket on 2017/1/31.
 */
var module = angular.module('mapApp');

module.controller('registCtrl',['$scope','$ocLazyLoad','$http',function($scope,$ocLazyLoad,$http){
    $scope.show = {}
    $scope.show.schedule = 'base';


    //图片上传
    $scope.fileChanged = function(ele){  
        $scope.files = ele.files;  
        $scope.$apply();  
    } 
    //注册基础信息提交
    $scope.addRegist = function(){
        $scope.show.schedule = 'detail';
        // $http({  
        //    method:'post',  
        //    url:'./interface/addUser.php',  
        //    data:{
        //       nickname:$scope.registEmail,
        //       email:$scope.registNickname,
        //       password:$scope.registPassword,
        //    },  
        //    headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
        //    transformRequest: function(obj) {  
        //      var str = [];  
        //      for(var p in obj){  
        //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
        //      }  
        //      return str.join("&");  
        //    }  
        // }).success(function(req){  
        //        console.log(req);   
        // })
    }
    $scope.upUserDetail = function(){
        var pushFail = null;
        if($scope.files){
            console.log($scope.files);  
            pushFail = $scope.files[0];
        }else{
            console.log('no files')
        }
        console.log('signature='+$scope.signature);
        console.log('nickname='+$scope.registNickname+'--email='+$scope.registEmail+'--pass='+$scope.registPassword); 
        $http({  
           method:'post',  
           url:'./interface/addUser.php',  
           data:{
              nickname:$scope.registEmail,
              email:$scope.registNickname,
              password:$scope.registPassword,
              imgUrl:pushFail,
              signature:$scope.signature
           },  
           headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
           transformRequest: function(obj) {  
             var str = [];  
             for(var p in obj){  
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
             }  
             return str.join("&");  
           }  
        }).success(function(req){  
               console.log(req);   
               $scope.show.schedule = 'finish';
        })
    }
}]);
