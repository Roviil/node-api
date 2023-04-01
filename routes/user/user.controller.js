const db = require('../../server/db');
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../user/auth');


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
        expiresIn: '1h',
        issuer: student_id
      });
      res.status(200).json({ message: '로그인 성공', token: token });
    } else {
      res.status(401).send('잘못된 비밀번호');
    }
  });
}

exports.logout = (req, res) => {
  const { content } = req.body;
  if (content !== 'logout') {
    return res.status(400).json({ message: 'Invalid request' });
  }

  try {
    // 쿠키에서 토큰 가져오기
    const token = req.cookies.token;

    // 토큰이 없으면 이미 로그아웃된 상태
    if (!token) {
      return res.status(200).json({ message: 'Already logged out' });
    }

    // 토큰 만료시간 설정
    const cookieOptions = {
      expires: new Date(Date.now()),
      httpOnly: true
    };

    // 쿠키에서 토큰 삭제
    res.cookie('token', '', cookieOptions);

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





  exports.signup = (req, res) => {
    const { student_id, password, name, email } = req.body;
     const query = 'INSERT INTO user (student_id, password, name, email) VALUES (?, ?, ?, ?)';

     db.query(query, [student_id, password, name, email], (error, results, fields) => {
       if (error) {
         console.error(error);
         res.status(500).send('내부 서버 오류');
       } else {
         res.status(200).send('회원가입이 완료되었습니다.');
       }
   });
 };