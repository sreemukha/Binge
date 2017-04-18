
var input = document.getElementById("search");
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

window.onload = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionLocality, showError);
        
    } else { 
        
        input.value = "Geolocation is not supported by this browser.";
    }
}


function showPositionLocality(position) {
    
    var geocoder = new google.maps.Geocoder;
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
