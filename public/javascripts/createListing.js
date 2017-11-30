var createListing = (function() {

        function init() {
            //check if user is logged in and if not, redirect to login page
            observeUserLoginState();

            //check for press of the following buttons
            bindCreateButton();
            bindCheckButton();
            bindUpload();
        }

        //geocoder used later to parse coordinates as addresses
        geocoder = new google.maps.Geocoder();

        //global variables that are initialized later on
        var file = null;
        var user_email = null;

        /* handle press of create listing button */
        function bindCreateButton() {
            //object that will store user input as attributes
            var listing;
            //wait for click of create button
            $('#createButton').on('click', function(e) {
                //ignore default form behavior on submit for now
                e.preventDefault();
                //get references to user input fields
                var $address = $('#address');
                var $rent = $('#rent');
                var $deposit = $('#deposit');
                var $fee = $('#fee');
                var $description = $('#description');
                var $beds = $('#beds');
                var $baths = $('#baths');
                var $tenants = $('#tenants');

                var $start_date = $('#start_date');
                var $lease_terms = $('#lease_terms');

                //get values from user input fields and store inside listing object
                listing = {};
                //address and rent were required in hbs, will have a value
                listing.address = $address.val();
                listing.rent = $rent.val();
                listing.beds = $beds.val();
                listing.baths = $baths.val();
                listing.tenants = $tenants.val();

                //make sure user fills in required fields
                if (!listing.address || !listing.rent || !listing.beds || !listing.baths || !listing.tenants) {
                    alert("Please fill in all required fields");
                } else {
                    //set default values if fields were left empty
                    listing.deposit = $deposit.val() ? $deposit.val() : 0;
                    listing.fee = $fee.val() ? $fee.val() : 0;
                    listing.description = $description.val() ? $description.val() : "No description provided";
                    listing.start_date = $start_date.val() ? $start_date.val() : "not specified";
                    listing.lease_terms = $lease_terms.val();                  

                    //null if user does not upload file
                    listing.file = null;
                    //get coordinates from address, check if user uploads file
                    getCoordinates(listing);
                    console.log(listing);
                }
            })
        }

        //parse input address as latitude,longitude coordinates 
        function getCoordinates(listing) {
            //restrict address to Santa Cruz area
            geocoder.geocode({ 'address': listing.address + ", Santa Cruz, CA" }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //store coordinates in separate fields (firebase giving issues with arrays)
                    listing.lat = results[0].geometry.location.lat();
                    listing.long = results[0].geometry.location.lng();
                    //store file, pass callback function to post the listing
                    //uploadPicture(file, postListingInfo, listing);
                    uploadPicture(file, getBusCommuteTime, listing);
                }
                //if we fail to parse coordinates, it's invalid
                else {
                    alert('Failed to geocode address with error: ' + status);
                }
            });

            //debug
            console.log(listing);
        }

    /* calculates the time to get to UCSC via bus from address */
    function getBusCommuteTime(listing) {
        //set address and destination
        var origin = listing.address + ", Santa Cruz, CA";
        var destination = "University of California Santa Cruz, High St, Santa Cruz, CA";

        //run callback after retreiving result of google API request
        var callback = function(data) {
            console.log("Distance matrix returned: ", data);
            listing.bus_time = data.rows[0].elements[0].duration.text;
            listing.distance = data.rows[0].elements[0].distance.text;
            firebase.auth().onAuthStateChanged(function(user) {
                if (!user) {
                    listing.email = null;
                } else {
                    listing.email = user.email;
                    postListingInfo(listing, "sendListing");
                }
            });
        }
        //make the request to Distance Matrix API to get time/distance
        var googleDM = new google.maps.DistanceMatrixService();
        googleDM.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'TRANSIT',
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }, callback);
        //callback is run after getting response from API
    }

    /* For debug purposes: on press, returns all listings belonging to current user */
    function bindCheckButton() {
        $('#getButton').on('click', function(e) {
            e.preventDefault();
            var temp = {};
            temp.email = user_email;
            postListingInfo(temp, "showInterest");
        })
    }

    /* gets file if user opts to click upload file button */
    function bindUpload(){
        $('#pic').on('change', function(event){
            event.preventDefault();
            file = event.target.files[0];
        })
    }

    /* Post data to designated url*/
    function postListingInfo(data, link) {
        //set url to post
        url = window.location.origin + '/createListing/' + link;
        return $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json'
        });
    }

    /* Upload the picture to firebase's storage space, set file field for listing in db */
    function uploadPicture(file, cb, listing) {
        //get reference to firebase storage
        var storageRef = firebase.storage().ref();
        console.log("got to storageref, file is ", file); //debug
        //upload file if it is provided by user
        if (file) {
            //storing the file using the file name as a child/key in storage space
            storageRef.child(file.name).put(file).then(function(snapshot) {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.'); //debug
                var url = snapshot.downloadURL;
                console.log('File available at', url);
                listing.file = url;
                //run cb function to post listing with updated file
                cb(listing);
            }).catch(function(error) {
                //handle upload error
                console.log('Upload failed:', error);
                listing.file = null;
            });
        }
        //run cb function on listing, will set file to null
        else cb(listing);
    }

    /* Check for changes in user's login session */
    function observeUserLoginState() {
        //check for change in login state. Set user_email to whoever is logged in
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                user_email = null;
                window.location = window.location.origin + '/login';
            } else {
                console.log("User is logged in:", user.email);
                user_email = user.email;
            }
        });
    }

return {
    init: init
}

}());