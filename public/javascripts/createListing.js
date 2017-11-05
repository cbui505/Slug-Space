
var createListing = (function(){
    
    function init(){
        //if(!$.cookie('token')){
            window.location.href = window.origin + "/";
        //}

        bindCreateButton();
    }

    //geocoder used later to parse coordinates as addresses
    geocoder = new google.maps.Geocoder();

    /* Wait for user to press the submit button */
    function bindCreateButton(){
        //object that will store user input as attributes
        var listing;
        //wait for click of create button
        $('#createButton').on('click', function(e){
            //ignore default form behavior on submit for now
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
            listing.desciption = $description.val() ? $description.val() : "No description provided" ;

            //parse input address as latitude,longitude coordinates            
            //restrict address to Santa Cruz area
            geocoder.geocode( { 'address' : listing.address + ", Santa Cruz, CA"}, function( results, status ) {
                if( status == google.maps.GeocoderStatus.OK ) {
                    //store coordinates in separate fields (firebase giving issues with arrays)
                    listing.lat = results[0].geometry.location.lat();
                    listing.long = results[0].geometry.location.lng();
                    postListingInfo(listing);
                } 
                //if we fail to parse coordinates, it's invalid
                else {
                    alert( 'Failed to geocode address with error: ' + status );
                }
            } );
            
            //debug
            console.log(listing);
        })
    }

    /* Post data to designated url*/
    function postListingInfo(data){
        //set url to post
        url = window.location.origin + '/createListing/sendListing'; 
        return $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json'
        });
    }

    return {
        init: init
    }

}());