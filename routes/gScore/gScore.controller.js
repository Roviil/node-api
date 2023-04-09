const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../user/auth');
const db = require('../../server/db');



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


/*
exports.testapi = (req,res) =>{
  verifyToken = (req, res) => {
    const token = req.decoded
    try {
      
      const student_id = token.student_id;
      
      db.query(`SELECT permission FROM user WHERE student_id = ${student_id}`, function (err, rows, fields) {
        if (!err) {
          const permission = rows[0].permission;
          if (permission === 2) {
            db.query('SELECT * FROM gs_post', function (err, rows, fields) {
              if (!err) {
                res.send(rows);
              } else {
                console.log('err : ' + err);
                res.send(err);
              }
            });
          } else {
            const query = `SELECT * FROM gs_post WHERE gsuser_id = ${student_id}`;

            db.query(query, (error, results, fields) => {
              if (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
              } else {
                res.status(200).json(results);
              }
            });
          }
        } else {
          console.log('err : ' + err);
          res.send(err);
        }
      });
    
    }//try
    
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
       message: '유효하지 않은 토큰입니다.'
     });
    }
  }

}
*/





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




/*
exports.filter = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded

    try {
      const student_id = token.student_id; 

      db.query(`SELECT permission FROM user WHERE student_id = ${student_id}`, function (err, rows, fields) {
        if (!err) {
          const permission = rows[0].permission;
          if (permission === 2) {
            db.query('SELECT * FROM gs_post', function (err, rows, fields) {
              if (!err) {
                res.send(rows);
              } else {
                console.log('err : ' + err);
                res.send(err);
              }
            });
          } else {
            const query = `SELECT * FROM gs_post WHERE gsuser_id = ${student_id}`;

            db.query(query, (error, results, fields) => {
              if (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
              } else {
                res.status(200).json(results);
              }
            });
          }
        } else {
          console.log('err : ' + err);
          res.send(err);
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};
*/

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
    const file = null;

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
            student_id,date,category,item,score,content,pass,reason,startDate,endDate,file
          ];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("게시물 작성 실패: ", error);
              res.status(500).json({ message: "서버 내부 오류" });
            } else {
              console.log("게시물 작성 성공!");
              res.status(201).json({ message: "게시물이 성공적으로 작성되었습니다." });
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

