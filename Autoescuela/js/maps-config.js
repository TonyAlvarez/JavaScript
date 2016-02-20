var map;

function initialize() {
    var myLatlng = new google.maps.LatLng(39.58373, 2.68213);
    var mapOptions = {
        zoom: 16,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: myLatlng
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    marker.setMap(map);

    var contentString = '<div><div style="float:left;"><b>Autoescuela Salard</b><br/>Camí Salard, nº60 <br/>07008 Palma</div>' +
        '<div style="float:left; margin-left:20px;">Horario: <br/>9:30–13:30<br/>16:00–20:30</div></div>' + 
        '<div style="margin-top:20px;">Teléfono de contacto: 871 96 23 45</div>';
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 1000,
        maxHeight: 400
    });
    // End of infowindow code
    
    // Adding a click event to the marker
    google.maps.event.addListener(marker, 'click', function() {
        // Calling the open method of the infoWindow
        infowindow.open(map, marker );
    });
    // -------- END OF 1st MARKER
    infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);
