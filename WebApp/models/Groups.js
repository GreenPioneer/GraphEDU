var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  //amount of funds left, maximum bank, members, check if they are members
  funds: { type: String, unique: true, lowercase: true },
  password: String,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    group: { type: String, default: '' },
    paypal: { type: String, default:''}
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
});


