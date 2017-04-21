// define(
//     function(require, expotrs, module) {
//         var $ = require('jquery');
//         var angular = require('angular');
//         // var markerService = require('./markerService.js');

//         module.exports = function(app) {
//             require('../base/getDateBase.js')(app);

            angular.module('mapApp').service('mapService', ['getDateBaseFactory', function(getDateBaseFactory) {

                var me = this;
                this.map = null;
                this.markerList = [];

                function changeStrToObj(str){
                    return JSON.parse(str);
                }

                //获取全部猫的数据
                var getAllCatData = function(){
                	return getDateBaseFactory.getAllCatData();
                }

                //创建地图,地图对象放在this.map中
                var createMap = function(container) {
                    me.map = new AMap.Map(container, {
                        resizeENable: true,
                        zoom: 10
                    })
                }

                //获取活动列表信息
                var getActivityData = function(){
                    var activityData = getDateBaseFactory.getActivityRecData();
                    if(activityData.ret === 0){
                        return activityData.data;
                    }else{
                        return '获取活动列表信息失败'
                    }
                }
                //获取用户发布的信息
                var getMyActivityIntroduceData = function(email){
                    var activityData = getDateBaseFactory.getMyActivityIntroduceData(email);
                    if(activityData.ret === 0){
                        return activityData.data;
                    }else{
                        return '获取用户发布的活动列表信息失败'
                    }
                }

                //通过活动ID获取参与者名单
                var getApplicantListByActivityID = function(activityID){
                    var applicantList = getDateBaseFactory.getApplicantListByActivityID();
                    if(applicantList.re && applicantList.re == '0'){
                        return applicantList.data;
                    }else{
                        return '获取活动参与者信息失败'
                    }
                }
                //获取用户信息
                var getUserByEmail = function(email){
                    var userDetail = getDateBaseFactory.getUserByEmail(email);
                    if(userDetail){
                        if(userDetail.code === 1000){
                            return userDetail;
                        }else{
                            return '1';
                        }
                    }else{
                        return '1';
                    }
                }
                //登陆
                var login = function(userEmail,password){
                    var re = getDateBaseFactory.login(userEmail,password);
                    if(re){
                        if(re.code === 1000){
                            var userDetail = getUserByEmail(userEmail);
                            if(userDetail === '1'){   //不可能
                                return {
                                    status:'0',
                                    data:'无法获取用户详情'
                                };
                            }else{
                                return {
                                    status:'0',
                                    data:userDetail.data
                                };
                            }
                        }else if(re.code === 1001){
                            return '1';
                        }else{
                            return '2';
                        }
                    }else{
                        return '2';
                    }
                }
                //登出
                var logout = function(){
                    var re = getDateBaseFactory.logout();
                    if(re){
                        if(re.code === 1000){
                            return '0';
                        }else{
                            return '1';
                        }
                    }else{
                        return '1';
                    }
                }
                //测试是否登录
                var isLogin = function(fun){
                    var re = getDateBaseFactory.isLogin();
                    if(re){
                        if(re.code === 1000){

                            var userDetail = getUserByEmail(re.email);
                            fun({
                                status:'0',
                                data:userDetail.data
                            });
                        }else{
                            fun('1');
                        }
                    }else{
                        fun('1');
                    }
                }
                //修改用户详情
                var editUserDetail = function(id,nickname,email,oldpassword,newpassword,signature,imgUrl,fun,){
                    if(oldpassword && oldpassword != ''){
                        var reImg = getDateBaseFactory.changeImg('changeToUser',imgUrl);
                        if(reImg.re === 0){
                        }

                        var reA = getDateBaseFactory.editUserDetail(id,nickname,email,signature,'./file/user/'+imgUrl);
                        var reB = getDateBaseFactory.editPassword(email,oldpassword,newpassword);
                        var re = {
                            reUserDetail : reA,
                            rePassword : reB
                        }
                        fun(re);
                    }else{
                        var reImg = getDateBaseFactory.changeImg('changeToUser',imgUrl);
                        if(reImg.re === 0){
                        }

                        var re = getDateBaseFactory.editUserDetail(id,nickname,email,signature,'./file/user/'+imgUrl);
                        fun(re);
                    }
                }
                //提交添加活动信息
                var inputAddActivity = function(activityData){
                    activityData.coverImg = '';
                    if(activityData.coverImgName != ''){
                        var reImg = getDateBaseFactory.changeImg('changeToActivity',activityData.coverImgName);
                        if(reImg.re === 0){
                            activityData.coverImg = './file/activity/'+activityData.coverImgName;
                        }else{
                            activityData.coverImg = '';
                        }
                    }
                    var re = getDateBaseFactory.inputAddActivity(activityData);
                    if(activityData.ImgList &&　activityData.ImgList.length>0){
                        var imgUrlNameStr = '';
                        for(var i = 0 ; i<activityData.ImgList.length ; i++){
                            imgUrlNameStr += ','+activityData.ImgList[i].imgName;
                        }
                        var reImgUrlList = getDateBaseFactory.changeImg('changeToActivity',imgUrlNameStr.substring(1));
                        if(reImgUrlList.re === 0){
                            getDateBaseFactory.takeInDB('activity',reImgUrlList.data,Number(re.id));
                        }
                    }
                    return re;
                }
                //根据ID获取活动信息
                var getActivityById = function(id){
                    var activityData = getDateBaseFactory.getActivityById(id);
                    if(activityData.ret === 0){
                        return activityData.data[0];
                    }else{
                        return '获取活动信息失败'
                    }
                }
                //提交活动编辑信息
                var inputEditActivity = function(activityData){
                    if(activityData.coverImgName != ''){
                        var reImg = getDateBaseFactory.changeImg('changeToActivity',activityData.coverImgName);
                        if(reImg.re === 0){
                            var oldImg = getActivityById(activityData.id).coverImg;
                            console.log(oldImg)
                            getDateBaseFactory.delImg(oldImg);
                            activityData.coverImg = './file/activity/'+activityData.coverImgName;
                        }
                    }
                    var re = getDateBaseFactory.inputEditActivity(activityData);
                    return re;
                }
                //删除活动
                var delActivityById = function(id){
                    var oldImg = getActivityById(id).coverImg;
                    getDateBaseFactory.delImg(oldImg);
                    return getDateBaseFactory.delActivityById(id);
                }

                this.getAllCatData = getAllCatData;
                this.createMap = createMap;
                this.getActivityData = getActivityData;
                this.getApplicantListByActivityID = getApplicantListByActivityID;
                this.login = login;
                this.logout = logout;
                this.isLogin = isLogin;
                this.editUserDetail = editUserDetail;
                this.getUserByEmail = getUserByEmail;
                this.inputAddActivity = inputAddActivity;
                this.getMyActivityIntroduceData = getMyActivityIntroduceData;
                this.getActivityById = getActivityById;
                this.inputEditActivity = inputEditActivity;
                this.delActivityById = delActivityById;

            }])

//         }
//     }
// )
