const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../user/auth');
const db = require('../../server/db');

const multer = require('multer');




const getDate = (callback) => {
  const sql = 'SELECT NOW()'; // SQL 쿼리
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      callback(error, null);
    } else {
      callback(null, results[0]['NOW()']);
    }
  });
};



//모든 게시글
exports.post = (req, res)=>{
  db.query('SELECT * FROM gs_post', function(err, rows, fields) {
    if(!err) {
      res.send(rows);
    } else {
      console.log('err : ' + err);
      res.send(err);
    }
  });
}



//졸업인증제 항목정보
exports.gsinfo = (req, res)=>{
  db.query('SELECT * FROM gs_info', function(err, rows, fields) {
    if(!err) {
      res.send(rows);
    } else {
      console.log('err : ' + err);
      res.send(err);
    }
  });
}



//사용자 정보 리턴
exports.getUserInfo = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded 

    try {
      const student_id = token.student_id 

      db.query(`SELECT * FROM user WHERE student_id = ${student_id}`, function (err, rows, fields) {
        if (!err) {
          res.status(200).json(rows[0])
        } else {
          console.log('Error: ' + err)
          res.status(500).json({ message: '서버 내부 오류' })
        }
      })

    } catch (err) {
      console.error('토큰 검증 실패: ', err)
      res.status(401).json({ message: '토큰이 유효하지 않습니다.' })
    }
  })
}



//권한에 따른 작성글 로드
exports.getPosts = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded

    try {
      const student_id = token.student_id; 

      db.query(`SELECT permission FROM user WHERE student_id = ${student_id}`, function (err, row, fields) {
        if (!err) {
          const permission = row[0].permission;
          if (permission === 2) {
            db.query('SELECT * FROM gs_post', function (err, rows, fields) {
              if (!err) {
                res.status(200).json(rows);
              } else {
                console.log('err : ' + err);
                res.status(500).json({ message: '서버 내부 오류' });
              }
            });
          } else {
            db.query(`SELECT * FROM gs_post WHERE gsuser_id = ${student_id}`, (err, results, fields) => {
              if (!err) {
                res.status(200).json(results);
              } else {
                console.log('err : ' + err);
                res.status(500).json({ message: '서버 내부 오류' });
              }
            });
          }
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};



//신청글 작성
exports.write = (req, res) => {
  verifyToken(req, res, () => {
    const category = req.body.gspost_category;
    const item = req.body.gspost_item;
    const score = req.body.gspost_score;
    const content = req.body.gspost_content;
    const pass = req.body.gspost_pass;
    const reason = req.body.gspost_reason;
    const startDate = req.body.gspost_start_date;
    const endDate = req.body.gspost_end_date;
    const filecheck = req.body.gspost_file;

    const token = req.decoded// 헤더에서 토큰 추출

    try {

      const student_id = token.student_id; // 사용자 ID 추출

      getDate((error, date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO gs_post (gsuser_id,gspost_post_date,gspost_category,gspost_item,gspost_score,gspost_content,gspost_pass,gspost_reason,gspost_start_date,gspost_end_date,gspost_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            student_id,date,category,item,score,content,pass,reason,startDate,endDate,filecheck
          ];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("게시물 작성 실패: ", error);
              res.status(500).json({ message: "서버 내부 오류" });
            } else {
              console.log("게시물 작성 성공!");
              const newPostId = results.insertId; // 새로 생성된 게시글의 ID값
              res.status(201).json({ message: "게시물이 성공적으로 작성되었습니다.", postId: newPostId });
            }
          });
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
}

//파일 서버, db 업로드
exports.upload = (req, res) => {
  const multer = require('multer');
  const path = require('path'); 
  

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'routes/uploads/'); //경로
    },
    filename: function(req, file, cb) {
      const originalname = file.originalname;
      //const ext = originalname.substring(originalname.lastIndexOf('.')); // 파일 확장자 추출
      const timestamp = Date.now(); // 현재 시간을 밀리초 단위로 변환
      const postId = req.body.gspostid; // 게시글 식별자 가져오기
      const modifiedFilename = `${postId}${timestamp}${originalname}`; // 게시글 식별자 + 시간 + 파일명으로 수정
      cb(null, modifiedFilename); // 수정된 파일 이름 설정
    }
  });

  const upload = multer({ storage: storage }).single('file');

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(500).send('파일 업로드 중 에러가 발생하였습니다.');
    } else if (err) {
      console.log(err);
      res.status(500).send('서버 내부 오류');
    } else {
      // 파일 정보 DB에 저장
      const reqPostId = req.body.gspostid;
      const sql =
        "INSERT INTO gs_file (post_id, file_name, file_original_name, file_size, file_path) VALUES (?, ?, ?, ?, ?)";
      const values = [
        reqPostId,
        req.file.filename,
        req.file.originalname,
        req.file.size,
        path.resolve(req.file.path)  // 파일 경로를 절대 경로로 변환
      ];

      db.query(sql, values, (error, results) => {
        if (error) {
          console.error("파일 정보 저장 실패: ", error);
          res.status(500).json({ message: "서버 내부 오류" });
        } else {
          console.log("파일 정보 저장 성공");
          res.status(201).json({ message: "파일 업로드가 완료되었습니다." });
        }
      });
    }
  });
};

//db 파일정보 리턴
exports.getFileInfo = (req, res)=>{
  const post_id = req.query.postId;

  db.query(`SELECT * FROM gs_file WHERE post_id = ${post_id}`, function (err, rows, fields) {
    if (!err) {
      res.status(200).json(rows[0])
    } else {
      console.log('Error: ' + err)
      res.status(500).json({ message: '서버 내부 오류' })
    }
  })

}



//maxScore
exports.getMaxScore = (req, res)=>{
  db.query('SELECT * FROM gs_max', function(err, rows, fields) {
    if(!err) {
      res.send(rows);
    } else {
      console.log('err : ' + err);
      res.send(err);
    }
  });
}