const db = require('../../server/db');


exports.all= (req, res)=>{
  var sqlQuery = 'SELECT * FROM professor';
  db.query(sqlQuery, function(err, rows, fields) {
    if(!err) {
      res.send(rows); // response send rows
    } else {
      console.log('err : ' + err);
      res.send(err); // response send err
    }
  });
}

exports.info= (req, res)=>{
  const pro_id = req.query.pro_id;
  const sqlQuery = "SELECT * FROM professor WHERE pro_id = ?";

  db.query(sqlQuery, [pro_id], function(err, result) {
    if(err) {
      console.log('err : ' + err);
      res.send(err);
    } else {
      if (result.length > 0)
      {
        res.send(result);
      }
      else {
        res.status(400).send("professor does not exist");
      }
    }
  });
}

// pro_id를 사번으로 바꾸는 경우..
exports.add = (req, res) => {
  var data = req.body;

  var name = data.name;
  var email = data.email;
  var major = data.major;
  var phone_num = data.phone_num;
  var pro_id = data.pro_id; // 입력받는 pro_id 값

  const checkDuplicateQuery = 'SELECT COUNT(*) AS count FROM professor WHERE pro_id = ?';
  db.query(checkDuplicateQuery, [pro_id], function(err, rows, fields) {
    if (!err) {
      var count = rows[0].count;
      if (count > 0) {
        res.status(400).send('Duplicate pro_id. Cannot add professor.');
      } else {
        const insertSqlQuery = 'INSERT INTO professor (pro_id, name, email, major, phone_num) VALUES (?, ?, ?, ?, ?)';
        db.query(insertSqlQuery, [pro_id, name, email, major, phone_num], function(err, result, fields) {
          if (!err) {
            res.send('Professor added successfully');
          } else {
            console.log('err:' + err);
            res.send(err);
          }
        });
      }
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
};
exports.delete = (req, res) => {
  var data = req.body;
  var pro_id = data.pro_id;

  const deleteSqlQuery = 'DELETE FROM professor WHERE pro_id = ?';
  db.query(deleteSqlQuery, [pro_id], function(err, result, fields) {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send('Professor deleted successfully');
      } else {
        res.status(500).send('No matching professor found for deletion');
      }
    } else {
      console.log('err: ' + err);
      res.status(500).send('Error occurred while deleting professor');
    }
  });
};



exports.modify = (req, res) => {
  var data = req.body;

  var pro_id = data.pro_id; // 교수 ID
  var name = data.name; // 변경될 이름
  var email = data.email; // 변경될 이메일
  var major = data.major; // 변경될 전공
  var phone_num = data.phone_num; // 변경될 전화번호

  var updateFields = []; // 업데이트할 필드 배열
  var updateValues = []; // 업데이트할 값 배열

  // 변경된 값이 있는지 확인하고 업데이트할 필드와 값을 배열에 추가
  if (name !== undefined) {
    updateFields.push('name = ?');
    updateValues.push(name);
  }

  if (email !== undefined) {
    updateFields.push('email = ?');
    updateValues.push(email);
  }

  if (major !== undefined) {
    updateFields.push('major = ?');
    updateValues.push(major);
  }

  if (phone_num !== undefined) {
    updateFields.push('phone_num = ?');
    updateValues.push(phone_num);
  }

  // 변경된 값이 없으면 업데이트할 필드가 없다는 메시지 반환
  if (updateFields.length === 0) {
    res.send('No fields to update');
    return;
  }

  // 업데이트 쿼리 생성
  var updateSqlQuery = 'UPDATE professor SET ' + updateFields.join(', ') + ' WHERE pro_id = ?';

  // 변경된 값들과 교수 ID(pro_id)를 포함한 값을 배열로 전달
  updateValues.push(pro_id);

  // 쿼리 실행하여 업데이트 결과 확인
  db.query(updateSqlQuery, updateValues, function(err, result, fields) {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send('Professor updated successfully');
      } else {
        res.send('No matching professor found for update');
      }
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
};

