var map = (function(){
    var getView;
    var map;
    
    function initMap() {
      var position = {lat: 36.9914, lng: -122.0609};
      map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 13
      });
      addMarker(position,map); 
    }
    function addMarker(position,map){
        var marker_location = {lat:position.lat, lng:position.lng};
        if(map){
            var marker = new google.maps.Marker({
                position: marker_location,
                map: map
              });
        }
    }
    return {
        get map() {return map;},
        set map(v) {map = v},
        initMap: initMap 
    }
}());

$(document).ready(function(){
    map.initMap(); 
});
