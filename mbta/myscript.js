// map initially centered at South Station
var me = new google.maps.LatLng(42.352271, -71.05524200000001); 

var Options = {
    zoom: 13,
    center: me,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;
var infowindow = new google.maps.InfoWindow();

var stations = [
    {"station_name":"Alewife", "latitude":42.395428, "longitude":-71.142483},
    {"station_name":"Davis", "latitude":42.39674, "longitude":-71.121815},
    {"station_name":"Porter Square", "latitude":42.3884, "longitude":-71.11914899999999},
    {"station_name":"Harvard Square", "latitude":42.373362, "longitude":-71.118956,},
    {"station_name":"Central Square", "latitude":42.365486, "longitude":-71.103802},
    {"station_name":"Kendall/MIT", "latitude":42.36249079, "longitude":-71.08617653},
    {"station_name":"Charles/MGH", "latitude":42.361166, "longitude":-71.070628},
    {"station_name":"Park Street", "latitude":42.35639457, "longitude":-71.0624242},
    {"station_name":"Downtown Crossing", "latitude":42.355518, "longitude":-71.060225},
    {"station_name":"South Station", "latitude":42.352271, "longitude":-71.05524200000001},
    {"station_name":"Broadway", "latitude":42.342622, "longitude":-71.056967},    
    {"station_name":"Andrew", "latitude":42.330154, "longitude":-71.057655},
    {"station_name":"JFK/UMass", "latitude":42.320685, "longitude":-71.052391},
    {"station_name":"Savin Hill", "latitude":42.31129, "longitude":-71.053331},
    {"station_name":"Fields Corner", "latitude":42.300093, "longitude":-71.061667},
    {"station_name":"Shawmut", "latitude":42.29312583, "longitude":-71.06573796000001},
    {"station_name":"Ashmont", "latitude":42.284652, "longitude":-71.06448899999999},
    {"station_name":"North Quincy", "latitude":42.275275, "longitude":-71.029583},
    {"station_name":"Wollaston", "latitude":42.2665139, "longitude":-71.0203369},
    {"station_name":"Quincy Center", "latitude":42.251809, "longitude":-71.005409},
    {"station_name":"Quincy Adams", "latitude":42.233391, "longitude":-71.007153}, 
    {"station_name":"Braintree", "latitude":42.2078543, "longitude":-71.0011385}
];

var stationMarkers = [];
var Icon = "placeholder.png";


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), Options);
    
    for (var i = 0; i < stations.length; i++){
	marker  = new google.maps.Marker({
	    position: new google.maps.LatLng(stations[i].latitude, stations[i].longitude),
	    title: stations[i].station_name,
	    icon: Icon
	});
	console.log(marker.getTitle());
	google.maps.event.addListener(marker, 'click', function() {
	    var thisMarker = this;
    	    var request = new XMLHttpRequest();
	    request.open("GET", "https://shielded-headland-54009.herokuapp.com/redline.json", true);
	    request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200){
		    data = JSON.parse(request.responseText);
		    var textForMarker = "<h1>" + thisMarker.getTitle() + "</h1><u1>";
		    var list = [];
		    
		    for(var trip = 0; trip < data.TripList.Trips.length; trip++){
			destination = data.TripList.Trips[trip].Destination;
			for(var stop = 0; stop < data.TripList.Trips[trip].Predictions.length; stop++){
			    if(data.TripList.Trips[trip].Predictions[stop].Stop == thisMarker.getTitle()){
				list.push ({"destination": destination, "predicted_arrival" : data.TripList.Trips[trip].Predictions[stop].Seconds});
			    
			    }
			}
		    }

		// Sort the schedule for station; https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
		    function compare(a, b) {
			if (a.predicted_arrival < b.predicted_arrival) {
			    return -1;
			}
			if (a.predicted_arrival > b.predicted_arrival) {
			    return 1;
			}
			return 0;
		    }
		    list.sort(compare);

		    if (list.length == 0) {
			textForMarker += "<li>No upcoming trains.</li>";
		    }
		    else {
			for (i = 0; i < list.length; i++){
			    textForMarker += "<li>Next train to " + list[i].destination + " will arrive in " + Math.trunc(list[i].predicted_arrival / 60) + " min.</li>";
			}
		    }
		    textForMarker += "</ul>";
		    infowindow.setContent(textForMarker);
		    infowindow.open(map, thisMarker);
		}
		else if(request.readyState == 4 && request.status == 500){
		    infowindow.setContent("Something went wrong.");
		    infowindow.open(map, marker);

		}
	    }
	    request.send();	
	});
	stationMarkers.push(marker);
	marker.setMap(map);

    }
    
    var toJFK = [
	stationMarkers[0].getPosition(),
	stationMarkers[1].getPosition(),
	stationMarkers[2].getPosition(),
	stationMarkers[3].getPosition(),
	stationMarkers[4].getPosition(),
	stationMarkers[5].getPosition(),
	stationMarkers[6].getPosition(),
	stationMarkers[7].getPosition(),
	stationMarkers[8].getPosition(),
	stationMarkers[9].getPosition(),
	stationMarkers[10].getPosition(),
	stationMarkers[11].getPosition(),
	stationMarkers[12].getPosition(), 
    ];
    var toAshmont = [
	stationMarkers[12].getPosition(),
	stationMarkers[13].getPosition(),
	stationMarkers[14].getPosition(),
	stationMarkers[15].getPosition(),
	stationMarkers[16].getPosition()
    ];
    var toBraintree = [
	stationMarkers[12].getPosition(), 
	stationMarkers[17].getPosition(),
	stationMarkers[18].getPosition(),
	stationMarkers[19].getPosition(),
	stationMarkers[20].getPosition(),
	stationMarkers[21].getPosition()
    ];
    
    var redlinePath1 = new google.maps.Polyline({
	path: toJFK,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });
    
    var redlinePath2 = new google.maps.Polyline({
	path: toAshmont,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });
    
    var redlinePath3 = new google.maps.Polyline({
	path: toBraintree,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });

    redlinePath1.setMap(map);
    redlinePath2.setMap(map);
    redlinePath3.setMap(map);

    
    
    getMyLocation();
}

function getMyLocation() {
    if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	    pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	    };;
	    updateMap();
	});
    }
    else {
	alert("Sad. Geolocation is not supported by your web browser.");
    }
}

function updateMap() {
    me = new google.maps.LatLng(pos);
    map.panTo(me);
    var closestStation = stationMarkers[0];
    var shortest_distance = google.maps.geometry.spherical.computeDistanceBetween(me, closestStation.getPosition());
    for (i = 1; i < stationMarkers.length; i++){
	var new_distance = google.maps.geometry.spherical.computeDistanceBetween(me, stationMarkers[i].getPosition());
	if(new_distance < shortest_distance){
	    shortest_distance = new_distance;
	    closestStation = stationMarkers[i];
	}
    }
    marker = new google.maps.Marker({
	position: me,
	title: "The closest MBTA Red Line station is " + closestStation.getTitle() + ": " + shortest_distance * 0.000621371 + "miles"
    });
    marker.setMap(map);
    infowindow.setContent(marker.title);
    infowindow.open(map,marker);

    google.maps.event.addListener(marker, 'click', function () {
	infowindow.setContent(marker.title);
	infowindow.open(map,marker);
    });
    
    var shortest_path = [pos, closestStation.getPosition()];
    
    var shortest_polyline = new google.maps.Polyline({
	path: shortest_path,
	geodesic: true,
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 2
    });

    shortest_polyline.setMap(map);
}	    

