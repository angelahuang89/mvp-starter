const request = require('request');

let findPicturesBySearch = (searchTerm, callback) => {
  
  let options = {
    // 'url': `https://www.reddit.com/r/${searchTerm}.json?count=5`,
    'url': `https://api.unsplash.com/search/photos?query=${searchTerm}`,
    'headers': {
      'Authorization': 'Client-ID',
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