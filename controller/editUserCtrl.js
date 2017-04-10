/**
 * Created by kroket on 2017/1/31.
 */
var module = angular.module('mapApp');

module.controller('registCtrl',['$scope','$ocLazyLoad','$http',function($scope,$ocLazyLoad,$http){
    $scope.show = {}
    $scope.show.schedule = 'base';
    $scope.canSubFlag = false;

    var msg = {
        registEmailMsg : [
          '邮箱不能为空',
          '邮箱格式错误',
          '邮箱已注册，请选择其他邮箱'
        ],
        registNicknameMsg : [
          '昵称不能为空',
          '昵称'
        ],
        registPasswordMsg : [
          '密码不能为空',
          '密码为6到20个字母或数字组合'
        ],
        registPardenPasswordMsg : [
          '请再次确认密码',
          '确认密码与上面密码不一致'
        ]
    };

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
    $scope.isStrIsTrue = function(type,str){
        switch(type){
            case 'email':
                if(!str){
                    $scope.show.registEmailMsg = msg.registEmailMsg[0];
                    return false;
                }else if(!isEmail(str)){
                    $scope.show.registEmailMsg = msg.registEmailMsg[1];
                    return false;
                }else{
                    $scope.show.registEmailMsg = '';
                    return true;
                }
                // break;
            case 'nickname':
                if(!str){
                    $scope.show.registNicknameMsg = msg.registNicknameMsg[0];
                    return false;
                }else{
                    $scope.show.registNicknameMsg = '';
                    return true;
                }
                // break;
            case 'password':
                if(!str){
                    $scope.show.registPasswordMsg = msg.registPasswordMsg[0];
                    return false;
                }else if(!isPassword(str)){
                    $scope.show.registPasswordMsg = msg.registPasswordMsg[1];
                    return false;
                }else{
                    $scope.show.registPasswordMsg = '';
                    return true;
                }
                // break;
            case 'pardenPassword':
                if(!(str === $scope.registPassword)){
                    $scope.show.registPardenPasswordMsg = msg.registPardenPasswordMsg[1];
                    return false;
                }else{
                    return true;
                }
                // break;
            case 'all':
                if($scope.isStrIsTrue('email',$scope.registEmail) && $scope.isStrIsTrue('nickname',$scope.registNickname)
                     && $scope.isStrIsTrue('password',$scope.registPassword) 
                     && $scope.isStrIsTrue('pardenPassword',$scope.registPardenPassword)){
                        return true;
                }else{
                    return false;
                }
                // break;
            default:
                return false;

        }
    }

    function isEmail(str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }
    function isPassword(str){
        var reg = /^([A-Z]|[a-z]|[0-9]){6,20}$/;
        return reg.test(str)
    }
}]);
