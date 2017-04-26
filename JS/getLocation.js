
var input = document.getElementById("search");
var geocoder = new google.maps.Geocoder;
input.addEventListener("keydown", function(addr){
		if(addr.keyCode === 13){
			geocodeAdress();
		}
	})

// This function handles the auto-fill of the drop down associated with the search box
function initialize() {
            var options = {
            types: ['(cities)'],
            componentRestrictions: {country: "us"}
            };
            //var input = document.getElementById('search');
            var autocomplete = new google.maps.places.Autocomplete(input,options);
            autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            });
             
}
google.maps.event.addDomListener(window, 'load', initialize); 

// This is the function that asks the user for location access
window.onload = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionLocality, showError);
        
    } else { 
        
        input.value = "Geolocation is not supported by this browser.";
    }
}

// This function displays the current location in terms of formatted address
function showPositionLocality(position) {
    
    
    var latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        input.value = results[1].formatted_address;
        
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

// This function handles the errors that ccur due to issues caused by google maps api 
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            window.alert("Please enter your location");
            break;
        case error.POSITION_UNAVAILABLE:
            window.alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            window.alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            window.alert("An unknown error occurred.");
            break;
    }
}

//This function is used to convert the addressfield to longitude and latitude values
function geocodeAdress(){

	var address = input.value;
	geocoder.geocode({'address' : address}, function(results, status){
		if (status==='OK') {
			// var params = results[0].geometry.location.toString();
			// var xhr = new XMLHttpRequest();
			// xhr.open('POST', 'http://localhost:8080/databasedesign/webapi/myresource', true);
			// xhr.send(params);	
			console.log(results[0].geometry.location.toString());
		}
		else{
			alert("Geocode was not successful for the following reason: " + status);
		}
	})

}
