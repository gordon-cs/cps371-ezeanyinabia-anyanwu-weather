angular
    .module('weatherApp')
    .factory('weatherSettings',['weatherService', weatherSettingsFunction]);


function weatherSettingsFunction (weatherService)
{
    var currentSettings = {
	    units : 'Fahrenheit',
	    latitude : 42.604261,
	    longitude :  -70.891161

	};
    currentSettings.celsiusData;
    currentSettings.fahrenheitData;
    currentSettings.toggleUnits = function()
    {
	if(currentSettings.units == 'Fahrenheit')
	{

	    currentSettings.units = 'Celsius';
	}
	else if (currentSettings.units == 'Celsius')
	{
	    currentSettings.units = 'Fahrenheit';
	}
	else
	{
	    console.log('Units not recognized');
	}
    };

    currentSettings.setLat = function(value)
    {
	currentSettings.latitude = value;
    };

    currentSettings.setLong = function(value)
    {
	currentSettings.longitude = value;
    };

    return currentSettings;

}
