const db = require('../../server/db');

exports.required= (req, res)=>{
    const student_id = req.query.student_id;
    const sqlQuery = 'SELECT * FROM required_subject WHERE student_id = ?';
    db.query(sqlQuery, [student_id], function(err, rows, fields) {
      if(!err) {
        res.send(rows); // response send rows
      } else {
        console.log('err : ' + err);
        res.send(err); // response send err
      }
    });
  }

exports.re_subject= (req, res)=>{
  const student_id = req.query.student_id;
  const sqlQuery = 'SELECT * FROM required_subject WHERE student_id = ?';
  
  db.query(sqlQuery, [student_id], function(err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        const subjectIds = rows.map(row => row.subject_id);
        const subjectQuery = 'SELECT * FROM subject WHERE subject_id IN (?)';

        db.query(subjectQuery, [subjectIds], function(err, subjectRows, fields) {
          if (!err) {
            res.send(subjectRows);
          } else {
            console.log('err: ' + err);
            res.send(err);
          }
        });
      } else {
        res.send([]);
      }
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
};

exports.add = (req, res) => {
  var data = req.body; // 전달된 데이터 배열

  // 각 객체를 순회하면서 처리
  data.forEach((info, index) => {
    var student_id = info.student_id;
    var subject_id = info.subject_id;
    var pro_id = info.pro_id;

    const subjectSqlQuery = 'SELECT * FROM subject WHERE subject_id = ? AND pro_id = ?';

    db.query(subjectSqlQuery, [subject_id, pro_id], function(err, rows, fields) {
      if (!err) {
        if (rows.length > 0) {
          const requiredSqlQuery = 'SELECT * FROM required_subject WHERE student_id =? AND subject_id = ? AND pro_id = ?';
          db.query(requiredSqlQuery,[student_id, subject_id, pro_id], function(err, rows, fields){
            if(!err){
              if(rows.length > 0){
                console.log('err:'+ err);
                if (index === data.length - 1) {
                  res.send('The subject has already been added.');
                }
              }else {
                const sqlQuery = 'INSERT INTO required_subject (student_id, subject_id, pro_id) VALUES (?, ?, ?)';
                db.query(sqlQuery, [student_id, subject_id, pro_id], function(err, insertResult, fields) {
                  if (!err) {
                    console.log('Row added to required_subject table');
                  } else {
                    console.log('err: ' + err);
                  }

                  if (index === data.length - 1) {
                    res.send('Request processed successfully');
                  }
                });
              }
            } else {
              console.log('err:'+ err);
              if (index === data.length - 1) {
                res.send(err);
              }
            }
          });

        } else {
          console.log('Subject not found');
          if (index === data.length - 1) {
            res.status(404).send('Subject not found');
          }
        }
      } else {
        console.log('err: ' + err);
        if (index === data.length - 1) {
          res.send(err);
        }
      }
    });
  });
};


exports.delete = (req, res) => {
  var data = req.body; // 전달된 데이터 배열
  if (!Array.isArray(data)) {
    return res.status(400).send('Data must be an array');
  }

  var totalObjects = data.length; // 전체 객체 수
  var processedObjects = 0; // 처리된 객체 수
  var failedDeletions = []; // 조회 실패한 항목 배열

  // 각 객체를 순회하면서 처리
  data.forEach((info, index) => {
    var student_id = info.student_id;
    var subject_id = info.subject_id;
    var pro_id = info.pro_id;
    const requiredSqlQuery = 'SELECT * FROM required_subject WHERE student_id = ? AND subject_id = ? AND pro_id = ?';

    db.query(requiredSqlQuery, [student_id, subject_id, pro_id], function(err, rows, fields) {
      if (!err) {
        if (rows.length > 0) {
          const deleteSqlQuery = 'DELETE FROM required_subject WHERE student_id = ? AND subject_id = ? AND pro_id = ?';
          db.query(deleteSqlQuery, [student_id, subject_id, pro_id], function(err, deleteResult, fields) {
            if (!err) {
              processedObjects++; // 처리된 객체 수 증가

              if (deleteResult.affectedRows > 0) {
                if (processedObjects === totalObjects) {
                  if (failedDeletions.length > 0) {
                    res.send('Some rows deleted from required_subject table, but not all. Failed deletions: ' + JSON.stringify(failedDeletions));
                  } else {
                    res.send('All rows deleted from required_subject table');
                  }
                }
              } else {
                failedDeletions.push(info); // 조회 실패한 항목 추가
                if (processedObjects === totalObjects) {
                  if (failedDeletions.length > 0) {
                    res.status(500).send('No matching rows found in required_subject table. Failed deletions: ' + JSON.stringify(failedDeletions));
                  } else {
                    res.send('All rows deleted from required_subject table');
                  }
                }
              }
            } else {
              console.log('err:' + err);
              res.status(500).send(err);
            }
          });
        } else {
          processedObjects++; // 처리된 객체 수 증가
          failedDeletions.push(info); // 조회 실패한 항목 추가

          if (processedObjects === totalObjects) {
            if (failedDeletions.length > 0) {
              res.send('Some rows not found in required_subject table. Failed deletions: ' + JSON.stringify(failedDeletions));
            } else {
              res.status(404).send('Subject not found'); // 에러 상태 코드 404와 함께 메시지 전송
            }
          }
        }
      } else {
        console.log('err: ' + err);
        res.status(500).send(err);
      }
    });
  });
};
