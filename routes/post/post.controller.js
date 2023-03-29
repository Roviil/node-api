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


exports.posts = (req, res)=>{
        db.query('SELECT * FROM post', function(err, rows, fields) {
          if(!err) {
            res.send(rows); // response send rows
          } else {
            console.log('err : ' + err);
            res.send(err); // response send err
          }
        });
      
}

exports.postsget = (req, res) => {
    const board_id = req.query.board_id;
    const query = 'SELECT * FROM post WHERE board_id = ? ORDER BY post_id DESC;';

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
  const post_title = req.body.post_title;
  const post_content = req.body.post_content;
  const student_id = req.body.student_id;
  const post_file = req.body.file;
  const board_id = req.body.board_id;

  getDate((error, date) => {
    if (error) {
      console.error("날짜 가져오기 실패: ", error);
      return res.status(500).send("서버 내부 오류");
    } else {
      // post_file 이 있다면 경로 추가하고 없다면 null로 보내도록 코드 작성하기
      const sql =
        "INSERT INTO post (post_title, post_content, student_id, post_date, post_file, board_id) VALUES (?, ?, ?, ?, ?, ?)";
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
};
