const path = require('path');
const fs = require('fs');
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
exports.getType = (req, res) => {
  db.query('SELECT DISTINCT gsinfo_type FROM gs_info', function(err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log('err: ' + err);
      res.send(err);
    }
  });
}

// 2단계: 선택한 타입에 대한 name 값과 score 값들 불러오기
exports.getInfoByType = (req, res) => {
  const { type } = req.params;
  db.query('SELECT gsinfo_name, gsinfo_score FROM gs_info WHERE gsinfo_type = ?', [type], function(err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log('err: ' + err);
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
          if (permission === 2 || permission === 3) {
            const query = 'SELECT * FROM gs_post WHERE gsuser_id != ?';
            const values = [student_id];
            
            db.query(query, values, function (err, rows, fields) {
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

// 파일 서버, db 업로드
exports.upload = (req, res) => {
  const path = require('path');
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'routes/uploads/'); //경로
    },
    filename: function (req, file, cb) {
      const originalname = file.originalname;
      const timestamp = Date.now(); // 현재 시간을 밀리초 단위로 변환
      const postId = req.body.gspostid; // 게시글 식별자 가져오기
      const modifiedFilename = `${postId}${timestamp}${originalname}`; // 게시글 식별자 + 시간 + 파일명으로 수정
      cb(null, modifiedFilename); // 수정된 파일 이름 설정
    },
  });

  const upload = multer({ storage: storage }).single('file');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(500).send('파일 업로드 중 에러가 발생하였습니다.');
    } else if (err) {
      console.log(err);
      res.status(500).send('서버 내부 오류');
    } else {
      // 파일 정보를 클라이언트에 전송
      const file = req.file;
      const fileInfo = {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        path: path.resolve(file.path),
      };
      res.status(201).json({ message: '파일 업로드가 완료되었습니다.', file: fileInfo });
    }
  });
};


//파일정보 DB 업로드
exports.fileToDB = (req, res) => {

  const postId = req.body.post_id;
  const fileName = req.body.file_name;
  const fileOriginalName = req.body.file_original_name;
  const fileSize = req.body.file_size;
  const filePath = req.body.file_path;

  const sql =
  "INSERT INTO gs_file (post_id, file_name, file_original_name, file_size, file_path) VALUES (?, ?, ?, ?, ?)";
  const values = [
  postId,fileName,fileOriginalName,fileSize,filePath
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("게시물 작성 실패: ", error);
      res.status(500).json({ message: "서버 내부 오류" });
    } else {
      console.log("게시물 작성 성공!");
      res.status(201).json({ message: "게시물이 성공적으로 작성되었습니다."});
    }
  });
}







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
  db.query('SELECT max_category,max_score FROM gs_max', function(err, rows, fields) {
    if(!err) {
      res.send(rows);
    } else {
      console.log('err : ' + err);
      res.send(err);
    }
  });
}


//파일 다운로드
exports.downloadFile = (req, res)=>{

  const filePath = decodeURIComponent(req.query.reqPath); // URL 디코딩

  // 파일 존재 확인
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("파일 접근 실패: ", err);
      res.status(404).json({ message: "해당 경로에 파일이 없습니다." });
    } else {
      // 파일 다운로드 응답
      res.download(filePath, function(err){
        if (err) {
          // 파일 다운로드 중 에러 발생 시 처리
          console.error("파일 전송 오류: ", err);
          res.status(500).json({ message: "파일 전송중 오류가 발생하였습니다." });
        }
      });
    }
  });
}



//파일 서버, db에서 삭제
exports.deleteFile = (req, res) => {
  const filePath = req.query.reqPath;

  // DB에서 파일 경로와 일치하는 열 삭제
  const sql = 'DELETE FROM gs_file WHERE file_path = ?';
  const query = db.query(sql, filePath, (err, result) => {
    if (err) {
      console.error("DB 에러: ", err);
      res.status(500).json({ message: "DB 에러" });
    } else {
      // 파일 시스템에서 파일 삭제
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("파일 삭제 에러: ", err);
          res.status(500).json({ message: "파일 삭제 에러" });
        } else {
          res.status(200).json({ message: "파일 삭제 성공" });
        }
      });
    }
  });
};

// 게시글 작성자 정보
exports.getWriterInfo = (req, res)=>{
  const student_id = req.query.student_id;

  db.query(`SELECT * FROM user WHERE student_id = ${student_id}`, function (err, rows, fields) {
    if (!err) {
      res.status(200).json(rows[0])
    } else {
      console.log('Error: ' + err)
      res.status(500).json({ message: '서버 내부 오류' })
    }
  })

}


