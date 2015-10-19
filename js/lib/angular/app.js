/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('timesheetmvc', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TimesheetCtrl',
			templateUrl: 'timesheetmvc-index.html',
			resolve: {
				store: function (timesheetStorage) {
					// Get the correct module (API or localStorage).
					return timesheetStorage.then(function (module) {
						module.get(); // Fetch the timesheet records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
// END angular.module('timesheetmvc', ['ngRoute'])
