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
                    console.log(activityData);
                    if(activityData.re == '0'){
                        return activityData.data;
                    }else{
                        return '获取活动列表信息失败'
                    }
                }


                this.getAllCatData = getAllCatData;
                this.createMap = createMap;
                this.getActivityData = getActivityData;

            }])

//         }
//     }
// )