exports.update = (req, res) => {
  verifyToken(req, res, () => {
    const postuserid = req.body.gs_user;;// 수정할 게시글의 ID
    const postId = req.body.postId;
    const score = req.body.gspost_score;
    const category = req.body.gspost_category;
    const item = req.body.gspost_item;
    const content = req.body.gspost_content;
    const prevPass = req.body.prev_gspost_pass; // 이전의 게시물 승인 여부
    const pass = req.body.gspost_pass; // 변경된 게시물 승인 여부
    const reason = req.body.gspost_reason;
    const startDate = req.body.gspost_start_date;
    const endDate = req.body.gspost_end_date;
    const filecheck = req.body.gspost_file;
    const prevAcceptedScore = req.body.prev_acceptedScore; // 이전의 acceptedScore 값
    let acceptedScore;

    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const student_id = token.student_id; // 사용자 ID 추출
      db.query(`SELECT permission FROM user WHERE student_id = ${student_id}`, function (err, row, fields) {
        if (!err) {
          const permission = row[0].permission;

            if (permission === 2 || parseInt(student_id, 10) === postuserid) {
            const sql =
              "UPDATE gs_post SET gspost_category = ?, gspost_score = ?,gspost_item = ?,gspost_content = ?, gspost_pass = ?, gspost_reason = ?, gspost_start_date = ?, gspost_end_date = ?, gspost_file = ? WHERE gspost_id = ?";
            const values = [
              category,
              score,
              item,
              content,
              pass,
              reason,
              startDate,
              endDate,
              filecheck,
              postId,
            ];

            db.query(sql, values, (error, results) => {
              if (error) {
                console.error("게시물 수정 실패: ", error);
                res.status(500).json({ message: "서버 내부 오류" });
              } else if (results.affectedRows === 0) {
                // 수정할 게시글이 해당 사용자에게 속해있지 않은 경우
                res.status(403).json({ message: "해당 게시물을 수정할 권한이 없습니다." });
              } else {
                console.log("게시물 수정 성공!  ",postId," 게시글 ",student_id,"이 수정 완료");
                if(category != "캡스톤디자인"){
                if (prevPass === "승인" && (pass === "반려" || pass === "대기")) {
                  // 승인에서 반려인 경우 카테고리의 총점에서 prevAcceptedScore 값을 빼줍니다.
                  const updateScoreSql = "UPDATE user SET graduation_score = JSON_SET(graduation_score, ?, CAST(JSON_EXTRACT(graduation_score, ?) - ? AS UNSIGNED)) WHERE student_id = ?";
                  const updateScoreValues = [`$."${category}"`, `$."${category}"`, prevAcceptedScore, postuserid];
                
                  db.query(updateScoreSql, updateScoreValues, (error, scoreResults) => {
                    if (error) {
                      console.error("graduation_score 업데이트 실패: ", error);
                      res.status(500).json({ message: "서버 내부 오류" });
                    } else {
                      console.log("graduation_score 업데이트 성공!");
                      const updateAcceptedScoreSql = "UPDATE gs_post SET gspost_accepted_score = 0 WHERE gspost_id = ?";
                      const updateAcceptedScoreValues = [postId];

                      db.query(updateAcceptedScoreSql, updateAcceptedScoreValues, (error, acceptedScoreResults) => {
                      if (error) {
                      console.error("gspost_accepted_score 업데이트 실패: ", error);
                      res.status(500).json({ message: "서버 내부 오류" });
                      } else {
                        console.log("gspost_accepted_score 업데이트 성공!");
                        res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
                        }
                     });
                    }
                  });
                }

                else if ((prevPass === "대기" || prevPass === "반려" )&&  pass === "승인") {
                  // 미승인에서 승인인 경우 카테고리의 총점에 acceptedScore 값을 더해줍니다.
                  acceptedScore = score;
                  const updateScoreSql = "UPDATE user SET graduation_score = JSON_SET(graduation_score, ?, CAST(JSON_EXTRACT(graduation_score, ?) + ? AS UNSIGNED)) WHERE student_id = ?";
                  const updateScoreValues = [`$."${category}"`, `$."${category}"`, acceptedScore, postuserid];
                
                  db.query(updateScoreSql, updateScoreValues, (error, scoreResults) => {
                    if (error) {
                      console.error("graduation_score 업데이트 실패: ", error);
                      res.status(500).json({ message: "서버 내부 오류" });
                    } else {
                      console.log("graduation_score 업데이트 성공!");
                      const updateAcceptedScoreSql = "UPDATE gs_post SET gspost_score = ?, gspost_accepted_score = ? WHERE gspost_id = ?";
                      const updateAcceptedScoreValues = [score,acceptedScore, postId];
                
                      db.query(updateAcceptedScoreSql, updateAcceptedScoreValues, (error, acceptedScoreResults) => {
                        if (error) {
                          console.error("gspost_accepted_score 업데이트 실패: ", error);
                          res.status(500).json({ message: "서버 내부 오류" });
                        } else {
                          console.log("gspost_accepted_score 업데이트 성공!");
                          res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
                        }
                      });
                    }
                  });
                }

                else if (prevPass === "승인" && pass === "승인") {
                  // 승인에서 승인인 경우 카테고리의 총점에서 prevAcceptedScore 값을 빼고 acceptedScore 값을 더해줍니다.
                  acceptedScore = score;
                  const updateScoreSql = "UPDATE user SET graduation_score = JSON_SET(graduation_score, ?, CAST(JSON_EXTRACT(graduation_score, ?) - ? + ? AS UNSIGNED)) WHERE student_id = ?";
                  const updateScoreValues = [`$."${category}"`, `$."${category}"`, prevAcceptedScore, acceptedScore, postuserid];
                  
                  db.query(updateScoreSql, updateScoreValues, (error, scoreResults) => {
                    if (error) {
                      console.error("graduation_score 업데이트 실패: ", error);
                      res.status(500).json({ message: "서버 내부 오류" });
                    } else {
                      console.log("graduation_score 업데이트 성공!");
                      const updateAcceptedScoreSql = "UPDATE gs_post SET gspost_score = ? ,gspost_accepted_score = ? WHERE gspost_id = ?";
                      const updateAcceptedScoreValues = [score,acceptedScore, postId];
                
                      db.query(updateAcceptedScoreSql, updateAcceptedScoreValues, (error, acceptedScoreResults) => {
                        if (error) {
                          console.error("gspost_accepted_score 업데이트 실패: ", error);
                          res.status(500).json({ message: "서버 내부 오류" });
                        } else {
                          console.log("gspost_accepted_score 업데이트 성공!");
                          res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
                        }
                      });
                    }
                  });
                }
                else{
                  res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
                }
              }
              else{
                res.status(200).json({ message: "게시물이 성공적으로 수정되었습니다." });
              }
              }
            });
          }
          else{
            console.log("첫번째는 권한, 두번째는 로그인정보, 세번째는 해당 게시글 글쓴이id, 뭐가문제일까요~", permission, student_id, postuserid);

          }
        }
        });
      }
    catch (error) {
          console.error("오류 발생: ", error);
          res.status(500).json({ message: "서버 내부 오류" });
        }
      });
}


