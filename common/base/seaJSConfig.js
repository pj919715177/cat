seajs.config({
	base:'./three/',
	alias:{
		"jquery":"jquery/jquery-1.8.3.js",
		"angular":"angular/1.5.6/angular-1.5.6.js"
	}
});
// make it safe to use console.log always
(function (b) {
	function c() {
	}

	for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop();) {
		b[a] = b[a] || c
	}
})((function () {
	try {
		return window.console;
	} catch (err) {
		return window.console = {};
	}
})());
