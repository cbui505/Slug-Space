var dashboard = (function(){
        var user_email = null;
        function initDashboard() {
          console.log("Made it to init boi");
          observeUserLoginState();
        }
        function processListings(allListings){
            console.log("The listings are",allListings);
            markers = [];
            allListings.forEach(function(listing){
                markers.push({info: listing});
            });
            return markers;
          }
        function getUserListings(){
            observeUserLoginState();

            var url = window.location.href + '/allListings';
            var temp = {};
            temp.email = user_email;
            console.log("your email is", user_email);
            console.log('url:', url);
            return $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: temp
            });
        }
        function getListingTemplate(){
            console.log("hello");
            var url = window.location.origin + '/views/partials/listing.hbs';
            console.log('url is : ', url); 
            return $.ajax({
                url:url,
                method:'GET',
            });
        }
        function renderListingsTemplate(markers){
            console.log("hello1");
            getListingTemplate().then(function(template){
                markers.forEach(function(mark){
                    console.log('markers is = ', markers);
                    context = {
                        address:mark.info.address,
                        rent: mark.info.rent,
                        deposit: mark.info.deposit,
                        description: mark.info.description
                    };
                    console.log('made it here and template = ', template);
                    console.log('context = ', context);
                    var marker_info = utils.renderTemplate(template,context);
                });
            });
        }

              /* Check for changes in user's login session */
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
    
    $(document).ready(function(){
        dashboard.initDashboard(); 
    });
    