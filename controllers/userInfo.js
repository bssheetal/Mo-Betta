var db = require("../models");

module.exports = {
    // Find one userinfo
    findById: function(req, res) {
        db.UserInfo
          .findById(req.params.id)
          .then(dbUserInfo => res.json(dbUserInfo))
          .catch(err => res.status(422).json(err));
      },

    
    // Create a new userinfo
    create: function(req, res) {
      db.UserInfo.create(req.body).then(function(dbUserInfo) {
        res.json(dbUserInfo);
      });
    }
           
  };

