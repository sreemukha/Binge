var input = document.getElementById("search");
var geocoder = new google.maps.Geocoder;
input.addEventListener("keydown", function(addr){
		if(addr.keyCode === 13){
			geocodeAdress();
		}
	})


google.maps.event.addDomListener(window, 'load', initialize); 
window.onload = transferData;

function transferData(){

  	var queryString = decodeURIComponent(window.location.search);
  	queryString = queryString.substring(1);
  	var queryStringArray = queryString.split("&");
	var addressArray = queryStringArray[0].split("=");
	var parameters = queryStringArray[1] + "&" + queryStringArray[2];	
    displayResults(addressArray[1], parameters);
}

function displayResults(address, params){
	
	input.value = address;
	var url = "http://localhost:8081/databasedesign/webapi/myresource/data"
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url+"?"+params, true);
    xhr.send(); 
	xhr.onreadystatechange = function () { //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
            display(xhr.responseText, params);
        }
    } 
}
function display(restaurants, params){
	
	var select = document.getElementById("filtering");
	
	var output = document.getElementById('output');
    var i=0;
    var val="";
	var restaurantArray = JSON.parse(restaurants);
	var latitudeLongitudeArray = params.split("&");
	var latitudeArray = latitudeLongitudeArray[0];
	var latitude = latitudeArray.split("=")[1];
	var longitudeArray = latitudeLongitudeArray[1];
	var longitude = longitudeArray.split("=")[1];
	select.addEventListener("change", function(){
		
		filterOption = this.value;
		
		var filteredArray = [];
		for(i=0;i<restaurantArray.length;i++){			
			var categoriesArray = restaurantArray[i].Categories;
			
			for(var j=0;j<categoriesArray.length;j++){
				if(categoriesArray[j] == filterOption){
					
					filteredArray.push(restaurantArray[i]);
					
				}
			}
		}
		console.log(filteredArray);
		displayUsingFilters(filteredArray, latitude, longitude);
	})
	displayUsingFilters(restaurantArray, latitude, longitude);   
}

function displayUsingFilters(restaurantArray, latitude, longitude){
	document.getElementById("output").innerHTML = '';
	for(i=0;i<restaurantArray.length;i++){
		
			
			var outerDiv = document.createElement("div");
			outerDiv.setAttribute("id","div"+i);
			outerDiv.setAttribute("class","panel panel-default clickable holder");
			var innerDiv = document.createElement("div");
			innerDiv.setAttribute("class", "panel-heading panel-title margin");
			innerDiv.setAttribute("data-toggle", "collapse");
			innerDiv.setAttribute("data-parent", "#output");
			innerDiv.setAttribute("data-target", "#collapse"+i);
			
			
			innerDiv.innerHTML = restaurantArray[i].Name +  "<p class='rating'>Rating :" + restaurantArray[i].Stars + "</p>"+ "<p class='distance'>" + restaurantArray[i].Distance + "miles</p>"; 
			
			
			outerDiv.appendChild(innerDiv);
			var contentDiv = document.createElement("div");
			contentDiv.setAttribute("id", "collapse"+i);
			contentDiv.setAttribute("class", "panel-collapse collapse");
			var contentDivChild = document.createElement("div");
			contentDivChild.setAttribute("class", "panel-body margin");
			var params = "Hours:";
			//var categoryParam = "Categories:"
			var timings = restaurantArray[i].Hours;
			if(timings.length == 7){
				for(var k = 0; k < 7; k++ ){
					params += "<br>" + timings[k] + "</br>";
				}
			}
			if(!restaurantArray[i].Hours|| timings.length!=7){
				params = "<br>Timings not avaialable</br>";
			}
			// var categories = restaurantArray[i].Categories;
			// for(var k = 0; k < categories.length; k++ ){
					// categoryParam += "<br>" + categories[k] + "</br>";
				// }
			
			contentDivChild.innerHTML = params  +
										"<a class = 'directions' href='https://maps.google.com/maps?saddr=" + latitude + "," + longitude + "&daddr=" + restaurantArray[i].FullAddress + "'" + ">Get Directions</a>"; 
			contentDiv.appendChild(contentDivChild);
			outerDiv.appendChild(contentDiv);
			output.appendChild(outerDiv);
		
    }
}
