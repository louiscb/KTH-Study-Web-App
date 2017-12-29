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

router.post('/create', function(req, res, next) {
  res.send();
});

//update group
router.post('/:id', function(req, res, next) {
  res.send();
});

router.delete('/delete', function(req, res, next) {
  res.send();
});

module.exports = router;
