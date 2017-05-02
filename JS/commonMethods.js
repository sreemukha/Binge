function initialize() {
            var options = {
            types: ['(cities)'],
            componentRestrictions: {country: "us"}
            };
            var autocomplete = new google.maps.places.Autocomplete(input,options);
            autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            });
             
}

//This function is used to convert the addressfield to longitude and latitude values
function geocodeAdress(){

  var address = input.value;
  geocoder.geocode({'address' : address}, function(results, status){
    if (status==='OK') {
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
	  var parameters = "latitude="+lat+"&longitude="+lng;
      var queryString = "?address=" + address + "&" + parameters;
      window.location.href = "displayRestaurants.html" + queryString;
    }
    else{
      alert("Geocode was not successful for the following reason: " + status);
    }
  })
 
}