exports.deletePost = (req, res) => {
  verifyToken(req, res, () => {
  const postId = req.query.postId;
  const token = req.decoded; // 헤더에서 토큰 추출
  try {
    const student_id = token.student_id; // 사용자 ID 추출
    db.query(`SELECT permission FROM user WHERE student_id = ${student_id}`, (err, permissionResults) => {
      if (err) {
        console.error("퍼미션 조회 실패: ", err);
        res.status(500).json({ message: "서버 내부 오류" });
      } else {
        const permission = permissionResults[0].permission;
        db.query(`SELECT gsuser_id, gspost_pass, gspost_category, gspost_item, gspost_accepted_score FROM gs_post WHERE gspost_id = ${postId}`, (err, postResults) => {
          if (err) {
            console.error("게시물 조회 실패: ", err);
            res.status(500).json({ message: "서버 내부 오류" });
          } else if (postResults.length === 0) {
            res.status(404).json({ message: "해당 게시물을 찾을 수 없습니다." });
          } else {
            const postPass = postResults[0].gspost_pass;
            const category = postResults[0].gspost_category;
            const postItem = postResults[0].gspost_item;
            const prevAcceptedScore = postResults[0].gspost_accepted_score;
            const postuserid = postResults[0].gsuser_id;
  
            if (permission === 2 || parseInt(student_id, 10) === postuserid) {
              // 게시글 삭제
              db.query("DELETE FROM gs_post WHERE gspost_id = ?", [postId], (err, deleteResults) => {
                if (err) {
                  console.error("게시물 삭제 실패: ", err);
                  res.status(500).json({ message: "서버 내부 오류" });
                } else if (deleteResults.affectedRows === 0) {
                  res.status(404).json({ message: "해당 게시물을 찾을 수 없습니다." });
                } else {
                  console.log("게시물 삭제 성공!  " , postId , "번 게시글  " ,student_id,"이 삭제완료","\n작성자:",postuserid," 항목명:",postItem, " 승인여부:",postPass," 승인점수:",prevAcceptedScore);
                  if(category == "캡스톤디자인" || postItem == "캡스톤디자인"){
                    res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
                  }
                  else{
                  if (postPass === "승인") {
                    // 승인된 게시물인 경우 graduation_score 업데이트
                    updateGraduationScore(postuserid, category, prevAcceptedScore, res);
                    
                  } else {
                    res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
                  }
                }
                }
              });
            } else {
              res.status(403).json({ message: "해당 게시물을 삭제할 권한이 없습니다." });
            }
          }
        });
      }
    });
  } catch (error) {
    console.error("오류 발생: ", error);
    res.status(500).json({ message: "서버 내부 오류" });
  }
  });
  };


