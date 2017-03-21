/**
 * Created by kroket on 2017/1/31.
 */
// function init(module){
    module.service('indexService',['getDateBaseFactory',function(getDateBaseFactory){
        var me = this;
        //获取放到首页的前三个期刊
        me.getPeriodical = function(){
            var periodicalData = getDateBaseFactory.getAllPeriodical();
            if(periodicalData.re == '1'){
                var returnList = [];
                for(var i = 0 ; i<3 ; i++){
                    returnList.push(periodicalData.data[i]);
                }
                return returnList;
            }else{
                return null;
            }
        };
        //获取用户推荐
        me.getUserRec = function(){
            var userRecData = getDateBaseFactory.getUserRec();
            if(userRecData.re == '1'){
                return userRecData.data;
            }else{
                return null;
            }
        };
        //获取活动推荐
        me.getActivityRecData = function(){
             var activityRecData = getDateBaseFactory.getActivityRecData();
            if(activityRecData.re == '1'){
                return activityRecData.data;
            }else{
                return null;
            }
        }
        me.test = function(){
            console.log(11111);
        }
    }])
// }