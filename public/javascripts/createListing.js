
var createListing = (function(){
    
    function init(){
        //check if user is logged in. removed for now for debug. Should probably have logout 
        if(!$.cookie('token')){
            window.location.href = window.origin + "/"; 
        }
        //check for press of the following buttons
        bindCreateButton();
        bindCheckButton();
        bindUpload();
    }

    //geocoder used later to parse coordinates as addresses
    geocoder = new google.maps.Geocoder();

    var file = null;

    /* handle press of create listing button */
    function bindCreateButton(){
        //object that will store user input as attributes
        var listing;
        //wait for click of create button
        $('#createButton').on('click', function(e){
            //ignore default form behavior on submit
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

            //get values from user input fields and store inside listing object
            listing = {};
            //address and rent were required in hbs, will have a value
            listing.address = $address.val();
            listing.rent = $rent.val();

            //make sure user fills in required fields
            if(!listing.address || !listing.rent){
                alert("Please fill in all required fields");
            }
            else{
                //set default values if fields were left empty
                listing.deposit = $deposit.val() ? $deposit.val() : 0;
                listing.fee = $fee.val() ? $fee.val() : 0;
                listing.description = $description.val() ? $description.val() : "No description provided" ;
                listing.beds = $beds.val() ? $beds.val() : 0;
                listing.baths = $baths.val() ? $baths.val() : 0;
                listing.tenants = $tenants.val() ? $tenants.val() : 1;

                //null if user does not upload file
                listing.file = null;

                //get coordinates from address, check if user uploads file
                getCoordinates(listing);
                console.log(listing);
            }
        })
    }

    //parse input address as latitude,longitude coordinates 
    function getCoordinates(listing){           
            //restrict address to Santa Cruz area
            geocoder.geocode( { 'address' : listing.address + ", Santa Cruz, CA"}, function( results, status ) {
                if( status == google.maps.GeocoderStatus.OK ) {
                    //store coordinates in separate fields (firebase giving issues with arrays)
                    listing.lat = results[0].geometry.location.lat();
                    listing.long = results[0].geometry.location.lng();
                    //store file, pass callback function to post the listing
                    uploadPicture(file, postListingInfo, listing);
                } 
                //if we fail to parse coordinates, it's invalid
                else {
                    alert( 'Failed to geocode address with error: ' + status );
                }
            } );
    }

    /* handles check button press: will delete this function along with button later on */
    function bindCheckButton(){
        $('#getButton').on('click', function(e){
                  e.preventDefault();
                  postListingInfo(null, "getListing")
        
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
    function postListingInfo(data, link){
        //set url to post
        url = window.location.origin + '/createListing/' +link;
        return $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json'
        });
    }

    /* Upload the picture to firebase's storage space, set file field for listing in db */
    uploadPicture = function(file, cb, listing){
        //get reference to firebase storage
        var storageRef = firebase.storage().ref();
        console.log("got to storageref, file is ",file);   //debug
        //upload file if it is provided by user
        if(file){
            //storing the file using the file name as a child/key in storage space
            storageRef.child(file.name).put(file).then(function(snapshot) {
             console.log('Uploaded', snapshot.totalBytes, 'bytes.'); //debug
             var url = snapshot.downloadURL;
             console.log('File available at', url);
             listing.file = url;
             //run cb function to post listing with updated file
             cb(listing, 'sendListing');
             }).catch(function(error) {
             //handle upload error
             console.log('Upload failed:', error);
             listing.file = null;
            });
        }
        //run cb function on listing, will set file to null
        else cb(listing, 'sendListing');
      }

    return {
        init: init
    }

}());