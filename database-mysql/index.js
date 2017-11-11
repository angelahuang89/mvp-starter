var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'plantlife',
  database : 'test'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM images', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertAll = function(data, callback) {
  var queryString = 'INSERT INTO images (id, quantity, description) VALUES';
  data.forEach(item => {
    connection.query(queryString + '()', function(err, results, fields) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
  });
}

module.exports.selectAll = selectAll;
