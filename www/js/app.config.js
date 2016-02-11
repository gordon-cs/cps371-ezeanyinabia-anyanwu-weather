angular
    .module('weatherApp')
    .config(configFunction);


function configFunction($stateProvider, $urlRouterProvider)
{

    //Initializing routing for the app    
    $urlRouterProvider.otherwise('/weather/today');	   

    $stateProvider
	.state('weather',{
	    resolve: {
	    	weatherData: function(weatherService,weatherSettings){
		    var lat = weatherSettings.latitude;
		    var lon = weatherSettings.longitude;		    
	    	    return weatherService.getCurrentWeather(lat, lon, 1);
	    	}
	    },
	    abstract: true,
	    url: '/weather',
	    templateUrl: 'templates/weather.html',
	    controller: 'MainController'
	})
	.state('weather.today',{
	    url: '/today',
	    templateUrl: 'templates/weather.today.html',
	    controller:'WeatherController'
	})
	.state('weather.seven-day-forecast', {
	    url: '/inSevenDays',
	    templateUrl: 'templates/weather.sevenDayForecast.html',
	    controller: 'WeatherController'
	});

}
