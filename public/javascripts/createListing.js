
var createListing = (function(){
    
    function init(){
        //check if user is logged in. removed for now for debug. Should probably have logout 
        //if(!$.cookie('token')){
           // window.location.href = window.origin + "/"; 
        //}

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

            //get values from user input fields and store inside listing object
            listing = {};
            //address and rent were required in hbs, will have a value
            listing.address = $address.val();
            listing.rent = $rent.val();
            //set default values if fields were left empty
            listing.deposit = $deposit.val() ? $deposit.val() : 0;
            listing.fee = $fee.val() ? $fee.val() : 0;
            listing.description = $description.val() ? $description.val() : "No description provided" ;

            //null if user does not upload file
            listing.file = null;
            //debug: print the file user wants to upload
            console.log(file);
            //get coordinates from address, check if user uploads file
            getCoordinates(listing);
            //debug
            console.log(listing);
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
                    //if user is uploading file
                    if(file){
                         //store file's name into corresponding listing
                         listing.file = file.name;
                         var data = new FormData();
                         data.append('file', file);
                         postFile(data);
                         //uncomment below to resume creation of listings (debug)
                         //postListingInfo(listing, 'sendListing');
                    }
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

    /* Post request to url to upload the image */
    function postFile(file){
        url = window.location.origin + '/createListing/uploadImage';
        //this tells us that the formData containing the file gets passed here correctly
        console.log("data is ",file.get("file"));
        return $.ajax({
            url: url,
            data: file,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST' // For jQuery < 1.9
            
        })
    }

    return {
        init: init
    }

}());