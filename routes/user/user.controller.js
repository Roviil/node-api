const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
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
      console.error(error);
      res.status(500).send('내부 서버 오류');
    } else if (results.length === 0) {
      res.status(401).send('사용자를 찾을 수 없음');
    } else if (results[0].password === password) {
      // JWT 토큰 생성
      const token = jwt.sign({
        student_id
      }, process.env.JWT_SECRET, {
        expiresIn: '1m',
        issuer: student_id
      });
      res.status(200).json({ message: '로그인 성공', token: token });
    } else {
      res.status(401).send('잘못된 비밀번호');
    }
  });
}


exports.signup = (req, res) => {
  const { student_id, password, name, email } = req.body;

  const query = 'INSERT INTO user (student_id, password, name, email, permission, grade) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [student_id, password, name, email, 1, 3], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: '회원가입에 실패했습니다.' });
    } else {
      res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    }
  });
};
