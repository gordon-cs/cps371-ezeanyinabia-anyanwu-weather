angular
    .module('weatherApp')
    .controller('sevenDayController',['$ionicPopover','$ionicViewSwitcher','weatherService','weatherSettings','$scope','$state', sevenDayControllerFunction]);


// Constructor function for weatherController
function sevenDayControllerFunction($ionicPopover,$ionicViewSwitcher,weatherService,weatherSettings,$scope,$state) {

    $scope.transitionToToday = function() {
	$ionicViewSwitcher.nextDirection('back');
	$state.go('weather.today');
    };
    
    $scope.$on("$ionicView.enter", function() {

	var container = document.querySelector(".day-cards");
	var rows = container.children;

	for ( var i = 0; i < rows.length ; i++ )
	{
	    var thisRow = rows[i];

	    thisRow.onclick = function() {

		var rowContents = this.children;
		var style = window.getComputedStyle(rowContents[0]);
		var rowDayDisp = style.getPropertyValue('display');

		if (rowDayDisp == "none")
		{
		    rowContents[0].style.display = "inline-block";
		    rowContents[1].style.display = "inline-block";
		    rowContents[2].style.display = "none";
		    rowContents[3].style.display = "none";
		}
		else
		{
		    rowContents[0].style.display = "none";
		    rowContents[1].style.display = "none";
		    rowContents[2].style.display = "inline-block";
		    rowContents[3].style.display = "inline-block";
		}
	    }
	}
    });

    
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
	$scope.week.dayName.push(stdWeek[(i+todayNum) % 7].substring(0,3));
    }


    $scope.makeChart = function() {
	// Set up the data for the chart
	$scope.labels = $scope.week.dayName;

	$scope.series = ['Minimum Temperature', 'Maximum Temperature'];


	var minArray = [];
	var maxArray = [];

	
	for (i=0; i < 7; i++)
	{
    	    minArray.push($scope.place.daily.data[i].temperatureMin);
    	    maxArray.push($scope.place.daily.data[i].temperatureMax);
	}

	$scope.data = [];
	$scope.data.push(minArray);
	$scope.data.push(maxArray);
    };
    $scope.makeChart();

        $ionicPopover.fromTemplateUrl('/templates/sevenDay.chart.html', {
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

}

