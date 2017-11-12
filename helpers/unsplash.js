const request = require('request');

let findPicturesBySearch = (searchTerm, callback) => {
  
  let options = {
    'url': `https://api.unsplash.com/search/photos?query=${searchTerm}`,
    'headers': {
      'Authorization': 'Client-ID ed9b35a79f405d20f7bc0fd801d8e49a5c50cc32d8262403970a481f6de29397',
      'User-Agent': 'request'
    }
  }
  
  request(options, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      // console.log('this is the', body);
      var data = JSON.parse(body);
      callback(null, data);
    }
  });
  
}

module.exports.findPicturesBySearch = findPicturesBySearch;