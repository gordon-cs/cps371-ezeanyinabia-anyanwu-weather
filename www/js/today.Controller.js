angular
    .module('weatherApp')
    .controller('todayController',['$ionicPopover','$ionicViewSwitcher','weatherService','weatherSettings','$scope','$state', todayControllerFunction]);


// Constructor function for todayController

function todayControllerFunction($ionicPopover,$ionicViewSwitcher,weatherService, weatherSettings, $scope, $state)
{

    $ionicPopover.fromTemplateUrl('/templates/today.chart.html', {
	scope: $scope
    }).then(function(popover) {
	$scope.popover = popover;
    });

    $scope.openPopover = function($event) {
	$scope.popover.show($event);
    };
    $scope.closePopover = function() {
	$scope.popover.hide();
    };
    $scope.$on('$destroy', function() {
	$scope.popover.remove();
    });


    
    $scope.transitionToSevenDay = function() {
	$ionicViewSwitcher.nextDirection('forward');
	$state.go('weather.seven-day-forecast');
    };
    
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
	$scope.labels = ['Currently','in 3hrs','in 6hrs','in 9hrs','in 12hrs','in 15hrs'];
	$scope.series = ['Temperature'];
	var tempArray = [];

	for (i=0; i < 16; i += 3)
	{
    	    tempArray.push($scope.place.hourly.data[i].temperature);
	}

	$scope.data = [];
	$scope.data.push(tempArray);    
    }

    $scope.makeChart();
}
