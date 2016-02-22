angular
    .module('weatherApp')
    .controller('WeatherController',['weatherService','weatherSettings','$scope', weatherControllerFunction]);


// Constructor function for weatherController
function weatherControllerFunction(weatherService,weatherSettings,$scope) {
    
    var stdWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Get the correct day range to display
    $scope.week = new Object();
    $scope.week.dayName = [];
    $scope.week.dayIcon = [];
    var today = new Date($scope.place.currently.time * 1000); // The time is given to us in seconds.
    var todayNum = today.getDay();
    var icon = "";
    for (i=0; i < 7;i++)
    {
	$scope.week.dayName.push(stdWeek[(i+todayNum) % 7]);
	icon  = $scope.place.daily.data[i].icon;
	if (icon == "clear-day" || icon == "clear-night")
	{
	    $scope.week.dayIcon[i] = "ion-ios-sunny-outline";
	}
	else if(icon == "rain")
	{
	    $scope.week.dayIcon[i] = 'ion-umbrella';
	}
	else if(icon == "snow" || icon == "sleet")
	{
	    $scope.week.dayIcon[i] = "ion-ios-snowy";
	}
	else if(icon == "wind")
	{
	    $scope.week.dayIcon[i] = "ion-paper-airplane";
	}
	else if(icon == "fog")
	{
	    $scope.week.dayIcon[i] = "No Fog icon yet";
	}
	else if(icon == "cloudy")
	{
	    $scope.week.dayIcon[i] = "ion-ios-cloudy-outline";
	}
	else if(icon == "partly-cloudy-day" || icon == "partly-cloudy-night")
	{
	    $scope.week.dayIcon[i] = "ion-ios-partlysunny-outline";
	}
	else
	{
	    console.log("Can't identify this icon!");
	}
    }

    
    var temp = $scope.place.currently.temperature;
    $scope.feelsLike = "";
    if(temp < 0) {
	$scope.feelsLike = "Frigid";
    }
    else if (temp < 30) {
	$scope.feelsLike = "Cold";
    }
    else if (temp < 50) {
	$scope.feelsLike = "Cool";
    }
    else if (temp < 80) {
	$scope.feelsLike = "Warm";
    }
    else if (temp < 100) {
	$scope.feelsLike = "Hot";
    }
    else if (temp >= 100) {
	$scope.feelsLike = "Blazing";
    }

    $scope.makeChart = function() {
	// Set up the data for the chart
	$scope.labels = $scope.week.dayName;
	$scope.labels_2 = ['Currently','in 3 hours','in 6 hours','in 9 hours','in 12 hours','in 15 hours'];
	$scope.series = ['Minimum Temperature', 'Maximum Temperature'];
	$scope.series_2 = ['Temperature'];

	var minArray = [];
	var maxArray = [];
	var tempArray = [];
	
	for (i=0; i < 7; i++)
	{
    	    minArray.push($scope.place.daily.data[i].temperatureMin);
    	    maxArray.push($scope.place.daily.data[i].temperatureMax);
	}
	for (i=0; i < 16; i += 3)
	{
    	    tempArray.push($scope.place.hourly.data[i].temperature);
	}

	$scope.data = [];
	$scope.data_2 = [];
	$scope.data.push(minArray);
	$scope.data.push(maxArray);
	$scope.data_2.push(tempArray);    
    };
    $scope.makeChart();
}

