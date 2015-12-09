var mongoose = require('mongoose');

var groupmemberSchema = new mongoose.Schema({
  //amount of funds left, maximum bank, members, check if they are members
  groupname: String,
  funds_remaining: Number,
  funds_max: Number,
  members: Array,
  groupType: String,
  maxMembers: Number

});

module.exports = mongoose.model('GroupMember', groupmemberSchema);
