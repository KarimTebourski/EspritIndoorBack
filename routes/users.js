const express = require('express');
const router = express.Router();

const User = require('../models/User');
router.get('/', function (req, res, next) {
  User.find({})
    .populate('friends')
    .populate('events')
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      else res.send(data);
    })
});

router.get('/userId/:id', function (req, res, next) {
  User.findById(req.params.id)
    .populate('events')
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      else res.send(data);
    })
});


router.post('/', function (req, res, next) {
  User.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    idaUuid: req.body.idaUuid,
  }, function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
});
//
router.post("/login", function (req, res) {
  userName = req.body.userName,
    password = req.body.password
  User.findOne({ userName: userName, password: password }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      return res.status(404).send();
    }

    return res.send(user);
  });
});

///
router.post('/withFriend', function (req, res, next) {
  User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    friends: req.body.friends
  }, function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
});

router.delete('/deletUser/:id', function (req, res) {
  var id = req.params.id;
  User.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();

  });
});

router.post('/addFriend/:id/friend/:fid', function (req, res) {
  User.findById(req.params.id, function (err, post) {
    if (err) {
      return console.log(err)
    }
    post.friends.push(req.params.fid)
    post.save(function (err, editeduser) {
      if (err) {
        return console.log(err)
      }
      console.log(editeduser.friends.length);
      console.log(req.params.fid)
      return res.status(200).send();
    })
  })
});

router.get("/Uid/:userName", function (req, res) {
  userName = req.params.userName;

  User.findOne({ userName: userName }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  });
});
//event1
router.post('/favoris/:id/event/:fid', function (req, res) {
  User.findById(req.params.id, function (err, post) {
    if (err) {
      return console.log(err)
    }
    post.events.push(req.params.fid)
    post.save(function (err, editeduser) {
      if (err) {
        return console.log(err)
      }
      console.log(editeduser.events.length);
      console.log(req.params.fid)
      return res.status(200).send();
    })
  })
});


router.delete('/delete/:id/friend/:fid', function (req, res) {
  User.findById(req.params.id, function (err, post) {
    if (err) {
      return console.log(err)
    }
    post.friends.pull(req.params.fid)
    post.save(function (err, editeduser) {
      if (err) {
        return console.log(err)
      }
      console.log(editeduser.friends.length);
      console.log(req.params.fid)
      return res.status(200).send();
    })
  })
});
///event
router.get('/delete/:id/favEvent/:fid', function (req, res) {
  User.findById(req.params.id, function (err, post) {
    if (err) {
      return console.log(err)
    }
    post.events.pull(req.params.fid)
    post.save(function (err, editeduser) {
      if (err) {
        return console.log(err)
      }
      console.log(editeduser.events.length);
      console.log(req.params.fid)
      return res.status(200).send();
    })
  })
});

router.put('/updateUserName/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOne({ _id: id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.userName) {
          foundObject.userName = req.body.userName;
        }
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updateObject);
          }
        });
      }
    }
  });
});

router.put('/updatePassword/:id', function (req, res, next) {
  var id = req.params.id;
  User.findOne({ _id: id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.password) {
          foundObject.password = req.body.password;
        }
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updateObject);
          }
        });
      }
    }
  });
});

module.exports = router;
