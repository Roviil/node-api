const db = require('../../server/db');

exports.all= (req, res)=>{
    const sqlQuery = "SELECT * FROM subject";
    db.query(sqlQuery, function(err, result) {
      if(!err) {
        res.send(result); // response send rows
      } else {
        console.log('err : ' + err);
        res.send(err); // response send err
      }
    });
  }

exports.info= (req, res)=>{
    const subject_id = req.query.subject_id;
    const sqlQuery = "SELECT * FROM subject WHERE subject_id = ?";
    db.query(sqlQuery, [subject_id], function(err, result) {
        if(err) {
            console.log('err : ' + err);
            res.send(err);
          } else {
            if (result.length > 0)
            {
              res.send(result);
            }
            else {
              res.status(400).send("subject does not exist");
            }
          }
    });
}

exports.add = (req, res) => {
  var data = req.body;

  var subject_id = data.subject_id;
  var pro_id = data.pro_id;
  var subject_name = data.subject_name;
  var credit = data.credit;
  var subject_division = data.subject_division;
  var type_md = data.type_md;
  var type_tr = data.type_tr;
  var subject_info = data.subject_info;
  var use_language = data.use_language;
  var class_goal = data.class_goal;
  var opening_semester = data.opening_semester;
  var opening_grade = data.opening_grade;

  // subject_info 값의 크기를 체크하여 처리
  if (subject_info.length > 500) {
    res.status(400).send('Subject info exceeds the maximum length');
    return;
  }

  // 교수 ID(pro_id)가 professor 테이블에 있는지 확인
  const checkProfessorQuery = 'SELECT * FROM professor WHERE pro_id = ?';
  db.query(checkProfessorQuery, [pro_id], function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        // professor 테이블에 해당 pro_id가 존재하는 경우

        // subject_id가 subject 테이블에 이미 있는지 확인
        const checkSubjectQuery = 'SELECT * FROM subject WHERE subject_id = ?';
        db.query(checkSubjectQuery, [subject_id], function (err, rows, fields) {
          if (!err) {
            if (rows.length === 0) {
              // subject 테이블에 해당 subject_id가 존재하지 않는 경우

              // subject 테이블에 새로운 row 추가
              const insertSubjectQuery = 'INSERT INTO subject (subject_id, pro_id, subject_name, credit, subject_division, type_md, type_tr, subject_info, use_language, class_goal, opening_semester, opening_grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
              db.query(insertSubjectQuery, [subject_id, pro_id, subject_name, credit, subject_division, type_md, type_tr, subject_info, use_language, class_goal, opening_semester, opening_grade], function (err, result, fields) {
                if (!err) {
                  res.send('Subject added successfully');
                } else {
                  console.log('err:' + err);
                  res.send(err);
                }
              });
            } else {
              res.status(409).send('Subject ID already exists'); // subject_id가 이미 존재하는 경우
            }
          } else {
            console.log('err: ' + err);
            res.send(err);
          }
        });
      } else {
        res.status(404).send('Professor not found'); // 교수 ID(pro_id)가 professor 테이블에 존재하지 않는 경우
      }
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
};

exports.delete = (req, res) => {
  var data = req.body;
  
  var subject_id = data.subject_id;
  var pro_id = data.pro_id;
  
  // required_subject 테이블에서 해당 과목 정보 조회
  const checkRequiredSubjectQuery = 'SELECT * FROM required_subject WHERE subject_id = ? AND pro_id = ?';
  db.query(checkRequiredSubjectQuery, [subject_id, pro_id], function (err, rows, fields) {
  if (err) {
  console.log('err: ' + err);
  res.status(500).send(err);
  return;
  }
  if (rows.length > 0) {
    // required_subject 테이블에서 해당 과목 정보가 있는 경우
    res.status(500).send('Cannot delete subject. It is referenced by other records in the required_subject table.');
  } else {
    // 외래 키 제약 조건 해제
    const disableForeignKeyChecksQuery = 'SET FOREIGN_KEY_CHECKS = 0';
    db.query(disableForeignKeyChecksQuery, function (err, result, fields) {
      if (err) {
        console.log('err: ' + err);
        res.status(500).send(err);
        return;
      }
  
      // 과목 정보 삭제
      const deleteSubjectQuery = 'DELETE FROM subject WHERE subject_id = ? AND pro_id = ?';
      db.query(deleteSubjectQuery, [subject_id, pro_id], function (err, result, fields) {
        if (!err) {
          if (result.affectedRows > 0) {
            // 외래 키 제약 조건 복원
            const enableForeignKeyChecksQuery = 'SET FOREIGN_KEY_CHECKS = 1';
            db.query(enableForeignKeyChecksQuery, function (err, result, fields) {
              if (err) {
                console.log('err: ' + err);
                res.status(500).send(err);
                return;
              }
              res.send('Subject deleted successfully');
            });
          } else {
            // 외래 키 제약 조건 복원
            const enableForeignKeyChecksQuery = 'SET FOREIGN_KEY_CHECKS = 1';
            db.query(enableForeignKeyChecksQuery, function (err, result, fields) {
              if (err) {
                console.log('err: ' + err);
                res.status(500).send(err);
                return;
              }
              res.status(404).send('Subject not found');
            });
          }
        } else {
          console.log('err: ' + err);
          res.status(500).send(err);
        }
      });
    });
  }
});
};

exports.modify = (req, res) => {
  var data = req.body;

  var subject_id = data.subject_id;
  var pro_id = data.pro_id;
  var subject_name = data.subject_name;
  var credit = data.credit;
  var subject_division = data.subject_division;
  var type_md = data.type_md;
  var type_tr = data.type_tr;
  var subject_info = data.subject_info;
  var use_language = data.use_language;
  var class_goal = data.class_goal;
  var opening_semester = data.opening_semester;
  var opening_grade = data.opening_grade;

  // 필수값 검사
  if (!subject_id || !pro_id || !subject_name || !credit || !subject_division || !opening_grade) {
    res.status(400).send('Missing required fields');
    return;
  }

  // subject 테이블에서 해당 과목 정보 수정
  const updateSubjectQuery = 'UPDATE subject SET subject_name = ?, credit = ?, subject_division = ?, type_md = ?, type_tr = ?, subject_info = ?, use_language = ?, class_goal = ?, opening_semester = ?, opening_grade = ? WHERE subject_id = ? AND pro_id = ?';
  db.query(updateSubjectQuery, [subject_name, credit, subject_division, type_md, type_tr, subject_info, use_language, class_goal, opening_semester, opening_grade, subject_id, pro_id], function (err, result, fields) {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send('Subject updated successfully');
      } else {
        res.status(404).send('Subject not found');
      }
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
};
