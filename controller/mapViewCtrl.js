angular.module('mapApp').controller('mapViewCtrl',['$scope','mapService',function($scope,mapService){


	$scope.show = {};
	$scope.map = null;
	$scope.catMarkerList = new Array;
	$scope.catData = new Array;
	$scope.catDetail = {
	}
	$scope.show.openUserBombFlag = false;//是否显示user基础信息弹框
	$scope.activityAllList = new Array();
	$scope.userDetail = null;
	$scope.isLogin = false;
	$scope.addActivity = {};
    $scope.addActivity.coverImg = './file/addNewImg.jpg';
    $scope.addActivity.ImgList = [];


	mapService.isLogin(function(re){
		if(re === '1'){
			$scope.userDetail = null;
			$scope.isLogin = false;
		}else{
			$scope.userDetail = re.data;
			$scope.isLogin = true;
		}
	});

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
	//图片上传
    $scope.upToSpare = function(ele,type){ 
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
            	if(type == 'activity'){
                	if(data.re === 0){
                	    $scope.addActivity.coverImg = './file/spare/'+data.data;
                	    $scope.addActivity.coverImgName = data.data;
                	    $scope.$apply();
                	}else{
                	    $scope.addActivity.coverImg = './file/addNewImg.jpg';
                	    $scope.$apply();
                	}
            	}else if(type == 'editActivity'){
            		if(data.re === 0){
                	    $scope.editActivity.coverImg = './file/spare/'+data.data;
                	    $scope.editActivity.coverImgName = data.data;
                	    $scope.$apply();
                	}else{
                	    $scope.editActivity.coverImg = './file/addNewImg.jpg';
                	    $scope.$apply();
                	}
            	}else if(type == 'activityImgList'){
            		if(data.re === 0){
            			$scope.$apply(function(){
            				var imgObj = {
            					imgUrl : './file/spare/' + data.data,
            					imgName : data.data
            				}
            				$scope.addActivity.ImgList.push(imgObj);
            			})
            		}else{
            			layer.msg('图片上传错误');
            		}
            	}else if(type == 'editActivityImgList'){
            		if(data.re === 0){
            			$scope.$apply(function(){
            				var imgObj = {
            					imgUrl : './file/spare/' + data.data,
            					imgName : data.data
            				}
            				$scope.editActivity.ImgList.push(imgObj);
            			})
            		}else{
            			layer.msg('图片上传错误');
            		}
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                console.log(e);
            }
        })
    } 
	//弹出发布活动弹窗
	$scope.openAddActivityForm = function(){
		var windowWidth = document.body.clientWidth;
		var layerAres = 'auto';
		var closeBtn = 1;
		if(windowWidth <= 320){  //不可能
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if(windowWidth > 320 && windowWidth <= 767){  //手机屏幕
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if (windowWidth > 767 && windowWidth <= 992){ //平板屏幕
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth > 992 && windowWidth <= 1200){ //小的电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth >1200){ //大屏电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}
		$scope.addActivityFormLayer = layer.open({
			type: 1,
			title: false,
			area: layerAres,
			closeBtn:closeBtn,
			scrollbar: false,
			shadeClose: true,
			content: $('#addActive'),
			success:function(){
				$scope.addActivity = {};
    			$scope.addActivity.coverImg = './file/addNewImg.jpg';
    			$scope.addActivity.ImgList = [];
			}
		})
	}
	//弹出活动弹窗
	$scope.openActivityList = function(){
		var windowWidth = document.body.clientWidth;
		var layerAres = 'auto';
		var closeBtn = 1;
		if(windowWidth <= 320){  //不可能
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if(windowWidth > 320 && windowWidth <= 767){  //手机屏幕
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if (windowWidth > 767 && windowWidth <= 992){ //平板屏幕
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth > 992 && windowWidth <= 1200){ //小的电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth >1200){ //大屏电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}
		$scope.activityListLayer = layer.open({
			type:1,
			title:false,
			area: layerAres,
			closeBtn : closeBtn,
			shadeClose: true,
			scrollbar: false,
			content:$('#activityBomb'),
			success:function(){
				var activityData = mapService.getActivityData();
				for(i in activityData){
					activityData[i].discriptShow = false;
					activityData[i].applicantListShow = false;
				}
				if(typeof activityData === 'string'){
					layer.msg(activityData);
				}else{
					$scope.activityAllList = activityData;
				}
			}

		})
	}
	//弹出我的活动弹窗
	$scope.openMyActivityList = function(){
		if(!$scope.isLogin){
			$scope.openLoginBlock();
		}else{
			var windowWidth = document.body.clientWidth;
			var layerAres = 'auto';
			var closeBtn = 1;
			if(windowWidth <= 320){  //不可能
				var layerAres = ['' + windowWidth + 'px'];
				var closeBtn = 0;
			}else if(windowWidth > 320 && windowWidth <= 767){  //手机屏幕
				var layerAres = ['' + windowWidth + 'px'];
				var closeBtn = 0;
			}else if (windowWidth > 767 && windowWidth <= 992){ //平板屏幕
				var layerAres = ['' + 600 + 'px'];
				var closeBtn = 1;
			}else if(windowWidth > 992 && windowWidth <= 1200){ //小的电脑
				var layerAres = ['' + 600 + 'px'];
				var closeBtn = 1;
			}else if(windowWidth >1200){ //大屏电脑
				var layerAres = ['' + 600 + 'px'];
				var closeBtn = 1;
			}
			$scope.myactivityListLayer = layer.open({
				type:1,
				title:false,
				area: layerAres,
				closeBtn : closeBtn,
				shadeClose: true,
				scrollbar: false,
				content:$('#myactivityBomb'),
				success:function(){
					$scope.showMyactivityIntroduceList();
				}
	
			})
		}
	}
	//展示我发布的活动信息
	$scope.showMyactivityIntroduceList = function(){
		$scope.show.myactivityList = 'introduce';
		var myactivityData = mapService.getMyActivityIntroduceData($scope.userDetail.email);
		for(i in myactivityData){
			myactivityData[i].discriptShow = false;
			myactivityData[i].applicantListShow = false;
		}
		if(typeof myactivityData === 'string'){
			layer.msg(myactivityData);
		}else{
			$scope.myactivityList = myactivityData;
		}
	}
	//展示我参与的活动信息
	$scope.showMyactivityPartList = function(){
		$scope.show.myactivityList = 'part';
		// var myactivityData = mapService.getMyActivityIntroduceData($scope.userDetail.email);
		// for(i in myactivityData){
		// 	myactivityData[i].discriptShow = false;
		// 	myactivityData[i].applicantListShow = false;
		// }
		// if(typeof myactivityData === 'string'){
		// 	layer.msg(myactivityData);
		// }else{
			$scope.myactivityList = [];
		// }
	}
	//展开活动编辑窗口
	$scope.openEditActivity = function(activityID){
		var windowWidth = document.body.clientWidth;
		var layerAres = 'auto';
		var closeBtn = 1;
		if(windowWidth <= 320){  //不可能
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if(windowWidth > 320 && windowWidth <= 767){  //手机屏幕
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if (windowWidth > 767 && windowWidth <= 992){ //平板屏幕
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth > 992 && windowWidth <= 1200){ //小的电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth >1200){ //大屏电脑
			var layerAres = ['' + 600 + 'px'];
			var closeBtn = 1;
		}
		$scope.editActivityFormLayer = layer.open({
			type: 1,
			title: false,
			area: layerAres,
			closeBtn:closeBtn,
			scrollbar: false,
			shadeClose: true,
			content: $('#editActive'),
			success:function(){
    			$scope.editActivity = mapService.getActivityById(activityID);
			}
		})
	}
	//展出或缩起活动参与者列表
	$scope.getApplicantList = function(activityID,applicantListShow,activityType){
		if(activityType == 'all'){
			if(applicantListShow === false){
				var applicantList = mapService.getApplicantListByActivityID(activityID);
				if(typeof applicantList === "string"){
					layer.msg(applicantList);
				}else{
					for(i in $scope.activityAllList){
						if($scope.activityAllList[i].id === activityID){
							$scope.activityAllList[i].applicantList = applicantList;
							$scope.activityAllList[i].applicantListShow = true;
						}
					}
				}
			}else{
				for(i in $scope.activityAllList){
					if($scope.activityAllList[i].id === activityID){
						$scope.activityAllList[i].applicantListShow = false;
					}
				}
			}
		}else if(activityType == 'myIntroduce'){
			if(applicantListShow === false){
				var applicantList = mapService.getApplicantListByActivityID(activityID);
				if(typeof applicantList === "string"){
					layer.msg(applicantList);
				}else{
					for(i in $scope.myactivityIntroduceList){
						if($scope.myactivityIntroduceList[i].id === activityID){
							$scope.myactivityIntroduceList[i].applicantList = applicantList;
							$scope.myactivityIntroduceList[i].applicantListShow = true;
						}
					}
				}
			}else{
				for(i in $scope.myactivityIntroduceList){
					if($scope.myactivityIntroduceList[i].id === activityID){
						$scope.myactivityIntroduceList[i].applicantListShow = false;
					}
				}
			}
		}
	}
	//打开登陆窗口
	$scope.openLoginBlock = function(){
		var windowWidth = document.body.clientWidth;
		var layerAres = 'auto';
		var closeBtn = 1;
		if(windowWidth <= 320){  //不可能
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if(windowWidth > 320 && windowWidth <= 767){  //手机屏幕
			var layerAres = ['' + windowWidth + 'px'];
			var closeBtn = 0;
		}else if (windowWidth > 767 && windowWidth <= 992){ //平板屏幕
			var layerAres = ['' + 400 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth > 992 && windowWidth <= 1200){ //小的电脑
			var layerAres = ['' + 400 + 'px'];
			var closeBtn = 1;
		}else if(windowWidth >1200){ //大屏电脑
			var layerAres = ['' + 400 + 'px'];
			var closeBtn = 1;
		}
		$scope.loginLayer = layer.open({
			type:1,
			title:false,
			area: layerAres,
			closeBtn : closeBtn,
			shadeClose: true,
			content:$('#loginBlock')
		})
	}
	//提交登陆信息
	$scope.login = function(){
		var loginRe = mapService.login($scope.loginUserEmail,$scope.loginUserPassword);
		if(typeof(loginRe) === 'object' && loginRe.status === '0'){  //成功
			$scope.show.loginMsg = '';
			$scope.userDetail = loginRe.data;
			layer.close($scope.loginLayer);
			$scope.loginLayer = null;
			$scope.isLogin = true;
		}else if(loginRe === '1'){
			$scope.show.loginMsg = '用户名或密码错误，请重新登陆';
			$scope.isLogin = false;
		}else{
			$scope.show.loginMsg = '登陆失败';
			$scope.isLogin = false;
		}
	}
	//退出登录
	$scope.logout = function(){
		var re = mapService.logout();
		if(re === '0'){
			$scope.userDetail = null;
			$scope.isLogin = false;
		}else{
			layer.msg('登出失败')
		}
	}
	//关闭活动弹窗
	$scope.closeLayer = function(layerI){
		if(layerI){
			layer.close(layerI);
			// $scope.activityListLayer = null;
		}
	}
	//提交添加活动
	$scope.inputAddActivity = function(type){
		var addActivityData = {};
		if(type == 'pc'){
			$scope.addActivity.startTime = $('#addActivity-startTime-pc')[0].value;
			$scope.addActivity.endTime = $('#addActivity-endTime-pc')[0].value;
			$scope.addActivity.applyStartTime = $('#addActivity-applyStartTime-pc')[0].value;
			$scope.addActivity.applyEndTime = $('#addActivity-applyEndTime-pc')[0].value;
		}else if(type == 'mobile'){
			$scope.addActivity.startTime = $('#addActivity-startTime')[0].value;
			$scope.addActivity.endTime = $('#addActivity-endTime')[0].value;
			$scope.addActivity.applyStartTime = $('#addActivity-applyStartTime')[0].value;
			$scope.addActivity.applyEndTime = $('#addActivity-applyEndTime')[0].value;
		}

		if(!$scope.addActivity.startTime){
			$scope.addActivity.startTime = '';
			layer.msg('请填写完整活动时间');
			return;
		}
		if(!$scope.addActivity.endTime){
			$scope.addActivity.endTime = ''
			layer.msg('请填写完整活动时间');
			return;
		}
		if(!$scope.addActivity.applyStartTime){
			$scope.addActivity.applyStartTime = '';
			layer.msg('请填写完整报名时间');
			return;
		}
		if(!$scope.addActivity.applyEndTime){
			$scope.addActivity.applyEndTime = '';
			layer.msg('请填写完整报名时间');
			return;
		}
		if(!$scope.addActivity.msgAddress){
			$scope.addActivity.msgAddress = ''
		}
		if(!$scope.addActivity.coverImg){
			$scope.addActivity.coverImg = ''
		}
		if(!$scope.addActivity.coverImgName){
			$scope.addActivity.coverImgName = ''
		}
		if(!$scope.addActivity.introduce){
			$scope.addActivity.introduce = ''
		}
		if(!$scope.addActivity.theme){
			$scope.addActivity.theme = ''
		}

		addActivityData = $scope.addActivity;
		addActivityData.host_email = $scope.userDetail.email;

		var re = mapService.inputAddActivity(addActivityData);
		if(re.code == 1000){
			layer.close($scope.addActivityFormLayer);
			layer.msg('提交成功');
		}else{
			layer.msg('提交失败');
		}
	}
	//提交编辑的活动
	$scope.inputEditActivity = function(type){
		var editActivityData = {};
		if(type == 'pc'){
			$scope.editActivity.startTime = $('#editActivity-startTime-pc')[0].value;
			$scope.editActivity.endTime = $('#editActivity-endTime-pc')[0].value;
			$scope.editActivity.applyStartTime = $('#editActivity-applyStartTime-pc')[0].value;
			$scope.editActivity.applyEndTime = $('#editActivity-applyEndTime-pc')[0].value;
		}else if(type == 'mobile'){
			$scope.editActivity.startTime = $('#editActivity-startTime')[0].value;
			$scope.editActivity.endTime = $('#editActivity-endTime')[0].value;
			$scope.editActivity.applyStartTime = $('#editActivity-applyStartTime')[0].value;
			$scope.editActivity.applyEndTime = $('#editActivity-applyEndTime')[0].value;
		}

		if(!$scope.editActivity.startTime){
			$scope.editActivity.startTime = '';
			layer.msg('请填写完整活动时间');
			return;
		}
		if(!$scope.editActivity.endTime){
			$scope.editActivity.endTime = ''
			layer.msg('请填写完整活动时间');
			return;
		}
		if(!$scope.editActivity.applyStartTime){
			$scope.editActivity.applyStartTime = '';
			layer.msg('请填写完整报名时间');
			return;
		}
		if(!$scope.editActivity.applyEndTime){
			$scope.editActivity.applyEndTime = '';
			layer.msg('请填写完整报名时间');
			return;
		}
		if(!$scope.editActivity.msgAddress){
			$scope.editActivity.msgAddress = ''
		}
		if(!$scope.editActivity.coverImg){
			$scope.editActivity.coverImg = ''
		}
		if(!$scope.editActivity.coverImgName){
			$scope.editActivity.coverImgName = ''
		}
		if(!$scope.editActivity.introduce){
			$scope.editActivity.introduce = ''
		}
		if(!$scope.editActivity.theme){
			$scope.editActivity.theme = ''
		}

		editActivityData = $scope.editActivity;

		var re = mapService.inputEditActivity(editActivityData);
		if(re.ret == 0){
			layer.close($scope.editActivityFormLayer);
			$scope.showMyactivityIntroduceList();
			layer.msg('修改成功')
		}else{
			layer.msg('提交失败');
		}
	}
	//删除活动
	$scope.delActivity = function(id){
		var re =  mapService.delActivityById(id);
		if(re.ret === 0){
			layer.msg('删除成功')
		}else{
			layer.msg('删除失败')
		}
		$scope.showMyactivityIntroduceList();
	}
	//验证添加活动信息是否留空
	$scope.checkActivity = function(type,str){
		switch(type){
			case 'activityName':
			    if(!str){
                    return false;
                }else{
                    return true;
                }
			case 'location':
			    if(!str){
                    return false;
                }else{
                    return true;
                }
			case 'ishas':
			    if(!str){
                    return false;
                }else{
                    return true;
                }
			case 'all':
                if($scope.checkActivity('activityName',$scope.addActivity.activityName)
                	 && $scope.checkActivity('location',$scope.addActivity.location)
                	 && $scope.checkActivity('ishas',$scope.userDetail)){
                        return true;
                }else{
                    return false;
                }
			case 'editAll':
                if($scope.editActivity && $scope.checkActivity('activityName',$scope.editActivity.activityName)
                	 && $scope.checkActivity('location',$scope.editActivity.location)){
                        return true;
                }else{
                    return false;
                }
		}
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
	//*************************************滑动验证-start****************************************************************

	//*************************************滑动验证-end****************************************************************
}])