/**
 * Created by kroket on 2017/1/31.
 */
// define(function(require,exports,module){

    // function initIndexCtrl(module){
      var module = angular.module('homeModule');

      module.controller('indexCtrl',['$scope','$ocLazyLoad','indexService',function($scope,$ocLazyLoad,indexService){
            $scope.bsBasePath = "./bs/bsIndex";

            $scope.msg = 'this is index';
            // $scope.adList = [];
            $scope.periodicalList = [];
            $scope.userRecList = [];
            $scope.activityList = [];

            // indexService.test();
            //填充首页期刊
            function fillPeriodical(){
                  $scope.periodicalList = indexService.getPeriodical();
            }
            fillPeriodical();

            //填充用户推荐
            function fillUserRec(){
                  $scope.userRecList = indexService.getUserRec();
            }
            fillUserRec();

            //填充活动推荐
            function fillActivityRec(){
                  $scope.activityList = indexService.getActivityRecData();
                  console.log($scope.activityList);
            }
            fillActivityRec();

            // //填充首页广告图片
            // function fillAd(Data){
            //     if(Data != null || Data.length > 0){
            //         // var adPicStr = "";
            //         // var adListidstr = "";
            //         // for(var i=0 ; i<Data.length ; i++){
            //         //     adPicStr += '<li><a href="' + basePath +  Data[i].url + '"><img src="' + basePath + Data[i].imgUrl + '" alt=' + Data[i].name + '></a></li>';
            //         //     adListidstr += '<li><a></a></li>';
            //         // }
            //         // $('#adPic ul').append(adPicStr);
            //         // $('#adList ul').append(adListidstr);

            //     }
            // }
            // //填充首页期刊

            // // function fillPeriodical(data){
            // //     if(data != null || data.length > 0){
            // //         var str = "";
            // //         for(var i=0 ; i<data.length && i<3 ; i++){
            // //             if(i==0){
            // //                 str +=      '<div class="periodical-first">'+
            // //                     '<img class="img-set" src="' + basePath + data[i].imgUrl + '" alt="' + data[i].name + '">'+
            // //                     '<p class="img-dis">' + data[i].discript + '</p>'+
            // //                     '</div>';
            // //             }else{
            // //                 if(i==1){
            // //                     str += '<div class="periodical-other">';
            // //                 }
            // //                 str +=  '<div class="periodical-otherin">'+
            // //                     '<img class="img-set" src="' + basePath +  data[i].imgUrl + '" alt="' + data[i].name + '">'+
            // //                     '<p class="img-dis">' + data[i].discript + '</p>'+
            // //                     '</div>';
            // //                 if(i==2){
            // //                     str += '</div>';
            // //                 }
            // //             }
            // //         }
            // //         $('#periodicalBlock').append(str);
            // //     }
            // // }
            // function fillPeriodical(){
            //     $scope.periodicalList = indexService.getPeriodical();
            //     console.log(indexService.getPeriodical());
            //     a = indexService.getPeriodical();
            // }
            // fillPeriodical();
            // //填充原创推荐
            // function fillOriginal(data){
            //     if(data != null || data.length > 0){
            //         var str = "";
            //         for(var i=0 ; i<data.length && i<3 ; i++){
            //             if(i==0){
            //                 str +=      '<div class="original-first">'+
            //                     '<img class="original-img" src="' + basePath +  data[i].imgUrl + '" alt="' + data[i].name + '">'+
            //                     '<div class="original-title">'+
            //                     '<h5>' + data[i].name + '</h5>'+
            //                     '<p class="original-order">' + data[i].author + '</p>'+
            //                     '<p class="original-date">'+ data[i].createDate + '</p>'+
            //                     '</div>'+
            //                     '<p class="img-dis">' + data[i].discript + '</p>'+
            //                     '</div>';
            //             }else {
            //                 str +=      '<div class="original-other">'+
            //                     '<img class="img-set" src="' + basePath +  data[i].imgUrl + '" alt="' + data[i].name + '">'+
            //                     '<p class="img-dis">' + data[i].name + '</p>'+
            //                     '<p class="original-order">'+ data[i].createDate + '</p>'+
            //                     '</div>';
            //             }
            //         }
            //         $('#originalBlock').append(str);
            //     }
            // }
            // //填充活动列表
            // function fillActivity(data){
            //     if(data != null || data.length > 0){
            //         var str = "";
            //         for(var i=0 ; i<data.length && i<6 ; i++){
            //             str +=      '<div class="activity-block">'+
            //                 '<img class="img-set" src="' + basePath +  data[i].imgUrl + '" alt="' + data[i].name + '">'+
            //                 '<div class="activity-dis">'+
            //                 '<h3>' + data[i].name + '</h3>'+
            //                 '<div class="activity-dis-content">'+
            //                 '<p>时间：' + data[i].date + '</p>'+
            //                 '<p>地点：' + data[i].address + '</p>'+
            //                 '</div>'+
            //                 '</div>'+
            //                 '</div>';
            //         }
            //         $('#activityBlock').append(str);
            //     }
            // }
            // //首页图片轮播
            // function carousel(){

            // }
        }]);

    // }
// })
