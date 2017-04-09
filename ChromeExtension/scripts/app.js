(function(){
	var app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'ngMaterial']);


	app.constant('Chrome', chrome);


	app.factory('Broadcast', function ($rootScope) {
		var broadcast = { send: send };

		function send(msg, data) {
			$rootScope.$broadcast(msg, data);
		}

		// $scope.$on('login', function(event, args){ ...do something... });

		return broadcast;
	});

	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', { templateUrl: 'views/popup.html', controller: 'popupCrtl', controllerAs: 'main', authenticate: false })
			.otherwise({
			    redirectTo: 'views/popup.html'
			});
	});

	app.factory('Data', function (localStorageService) {
		var data = {
			store: store,
			fetch: fetch,
			remove: remove,
			clearAll: clearAll
		};

		function store(key, value) {
			return localStorageService.add(key, value);
		}

		function fetch(key) {
			return localStorageService.get(key);
		}

		function remove(key) {
			return localStorageService.remove(key);
		}

		function clearAll() {
			localStorageService.clearAll();
		}

		return data;
	});

})();

