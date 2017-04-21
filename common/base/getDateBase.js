// define(function(require, exports, module) {
//     var $ = require('jquery');
//     var angular = require('angular');

    // module.exports = function(app){
    var module = angular.module('mapApp');
    module.factory('getDateBaseFactory', [function() {
        var basePath = './bs/';

        //测试，获得全部猫信息
        var getAllCatData = function() {
            var re;
            $.ajax({
                url: basePath + 'bsCat/catdata.json',
                type: "POST",
                dataType: "JSON",
                async: false,
                success: function(data) {
                    re = data;

                },
                error: function() {
                    console.log('getAllCatData获取失败');
                }
            });
            return re;
        }

        //获得全部期刊信息
        var getAllPeriodical = function() {
                var re = null;
                $.ajax({
                    url: basePath + 'bsIndex/data/periodicalData.json',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    success: function(data) {
                        re = data;
                    },
                    error: function() {
                        console.log('getPeriodical获取失败');
                    }
                });
                return re;
            }
            //获得用户推荐信息
        var getUserRec = function() {
                var re = null;
                $.ajax({
                    url: basePath + 'bsIndex/data/userRec.json',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    success: function(data) {
                        re = data;
                    },
                    error: function() {
                        console.log('getUserRec获取失败');
                    }
                });
                return re;
            }
            //获取活动信息
        var getActivityRecData = function() {
            var re = null;
            $.ajax({
                url: './interface/activity.php?opt=getAll',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    re = data;
                    console.log(data)
                },
                error: function() {
                    console.log('getaActivityData--DateBase获取失败');
                }
            });
            return re;
        }
        //获取我的发布活动信息
        var getMyActivityIntroduceData = function(email){
            var re = null;
            $.ajax({
                url: './interface/activity.php?opt=getByhost',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                data:{
                    host_email:email
                },
                success: function(data) {
                    re = data;
                    console.log(data)
                },
                error: function() {
                    console.log('getMyActivityIntroduceData--DateBase获取失败');
                }
            });
            return re;
        }
        //根据ID获取活动信息
        var getActivityById = function(id){
            var re = null;
            $.ajax({
                url: './interface/activity.php?opt=getById',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                data:{
                    id:id
                },
                success: function(data) {
                    re = data;
                    console.log(data)
                },
                error: function() {
                    console.log('getActivityById--DateBase获取失败');
                }
            });
            return re;
        }
        //通过活动ID获取参与者名单
        var getApplicantListByActivityID = function(activityID){
            var re = null;
            $.ajax({
                url: basePath + 'bsCat/applicant.json',
                type: 'POST',
                data:activityID,
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    re = data;
                    console.log(re);
                },
                error: function() {
                    console.log('getaActivityData--DateBase获取失败');
                }
            });
            return re;
        }
        //登陆
        var login = function(userEmail,password){
            var re = null;
            $.ajax({
                url: './interface/login.php',
                type: 'POST',
                data:{
                    email : userEmail,
                    password : password
                },
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    re = data;
                    console.log(re);
                },
                error: function() {
                    console.log('login--DateBase获取失败');
                }
            })
            return re;
        }
        //获取用户详情
        var getUserByEmail = function(email){
            var re = null;
            $.ajax({
                url: './interface/getUser.php',
                type: 'POST',
                data:{
                    email : email
                },
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    re = data;
                    console.log(re);
                },
                error: function() {
                    console.log('getUserByEmail--DateBase获取失败');
                }
            })
            return re;
        }
        //登出
        var logout = function(){
            var re = null;
            $.ajax({
                url:'./interface/logout.php',
                type:'POST',
                dataType: 'JSON',
                async:false,
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('logout--DateBase获取失败');
                }
            })
            return re;
        }
        //是否登录
        var isLogin = function(){
            var re = null;
            $.ajax({
                url:'./interface/isLogin.php',
                type:'POST',
                async:false,
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('isLogin--DateBase获取失败');
                }
            })
            return re;
        }
        //修改用户资料
        var editUserDetail = function(id,nickname,email,signature,imgUrl){
            var re = null;
            $.ajax({
                url:'./interface/edit.php',
                type:'POST',
                async:false,
                data:{
                    id:id,
                    nickname:nickname,
                    email:email,
                    signature:signature,
                    imgUrl:imgUrl
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('editUserDetail--DateBase获取失败');
                }
            })
            return re;
        }
        //提交图片
        var changeImg = function(newUrl,fileName){
            var re = {};
            $.ajax({
                url:'./interface/ImgCtrl.php?opt='+newUrl,
                data:{
                    fileName:fileName
                },
                dataType:'JSON',
                type:'POST',
                async:false,
                success:function(data){
                    console.log(data)
                    if(data.re === 0){
                        re.re = 0;
                        re.data = data.data;
                    }else{
                        re.re = 1;
                    }
                },
                error:function(){
                    re.re = 1;
                }
            })
            return re;
        }
        var takeInDB = function(type,url,outId){
            var re = {};
            $.ajax({
                url:'./interface/ImgCtrl.php?opt=takeInDB',
                data:{
                    type:type,
                    url:url,
                    outId:outId
                },
                dataType:'JSON',
                type:'POST',
                async:false,
                success:function(data){
                    re = data;
                    console.log(data);
                },
                error:function(){
                    console.log('takeInDB失败');
                }
            })
            return re;
        }
        //修改密码
        var editPassword = function(email,oldpassword,newpassword){
            var re = null;
            $.ajax({
                url:'./interface/editPassword.php',
                type:'POST',
                async:false,
                data:{
                    email:email,
                    oldpassword:oldpassword,
                    newpassword:newpassword
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('editPassword--DateBase获取失败');
                }
            })
            return re;
        }
        //提交添加活动信息
        var inputAddActivity = function(addActivityData){
            var re = null;
            $.ajax({
                url:'./interface/activity.php?opt=add',
                type:'POST',
                async:false,
                data:{
                    activityName:addActivityData.activityName,
                    latitude:0,
                    longitude:0,
                    host_email:addActivityData.host_email,
                    startTime:addActivityData.startTime,
                    endTime:addActivityData.endTime,
                    applyStartTime:addActivityData.applyStartTime,
                    applyEndTime:addActivityData.applyEndTime,
                    theme:addActivityData.theme,
                    introduce:addActivityData.introduce,
                    process:'process',
                    coverImg:addActivityData.coverImg,
                    location:addActivityData.location
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('inputAddActivity--DateBase获取失败');
                }
            })
            return re;
        }
        //提交活动编辑信息
        var inputEditActivity = function(activityData){
            var re = null;
            $.ajax({
                url:'./interface/activity.php?opt=edit',
                type:'POST',
                async:false,
                data:{
                    id:activityData.id,
                    activityName:activityData.activityName,
                    latitude:0,
                    longitude:0,
                    host_email:activityData.host_email,
                    startTime:activityData.startTime,
                    endTime:activityData.endTime,
                    applyStartTime:activityData.applyStartTime,
                    applyEndTime:activityData.applyEndTime,
                    theme:activityData.theme,
                    introduce:activityData.introduce,
                    process:'process',
                    coverImg:activityData.coverImg,
                    location:activityData.location
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('inputEditActivity--DateBase获取失败');
                }
            })
            return re;
        }
        //删除图片
        var delImg = function(url){
            var re = null;
            $.ajax({
                url:'./interface/ImgCtrl.php?opt=del',
                type:'POST',
                async:false,
                data:{
                    delFile:url
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('delImg--DateBase获取失败');
                }
            })
            return re;
        }
        //删除活动
        var delActivityById = function(id){
            var re = null;
            $.ajax({
                url:'./interface/activity.php?opt=del',
                type:'POST',
                async:false,
                data:{
                    id:id
                },
                dataType: 'JSON',
                success:function(data){
                    re = data;
                    console.log(re);
                },
                error: function(){
                    console.log('delImg--DateBase获取失败');
                }
            })
            return re;
        }

        return {
            getAllCatData: getAllCatData,
            getAllPeriodical: getAllPeriodical,
            getUserRec: getUserRec,
            getActivityRecData: getActivityRecData,
            getApplicantListByActivityID: getApplicantListByActivityID,
            login: login,
            getUserByEmail:getUserByEmail,
            logout: logout,
            isLogin: isLogin,
            editUserDetail:editUserDetail,
            editPassword: editPassword,
            changeImg:changeImg,
            inputAddActivity:inputAddActivity,
            getMyActivityIntroduceData:getMyActivityIntroduceData,
            getActivityById:getActivityById,
            inputEditActivity:inputEditActivity,
            delImg:delImg,
            delActivityById:delActivityById,
            takeInDB:takeInDB
        }

    }])

    // 	}
// })
