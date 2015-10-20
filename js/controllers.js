var jobControllers = angular.module('jobControllers', ['ngAnimate']);

jobControllers.controller('ListController', ['$scope', '$http', 'Data', '$filter', function ($scope, $http, Data, $filter) {

	$scope.jobsArray = Data;


	$scope.delete = function() {
		console.log(this.job.$$hashKey);

		var found = $filter('filter')($scope.jobsArray, {$$hashKey: this.job.$$hashKey}, true);
	    
	    if (found.length) {
	         $scope.selected = JSON.stringify(found[0]);
	         console.log($scope.selected);
	     } else {
	         $scope.selected = 'Not found';
	         console.log($scope.selected);
	     }

		//console.log(this.dataset.indexNumber);

		//$scope.whichItem = 
	    
	    //$scope.msg = 'clicked';

	}

	// console.log(Data);
	// console.log(angular.fromJson(Data));
	// console.log(angular.toJson(Data));
	console.log($scope.jobsArray);
	// console.log(angular.toJson($scope.jobsArray));
}]);
// end myApp.controller('MyController', function MyController($scope) {

jobControllers.controller('DetailsController', ['$scope', '$http', 'Data', '$routeParams', function ($scope, $http, Data, $routeParams) {

		$scope.jobsArray = Data;
		$scope.whichItem = $routeParams.itemId;

		if($routeParams.itemId > 0){
			$scope.prevItem = Number($routeParams.itemId)-1;
		}else{
			$scope.prevItem = $scope.jobsArray.length-1;
		}

		if($routeParams.itemId < $scope.jobsArray.length-1){
			$scope.nextItem = Number($routeParams.itemId)+1;
		}else{
			$scope.nextItem = 0;
		}

		// can edit a`nd update local storage here?
}]);
// end myApp.controller('MyController', function MyController($scope) {

jobControllers.controller('EditItemController', ['$scope', '$http', 'Data', '$routeParams', function ($scope, $http, Data, $routeParams) {

		

		$('input.timepicker').timepicker({});

		$scope.jobsArray = Data;
		$scope.whichItem = $routeParams.itemId;

		$scope.master = {};

		//job.client = "heeeel";

		console.log($scope.jobsArray);

		console.log($scope.whichItem);

		console.log($scope.jobsArray[$scope.whichItem]);

		$scope.job = {
		    date: $scope.jobsArray[$scope.whichItem].date,
		    client: $scope.jobsArray[$scope.whichItem].client,
		    ref: $scope.jobsArray[$scope.whichItem].ref,
		    number: $scope.jobsArray[$scope.whichItem].number,
		    jobstart: $scope.jobsArray[$scope.whichItem].jobstart,
		    jobfinish: $scope.jobsArray[$scope.whichItem].jobstart
		}

		//console.log($scope.job.date);

		//console.log()

		$scope.update = function(job) {
			//console.log();
		  $scope.master = angular.copy(job);

		  console.log("update $scope.master.date = " + $scope.master.date);
		  console.log("update $scope.master.client = " + $scope.master.client);

		  console.log($scope.jobsArray[$scope.whichItem].client);

		  $scope.jobsArray[$scope.whichItem].date = $scope.master.date;
		  $scope.jobsArray[$scope.whichItem].client = $scope.master.client;

		  console.log($scope.jobsArray[$scope.whichItem].client);

		  //localStorage.setItem('jobsObject', JSON.stringify($scope.jobsArray));
		  localStorage.setItem('jobsObject', angular.toJson($scope.jobsArray));

		};

		console.log("update $scope.master.date = " + $scope.master.date);
		console.log("update $scope.jobsArray[$scope.whichItem].client = " + $scope.jobsArray[$scope.whichItem].client);
		console.log("$scope.master = " + $scope.master);

		//console.log($scope.jobsArray);

}]);
// end myApp.controller('EditItemController', function MyController($scope) {


jobControllers.controller('AddJobController', ['$scope', '$http', 'Data', function ($scope, $http, Data) {

	$('input.timepickernew').timepicker({ 'scrollDefault': 'now' });

	$scope.jobsArray = Data;
	//$scope.whichItem = $routeParams.itemId;

	$scope.master = {};

	console.log($scope.jobsArray);

	$scope.addJob = function(job) {

	  console.log("$scope.addJob = function(job) { CALLED ========");
	  console.log($scope.jobsArray);

		//console.log();
	  $scope.master = angular.copy(job);

	  console.log("addJob $scope.master.date = " + $scope.master.date);
	  console.log("addJob $scope.master.client = " + $scope.master.client);
	  console.log("addJob $scope.master.ref = " + $scope.master.ref);
	  console.log("addJob $scope.master.number = " + $scope.master.number);
	  console.log("addJob $scope.master.jobstart = " + $scope.master.jobstart);
	  console.log("addJob $scope.master.jobfinish = " + $scope.master.jobfinish);

	  $scope.jobsArray.push({
			  date: $scope.master.date,
		      client: $scope.master.client, 
		      ref: $scope.master.ref, 
		      number: $scope.master.number, 
		      jobstart: $scope.master.jobstart, 
		      jobfinish: $scope.master.jobfinish,
		      active: true
		    });

	  // console.log($scope.jobsArray);
	  // console.log(JSON.stringify($scope.jobsArray));
	  // console.log(angular.toJson($scope.jobsArray));
	  //console.log($scope.jobsArray[$scope.whichItem].client);
	  //$scope.jobsArray[$scope.whichItem].client = $scope.master.client;
	  //console.log($scope.jobsArray[$scope.whichItem].client);

	  localStorage.setItem('jobsObject', angular.toJson($scope.jobsArray));

	};// END $scope.addJob = function(job) {

	// console.log("update $scope.master.date = " + $scope.master.date);
	//   console.log("update $scope.master.client = " + $scope.master.client);
	// console.log("$scope.master = " + $scope.master);
	//console.log($scope.jobsArray);
	// can edit a`nd update local storage here?
}]);
// end myApp.controller('AddJobController', function MyController($scope) {

jobControllers.controller('InfoController', ['$scope', 'Data', function ($scope, Data) {

	$scope.jobsArray = Data;

	console.log($scope.jobsArray);

}]);
// end myApp.controller('MyController', function MyController($scope) {



