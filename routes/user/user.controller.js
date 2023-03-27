const db = require('../../server/db');




exports.user = (req, res)=>{
        db.query('SELECT * FROM user', function(err, rows, fields) {
          if(!err) {
            res.send(rows); // response send rows
          } else {
            console.log('err : ' + err);
            res.send(err); // response send err
          }
        });
      
}

exports.info = (req, res) => {
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

}

exports.login = (req, res) => {
    const student_id = req.query.student_id;
    const password = req.query.password;
    const query = "SELECT password FROM user WHERE student_id = ?";
  
    db.query(query, student_id, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      } else if (results.length === 0) {
        res.status(401).send('User not found');
      } else if (results[0].password === password) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Incorrect password');
      }
    });
  };