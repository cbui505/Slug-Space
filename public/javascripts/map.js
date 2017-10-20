var map = (function(){
    var getView;
    var map;
    
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 36.9914, lng: -122.0609},
        zoom: 13
      });
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
