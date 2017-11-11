var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
var unsplash = require('../helpers/unsplash');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/items', function(req, res) {
  // query for quotes/images
  console.log(req.body.query)
  unsplash.findPicturesBySearch(req.body.query, (error, results) => {
    if (error) {
      console.log('unsplash post', error);
    } else {
      // after successfully getting results
      // insert them into database
      console.log('unsplash post', results);
      let resultsArray = results.results;
      resultsArray.forEach((result, index) => {
        let mongoDoc = {
          description: result.description,
          image: result.urls.raw
        }
        let mongoItem = new items.Item(mongoDoc);
        items.insert(mongoItem, (error, data) => {
          if (error) {
            console.log('save', error);
            res.end();
          } else {
            if (index === resultsArray.length) {
              res.end();
            }
          }
        }) 
      })
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

