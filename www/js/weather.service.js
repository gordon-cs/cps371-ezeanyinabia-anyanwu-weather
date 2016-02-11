
angular
    .module('weatherApp')
    .factory('weatherService',['$q','$http','FORECASTIO_KEY',weatherServiceFunction])
    .constant('FORECASTIO_KEY', 'e9554b45d938eba3af70e453dbfbc3c2');

function weatherServiceFunction($q,$http,FORECASTIO_KEY)
{
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    return {
	getCurrentWeather: function(lat, lng, num) {
	    var unit = 'units=us';

	    if (num == 0)
	    {
		unit = 'units=si';
	    }
	    else
	    {
		unit = 'units=us';
	    }
	    console.log(num, unit);
	    return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK&' + unit)
		.then(function(response){
		    return response.data;
		}, function(response){
		    console.log("Could not get Data");
		    return $q.reject(response.data);
		});
	    
	    
	}
    };

}


