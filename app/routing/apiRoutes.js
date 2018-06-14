// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

//   app.get("/api/waitlist", function(req, res) {
//     res.json(waitListData);
//   });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a match or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    // if (tableData.length < 5) {
    var newFriend = req.body;
    var totalDifference = 0;
    var bestFriend = 0;

      for (var j = 0; j < friendsData.length; j++) {
          for (var i = 0; i < 9; i++) {
              totalDifference += Math.abs(newFriend.scores[i]-friendsData[j].scores[i])
          }
          if (totalDifference == 0) {
            // Return index of best match, we could return an array with more than one match
            res.json(friendsData[j]);
            totalDifference = 0;
          } else {
            bestFriend = 0;
          }
        }
      // Push new user to friendsData array
      friendsData.push(req.body);
      // Log out 
      console.log(newFriend);
      console.log(totalDifference);

      // Reset totalDifference counter
      totalDifference = 0;
      // Response
      //res.json(friendsData);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the array of data
    friendsData = [];

    console.log(friendsData);
  });
};


