var jobControllers = angular.module('jobControllers', ['ngAnimate']);

jobControllers.controller('ListController', ['$scope', '$http', 'Data', function ($scope, $http, Data) {

	$scope.jobsArray = Data;

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

		$scope.jobsArray = Data;
		$scope.whichItem = $routeParams.itemId;

		$scope.master = {};


		console.log($scope.jobsArray);

		console.log($scope.whichItem);

		console.log($scope.jobsArray[$scope.whichItem]);

		$scope.update = function(job) {

			//console.log();
		  $scope.master = angular.copy(job);

		  console.log("update $scope.master.date = " + $scope.master.date);
		  console.log("update $scope.master.client = " + $scope.master.client);

		  console.log($scope.jobsArray[$scope.whichItem].client);

		  $scope.jobsArray[$scope.whichItem].client = $scope.master.client;

		  console.log($scope.jobsArray[$scope.whichItem].client);

		  localStorage.setItem('jobsObject', JSON.stringify($scope.jobsArray));

		};

		console.log("update $scope.master.date = " + $scope.master.date);
		  console.log("update $scope.master.client = " + $scope.master.client);
		console.log("$scope.master = " + $scope.master);


		//console.log($scope.jobsArray);


		// can edit a`nd update local storage here?
}]);
// end myApp.controller('EditItemController', function MyController($scope) {


jobControllers.controller('AddJobController', ['$scope', '$http', 'Data', function ($scope, $http, Data) {

	$('input.timepickernew').timepicker({ 'scrollDefault': 'now' });

	$scope.jobsArray = Data;
	//$scope.whichItem = $routeParams.itemId;

	$scope.master = {};


	console.log($scope.jobsArray);

	//console.log($scope.whichItem);

	//console.log($scope.jobsArray[$scope.whichItem]);

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

	console.log($scope.jobsArray);

	  //console.log($scope.jobsArray[$scope.whichItem].client);

	  //$scope.jobsArray[$scope.whichItem].client = $scope.master.client;

	  //console.log($scope.jobsArray[$scope.whichItem].client);

	  //localStorage.setItem('jobsObject', JSON.stringify($scope.jobsArray));

	};// END $scope.addJob = function(job) {

	// console.log("update $scope.master.date = " + $scope.master.date);
	//   console.log("update $scope.master.client = " + $scope.master.client);
	// console.log("$scope.master = " + $scope.master);


	//console.log($scope.jobsArray);


	// can edit a`nd update local storage here?
}]);
// end myApp.controller('AddJobController', function MyController($scope) {




