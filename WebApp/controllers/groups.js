//groups logic. need to be able to invite people to groups. make a new group. leave a group. initiate removal of group member
var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var Group = require('../models/Groups');
var User = require('../models/User');
var secrets = require('../config/secrets');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'thomasqjohns1@gmail.com',
      pass: '!TJ527041tj'
  }
});


/**
 * GET /group
 * Group page. Get the group the user is in, recent fund request,group members. 
 */
exports.getGroup = function(req, res) {
   Group.findOne({ groupname: req.user.profile.group }, function(err, existingGroup){
     if (existingGroup) {
      res.render('account/group', {
        title: 'Group',
        myGroup: existingGroup,
        test: JSON.stringify(existingGroup)
       }); 
     } else {
	res.render('account/group', {
        title: 'Group'
        
    });
  };
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
      req.flash('errors', { msg: 'Group with that name already exists.' });
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
 * User leaves a group. Groupid should reference the objectid of the user group. Like req.user.group
 */
exports.postLeaveGroup = function(req, res, next) {
  console.log(req.user.profile.group);
  Group.findOne({groupname: req.user.profile.group }, function (err, group) {
  console.log(group);
  console.log(req.user.profile.group);
  group.members.pull({members: req.user.id} , function(err) {
    if (err) return next(err);
   }); 
     group.save(function(err) {
       if (err) return next(err);
          req.flash('info', {msg: 'You are alone now'});
          res.redirect('/account/group');
   });
  });
 };

/**
 * POST /account/mediate
 * If group member has done 
 */



/**
 * POST /account/invite
 * Invite users to a group 
 */
exports.postInvite = function (req, res, next) {
  req.assert('groupinvite', 'Email is not valid').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account/group');
  }

  var from = 'Moonshot Hq';
  var name = 'Moonshot Projects';
  var body = 'Join our Group';
  var to = req.body.groupinvite;
  var subject = 'You are invited to our group | GraphEdu';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/account/group');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/');
  });
};

  

/**
 * POST /account/join
 * Join a group. Adds you to group index
 */

exports.postJoinGroup = function(req, res, next) {
   Group.findOne({ groupname: req.body.groupjoin }, function(err, existingGroup) {
    if (existingGroup) {
     if (req.user.profile.group) {
       req.flash('errors', { msg: 'You are already in a group' });
       res.redirect('/account/group'); } else { 
    existingGroup.members.push({ members: req.user.id }, function(err) {
    if (err) return next(err);
      });
    
      existingGroup.save(function(err) {
      if (err) return next(err);
          //res.redirect('/account/group');
          //req.flash('info', {msg: 'Welcome to the Group.'});

    User.findById(req.user.id, function(err, user) {
     if (err) return next(err);
     user.profile.group = req.body.groupjoin; 
       user.save(function(err) {
       if (err) return next(err);
       req.flash('success', { msg: 'Welcome to Group' });
       res.redirect('/account/group');
         }); 
       });
     });
    };
    } else { 
    req.flash('errors', { msg: 'Yo that is not a group yet. Make one real quick' });
    res.redirect('/account/group');
    }
});
};

/**
 * POST /grouplist
 * Gets a list of groups
 */

exports.getGroupList = function(req, res, next) {
 Group.find(function (err, group) {
    if (err) return next(err);

    res.redirect('/');
});
};


//test
/**
 //  Group.findOne({ groupname: 'testbaby' }, function(err, existingGroup) {
     console.log(existingGroup);

    existingGroup.members.push({ members: req.user.id }, function(err) {
    if (err) return next(err);
    console.log(existingGroup);
    console.log('modifed');
      });
   console.log(existingGroup);


    existingGroup.members.pull({ members: req.user.id }, function(err) {
    if (err) return next(err);
    console.log(existingGroup);
    console.log('modifed');
      });
   console.log(existingGroup); 

});
*/
