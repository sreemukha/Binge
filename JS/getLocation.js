
var x = document.getElementById("search");

window.onload = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionLocality, showError);
        
    } else { 
        
        x.value = "Geolocation is not supported by this browser.";
    }
}


function showPositionLocality(position) {
    
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        x.value = results[1].formatted_address;
        
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

document.getElementById("search").focus;

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            window.alert("Please enter your location");
//            
//            function initialize() {
//            var options = {
//            types: ['(cities)'],
//            componentRestrictions: {country: "us"}
//            };
//            var input = document.getElementById('search');
//            var autocomplete = new google.maps.places.Autocomplete(input[0],options);
//            /*autocomplete.addListener('place_changed', function () {
//            var place = autocomplete.getPlace();
//            // place variable will have all the information you are looking for.
//            console.log(place.geometry['location'].lat());
//            console.log(place.geometry['location'].lng());
//            });*/
//            
//        }
//        google.maps.event.addDomListener(window, 'click', initialize);
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
