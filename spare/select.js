angular.module('homeModule').controller('selectCtrl', ['$scope',function($scope){
	// console.log(111);
	$scope.msga = 'this is select';
	$scope.selectList = [
		'content1',
		'content2',
		'content3',
	];
}])

    // angular.module('homeModule').controller('headerCtrl',['$scope',function($scope){
    //     $scope.msg = 'this is header';
    // }])
// angular.module('homeModule').factory('selectFac', function(){
// 	var selectList = [
// 		'content1',
// 		'content2',
// 		'content3',
// 	];
// 	return {
// 		selectList:selectList,
// 	}
// })