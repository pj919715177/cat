angular.module('mapApp').controller('mapViewCtrl',['$scope','mapService',function($scope,mapService){

	$scope.show = {};
	$scope.map = null;
	$scope.catMarkerList = new Array;
	$scope.catData = new Array;
	$scope.catDetail = {
	}
	$scope.show.openUserBombFlag = false;//是否显示user基础信息弹框
	$scope.activityList = new Array();

	var me = this;

	//初始化地图
	$scope.createmap = function(container){
		$scope.map = new AMap.Map(container,{
			resizeENable: true,
			zoom:10
		})
	}
	//向地图添加marker
	$scope.addAllMarker = function (){
		var catData = mapService.getAllCatData();
		if(catData.type === 'catmarker'){
			$scope.catData = catData.data;
			setTimeout(function(){
				for(i in catData.data){
					var marker = new AMap.Marker({
						position:[catData.data[i].LONGITUDE,catData.data[i].LATITUDE],
						content:$('#'+catData.data[i].NAME).get(0),
						extData:{
							picUrl:catData.data[i].PICURL,
							adcode:catData.data[i].adcode
						}
					})
					marker.catId = catData.data[i].NAME;
					AMap.event.addListener(marker, 'click', markerClick);
					$scope.map.add(marker);
					$scope.catMarkerList.push(marker);
				}
				$scope.map.setFitView($scope.catMarkerList);
				addCluster($scope.catMarkerList);
			},0)
		}
	}
	//定位
	$scope.geolocation = function(){
		$scope.map.plugin('AMap.Geolocation', function () {
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				maximumAge: 0,           //定位结果缓存0毫秒，默认：0
				convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: true,        //显示定位按钮，默认：true
				buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			});
			$scope.map.addControl(geolocation);
			geolocation.getCurrentPosition();
		});
	}
	//弹出发布活动弹窗
	$scope.openAddActivityForm = function(){
		layer.open({
			type: 1,
			title: false,
			area: '320px',
			scrollbar: false,
			content: $('#addActive')
		})
	}
	//弹出活动弹窗
	$scope.openActivityList = function(){
		layer.open({
			type:1,
			title:false,
			area:['315px','529px'],
			content:$('#activityBomb'),
			success:function(){
				var activityData = mapService.getActivityData();
				if(typeof activityData === 'string'){
					layer.msg(activityData);
				}else{
					$scope.activityList = activityData;
				}
			}

		})
	}
	//添加聚集
	function addCluster(markerList){
		var sts = [{
			url: "bs/bscat/img/clusterIcon.jpg",
			size: new AMap.Size(32, 32),
			offset: new AMap.Pixel(-16, -30),
			textColor:'#fff'
		}];
		$scope.map.plugin(["AMap.MarkerClusterer"], function() {
			cluster = new AMap.MarkerClusterer($scope.map, markerList, {
				styles: sts
			});
			// var clusterMarkers = cluster.getGridSize();
			// console.log(clusterMarkers);
		});
	}
	//merker点击事件
	function markerClick(e){
		var catData = mapService.getAllCatData();
		if(catData.type === 'catmarker'){
			for(i in catData.data){
				if(catData.data[i].NAME == e.target.catId){
					$scope.catDetail.ImgUrl = catData.data[i].PICURL ;
					$scope.catDetail.Name = catData.data[i].NAME;
					$scope.catDetail.Descript = catData.data[i].cathost;
				}
			}
		}
		$scope.$apply();
		layer.open({
			type: 1,
			shadeClose: true,
			scrollbar: false,
			content: $('#catDetail')//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
		});
	}

	// this.findCityAdcode = function(){
	// 	AMap.service('AMap.DistrictSearch',function(){
	// 		var districtSearch = new AMap.DistrictSearch({
	// 			level : 'country',
	// 			subdistrict : 3
	// 		});
	// 		districtSearch.search('中国',function(status,result){
	// 			console.log(result);
	// 		})
	// 	})
	// }
}])