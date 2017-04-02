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
                url: basePath + 'bsCat/activityData.json',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    re = data;
                },
                error: function() {
                    console.log('getaActivityData--DateBase获取失败');
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

        return {
            getAllCatData: getAllCatData,
            getAllPeriodical: getAllPeriodical,
            getUserRec: getUserRec,
            getActivityRecData: getActivityRecData,
            getApplicantListByActivityID: getApplicantListByActivityID
        }

    }])

    // 	}
// })
