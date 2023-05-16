const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./auth');
const db = require('../../server/db');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt')

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

exports.infotoken = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded// 헤더에서 토큰 추출
    const student_id = token.student_id;
 
    const query = 'SELECT * FROM user WHERE student_id = ?';

    db.query(query, student_id, (error, results, fields) => {
        if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
        } else {
        res.status(201).json(results);
        }
    });
  })
}

exports.login = (req, res) => {
  const student_id = req.query.student_id;
  const password = req.query.password;
  
  const query = "SELECT password FROM user WHERE student_id = ?";
  db.query(query, student_id, (error, results, fields) => {
    const encodedPassword = bcrypt.compareSync(password, results[0].password);
    console.log(encodedPassword);
    if (error) {
      console.error(error);
      res.status(500).send('내부 서버 오류');
    } else if (results.length === 0) {
      res.status(401).send('사용자를 찾을 수 없음');
    } else if (encodedPassword) {
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

/*
exports.logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // get token from headers
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.error(error);
      res.status(500).send('내부 서버 오류');
    } else {
      // Expire token immediately
      const expiredToken = jwt.sign({
        student_id: decoded.student_id,
      }, process.env.JWT_SECRET, {
        expiresIn: 0,
        issuer: decoded.student_id,
      });
      res.status(200).json({ message: '로그아웃 성공', token: expiredToken });
    }
  });
};
*/

    exports.sendVerificationEmail = (req, res) => {
          const { email } = req.body;
          const verificationCode = randomstring.generate(6); // 6자리의 인증번호 생성
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD,
            },
          });
          const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: '회원가입 이메일 인증',
            text: `회원가입을 위한 인증번호는 ${verificationCode}입니다.`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send('이메일 전송 중 오류가 발생했습니다.');
            } else {
              console.log('이메일이 성공적으로 발송되었습니다.', info.response);
              // 이메일 전송이 성공한 경우, 클라이언트에게 인증번호를 전달

              res.status(200).json({ verificationCode });
            }
          });
        };




        exports.signup = (req, res) => {
          const { verificationCode, _verificationCode } = req.body;
            const savedVerificationCode = verificationCode;

           if (_verificationCode === savedVerificationCode) {
             const { student_id, password, name, email, grade } = req.body;
             const encryptedPassowrd = bcrypt.hashSync(password, 10);
             const query = 'INSERT INTO user (student_id, password, name, email, grade, permission) VALUES (?, ?, ?, ?, ?, 1)';

             db.query(query, [student_id, encryptedPassowrd, name, email, grade], (error, results, fields) => {
               if (error) {
                 console.error(error);
                 res.status(500).send('내부 서버 오류');
               } else {
                 // 회원가입이 성공한 경우, 응답을 보내거나 다른 처리를 수행
                 res.status(200).send('회원가입이 완료되었습니다.');
               }
             });
           } else {
             // 인증번호가 일치하지 않는 경우, 오류 응답
             res.status(401).send('인증번호가 일치하지 않습니다.');
           }
         };


 exports.userupdate = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded// 헤더에서 토큰 추출
    const student_id = token.student_id;
    const password = req.body.password;
    const encryptedPassowrd = bcrypt.hashSync(password, 10);

    const query = 'UPDATE user SET password = ? WHERE student_id = ?';

    db.query(query, [encryptedPassowrd, student_id], (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('서버 내부 오류');
        } else {
        res.status(201).json({message: "비밀번호 변경 성공!"});
        }
    });
  })
 }

 exports.upload = (req, res) => {
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'routes/image/'); // 파일 저장 경로
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname); // 파일 이름 설정
    }
  });
 
  const upload = multer({ storage: storage }).single('image');

  try {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // 파일 업로드 중 에러 발생시
        console.log(err);
        res.status(500).send('파일 업로드 중 에러가 발생하였습니다.');
      } else if (err) {
        // 그 외 에러 발생시
        console.log(err);
        res.status(500).send('서버 내부 오류');
      } else {
        // 정상적으로 파일 업로드 완료시
        console.log(req.file);
        res.status(201).send('파일 업로드가 완료되었습니다.');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('서버 내부 오류');
  }
}

exports.loding = (req, res) => {
  const fileId = req.query.image;
  const fs = require('fs');
  const filePath = path.join(__dirname, '../image/', `${fileId}`); // 파일 경로
  try {
    if (fs.existsSync(filePath)) { // 파일이 존재하는지 확인
      res.sendFile(filePath); // 파일 전송
    } else {
      console.log(filePath);
      res.status(404).send('File not found'); // 파일이 존재하지 않으면 404 에러 전송
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); // 서버 에러 발생시 500 에러 전송
  }
}