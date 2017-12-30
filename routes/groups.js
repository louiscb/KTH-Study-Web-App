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

  collection.insert(req.body, function(err, result) {
    console.log(result);
    res.send(
      (err === null) ? { msg: 'success', link: result._id } : { msg: err }
    );
  });
});

//update group
router.post('/:id', function(req, res, next) {
  res.send();
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
