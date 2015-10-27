var jobControllers = angular.module('jobControllers', ['ui.bootstrap']);

jobControllers.controller('ListController', ['$scope', '$http', 'Data', '$uibModal', '$log', '$filter', function ($scope, $http, Data, $uibModal, $log, $filter) {

	$scope.jobsArray = Data;

	$scope.delete = function() {
		console.log(this.job.$$hashKey);

		var found = $filter('filter')($scope.jobsArray, {$$hashKey: this.job.$$hashKey}, true);
		

		if (found.length) {
			$scope.selected = JSON.stringify(found[0]);

	         //fruits.splice(2, 1, "Lemon", "Kiwi");

	         console.log($scope.selected);
	     } else {
	     	$scope.selected = 'Not found';
	     	console.log($scope.selected);
	     }

		//console.log(this.dataset.indexNumber);

		//$scope.whichItem = 

	    //$scope.msg = 'clicked';

	}// end DELETE

	$scope.getJobDuration = function(start,finish) {

		//console.log("start = " + start);
		//console.log("finish = " + finish);


		var time1 = start;

		var time2 = finish;


		var time1Sliced = time1.slice(-2);
		var time2Sliced = time2.slice(-2);

        // console.log("time1Sliced = " + time1Sliced);
        // console.log("time2Sliced = " + time2Sliced);

        time1=time1.slice(0,-2); //slice off last two characters here
        time2=time2.slice(0,-2); //slice off last two characters here



        var time1Split = time1.split(':');
        var time2Split = time2.split(':');

        var hours1 = parseInt(time1Split[0], 10);
        var hours2 = parseInt(time2Split[0], 10);
        var mins1 = parseInt(time1Split[1], 10);
        var mins2 = parseInt(time2Split[1], 10);

        //console.log("hours1 = " + hours1 + ": hours2 = " + hours2);

        if(time1Sliced==="am"){
            //console.log('time1Sliced==am');

        }else{
            //console.log('time1Sliced==pm');

            if(hours1===12){

            }else{
            	hours1 = hours1+12;
            }
            
        }

        if(time2Sliced==="am"){
            //console.log('time2Sliced==am');

        }else{
            //console.log('time2Sliced==pm');

            if(hours2===12){

            }else{
            	hours2 = hours2+12;
            }
        }

        //console.log("hours1 = " + hours1 + ": hours2 = " + hours2);

        var hours = hours2 - hours1, mins = 0;

        if(hours < 0) hours = 24 + hours;

        if(mins2 >= mins1) {
        	mins = mins2 - mins1;
        } else {
        	mins = (mins2 + 60) - mins1;
        	hours--;
        }

        mins = mins / 60; // take percentage in 60

        hours += mins;

        hours = hours.toFixed(2);

        // console.log("time1 = " + time1);
        // console.log("time2 = " + time2);

        // console.log("hours1 = " + hours1);
        // console.log("hours2 = " + hours2);

         //console.log("hours = " + hours);

         duration = hours;

         return duration;


        //return 'abc';
    };



	$scope.animationsEnabled = true;

    // EDIT ITEM
    $scope.openEdit = function(jobId) {

    	console.log('jobId = ' + jobId);

    	$scope.jobId = jobId;

	      $scope.modalInstance = $uibModal.open({
	      	templateUrl: 'partials/edit.html',
			controller: 'EditItemController',
	        scope: $scope
	      });

	      $scope.modalInstance.result.then(function () {
				//$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal edit item dismissed at: ' + new Date());
			});
	};// END $scope.openEdit = function(jobId) {

    $scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};

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


// EIDT JOB ITEM STUFF
jobControllers.controller('ModalEditCtrl', ['$scope', 'Data', '$uibModal', '$log', function ($scope, Data, $uibModal, $log) {

		console.log('ModalEditCtrl CALLED');

		$scope.jobsArray = Data;

		console.log($scope.jobsArray);

		$scope.animationsEnabled = true;
		
		$scope.open = function() {
	      $scope.modalInstance = $uibModal.open({
	      	templateUrl: 'partials/edit.html',
			controller: 'EditItemController',
	        scope: $scope
	      });

	      $scope.modalInstance.result.then(function () {
				//$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal edit item dismissed at: ' + new Date());
			});
	    };


		// $scope.ok = function () {
		// 	console.log('$scope.ok = function () {');
		// 	$scope.modalInstance.close();
		// };

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

		// $scope.cancel = function () {
		// 	console.log('$scope.cancel = function () {');
		// 	$scope.modalInstance.dismiss('cancel');
		// };

}]);
// end myApp.controller('MyController', function MyController($scope) {


jobControllers.controller('EditItemController', ['$scope', '$http', 'Data', '$routeParams', '$modalInstance', '$log', function ($scope, $http, Data, $routeParams, $modalInstance, $log) {
		//$('input.timepicker').timepicker({});

		$scope.jobsArray = Data;
		//$scope.whichItem = $routeParams.itemId;
		$scope.whichItem = $scope.jobId;

		$scope.master = {};

		//job.client = "heeeel";

		console.log($scope.jobsArray);

		console.log(this);

		console.log($scope.whichItem);

		console.log($scope.jobsArray[$scope.whichItem]);

		$scope.job = {
			date: $scope.jobsArray[$scope.whichItem].date,
			client: $scope.jobsArray[$scope.whichItem].client,
			ref: $scope.jobsArray[$scope.whichItem].ref,
			number: $scope.jobsArray[$scope.whichItem].number,
			jobstart: $scope.jobsArray[$scope.whichItem].jobstart,
			jobfinish: $scope.jobsArray[$scope.whichItem].jobfinish
		}

		console.log($scope.job.date);

		$scope.job.date = new Date($scope.jobsArray[$scope.whichItem].date);

		//$scope.job.jobstart = new Date($scope.jobsArray[$scope.whichItem].jobstart);


		var d = new Date(),
		    s = $scope.jobsArray[$scope.whichItem].jobstart;

		    console.log("d = " + d);
		    

		    console.log("s = " + s);
		    
		var startMerid = s.slice(-2); // find out am or pm
		console.log("startMerid = " + startMerid);

		s=s.slice(0,-2); //slice off last two characters here

		console.log("s 1 = " + s);

		var startSplit = s.split(':');
        

        var stHours1 = parseInt(startSplit[0], 10);
        var stMins1 = parseInt(startSplit[1], 10);

        console.log("stHours1 = " + stHours1 + ": stMins1 = " + stMins1);

        if(startMerid==="am"){
            //console.log('time2Sliced==am');

        }else{
            //console.log('time2Sliced==pm');

            if(stHours1===12){

            }else{
            	stHours1 = stHours1+12;
            }
        }

		d.setHours(stHours1);

		console.log("d1 = " + d);

		d.setMinutes(stMins1);

		console.log("d2 = " + d);

		$scope.job.jobstart = d;

		console.log('$scope.job.jobstart = ' + $scope.job.jobstart);

		// FINISH TIME STUFF
		var dft = new Date(),
		    f = $scope.jobsArray[$scope.whichItem].jobfinish;

		    console.log("dft = " + dft);
		    console.log("f = " + f);
		    
		var finishMerid = f.slice(-2); // find out am or pm
		console.log("finishMerid = " + finishMerid);

		f=f.slice(0,-2); //slice off last two characters here

		console.log("f 1 = " + f);

		var finishSplit = f.split(':');
        

        var ftHours1 = parseInt(finishSplit[0], 10);
        var ftMins1 = parseInt(finishSplit[1], 10);

        console.log("ftHours1 = " + ftHours1 + ": ftMins1 = " + ftMins1);

        if(finishMerid==="am"){
            //console.log('time2Sliced==am');

        }else{
            //console.log('time2Sliced==pm');

            if(ftHours1===12){

            }else{
            	ftHours1 = ftHours1+12;
            }
        }

		dft.setHours(ftHours1);

		console.log("f1 = " + f);

		dft.setMinutes(ftMins1);

		console.log("f2 = " + f);

		$scope.job.jobfinish = dft;

		console.log('$scope.job.jobfinish = ' + $scope.job.jobfinish);


		$scope.update = function(job) {
			//console.log();
			$scope.master = angular.copy(job);

			var tempNewDat = $scope.job.date.toLocaleDateString();

			console.log("update $scope.master.date = " + $scope.master.date);
			console.log("update $scope.master.client = " + $scope.master.client);

			//console.log($scope.jobsArray[$scope.whichItem].client);

			// STARTTIME ADJUSTMENTS
			$scope.myEditStartime = $scope.master.jobstart;
			$scope.editHourStart = $scope.myEditStartime.getHours();
			var meridianTemp;

			if($scope.editHourStart > 12){
				$scope.editHourStart = $scope.editHourStart-12;
				meridianTemp = "pm";
			}else{

				if($scope.editHourStart === 0){
					$scope.editHourStart = 12;
					meridianTemp = "am";
				}else if($scope.editHourStart === 12){
					meridianTemp = "pm";
				}else{
					meridianTemp = "am";
				}
			}
			//console.log("new values = " + $scope.hourStart + "" + meridianTemp +  "");
			var tempNewJSTime = "" + $scope.editHourStart + ":" + $scope.myEditStartime.getMinutes() + "" + meridianTemp +  "";

			// FINISHTIME ADJUSTMENTS
			$scope.myEditFinishtime = $scope.master.jobfinish;
			$scope.editHourFinish = $scope.myEditFinishtime.getHours();
			var meridianFtTemp;

			if($scope.editHourFinish > 12){
				$scope.editHourFinish = $scope.editHourFinish-12;
				meridianFtTemp = "pm";
			}else{

				if($scope.editHourFinish === 0){
					$scope.editHourFinish = 12;
					meridianFtTemp = "am";
				}else if($scope.editHourFinish === 12){
					meridianFtTemp = "pm";
				}else{
					meridianFtTemp = "am";
				}
			}
			//console.log("new values = " + $scope.hourStart + "" + meridianTemp +  "");
			var tempNewJFTime = "" + $scope.editHourFinish + ":" + $scope.myEditFinishtime.getMinutes() + "" + meridianFtTemp +  "";


			$scope.jobsArray[$scope.whichItem].date = tempNewDat;
			$scope.jobsArray[$scope.whichItem].client = $scope.master.client;
			$scope.jobsArray[$scope.whichItem].ref = $scope.master.ref;
			$scope.jobsArray[$scope.whichItem].number = $scope.master.number;
			$scope.jobsArray[$scope.whichItem].jobstart = tempNewJSTime;
			$scope.jobsArray[$scope.whichItem].jobfinish = tempNewJFTime;

			console.log($scope.jobsArray[$scope.whichItem].client);

			console.log("update tempNewDat = " + tempNewDat);

		  //localStorage.setItem('jobsObject', JSON.stringify($scope.jobsArray));
		  	localStorage.setItem('jobsObject', angular.toJson($scope.jobsArray));

		  	$modalInstance.close();

		};

		console.log("update $scope.master.date = " + $scope.master.date);
		console.log("update $scope.jobsArray[$scope.whichItem].client = " + $scope.jobsArray[$scope.whichItem].client);
		console.log("$scope.master = " + $scope.master);

		$scope.cancel = function () {
			console.log('$scope.cancel EDIT ITEM = function 222 () {');
			$modalInstance.dismiss('cancelled edit item');
		};

		//console.log($scope.jobsArray);

}]);
// end myApp.controller('EditItemController', function MyController($scope) {

jobControllers.controller('ModalAddCtrl', ['$scope', 'Data', '$uibModal', '$log', function ($scope, Data, $uibModal, $log) {

		console.log('ModalAddCtrl CALLED');

		$scope.jobsArray = Data;

		console.log($scope.jobsArray);

		$scope.animationsEnabled = true;
		
		$scope.open = function() {
	      $scope.modalInstance = $uibModal.open({
	      	templateUrl: 'partials/addjob.html',
			controller: 'AddJobController',
	        scope: $scope
	      });

	      $scope.modalInstance.result.then(function () {
				//$scope.selected = selectedItem;
			}, function () {
				$log.info('Modalllll dismissed at: ' + new Date());
			});
	    };


		// $scope.ok = function () {
		// 	console.log('$scope.ok = function () {');
		// 	$scope.modalInstance.close();
		// };

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

		// $scope.cancel = function () {
		// 	console.log('$scope.cancel = function () {');
		// 	$scope.modalInstance.dismiss('cancel');
		// };

}]);
// end myApp.controller('MyController', function MyController($scope) {

jobControllers.controller('AddJobController', ['$scope', '$http', 'Data', '$modalInstance', function ($scope, $http, Data, $modalInstance) {

		//$('input.timepickernew').timepicker({ 'scrollDefault': 'now' });

	$scope.jobsArray = Data;
	//$scope.whichItem = $routeParams.itemId;

	$scope.master = {};

	console.log($scope.jobsArray);

	$scope.mytime = new Date();

	//$scope.job.jobstart = new Date();

	//$scope.job.jobstart.setMinutes(00);

	$scope.addJob = function(job) {

		console.log("$scope.addJob = function(job) { CALLED ========");
		console.log($scope.jobsArray);

		//console.log();
		$scope.master = angular.copy(job);

		var tempNewDat = $scope.master.date.toLocaleDateString();

		// STARTTIME ADJUSTMENTS
		$scope.mytime = $scope.master.jobstart;
		$scope.hourStart = $scope.mytime.getHours();
		var meridianTemp;

		if($scope.hourStart > 12){
			$scope.hourStart = $scope.hourStart-12;
			meridianTemp = "pm";
		}else{

			if($scope.hourStart === 0){
				$scope.hourStart = 12;
				meridianTemp = "am";
			}else if($scope.hourStart === 12){
				meridianTemp = "pm";
			}else{
				meridianTemp = "am";
			}
		}
		//console.log("new values = " + $scope.hourStart + "" + meridianTemp +  "");
		var tempNewJSTime = "" + $scope.hourStart + ":" + $scope.mytime.getMinutes() + "" + meridianTemp +  "";

		// FINISHTIME ADJUSTMENTS
		$scope.mytimeFinish = $scope.master.jobfinish;
		$scope.hourFinish = $scope.mytimeFinish.getHours();
		var meridianTemp1;

		if($scope.hourFinish > 12){
			$scope.hourFinish = $scope.hourFinish-12;
			meridianTemp1 = "pm";
		}else{

			if($scope.hourFinish === 0){
				$scope.hourFinish = 12;
				meridianTemp1 = "am";
			}else if($scope.hourFinish === 12){
				meridianTemp1 = "pm";
			}else{
				meridianTemp1 = "am";
			}
		}
		//console.log("new values = " + $scope.hourStart + "" + meridianTemp +  "");
		var tempNewJFTime = "" + $scope.hourFinish + ":" + $scope.mytimeFinish.getMinutes() + "" + meridianTemp1 +  "";

		console.log('$scope.mytime.getHours() = ' + $scope.mytime.getHours());
		console.log('$scope.mytime.getMinutes() = ' + $scope.mytime.getMinutes());

		console.log("addJob $scope.master.date = " + tempNewDat);
		console.log("addJob $scope.master.client = " + $scope.master.client);
		console.log("addJob $scope.master.ref = " + $scope.master.ref);
		console.log("addJob $scope.master.number = " + $scope.master.number);
		console.log("addJob $scope.master.jobstart = " + tempNewJSTime);
		console.log("addJob $scope.master.jobfinish = " + tempNewJFTime);

		$scope.jobsArray.push({
			date: tempNewDat,
			client: $scope.master.client, 
			ref: $scope.master.ref, 
			number: $scope.master.number, 
			jobstart: tempNewJSTime, 
			jobfinish: tempNewJFTime,
			active: true
		});

		// $scope.ok = function () {
		// 	console.log('$scope.ok = function22222 () {');
		// 	$modalInstance.close($scope.selected.item);
		// };

		// $scope.cancel = function () {
		// 	console.log('$scope.cancel = function 2222 () {');
		// 	$modalInstance.dismiss('cancel');
		// };

	  // console.log($scope.jobsArray);
	  // console.log(JSON.stringify($scope.jobsArray));
	  // console.log(angular.toJson($scope.jobsArray));
	  //console.log($scope.jobsArray[$scope.whichItem].client);
	  //$scope.jobsArray[$scope.whichItem].client = $scope.master.client;
	  //console.log($scope.jobsArray[$scope.whichItem].client);

	  localStorage.setItem('jobsObject', angular.toJson($scope.jobsArray));

	  $modalInstance.close();

	};// END $scope.addJob = function(job) {

	$scope.ok = function () {
			console.log('$scope.ok = function22222 () {');
			$modalInstance.close();
		};

	$scope.cancel = function () {
			console.log('$scope.cancel = function 222 () {');
			$modalInstance.dismiss('cancel');
		};

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



jobControllers.controller('ModalTodoCtrl', ['$scope', 'Data', '$uibModal', '$log', function ($scope, Data, $uibModal, $log) {

		console.log('ModalTodoCtrl CALLED');

		$scope.jobsArray = Data;

		console.log($scope.jobsArray);

		$scope.animationsEnabled = true;
		
		$scope.open = function() {
	      $scope.modalInstance = $uibModal.open({
	      	templateUrl: 'partials/todo.html',
			controller: 'TodoController',
	        scope: $scope
	      });

	      $scope.modalInstance.result.then(function () {
				//$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal to do dismissed at: ' + new Date());
			});
	    };


		// $scope.ok = function () {
		// 	console.log('$scope.ok = function () {');
		// 	$scope.modalInstance.close();
		// };

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

		// $scope.cancel = function () {
		// 	console.log('$scope.cancel = function () {');
		// 	$scope.modalInstance.dismiss('cancel');
		// };

}]);
// end myApp.controller('MyController', function MyController($scope) {


jobControllers.controller('TodoController', ['$scope', 'Data', '$modalInstance', function ($scope, Data, $modalInstance) {

		$scope.jobsArray = Data;

		console.log($scope.jobsArray);


	// ACCORDIAN STUFF
	// $scope.oneAtATime = true;

	// $scope.groups = [
	// {
	// 	title: 'Dynamic Group Header - 1',
	// 	content: 'Dynamic Group Body - 1345252345'
	// },
	// {
	// 	title: 'Dynamic Group Header - 2344453',
	// 	content: 'Dynamic Group Body - 2'
	// }
	// ];

	// $scope.items = ['Item 1', 'Item 2', 'Item 3'];

	// $scope.addItem = function() {
	// 	var newItemNo = $scope.items.length + 1;
	// 	$scope.items.push('Item ' + newItemNo);
	// };

	// $scope.status = {
	// 	isFirstOpen: true,
	// 	isFirstDisabled: false
	// };

}]);
// end myApp.controller('MyController', function MyController($scope) {

jobControllers.controller('ModalDemoCtrl', ['$scope', 'Data', '$uibModal', '$log', function ($scope, Data, $uibModal, $log) {

		$scope.jobsArray = Data;

		console.log($scope.jobsArray);

		$scope.items = ['item1', 'item2', 'item3'];

		$scope.animationsEnabled = true;
		console.log('oh wellllll0000');

		$scope.open = function() {
	      $scope.modalInstance = $uibModal.open({
	        templateUrl: 'partials/modal.html',
	        controller: 'ModalInstanceCtrl',
	        scope: $scope
	      });

	      $scope.modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
	    };

		// $scope.open = function (size) {

		// 	console.log('oh wellllll xxxx');

		// 	var modalInstance = $uibModal.open({
		// 		animation: $scope.animationsEnabled,
		// 		templateUrl: 'partials/modal.html',
		// 		controller: 'ModalInstanceCtrl',
		// 		size: size,
		// 		resolve: {
		// 			items: function () {
		// 				return $scope.items;
		// 			}
		// 		}
		// 	});

		// 	console.log('oh wellllllvvvvvvv');

		// 	modalInstance.result.then(function (selectedItem) {
		// 		$scope.selected = selectedItem;
		// 	}, function () {
		// 		$log.info('Modal dismissed at: ' + new Date());
		// 	});
		// };// END $scope.open = function (size) {

		$scope.ok = function () {
			$scope.modalInstance.close($scope.selected.item);
		};


		console.log('oh wellllll 1');

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

}]);
// end myApp.controller('MyController', function MyController($scope) {

	// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

jobControllers.controller('ModalInstanceCtrl', ['$scope', 'Data', '$modalInstance', function ($scope, Data, $modalInstance) {

	console.log('oh wellllll xxxxxx');

	//$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);









