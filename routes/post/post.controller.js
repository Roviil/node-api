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


exports.posts = (req, res) => {
  db.query('SELECT * FROM post', function (err, rows, fields) {
    if (!err) {
      res.send(rows); // response send rows
    } else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });

}

exports.postsget = (req, res) => {
  const board_id = req.query.board_id;
  const query = 'SELECT * FROM post WHERE board_id = ? AND available = 1 ORDER BY post_id DESC;';

  db.query(query, board_id, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });


}
exports.write = (req, res) => {
  verifyToken(req, res, () => {
    const post_title = req.body.post_title;
    const post_content = req.body.post_content;
    const token = req.decoded// 헤더에서 토큰 추출


    try {

      const student_id = token.student_id; // 사용자 ID 추출
      const post_file = req.body.post_file ? req.body.post_file : null; // post_file 이 없으면 null로 초기화
      const board_id = req.body.board_id;

      getDate((error, date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO post (post_title, post_content, student_id, post_date, post_file, board_id, available) VALUES (?, ?, ?, ?, ?, ?, 1)";
          const values = [
            post_title,
            post_content,
            student_id,
            date,
            post_file,
            board_id,
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

//댓글 가져오기
exports.comment = (req, res) => {
  db.query('SELECT * FROM comment', function (err, rows, fields) {
    if (!err) {
      res.send(rows); // response send rows
    } else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });

}

//댓글 갯수 카운트
exports.getCommentCount = (req, res) => {
  db.query(
    `SELECT post.post_id, COUNT(comment.comment_id) AS comment_count
     FROM post
     LEFT JOIN comment ON post.post_id = comment.post_id
     WHERE comment.available = 1
     GROUP BY post.post_id`,
    (err, rows) => {
      if (err) {
        console.log('Error getting comment count: ' + err);
        res.status(500).json({ error: 'Failed to get comment count' });
      } else {
        res.status(200).json(rows);
      }
    }
  );
};


exports.commentget = (req, res) => {
  const post_id = req.query.post_id;
  const query = 'SELECT * FROM comment WHERE post_id = ? AND available = 1 ORDER BY comment_id ASC';

  db.query(query, post_id, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(results);
    }
  });
}

exports.commentwrite = (req, res) => {
  verifyToken(req, res, () => {
    const comment_content = req.body.comment_content;
    const token = req.decoded// 헤더에서 토큰 추출


    try {

      const student_id = token.student_id; // 사용자 ID 추출
      const post_id = req.params.post_id;
      
      getDate((error, comment_date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO comment (comment_content, student_id, comment_date, post_id, available) VALUES (?, ?, ?, ?, 1)";
          const values = [
            comment_content,
            student_id,
            comment_date,
            post_id,
          ];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("댓글 작성 실패: ", error);
              res.status(500).json({ message: "서버 내부 오류" });
            } else {
              console.log("댓글 작성 성공!");
              res.status(201).json({ message: "댓글이 성공적으로 작성되었습니다." });
            }
          });
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "로그인을 해주세요." });
    }
  });
}

/* DELETE 버전 댓글 삭제.
exports.deleteComment = (req, res) => {
  verifyToken(req, res, () => {
    const comment_id = req.query.comment_id;
    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 사용자 ID 추출

      const sql = "DELETE FROM comment WHERE comment_id=? AND student_id=?"; // SQL 쿼리
      const values = [comment_id, student_id]; // SQL 쿼리 값

      db.query(sql, values, (error, results) => {
        if (error) {
          console.error("댓글 삭제 실패: ", error);
          res.status(500).json({ message: "서버 내부 오류" });
        } else if (!error){
          console.log("댓글 삭제 성공!");
          res.status(200).json({ message: "댓글이 삭제되었습니다." });
        }
        else{
          console.log("댓글 삭제 권한 없음");
          res.status(300).json({ message: "권한이 없습니다." });
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};
*/

exports.deleteComment = (req, res) => {
  verifyToken(req, res, () => {
    const comment_id = req.params.comment_id;
    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 삭제버튼 누른 사용자 ID 추출
      const selectsql = "SELECT student_id FROM comment WHERE comment_id = ?"; //댓글 사용자 ID 추출
      const sql = "UPDATE comment SET available=0 WHERE comment_id=? AND student_id=?"; // SQL 쿼리
      const values = [comment_id, student_id]; // SQL 쿼리 값
      db.query(selectsql, comment_id, (error, select_student_id) => {
        if (error) {
          console.error("뭔가 오류임.", error);
          res.status(500).json({ message: "서버 내부 오류" });
        }
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error("댓글 삭제 실패: ", error);
            res.status(500).json({ message: "서버 내부 오류" });
          } else if (select_student_id[0].student_id == student_id){
            console.log("댓글 삭제 성공!");
            res.status(200).json({ message: "댓글이 삭제되었습니다." });
          }
          else{
            console.log("댓글 삭제 권한 없음");
            res.status(300).json({ message: "권한이 없습니다." });
          }
        });
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};

exports.updateComment = (req, res) => {
  verifyToken(req, res, () => {
    const comment_id = req.params.comment_id;
    const comment_content = req.body.comment_content;
    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 삭제버튼 누른 사용자 ID 추출
      const selectsql = "SELECT student_id FROM comment WHERE comment_id = ?"; //댓글 사용자 ID 추출
      const sql = "UPDATE comment SET comment_content=? WHERE comment_id=? AND student_id=?"; // SQL 쿼리
      const values = [comment_content, comment_id, student_id]; // SQL 쿼리 값
      // 댓글 내용이 비어있는 경우
      if (comment_content == null || comment_content.isEmpty) {
        console.error("내용이 비어있습니다.");
        res.status(500).json({ message: "내용을 입력해주세요." });
        return;
      }
      db.query(selectsql, comment_id, (error, select_student_id) => {
        if (error) {
          console.error("뭔가 오류임.", error);
          res.status(500).json({ message: "서버 내부 오류" });
        }
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error("댓글 삭제 실패: ", error);
            res.status(500).json({ message: "서버 내부 오류" });
          } else if (select_student_id[0].student_id == student_id){
            console.log("댓글 삭제 성공!");
            res.status(200).json({ message: "댓글이 삭제되었습니다." });
          }
          else{
            console.log("댓글 삭제 권한 없음");
            res.status(300).json({ message: "권한이 없습니다." });
          }
        });
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};

exports.updatePost = (req, res) => {
  verifyToken(req, res, () => {
    const post_id = req.query.post_id; // URL 파라미터에서 post_id 추출
    const token = req.decoded; // 헤더에서 토큰 추출
    const student_id = token.student_id;

    // 수정된 글의 데이터 추출
    const { post_title, post_content } = req.body;

    // 데이터베이스에서 해당 게시물의 작성자(student_id)를 가져옵니다.
    const selectSql = "SELECT student_id FROM post WHERE post_id = ?";
    const selectValues = [post_id];
    db.query(selectSql, selectValues, (selectError, selectResult) => {
      if (selectError) {
        console.error(selectError);
        res.status(500).json({ error: '서버 오류' });
      } else if (selectResult.length === 0) {
        res.status(404).json({ error: '글을 찾을 수 없습니다.' });
      } else if (selectResult[0].student_id != student_id) {
        res.status(403).json({ message: selectResult[0].student_id, message: student_id, error: '수정 권한이 없습니다.' });
      } else {
        // 데이터베이스 업데이트 쿼리문 실행
        const updateSql = "UPDATE post SET post_title = ?, post_content = ? WHERE post_id = ?";
        const updateValues = [post_title, post_content, post_id];
        db.query(updateSql, updateValues, (updateError, updateResult) => {
          if (updateError) {
            console.error(updateError);
            res.status(500).json({ error: '서버 오류' });
          } else {
            res.status(200).json({ message: '글 수정 완료' });
          }
        });
      }
    });
  });
};

exports.deletePost = (req, res) => {
  verifyToken(req, res, () => {
    const post_id = req.params.post_id; // post_id 값 추출
    const token = req.decoded; // 헤더에서 토큰 추출
    const selectSql = "SELECT student_id FROM post WHERE post_id = ?";
    const selectValues = [post_id];
    const sql = 'SELECT * FROM user WHERE student_id = ?';
    var a;
    db.query(sql, token.student_id, (selectError, selectResult) => {
      a = selectResult[0].permission;
      console.log(a)
      
    });
    
    db.query(selectSql, selectValues, (selectError, selectResult) => {
      if (selectError) {
        console.error(selectError);
        res.status(500).json({ error: '서버 오류' });
      } else if (selectResult.length === 0) {
        res.status(404).json({ error: '글을 찾을 수 없습니다.' });
      } else {
        const student_id = selectResult[0].student_id; // 사용자 ID 추출
        if (student_id == token.student_id || a == 2 || a == 3)  {
          
          const sql = "UPDATE post SET available = ? WHERE post_id = ?";
          const values = [0, post_id];
          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("게시물 삭제 실패: ", error);
              res.status(500).json({ message: "서버 내부 오류" });
            } else if (results.affectedRows === 0) {
              res.status(404).json({ message: "해당 게시물을 찾을 수 없습니다." });
            } else {
              console.log("게시물 삭제 성공!");
              res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
            }
          });
        } else {
          res.status(403).json({ error: '수정 권한이 없습니다.'});
          
        }
      }
    });
  });
};

exports.mypost = (req, res) => {
  verifyToken(req, res, () => {
    
    const token = req.decoded; // 헤더에서 토큰 추출
    const student_id = token.student_id;
    
    const selectSql = "SELECT * FROM post WHERE student_id = ? AND available = 1 ORDER BY post_id DESC";
  
  db.query(selectSql, student_id, function (err, rows, fields) {
    if (!err) {
      res.status(201).json(rows); // response send rows
    } else {
      console.log('err : ' + err);
      res.status(400).json(err); // response send err
    }
  });
});
}

exports.introduction_update = (req, res) => {
  verifyToken(req, res, () => {
    const introduction = req.body.introduction;
    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 삭제버튼 누른 사용자 ID 추출
      const sql = "UPDATE user SET introduction=? WHERE student_id=?"; // SQL 쿼리
      const values = [introduction, student_id]; // SQL 쿼리 값
      // 댓글 내용이 비어있는 경우
        db.query(sql, values, (error, results) => {
          if (error) {
            console.error("자기소개 수정 실패: ", error);
            res.status(500).json({ message: "서버 내부 오류" });
          } 
          else{
            console.log("댓글 삭제 성공!");
            res.status(200).json({ message: "자기소개 수정되었습니다." });
          }
        });

    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};

exports.board = (req, res) => {
  const board_id = req.query.board_id;
  db.query('SELECT * FROM board WHERE board_id = ?', [board_id] ,function (err, rows, fields) {
    if (!err) {
      console.log(rows)
      res.status(201).json({rows}); // response send rows
    } else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });

}
