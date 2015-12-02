var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  //amount of funds left, maximum bank, members, check if they are members
  funds_remaining: Number,
  funds_max: Number,
  members: Array,
  groupType: String,
  maxMembers: Number

});

module.exports = mongoose.model('Group', groupSchema);
