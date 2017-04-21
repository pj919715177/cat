/**
 * Created by kroket on 2017/1/31.
 */
var module = angular.module('mapApp');

module.controller('editUserCtrl',['$scope','$ocLazyLoad','$http','mapService',function($scope,$ocLazyLoad,$http,mapService){
    $scope.show = {}
    $scope.canSubFlag = false;
    $scope.show.editPassword = false;

    mapService.isLogin(function(re){
      if(re === '1'){        //不可能
        $scope.userDetail = null;
        $scope.isLogin = false;
      }else{
        $scope.userDetail = re.data;
        $scope.isLogin = true;
      }
    })

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
                    $scope.userDetail.imgUrl = './file/spare/'+data.data;
                    $scope.newImgName = data.data;
                    $scope.$apply();
                }else{
                    $scope.userDetail.imgUrl = './file/addNewImg.jpg';
                    $scope.$apply();
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                console.log(e);
            }
        }) 
    } 
    $scope.editUserDetail = function(){
        var pushFail = null;
        if($scope.files){
            console.log($scope.files);  
            pushFail = $scope.files[0];
        }else{
            console.log('no files')
        }

        if(!$scope.userDetail.id){
          $scope.userDetail.id = '';
        }
        if(!$scope.userDetail.nickname){
          $scope.userDetail.nickname = '';
        }
        if(!$scope.userDetail.email){
          $scope.userDetail.email = '';
        }
        if(!$scope.editOldPassword){
          $scope.editNewPassword = '';
        }
        if(!$scope.userDetail.nickname){
          $scope.userDetail.nickname = '';
        }
        if(!$scope.userDetail.signature){
          $scope.userDetail.signature = '';
        }
        if(!$scope.newImgName){
          $scope.newImgName = $scope.userDetail.imgUrl.substring(12);
        }

        mapService.editUserDetail($scope.userDetail.id,
          $scope.userDetail.nickname,
          $scope.userDetail.email,
          $scope.editOldPassword,
          $scope.editNewPassword,
          $scope.userDetail.signature,
          $scope.newImgName,
          function(re){
            if(re.reUserDetail){
              if(re.reUserDetail.code === 1000){
                if(re.rePassword.code === 1000){
                  layer.msg('修改密码与用户信息成功');
                }else if(re.rePassword.code === 1001){
                  layer.msg('修改用户信息成功,修改密码失败！')
                }else if(re.rePassword.code === 1002){
                  layer.msg('修改用户信息成功,修改密码失败！旧密码填写错误！')
                }
              }else{
                if(re.rePassword.code === 1000){
                  layer.msg('修改密码成功，修改用户信息失败');
                }else if(re.rePassword.code === 1001){
                  layer.msg('修改用户信息失败,修改密码失败！')
                }else if(re.rePassword.code === 1002){
                  layer.msg('修改用户信息失败,修改密码失败！旧密码填写错误！')
                }
              }
            }else{
              if(re.code === 1000){
                  layer.msg('修改用户信息成功');
              }else{
                  layer.msg('修改用户信息失败');
              }
            }
            $scope.userDetail = mapService.getUserByEmail($scope.userDetail.email).data;
          }
        );
    }
    $scope.isStrIsTrue = function(type,str){
        switch(type){
            case 'email':
                if(!str){
                    $scope.show.editEmailMsg = msg.registEmailMsg[0];
                    return false;
                }else if(!isEmail(str)){
                    $scope.show.editEmailMsg = msg.registEmailMsg[1];
                    return false;
                }else{
                    $scope.show.editEmailMsg = '';
                    return true;
                }
                // break;
            case 'nickname':
                if(!str){
                    $scope.show.editNicknameMsg = msg.registNicknameMsg[0];
                    return false;
                }else{
                    $scope.show.editNicknameMsg = '';
                    return true;
                }
                // break;
            case 'oldPassword':
                if(!str){
                    $scope.show.editOldPasswordMsg = msg.registPasswordMsg[0];
                    return false;
                }else if(!isPassword(str)){
                    $scope.show.editOldPasswordMsg = msg.registPasswordMsg[1];
                    return false;
                }else{
                    $scope.show.editOldPasswordMsg = '';
                    return true;
                }
                // break;
            case 'newPassword':
                if(!str){
                    $scope.show.editNewPasswordMsg = msg.registPasswordMsg[0];
                    return false;
                }else if(!isPassword(str)){
                    $scope.show.editNewPasswordMsg = msg.registPasswordMsg[1];
                    return false;
                }else{
                    $scope.show.editNewPasswordMsg = '';
                    return true;
                }
                // break;
            case 'pardenPassword':
                if(!(str === $scope.editNewPassword)){
                    $scope.show.editNewPardenPasswordMsg = msg.registPardenPasswordMsg[1];
                    return false;
                }else{
                    return true;
                }
                // break;
            case 'all':
                if($scope.show.editPassword === true){
                  if($scope.isStrIsTrue('nickname',$scope.userDetail.nickname) && $scope.isStrIsTrue('oldPassword',$scope.editOldPassword) && $scope.isStrIsTrue('newPassword',$scope.editNewPassword) && $scope.isStrIsTrue('pardenPassword',$scope.editNewPardenPassword)){
                          return true;
                  }else{
                      return false;
                  }
                }else if($scope.show.editPassword === false){
                  if($scope.isStrIsTrue('nickname',$scope.userDetail.nickname)){
                          return true;
                  }else{
                      return false;
                  }
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
