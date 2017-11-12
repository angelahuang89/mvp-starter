const request = require('request');

let findQuotesBySearch = (searchTerm, callback) => {
  
  let options = {
    'url': `https://www.reddit.com/r/quotes/search.json?q=${searchTerm}&sort=top&restrict_sr=1&limit=25`,
    // 'headers': {
    //   'User-Agent': 'request'
    // }
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

module.exports.findQuotesBySearch = findQuotesBySearch;