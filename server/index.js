var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
var unsplash = require('../helpers/unsplash');
var reddit = require('../helpers/reddit');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(error, data) {
    if(error) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/items', function(req, res) {
  // search for images
  unsplash.findPicturesBySearch(req.body.query, (error, imageResults) => {
    if (error) {
      console.log('unsplash post error', error);
    } else {  
      // console.log('unsplash post success', imageResults);
      let imagesArray = imageResults.results;
      // after successfully getting image results
      // search for quotes
      // insert them into database
      reddit.findQuotesBySearch(req.body.query, (error, quoteResults) => {
        if (error) {
          console.log('reddit post', error);
        } else {
          let quotesArray = quoteResults.data.children;
          for (let i = 0; i < 10; i++) {
            // for (let j = 0; j < 10; j++) {
            let quote = quotesArray[i].data.title;
            quote = quote.replace(/\'|\"|-|~|—/g, ' ');
            let mongoDoc = {
              query: req.body.query,
              imageId: imagesArray[i].id,
              imageDescription: imagesArray[i].description,
              image: imagesArray[i].urls.raw,
              quoteId: quotesArray[i].created,
              quote: quote,
              likes: 0
            }
            let mongoItem = new items.Item(mongoDoc);
            items.insert(mongoItem, (error, data) => {
              if (error) {
                console.log('save', error);
                res.end();
              } else {
                if (i === imagesArray.length) {
                  res.end();
                }
              }
            });
            // }
          }
        }
      });
    }
  });
});

app.post('/changeLike', function(req, res) {
  let itemId = req.body.itemId;
  let likes = req.body.likes;
  let action = req.body.actionToTake;
  items.changeLike(itemId, action, (error, results) => {
    if (error) {
      console.log('update', error);
    } else {
      console.log('update', results);
      res.end();
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

