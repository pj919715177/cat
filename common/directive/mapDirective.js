/**
 * Created by kroket on 2017/3/2.
 */
angular.module('mapApp')
    .directive('map',function (){
        return function(scope,element,attrs){
            scope.createmap(attrs.id);
        }
    })
    .directive('marker',function (){
        return function(scope,element,attrs){
            scope.addAllMarker();
        }
    })
    .directive('tips',function(){
        return function(scope,element,attrs){
            element.bind({
                mouseenter: function(e) {
                    var that = this;
                    var layerId = layer.tips(attrs.tips, that,{
                        time:800
                    }); //在元素的事件回调体中，follow直接赋予this即可
                }
            })
        }
    })
    .directive('outFocus',function(){
        return function(scope,element,attrs){
            element.bind({
                mouseenter: function(e) {
                    var that = this;
                    var layerId = layer.tips(attrs.outFocus, that,{
                        time:800
                    }); //在元素的事件回调体中，follow直接赋予this即可
                }
            })
        }
    })