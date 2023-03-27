// var express = require('express');
// const app = require('../app');
// var router = express.Router();
// const db = require('../server/db');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// //test 주석
// router.get('/posts', function(req, res) {
//   db.query('SELECT * FROM post', function(err, rows, fields) {
//     if(!err) {
//       res.send(rows); // response send rows
//     } else {
//       console.log('err : ' + err);
//       res.send(err); // response send err
//     }
//   });
// });

// router.get('/board-posts', (req, res) => {
//   const board_id = req.query.board_id;
//   const query = 'SELECT * FROM post WHERE board_id = ?';

//   db.query(query, board_id, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(results);
//     }
//   });
// });


// module.exports = router;
