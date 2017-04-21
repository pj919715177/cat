/**
 * Created by kroket on 2017/1/31.
 */
var module = angular.module('mapApp');

module.controller('registCtrl',['$scope','$ocLazyLoad','$http',function($scope,$ocLazyLoad,$http){
    $scope.show = {}
    $scope.show.schedule = 'base';
    $scope.canSubFlag = false;
    $scope.registHeadImgUrl = './file/addNewImg.jpg';

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
    $scope.upToSpare = function(ele){ 
        console.log($(ele)[0].id) ;
        $.ajaxFileUpload({
            url: './interface/ImgCtrl.php?opt=addToSpare', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: $(ele)[0].id, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            data:{
                fileName: $(ele)[0].id
            },
            success: function (data)  //服务器成功响应处理函数
            {
                if(data.re === 0){
                    $scope.registHeadImgUrl = './file/spare/'+data.data;
                    $scope.registHeadImgName = data.data;
                    $scope.$apply();
                }else{
                    $scope.registHeadImgUrl = './file/addNewImg.jpg';
                    $scope.$apply();
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                console.log(e);
            }
        })
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
            pushFail = $scope.files[0];
            console.log(pushFail);  
        }else{
            console.log('no files')
        }
        $.ajax({
            url:'./interface/ImgCtrl.php?opt=changeToUser',
            data:{
                fileName:$scope.registHeadImgName
            },
            dataType:'JSON',
            type:'POST',
            async:false,
            success:function(data){
                if(data.re === 0){
                    $scope.registHeadImgUrl = data.data;
                    console.log('头像转移成功');
                }else{
                    console.log('头像转移失败');
                }
            },
            error:function(){
                console.log('头像提交失败');
            }
        })
        var imgUrl = ($scope.registHeadImgUrl=='./file/addNewImg.jpg'?'':$scope.registHeadImgUrl)
        console.log('signature='+$scope.signature+'img='+imgUrl);
        console.log('nickname='+$scope.registNickname+'--email='+$scope.registEmail+'--pass='+$scope.registPassword); 
        $http({  
            method:'post',  
            url:'./interface/addUser.php',  
            data:{
                nickname:$scope.registNickname,
                email:$scope.registEmail,
                password:$scope.registPassword,
                file:pushFail,
                signature:$scope.signature,
                registHeadImgUrl:imgUrl
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
              console.log(req.code);   
              if(req.code == 1000){

                $scope.show.schedule = 'finish';

              }else{
                layer.msg('注册失败，请重试');
                $scope.show.schedule = 'base';
              }
        }).error(function(){
          layer.msg('注册失败，请重试');
          $scope.show.schedule = 'base';
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
