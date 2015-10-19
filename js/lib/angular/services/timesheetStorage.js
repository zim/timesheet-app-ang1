/*global angular */

/**
 * Services that persists and retrieves timesheets from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('timesheetmvc')
	.factory('timesheetStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($http) {
		'use strict';

		var store = {
			timesheets: [],

			clearCompleted: function () {
				var originalTimesheets = store.timesheets.slice(0);

				var completeTimesheets = [];
				var incompleteTimesheets = [];
				store.timesheets.forEach(function (timesheet) {
					if (timesheet.completed) {
						completeTimesheets.push(timesheet);
					} else {
						incompleteTimesheets.push(timesheet);
					}
				});

				angular.copy(incompleteTimesheets, store.timesheets);

				return $http.delete('/api/timesheets')
					.then(function success() {
						return store.timesheets;
					}, function error() {
						angular.copy(originalTimesheets, store.timesheets);
						return originalTimesheets;
					});
			},

			delete: function (timesheet) {
				var originalTimesheets = store.timesheets.slice(0);

				store.timesheets.splice(store.timesheets.indexOf(timesheet), 1);

				return $http.delete('/api/timesheets/' + timesheet.id)
					.then(function success() {
						return store.timesheets;
					}, function error() {
						angular.copy(originalTimesheets, store.timesheets);
						return originalTimesheets;
					});
			},

			get: function () {
				return $http.get('/api/timesheets')
					.then(function (resp) {
						angular.copy(resp.data, store.timesheets);
						return store.timesheets;
					});
			},

			insert: function (timesheet) {
				var originalTimesheets = store.timesheets.slice(0);

				console.log('insert: var originalTimesheets = store.timesheets.slice(0); = ' + originalTimesheets)

				return $http.post('/api/timesheets', timesheet)
					.then(function success(resp) {
						timesheet.id = resp.data.id;
						store.timesheets.push(timesheet);
						return store.timesheets;
					}, function error() {
						angular.copy(originalTimesheets, store.timesheets);
						return store.timesheets;
					});
			},

			put: function (timesheet) {
				var originalTimesheets = store.timesheets.slice(0);

				return $http.put('/api/timesheets/' + timesheet.id, timesheet)
					.then(function success() {
						return store.timesheets;
					}, function error() {
						angular.copy(originalTimesheets, store.timesheets);
						return originalTimesheets;
					});
			}
		};

		return store;
	})

	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'timesheets-angularjs';

		var store = {
			timesheets: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (timesheets) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(timesheets));
			},

			clearCompleted: function () {
				var deferred = $q.defer();

				var completeTimesheets = [];
				var incompleteTimesheets = [];
				store.timesheets.forEach(function (timesheet) {
					if (timesheet.completed) {
						completeTimesheets.push(timesheet);
					} else {
						incompleteTimesheets.push(timesheet);
					}
				});

				angular.copy(incompleteTimesheets, store.timesheets);

				store._saveToLocalStorage(store.timesheets);
				deferred.resolve(store.timesheets);

				return deferred.promise;
			},

			delete: function (timesheet) {
				var deferred = $q.defer();

				store.timesheets.splice(store.timesheets.indexOf(timesheet), 1);

				store._saveToLocalStorage(store.timesheets);
				deferred.resolve(store.timesheets);

				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.timesheets);
				deferred.resolve(store.timesheets);

				return deferred.promise;
			},

			insert: function (timesheet) {
				var deferred = $q.defer();

				store.timesheets.push(timesheet);

				store._saveToLocalStorage(store.timesheets);
				deferred.resolve(store.timesheets);

				return deferred.promise;
			},

			put: function (timesheet, index) {
				var deferred = $q.defer();

				store.timesheets[index] = timesheet;

				store._saveToLocalStorage(store.timesheets);
				deferred.resolve(store.timesheets);

				return deferred.promise;
			}
		};

		return store;
	});
