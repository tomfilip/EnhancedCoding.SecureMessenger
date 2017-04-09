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

	app.run(['$rootScope', '$window', 'srvAuth',
      function ($rootScope, $window, sAuth) {

          $rootScope.user = {};

          $window.fbAsyncInit = function () {
              FB.init({
                  appId: '290412921380719',
                  status: true,
                  cookie: true,
                  xfbml: true,
                  version: 'v2.4'
              });
          };

          (function (d) {
              // load the Facebook javascript SDK

              var js,
              id = 'facebook-jssdk',
              ref = d.getElementsByTagName('script')[0];

              if (d.getElementById(id)) {
                  return;
              }

              js = d.createElement('script');
              js.id = id;
              js.async = true;
              js.src = "//connect.facebook.net/en_US/sdk.js";

              ref.parentNode.insertBefore(js, ref);

          }(document));

      }]);
})();

