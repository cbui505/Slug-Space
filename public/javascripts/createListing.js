var createListing = (function(){
    
    function init(){
        bindCreateButton();
    }

    geocoder = new google.maps.Geocoder();

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
            var coordinates = [];
            //restrict address to Santa Cruz area
            geocoder.geocode( { 'address' : listing.address + ", Santa Cruz, CA"}, function( results, status ) {
                if( status == google.maps.GeocoderStatus.OK ) {
                    coordinates.push(results[0].geometry.location.lat());
                    coordinates.push(results[0].geometry.location.lng());
                } else {
                    alert( 'Failed to geocode address with error: ' + status );
                }
            } );
            
            //add coordinates array to listing. Warning: could be empty
            listing.coordinates = coordinates;

            //for now, print to console
            console.log(listing);

            /*TODO: make call to functions defined in models to store user input */
        })
    }

    return {
        init: init
    }

}());