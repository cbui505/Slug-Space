var dashboard = (function(){
        function initDashboard() {
          observeUserLoginState();
        }

        var user_email = null;

        function processListings(allListings){
            console.log("The listings are", allListings);
            markers = [];
            allListings.forEach(function(listing){
                markers.push({info: listing});
            });
            return markers;
          }
        function getUserListings(){
            var url = window.location.href + '/allListings';
            var temp = {};
            temp.email = user_email;
            return $.ajax({
                url: url,
                method: 'POST',
                data: temp,                
                dataType: 'json'
            });
        }
        function getListingTemplate(){
            var url = window.location.origin + '/views/partials/listing.hbs';
            return $.ajax({
                url:url,
                method:'GET',
            });
        }
        function renderListingsTemplate(markers){
            getListingTemplate().then(function(template){
                console.log('markers is = ', markers);
                var count = 0;
                markers.forEach(function(mark){
                    console.log('count = ', count);
                    context = {
                        address: mark.info.address,
                        rent: mark.info.rent,
                        deposit: mark.info.deposit,
                        description: mark.info.description,
                        baths: mark.info.baths,
                        beds: mark.info.beds,
                        bus_time: mark.info.bus_time,
                        fee: mark.info.fee,
                        tenants: mark.info.tenants
                    };
                    console.log('context = ', context);
                    var templateScript = Handlebars.compile(template);
                    var html = templateScript(context);
                     $(".list-group").append(html);                         
                });
            });
        }

      function observeUserLoginState(){
        var currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user){
                user_email = null;
                window.location = window.location.origin + '/login';
            }else{
                console.log("User is logged in:", user.email);
                user_email = user.email;
                getUserListings()
                .then(processListings)
                .then(renderListingsTemplate);
            }
        });
    }

        return {
            get dashboard() {return dashboard;},
            set dashboard(v) {dashboard = v},
            initDashboard: initDashboard
        }
    }());