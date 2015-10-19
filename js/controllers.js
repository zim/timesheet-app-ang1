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

		$scope.update = function(job) {

			//console.log();
		  $scope.master = angular.copy(job);

		  console.log("update $scope.master.date = " + $scope.master.date);
		  console.log("update $scope.master.client = " + $scope.master.client);

		};

		console.log("update $scope.master.date = " + $scope.master.date);
		  console.log("update $scope.master.client = " + $scope.master.client);
		console.log("$scope.master = " + $scope.master);


		//console.log($scope.jobsArray);


		// can edit a`nd update local storage here?
}]);
// end myApp.controller('MyController', function MyController($scope) {



