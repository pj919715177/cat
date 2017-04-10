/**
 * Created by kroket on 2017/3/2.
 */
angular.module('mapApp')
    .directive('map',function (){
        return function(scope,element,attrs){
            // scope.createmap(attrs.id);
        }
    })
    .directive('marker',function (){
        return function(scope,element,attrs){
            // scope.addAllMarker();
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
    .directive('validate',function(){
        return function(scope,element,attrs){
                (function(){
        var oBtn = document.getElementById('btn');
        var oW,oLeft;
        var oSlider=document.getElementById('slider');
        var oTrack=document.getElementById('track');
        var oIcon=document.getElementById('icon');
        var oSpinner=document.getElementById('spinner');
    
        oBtn.addEventListener('touchstart',function(e){
            console.log(e);
            var touches = e.touches[0];
            oW = touches.clientX - oBtn.offsetLeft;
            oBtn.className="button";
            oTrack.className="track";
            document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
        },false);
    
        oBtn.addEventListener("touchmove", function(e) {
            var touches = e.touches[0];
            oLeft = touches.clientX - oW;
            if(oLeft < 0) {
                oLeft = 0;
            }else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-30) {
                oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
            }
            oBtn.style.left = oLeft + "px";
            oTrack.style.width=oLeft+ 'px';
        },false);
    
        oBtn.addEventListener("touchend",function() {
            if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
                oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-30);
                oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-30);
                oIcon.style.display='none';
                oSpinner.style.display='block';
            }else{
                oBtn.style.left = 0;
                oTrack.style.width= 0;
            }
            oBtn.className="button-on";
            oTrack.className="track-on";
            document.removeEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
        },false);
    
        function defaultEvent(e) {
            e.preventDefault();
        }
    })();
        }
    })