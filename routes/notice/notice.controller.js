const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const db = require('../../server/db');
const { error } = require("console");

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

exports.notices = (req, res) => {
  db.query('SELECT * FROM notice', function (err, rows, fields) {
    if (!err) {
      res.send(rows); // response send rows
    } 
    else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });
}

exports.noticesget = (req, res) => {
  const board_id = req.query.board_id;
  const query = 'SELECT * FROM notice WHERE board_id = ? ORDER BY notice_id DESC;';

  db.query(query, board_id, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    else {
      res.status(200).json(results);
    }
  });
}

exports.write = (req, res) => {
  verifyToken(req, res, () => {
    const notice_content = req.body.notice_content;
    const token = req.decoded// 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 사용자 ID 추출
      const board_id = req.body.board_id;
      

      getDate((error, date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO notice (notice_id, notice_content, notice_date, notice_name, permission, board_id) VALUES (?, ?, ?, ?, ?, ?)";
          const values = [
            notice_tlak_id,
            notice_talk_content,
            notice_talk_date,
            notice_talk_name,
            permission,
            board_id,
          ];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("공지 작성 실패: ", error);
              res.status(500).json({ message: "서버 내부 오류" });
            } else {
              console.log("공지 작성 성공!");
              res.status(201).json({ message: "공지가 성공적으로 작성되었습니다." });
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