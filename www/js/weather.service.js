
angular
    .module('weatherApp')
    .factory('weatherService',['$q','$http','FORECASTIO_KEY',weatherServiceFunction])
    .constant('FORECASTIO_KEY', 'e9554b45d938eba3af70e453dbfbc3c2');

function weatherServiceFunction($q,$http,FORECASTIO_KEY)
{
    // var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';
    var url = 'http://cps371-weather-eze.appspot.com/?';

    return {
	getCurrentWeather: function(lat, lng, num) {
	    var unit = 'units=us';
	    var lat_param = "lat=" + lat;
	    var lng_param = "lng=" + lng;
	    if (num == 0)
	    {
		unit = 'units=si';
	    }
	    else
	    {
		unit = 'units=us';
	    }
	    console.log(num, unit);
	    url = url + unit + '&' + lat_param + '&' + lng_param;
	    console.log(url);
	    return $http.get(url)
		.then(function(response){
		    return response;
		}, function(response){
		    console.log("Could not get Data");
		    console.log(response);
		    return $q.reject(response.data);
		});
	    
	    
	}
    };

}




