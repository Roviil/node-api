//토큰 값 유효성 검사 코드
/*
  사용법 각 컨트롤러에서 토큰 값 인증시 사용할 수 있도록 만드는법
  const path = require("path");
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
  const jwt = require('jsonwebtoken');
  const { verifyToken } = require('../user/auth');
  맨 위에 코드 추가 후

    exports.write = (req, res) => {
    verifyToken(req, res, () => {
      const token = req.decoded// 헤더에서 토큰 추출
      const student_id = token.student_id; // 사용자 ID 추출
      이렇게 하면 student_id를 받아 올 수 있음 그 후는 맘대로 코딩
      대신 verifyToken 함수 안에서 코드 작성해야 토큰 변수 값을 계속 사용 가능
      사용 예시는 post/post.controller.js 안에 write 함수 참고
    }
  }

*/
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../../server/db');
const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next();
  }
  
  // 인증 실패 
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
   return res.status(401).json({
     code: 401,
     message: '유효하지 않은 토큰입니다.',
     error: req.decoded
   });
  }
}