var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  // quantity: Number,
  query: String,
  imageId: { type: String, unique: true },
  imageDescription: String,
  image: String,
  quoteId: String,
  quote: String,
  likes: Number
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var insert = function(item, callback) {
  item.save((error, data) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  })
  
}

var changeLike = function(itemId, likes, action, callback) {
  let updatedLikes = likes;
  if (action === 'addLike') {
    updatedLikes++;
    Item.update({ _id: itemId }, { likes: updatedLikes }, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  }
  if (action === 'removeLike') {
    updatedLikes--;
    Item.update({ _id: itemId }, { likes: updatedLikes }, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  }
}

// module.exports.selectAll = selectAll;
// module.exports.insert = insert;
// module.exports.Item = Item;
module.exports = { Item, selectAll, insert, changeLike };