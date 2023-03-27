var express = require('express');
var router = express.Router();
const db = require('../server/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info', function(req, res) {
  db.query('SELECT * FROM user', function(err, rows, fields) {
    if(!err) {
      res.send(rows); // response send rows
    } else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });
});

router.get('/info-get', (req, res) => {
  const student_id = req.query.student_id;
  const query = 'SELECT * FROM user WHERE student_id = ?';

  db.query(query, student_id, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});


module.exports = router;
