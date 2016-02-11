angular
    .module('weatherApp')
    .controller('MainController', ['weatherData','weatherSettings','$scope','weatherService',mainControllerFunction]);




// Constructor function for mainController
function mainControllerFunction(weatherData,weatherSettings,$scope,weatherService){

    
    $scope.place = weatherData;

    // Store the result of the API call so we can use it later without
    // another API call.
    weatherSettings.fahrenheitData = weatherData;
    console.log('GOT CURRENT', $scope.place);
    $scope.unit = 'F';

    // Make an API call for Celsius data once and store it, so we don't need to
    // make the call when the user switches units again.
    $scope.loadUnitData = function () {

	var lon = weatherSettings.longitude;
	var lat = weatherSettings.latitude;
	
	weatherService.getCurrentWeather(lat,lon, 0)
	    .then(function(resp) {
		weatherSettings.celsiusData = resp;
	    }, function (err) {
		console.log("Could not change units");
		console.log(err);
	    });
	    
    }
    $scope.loadUnitData();
    
    $scope.changeTemp = function()
    {
	if (weatherSettings.units == 'Fahrenheit')
	{
	    weatherSettings.toggleUnits();
	    $scope.place = weatherSettings.celsiusData;
	    $scope.unit = weatherSettings.units.charAt(0);
	}
	else if (weatherSettings.units == 'Celsius')
	{
	    weatherSettings.toggleUnits();
	    $scope.place = weatherSettings.fahrenheitData;
	    $scope.unit = weatherSettings.units.charAt(0);
	}
	else
	{
	    console.log("ERR");

	}

    }


}
