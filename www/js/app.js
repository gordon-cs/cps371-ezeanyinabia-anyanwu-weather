
var weatherModule = angular.module('weather');


weatherModule.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
	.state('index',{
	    url: '/',
	    templateUrl: 'today.html'
	})
	.state('seven-day-forecast', {
	    url: '/seven-day-forecast',
	    templateUrl: 'sevenDayForecast.html'
	});
    $urlRouterProvider.otherwise('/');

});
  
weatherModule.controller('MainController',['WeatherData','$scope', function(WeatherData,$scope) {
    var latitude = 42.604261;
    var longitude = -70.891161;
    var stdWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    var weatherPromise = WeatherData.getCurrentWeather(latitude,longitude)
	.then(function(resp) {
	    $scope.place = resp;
	    console.log('GOT CURRENT', $scope.place);
	    // Get the correct day range to display
	    $scope.week = [];
	    var today = new Date($scope.place.currently.time * 1000); // The time is given to us in seconds.
	    var todayNum = today.getDay();
	    for (i=0; i < 7;i++)
	    {
		$scope.week.push(stdWeek[(i+todayNum) % 7]);
	    }
	    var temp = $scope.place.currently.temperature;
	    $scope.feelsLike = 0;
	    if(temp < 0)
	    {
		$scope.feelsLike = "Frigid";
	    }
	    else if (temp < 30)
	    {
		$scope.feelsLike = "Cold";
	    }
	    else if (temp < 50)
	    {
		$scope.feelsLike = "Cool";
	    }
	    else if (temp < 80)
	    {
		$scope.feelsLike = "Warm";
	    }
	    else if (temp < 100)
	    {
		$scope.feelsLike = "Hot";
	    }
	    else if (temp >= 100)
	    {
		$scope.feelsLike = "Blazing";
	    }
	    
	    // Set up the data for the chart
	    $scope.labels = $scope.week;
	    $scope.labels_2 = ['Currently','in 4 hours','in 8 hours','in 12 hours','in 16 hours','in 20 hours'];
	    $scope.series = ['Minimum Temperature (F)', 'Maximum Temperature (F)'];
	    $scope.series_2 = ['Temperature'];
	    $scope.data = [
		[$scope.place.daily.data[0].temperatureMin,$scope.place.daily.data[1].temperatureMin,$scope.place.daily.data[2].temperatureMin,$scope.place.daily.data[3].temperatureMin,$scope.place.daily.data[4].temperatureMin,$scope.place.daily.data[5].temperatureMin,$scope.place.daily.data[6].temperatureMin],
		[$scope.place.daily.data[0].temperatureMax,$scope.place.daily.data[1].temperatureMax,$scope.place.daily.data[2].temperatureMax,$scope.place.daily.data[3].temperatureMax,$scope.place.daily.data[4].temperatureMax,$scope.place.daily.data[5].temperatureMax,$scope.place.daily.data[6].temperatureMax]

	    ];
	    $scope.data_2 = [
		[$scope.place.hourly.data[0].temperature,$scope.place.hourly.data[3].temperature,$scope.place.hourly.data[7].temperature,$scope.place.hourly.data[11].temperature,$scope.place.hourly.data[15].temperature,$scope.place.hourly.data[19].temperature]
	    ];


	}, function(error) {
	    alert('Unable to get current conditions');
	    console.error(error);
	});


   
}]);


weatherModule.controller('TodayController', function($scope) {

});


weatherModule.controller('SevenDayController', function($scope) {
    
});

