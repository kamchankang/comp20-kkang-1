function initMap() {
    
    var South_Station = new google.maps.LatLng(42.352271, -71.05524200000001);
    var Andrew = new google.maps.LatLng(42.330154, -71.057655);
    var Porter_Square  = new google.maps.LatLng(42.3884, -71.11914899999999);
    var Harvard_Square  = new google.maps.LatLng(42.373362, -71.118956);
    var JFK_UMass    = new google.maps.LatLng(42.320685, -71.052391);
    var Savin_Hill  = new google.maps.LatLng (42.31129, -71.053331);
    var Park_Street    = new google.maps.LatLng(42.35639457, -71.0624242);
    var Broadway     = new google.maps.LatLng(42.342622, -71.056967);
    var North_Quincy = new google.maps.LatLng(42.275275, -71.029583);
    var Shawmut      = new google.maps.LatLng(42.29312583, -71.06573796000001);
    var Davis         = new google.maps.LatLng(42.39674, -71.121815);
    var Alewife        = new google.maps.LatLng(42.395428, -71.142483);
    var Kendall_MIT     = new google.maps.LatLng(42.36249079, -71.08617653);
    var Charles_MGH     = new google.maps.LatLng(42.361166, -71.070628);
    var Downtown_Crossing = new google.maps.LatLng(42.355518, -71.060225);
    var Quincy_Center   = new google.maps.LatLng(42.251809, -71.005409);
    var Quincy_Adams    = new google.maps.LatLng(42.233391, -71.007153);
    var Ashmont        = new google.maps.LatLng(42.284652, -71.06448899999999);
    var Wollaston      = new google.maps.LatLng(42.2665139, -71.0203369);
    var Fields_Corner   = new google.maps.LatLng(42.300093, -71.061667);
    var Central_Square  = new google.maps.LatLng(42.365486, -71.103802);
    var Braintree      = new google.maps.LatLng(42.2078543, -71.0011385);

    var station_array = [South_Station, Andrew, Porter_Square, Harvard_Square, JFK_UMass, Savin_Hill, Park_Street, Broadway, North_Quincy, Shawmut, Davis, Alewife, Kendall_MIT, Charles_MGH, Downtown_Crossing, Quincy_Center, Quincy_Adams, Ashmont, Wollaston, Fields_Corner, Central_Square, Braintree];
    
    var Options = {
	zoom: 12,
	center: South_Station,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        var map = new google.maps.Map(document.getElementById('map'), Options);

    var Icon = "placeholder.png"
    for (i = 0; i < station_array.length; i++){
	var marker  = new google.maps.Marker({
	    position: station_array[i],
	    icon: Icon
	});
	marker.setMap(map);
    }

    var toJFK = [Alewife, Davis, Porter_Square, Harvard_Square, Central_Square, Kendall_MIT, Charles_MGH, Park_Street, Downtown_Crossing, South_Station, Broadway,Andrew, JFK_UMass];
    var toAshmont = [JFK_UMass, Savin_Hill, Fields_Corner, Shawmut, Ashmont];
    var toBraintree = [JFK_UMass, North_Quincy, Wollaston, Quincy_Center, Quincy_Adams, Braintree];
    
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

    
/* My markers do not have 'titles' so I commented this section out for now 
  

    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(this.title);
	infowindow.open(this, marker);
    });
*/
}


