//groups logic. need to be able to invite people to groups. make a new group. leave a group. initiate removal of group member
var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var Group = require('../models/Groups');
var secrets = require('../config/secrets');


/**
 * GET /group
 * Group page.
 */
exports.getGroup = function(req, res) {
  res.render('account/group', {
    title: 'Group'
  });
};


/**
 * POST /NewGroup
 * Create a new group.
 */
exports.postNewGroup = function(req, res, next) {
  req.assert('groupname', 'Group name must be at least 4 characters long').len(4);
  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('group');
  }

  var group = new Group({
    groupname: req.body.groupname
  });

  Group.findOne({ groupname: req.body.groupname }, function(err, existingGroup) {
    if (existingGroup) {
      req.flash('info', { msg: 'Group with that name already exists.' });
      return res.redirect('group');
    }
    group.save(function(err) {
      if (err) return next(err);
   //   req.logIn(user, function(err) {
   //     if (err) return next(err);
        req.flash('info', {msg: 'Welcome to the Group.'});
         res.redirect('/account');
    //  });
    });
  });
};


/**
 * POST /account/leaveGroup
 * User leaves a group.
 */
exports.postLeaveGroup = function(req, res, next) {
  Group.remove({ _id: req.user.id }, function(err) {
    if (err) return next(err);
    
    req.flash('info', { msg: 'You are now alone.' });
    res.redirect('/');
  });
};

/**
 * POST /account/mediate
 * User leaves a group.
 */



/**
 * POST /account/invite
 *Invite users to a group 
 */


/**
 * POST /account/join
 *Join  a group
 */


