var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/list/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('studyGroups');
  var id = req.params.id;

  collection.findOne({'_id':id}, function(e, group) {
    res.render('group', group);
  });
});

router.get('/list', function(req, res, next) {
  var db = req.db;
  var collection = db.get('studyGroups');

  collection.find({}, {}, function(e, docs){
    res.json(docs);
  })
});

router.get('/create', function(req, res, next) {
  res.render('new-group');
});

router.post('/create', function(req, res, next) {
  var db = req.db;
  var collection = db.get('studyGroups');
  req.body.owner = req.session.user.email;
  var d = new Date();
  req.body.timeStamp = d.toDateString();
  req.body.numOfParticipants = 1;
  req.body.members = [req.body.owner];

  collection.insert(req.body, function(err, result) {
    console.log(result);
    res.send(
      (err === null) ? { msg: 'success', link: result._id } : { msg: err }
    );
  });
});

//join group
router.post('/join/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('studyGroups');
  var id = req.params.id;
  var isMember = false;

  collection.findOne({_id :id }, function(e, group) {
      for (i in group.members) {
        if (group.members[i] === req.session.user.email) {
          isMember = true;
          break;
        }
      }
      if (!isMember) {
        collection.update({_id :id }, { $push : {"members" : req.session.user.email }}, function(e, group) {
          res.send({msg: 'success'});
        });
      } else {
        res.send({msg: 'You are already a member'});
      }
  });
});

router.delete('/delete/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('studyGroups');
  var idToDelete = req.params.id;

  collection.findOne({_id :idToDelete }, function(e, group) {
    if (group.owner === req.session.user.email) {
      collection.remove({_id : idToDelete }, function (err, result){
        res.send(
          (err == null) ? { msg: 'success'} : { msg: err });
      });
    } else {
      res.send ({ msg: 'Not Owner'});
    }
  });
});

module.exports = router;
