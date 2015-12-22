var mongoose = require('mongoose');

var fundsSchema = new mongoose.Schema({
  //amount of funds left, maximum bank, members, check if they are members
  groupname: String,
  funds_requested: Numb,
  funds_reason: String,
  userid: Numb

});

module.exports = mongoose.model('Funds', fundsSchema);
