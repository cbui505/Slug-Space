var firebase = require("firebase");

/*Store the listing's data in the database */
exports.sendData = function(listing){
  //debug
  console.log("made it to models");

  //get reference to database and where we want to push data
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');
  ref.push(listing);
};

/* return all listings currently in the database */
exports.getUserListings = function(cb){
  //get reference to database
  var slugDB = firebase.database();
  var ref = slugDB.ref('Listings');

  var listingsArray = [];

  //get a snapshot of the listings in the db
  ref.once('value').then(function(snap) {
    var listings = snap.val();
    snap.forEach(function(element) {
        var elementVal = element.val();
        listingsArray.push(elementVal);
    });
    //pass listings along to cb function to avoid asynchronous bugs
    cb(listingsArray);
    
  });
}

exports.uploadPicture = function(file){
  var pic = file;
  /*var storageRef = firebase.storage();
  console.log("got to storageref");
  storageRef.child(file.name).put(file).then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    var url = snapshot.downloadURL;
    console.log('File available at', url);
    return url;
  }).catch(function(error) {
    console.log('Upload failed:', error);
    return null;
  }); */
  console.log("file is ", pic);
}
