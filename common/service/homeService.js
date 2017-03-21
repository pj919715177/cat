define(function(require, exports, module) {
	

    module.exports = function(module) {
        module.factory('homeService', function() {
            var selectList = [
                'content1',
                'content2',
                'content3',
            ];
            return {
                selectList: selectList,
            }
        })
    }
})
