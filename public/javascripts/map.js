var map = (function(){
    var getView;
    var map;
    
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 36.9914, lng: -122.0609},
        zoom: 13
      });
      getListings()
      .then(processListings)
      .then(renderMarkerWindowTemplates);
    }
    function processListings(allListings){
        markers = [];
        allListings.forEach(function(listing){
            
            var position = {lat:listing['lat']*1,lng: listing['long']*1};
            var mark = setMarker(position);
            delete listing.lat;
            delete listing.long; 
            markers.push({marker: mark, info: listing}); 
        });
        return markers;
      }
    function getListings(){
        var url = window.location.href + '/allListings';
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        });
    }
    function getMarkerTemplate(){
        var url = window.location.origin + '/views/markerBox.hbs';
        return $.ajax({
            url:url,
            method:'GET',
        });
    }
    function renderMarkerWindowTemplates(markers){
        getMarkerTemplate().then(function(template){
            markers.forEach(function(mark){
                context = {
                    address:mark.info.address,
                    rent: mark.info.rent,
                    deposit: mark.info.deposit,
                    description: mark.info.description
                };
                var marker_info = utils.renderTemplate(template,context);
                var info_window = new google.maps.InfoWindow({
                    content: marker_info
                });
                mark.marker.addListener('click',function(){
                    info_window.open(map,mark.marker); 
                });
            });
        });
    }
    function setMarker(position){
        var marker;
        if(map){
            marker = new google.maps.Marker({
                position: position,
                map: map
            });
        }
        return marker;
    }
    return {
        get map() {return map;},
        set map(v) {map = v},
        initMap: initMap 
    }
}());

$(document).ready(function(){
    map.initMap(); 
    user.observeUserLoginState();
});
