    
function initialize() {
            var options = {
            types: ['(cities)'],
            componentRestrictions: {country: "us"}
            };
            var input = document.getElementById('search');
            var autocomplete = new google.maps.places.Autocomplete(input,options);
            autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            });
             
}
google.maps.event.addDomListener(window, 'load', initialize); 