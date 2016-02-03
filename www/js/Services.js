var weatherModule = angular.module('weather',['ionic','chart.js']);


weatherModule.factory('WeatherData',['$q','$http','FORECASTIO_KEY',function($q,$http,FORECASTIO_KEY){
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
    return {
	getCurrentWeather: function(lat, lng) {
	    return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK')
		.then(function(response){
		    return response.data;
		}, function(response){
		    return $q.reject(response.data);
		});
		      
	}	    
    };
    
}]);


weatherModule.constant('FORECASTIO_KEY', 'e9554b45d938eba3af70e453dbfbc3c2');