function updateGraduationScore(userId, category, prevAcceptedScore, res) {
    const updateScoreSql = "UPDATE user SET graduation_score = JSON_SET(graduation_score, ?, CAST(JSON_EXTRACT(graduation_score, ?) - ? AS UNSIGNED)) WHERE student_id = ?";
    const updateScoreValues = [`$."${category}"`, `$."${category}"`, prevAcceptedScore, userId];
  
    db.query(updateScoreSql, updateScoreValues, (error, scoreResults) => {
      if (error) {
        console.error("graduation_score 업데이트 실패: ", error);
        res.status(500).json({ message: "서버 내부 오류" });
      } else {
        console.log("graduation_score 업데이트 성공!");
        res.status(200).json({ message: "게시물이 성공적으로 삭제되었습니다." });
      }
    });
  }

//전체학생 학번, 이름정보  리턴
exports.getAllUserInfo = (req, res) => {
  db.query('SELECT student_id, name, grade FROM user', function(err, rows, fields) {
    if (!err) {
      res.status(200).send(rows); 
    } else {
      console.log('err: ' + err);
      res.status(500).send(err); 
    }
  });
};

//gs_info에 항목 추가
exports.insertInfo = (req, res) => {

  const category = req.body.category;
  const name = req.body.name;
  const score = req.body.score;


  const sql =
  "INSERT INTO gs_info (gsinfo_type, gsinfo_name, gsinfo_score) VALUES (?, ?, ?)";
  const values = [
  category, name, score
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("항목 추가 실패: ", error);
      res.status(500).json({ message: "서버 내부 오류" });
    } else {
      console.log("항목 추가 성공!");
      res.status(201).json({ message: "항목 추가 성공" });
    }
  });
}

//gs_info에서 항목 수정
exports.updateInfo = (req, res) => {

  const category = req.body.category;
  const name = req.body.name;
  const newName = req.body.newName;
  const newScore = req.body.newScore;

  const sql = 'UPDATE gs_info SET gsinfo_name = ?, gsinfo_score = ? WHERE gsinfo_type = ? and gsinfo_name = ?';
  const values = [
    newName, newScore, category, name
    ];

  const query = db.query(sql, values, (err, result) => {
    if (err) {
      console.error("항목 수정 실패: ", err);
      res.status(500).json({ message: "서버 내부 오류" });
    } else {
      console.log("항목 수정 성공");
      res.status(201).json({ message: "항목 수정 성공" });
    }
  });
};

//gs_info에서 항목 삭제
exports.deleteInfo = (req, res) => {

  const category = req.body.category;
  const name = req.body.name;

  const sql = 'DELETE FROM gs_info WHERE gsinfo_type = ? and gsinfo_name = ?';
  const values = [
    category, name
    ];

  const query = db.query(sql, values, (err, result) => {
    if (err) {
      console.error("항목 삭제 실패: ", err);
      res.status(500).json({ message: "서버 내부 오류" });
    } else {
      console.log("항목 삭제 성공");
      res.status(201).json({ message: "항목 삭제 성공" });
    }
  });
};

//카테고리 최댓값 수정
exports.updateMaxScore = (req, res) => {

  const category = req.body.category;
  const newScore = req.body.newScore;

  const sql = 'UPDATE gs_max SET max_score = ? WHERE max_category = ?';
  const values = [
    newScore, category
    ];

  const query = db.query(sql, values, (err, result) => {
    if (err) {
      console.error("최댓값 수정 실패: ", err);
      res.status(500).json({ message: "서버 내부 오류" });
    } else {
      console.log("최댓값 수정 성공");
      res.status(201).json({ message: "최댓값 수정 성공" });
    }
  });
};


//졸업점수 상세보기
exports.detailscore = (req, res) => {
  const userId = req.body.userId; // 요청에서 사용자 ID 추출

  // 데이터베이스 쿼리 실행
  const query = "SELECT gspost_category, gspost_item, gspost_score FROM gs_post WHERE gsuser_id = ? AND gspost_pass = '승인'";
  db.query(query, [userId], (err, rows) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log('오류 : ' + err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  });
};

