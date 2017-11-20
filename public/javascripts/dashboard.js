var dashboard = (function(){
        var getView;
        var map;
        
        function initDashboard() {
          console.log("Made it to init boi");
          getListings()
          .then(processListings)
          .then(renderListingsTemplate);
        }
        function processListings(allListings){
            console.log("The listings are",allListings);
            markers = [];
            allListings.forEach(function(listing){
                markers.push({info: listing});
            });
            return markers;
          }
        function getListings(){
            var url = window.location.href + '/allListings';
            console.log('url:', url);
            return $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json'
            });
        }
        function getListingTemplate(){
            var url = window.location.origin + '/views/listing.hbs';
            return $.ajax({
                url:url,
                method:'GET',
            });
        }
        function renderListingsTemplate(markers){
            getListingTemplate().then(function(template){
                //console.log("1st mark is ", mark);
                console.log("2nd markers is ",markers);
                markers.forEach(function(mark){
                    console.log("template is: ", template);
                    console.log("2nd mark is ", mark);
                    console.log("2nd markers is", markers)
                    context = {
                        address:mark.info.address,
                        rent: mark.info.rent,
                        deposit: mark.info.deposit,
                        description: mark.info.description
                    };
                    var marker_info = utils.renderTemplate(template,context);
                });
            });
        }
        return {
            get dashboard() {return dashboard;},
            set dashboard(v) {dashboard = v},
            initDashboard: initDashboard
        }
    }());
    
    $(document).ready(function(){
        dashboard.initDashboard(); 
    });
    