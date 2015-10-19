/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the timesheetStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('timesheetmvc')
	.controller('TimesheetCtrl', function TimesheetCtrl($scope, $routeParams, $filter, store) {
		'use strict';

		// $scope.job = {
	 //        id: 1,
	 //        name: 'Job Item',
	 //        client: 'Zurich',
	 //        tasks: [
	 //            { id: 1, name: 'Task One', duration: 30},
	 //            { id: 2, name: 'Task Two', duration: 120},
	 //            { id: 3, name: 'Task Three', duration: 60}
	 //        ]
	 //    };
	    // END $scope.job = {

		var timesheets = $scope.timesheets = store.timesheets;

		$scope.newTimesheet = '';

		$scope.newTimesheet = '';

		$scope.editedTimesheet = null;

		$scope.$watch('timesheets', function () {
			$scope.remainingCount = $filter('filter')(timesheets, { completed: false }).length;
			$scope.completedCount = timesheets.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});


		$scope.addTimesheet = function () {

			// var newTimesheet = {
			// 	title: $scope.newTimesheet.trim(),
			// 	completed: false
			// };

			console.log('success');

			var newTimesheet = {
				id: 1,
		        name: $scope.newTimesheet.trim(),
		        client: $scope.newJobClient.trim(),
		        tasks: [
		            { id: 1, name: 'Task One', duration: 30},
		            { id: 2, name: 'Task Two', duration: 120},
		            { id: 3, name: 'Task Three', duration: 60}
		        ]
			};

			if (!newTimesheet.name) {
				return;
			}

console.log('success 1');

			$scope.saving = true;

			store.insert(newTimesheet)
				.then(function success() {
					console.log('.then(function success() {');
					$scope.newTimesheet = '';
				})
				.finally(function () {
					$scope.saving = false;
				});
		};
		// END $scope.addTimesheet = function () {

		$scope.editTimesheet = function (timesheet) {
			$scope.editedTimesheet = timesheet;
			// Clone the original timesheet to restore it on demand.
			$scope.originalTimesheet = angular.extend({}, timesheet);
		};
		// END $scope.editTimesheet = function (timesheet) {

		$scope.saveEdits = function (timesheet, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Timesheet edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			timesheet.title = timesheet.title.trim();

			if (timesheet.title === $scope.originalTimesheet.title) {
				$scope.editedTimesheet = null;
				return;
			}

			store[timesheet.title ? 'put' : 'delete'](timesheet)
				.then(function success() {}, function error() {
					timesheet.title = $scope.originalTimesheet.title;
				})
				.finally(function () {
					$scope.editedTimesheet = null;
				});
		};
		// END $scope.saveEdits = function (timesheet, event) {

		$scope.revertEdits = function (timesheet) {
			timesheets[timesheets.indexOf(timesheet)] = $scope.originalTimesheet;
			$scope.editedTimesheet = null;
			$scope.originalTimesheet = null;
			$scope.reverted = true;
		};
		// END $scope.revertEdits = function (timesheet) {

		$scope.removeTimesheet = function (timesheet) {
			store.delete(timesheet);
		};
		// END $scope.removeTimesheet = function (timesheet) {

		$scope.saveTimesheet = function (timesheet) {
			store.put(timesheet);
		};
		// END $scope.saveTimesheet = function (timesheet) {

		$scope.toggleCompleted = function (timesheet, completed) {
			if (angular.isDefined(completed)) {
				timesheet.completed = completed;
			}
			store.put(timesheet, timesheets.indexOf(timesheet))
				.then(function success() {}, function error() {
					timesheet.completed = !timesheet.completed;
				});
		};
		// END $scope.toggleCompleted = function (timesheet, completed) {

		$scope.clearCompletedTimesheets = function () {
			store.clearCompleted();
		};
		// END $scope.clearCompletedTimesheets = function () {

		$scope.markAll = function (completed) {
			timesheets.forEach(function (timesheet) {
				if (timesheet.completed !== completed) {
					$scope.toggleCompleted(timesheet, completed);
				}
			});
		};
		// END $scope.markAll = function (completed) {

	});
// END .controller('TimesheetCtrl', function TimesheetCtrl($scope, $routeParams, $filter, store) {


