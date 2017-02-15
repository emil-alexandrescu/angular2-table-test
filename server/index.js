var express = require('express');
var _ = require('lodash');
var data = require('./data.json');

var app = express();

// format the data to object array
data = _.map(data, function(row, index) {
  return {
    id: index + 1,
    name: row[0],
    position: row[1],
    location: row[2],
    // joinDate: row[4],
    // salary: row[5]
  };
});

app.get('/customers', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  var formattedData = data;
  if (req.query.sort) {
    var fields = _.keys(req.query.sort);
    var orders = _.values(req.query.sort);
    formattedData = _.orderBy(formattedData, fields, orders);
  }

  if (req.query.filter) {
    var filter = req.query.filter.toLowerCase();
    formattedData = _.filter(formattedData, function(item) {
      return (item.name.toLowerCase().indexOf(filter) > -1) ||
        (item.position.toLowerCase().indexOf(filter) > -1);
    });
  }
  res.json(formattedData);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
