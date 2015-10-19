var myApp = angular.module('myApp', [

	'ngRoute',
	'jobControllers'

]);

myApp.factory('Data', function () {
  //return { message: "I'm data from a service" };
  // CHECK TO SEE IF LOCAL IS AVAILABLE
	if ( typeof (Storage) != "undefined") {

		// CHECK TO SEE IF LOCAL STORAGE HAS BEEN SET
		if (localStorage.getItem("jobsObject") === null) {
			console.log('jobsObject = null');
			//  BEGIN AJAX CALL
			$http.get('js/jobsData.json').success(function(data){

				return data;
			});
			// end $.ajax({

		} else {// IF LOCAL STORAGE SET THEN GET ALL DEBTOBJECTS FROM
			console.log('LOCAL STORAGE SET');

			console.log(localStorage.getItem('jobsObject'));
//angular.toJson($scope.user)
			console.log(angular.fromJson(localStorage.getItem('jobsObject')));



			//return JSON.parse(localStorage.getItem('jobsObject'));
			return angular.fromJson(localStorage.getItem('jobsObject'));



		}// if (localStorage.getItem("testObject") === null) {

	} else {
		// 	document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}// end if (typeof(Storage) != "undefined") {

});

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	when('/details/:itemId', {
		templateUrl: 'partials/details.html',
		controller: 'DetailsController'
	}).
	when('/edit/:itemId', {
		templateUrl: 'partials/edit.html',
		controller: 'EditItemController'
	}).
	when('/addjob', {
		templateUrl: 'partials/addjob.html',
		controller: 'AddJobController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);