const db = require('../../server/db');



exports.posts = (req, res)=>{
        db.query('SELECT * FROM post', function(err, rows, fields) {
          if(!err) {
            res.send(rows); // response send rows
          } else {
            console.log('err : ' + err);
            res.send(err); // response send err
          }
        });
      
}

exports.postsget = (req, res) => {
    const board_id = req.query.board_id;
    const query = 'SELECT * FROM post WHERE board_id = ?';

     db.query(query, board_id, (error, results, fields) => {
        if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
        } else {
        res.status(200).json(results);
        }
    });

}