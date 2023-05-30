const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./auth');
const db = require('../../server/db');

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt')
//아무튼 테스트 성공임

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
        res.status(201).json(results);
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
  const fcm_token = req.query.fcm_token;

  const query = "SELECT password FROM user WHERE student_id = ?";
  db.query(query, student_id, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('내부 서버 오류');
    } else if (results.length === 0) {
      res.status(401).send('사용자를 찾을 수 없음');
    } else {
      const encodedPassword = bcrypt.compareSync(password, results[0].password);
      if (encodedPassword) {
        // FCM 토큰 업데이트
        const updateTokenQuery = "UPDATE user SET fcm_token = ? WHERE student_id = ?";
        db.query(updateTokenQuery, [fcm_token, student_id], (tokenError, tokenResults, tokenFields) => {
          if (tokenError) {
            console.error(tokenError);
            res.status(500).send('FCM 토큰 업데이트 중 오류가 발생했습니다.');
          } else {
            // JWT 토큰 생성
            const token = jwt.sign({
              student_id
            }, process.env.JWT_SECRET, {
              expiresIn: '365d',
              issuer: student_id
            });
            res.status(200).json({ message: '로그인 성공', token: token });
          }
        });
      } else {
        res.status(401).send('잘못된 비밀번호');
      }
    }
  });
};



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
              res.status(200).json({ verificationCode });
            }
          });
        };




        exports.signup = (req, res) => {
          const { verificationCode, _verificationCode } = req.body;
            const savedVerificationCode = verificationCode;

           if (_verificationCode === savedVerificationCode) {
             const { student_id, password, name, email, grade, fcm_token } = req.body;
             const encryptedPassowrd = bcrypt.hashSync(password, 10);
             const query = 'INSERT INTO user (student_id, password, name, email, grade, permission, fcm_token) VALUES (?, ?, ?, ?, ?, 1, ?)';

             db.query(query, [student_id, encryptedPassowrd, name, email, grade, fcm_token], (error, results, fields) => {
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
         exports.adminsignup = (req, res) => {

             const { student_id, password, name, email } = req.body;
             const encryptedPassowrd = bcrypt.hashSync(password, 10);
             const query = 'INSERT INTO user (student_id, password, name, email, grade, permission, fcm_token) VALUES (?, ?, ?, ?, 99, 3, ?)';

             db.query(query, [student_id, encryptedPassowrd, name, email, fcm_token], (error, results, fields) => {
               if (error) {
                 console.error(error);
                 res.status(500).send('내부 서버 오류');
               } else {
                 // 회원가입이 성공한 경우, 응답을 보내거나 다른 처리를 수행
                 res.status(200).send('회원가입이 완료되었습니다.');
               }
             });
           
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
 exports.usergrade = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded// 헤더에서 토큰 추출
    const student_id = token.student_id;
    const grade = req.body.grade;

    const query = 'UPDATE user SET grade = ? WHERE student_id = ?';

    db.query(query, [grade, student_id], (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('서버 내부 오류');
        } else {
        res.status(201).json({message: "학년 변경 성공"});
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