exports.all_write = (req, res) => {
  verifyToken(req, res, () => {
    const category = req.body.gspost_category;
    const item = req.body.gspost_item;
    const score = req.body.gspost_score;
    const content = req.body.gspost_content;
    const pass = req.body.gspost_pass;
    const reason = req.body.gspost_reason;
    const filecheck = req.body.gspost_file;

    const token = req.decoded; // 헤더에서 토큰 추출

    try {
      const studentIds = req.body.gspost_student; // stuId 값을 받아옴

      getDate((error, date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO gs_post (gsuser_id,gspost_post_date,gspost_category,gspost_item,gspost_score,gspost_accepted_score,gspost_content,gspost_pass,gspost_reason,gspost_file) VALUES (?,?,?,?,?,?,?,?,?,?)";

          const promises = studentIds.map((studentId) => {
            const values = [
              studentId,
              date,
              category,
              item,
              score,
              score,
              content,
              pass,
              reason,
              filecheck,
            ];

            return new Promise((resolve, reject) => {
              db.query(sql, values, (error, results) => {
                if (error) {
                  console.error("게시물 작성 실패: ", error);
                  reject(error);
                } else {
                  console.log("게시물 작성 성공!");
                  resolve(results);
                }
              });
            });
          });

          Promise.all(promises)
            .then((results) => {
              // 졸업 인증 점수 업데이트
              const updatePromises = studentIds.map((studentId) => {
                return updategscore(studentId, category, score);
              });

              return Promise.all(updatePromises);
            })
            .then(() => {
              return res.status(201).json({
                message: "게시물이 성공적으로 작성되었습니다.",
              });
            })
            .catch((error) => {
              console.error("작성 실패: ", error);
              return res.status(500).json({ message: "서버 내부 오류" });
            });
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};


function updategscore(userId, category, score) {
  return new Promise((resolve, reject) => {
    const updateScoreSql =
      "UPDATE user SET graduation_score = JSON_SET(graduation_score, ?, CAST(JSON_EXTRACT(graduation_score, ?) + ? AS UNSIGNED)) WHERE student_id = ?";
    const updateScoreValues = [
      `$."${category}"`,
      `$."${category}"`,
      score,
      userId,
    ];

    db.query(updateScoreSql, updateScoreValues, (error, scoreResults) => {
      if (error) {
        console.error("graduation_score 업데이트 실패: ", error);
        reject(error);
      } else {
        console.log("graduation_score 업데이트 성공!");
        resolve(scoreResults);
      }
    });
  });
}


exports.ass_write = (req, res) => {
  verifyToken(req, res, () => {
    const category = req.body.gspost_category;
    const item = req.body.gspost_item;
    const score = req.body.gspost_score;
    const content = req.body.gspost_content;
    const pass = req.body.gspost_pass;
    const reason = req.body.gspost_reason;
    const filecheck = req.body.gspost_file;
    const studentIds = req.body.gspost_student; // stuId 값을 받아옴

    const token = req.decoded// 헤더에서 토큰 추출

    try {

      const student_id = token.student_id; // 사용자 ID 추출

      getDate((error, date) => {
        if (error) {
          console.error("날짜 가져오기 실패: ", error);
          return res.status(500).send("서버 내부 오류");
        } else {
          const sql =
            "INSERT INTO gs_post (gsuser_id,gspost_post_date,gspost_category,gspost_item,gspost_score,gspost_content,gspost_pass,gspost_reason,gspost_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            student_id,date,category,item,score,JSON.stringify(studentIds),pass,reason,filecheck
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

//관리자 리스트 목록 불러오기
exports.assPosts = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded;

    try {
      const student_id = token.student_id; 

      db.query(`SELECT * FROM gs_post WHERE gsuser_id = ${student_id} AND gspost_category = '관리자승인'`, (err, results, fields) => {
        if (!err) {
          res.status(200).json(results);
        } else {
          console.log('err : ' + err);
          res.status(500).json({ message: '서버 내부 오류' });
        }
      });
    } catch (err) {
      console.error("토큰 검증 실패: ", err);
      res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
  });
};



exports.getselUserInfo = (req, res) => {
  verifyToken(req, res, () => {
    const token = req.decoded 
    const student_id = parseInt(req.query.student_id, 10);
    try {

      db.query(`SELECT student_id,name,graduation_score FROM user WHERE student_id = ${student_id}`, function (err, rows, fields) {
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