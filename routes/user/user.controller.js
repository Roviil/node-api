const db = require('../../server/db');
const jwt = require('jsonwebtoken');



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

  exports.logintest = (req, res) => {
    const student_id = req.query.student_id;
    const password = req.query.password;
    const query = "SELECT password FROM user WHERE student_id = ?";
  
    db.query(query, student_id, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('내부 서버 오류');
      } else if (results.length === 0) {
        res.status(401).send('사용자를 찾을 수 없음');
      } else if (results[0].password === password) {
        // JWT 토큰 생성
        const token = jwt.sign({ student_id: student_id }, '당신의-비밀-키', { expiresIn: '1h' });
        res.status(200).json({ message: '로그인 성공', token: token });
      } else {
        res.status(401).send('잘못된 비밀번호');
      }
    });
  };