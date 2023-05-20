const express = require('express');
const router = express.Router();
const subject = require('./subject.info');

// DB에 저장된 모든 과목 정보 불러오기
router.get('/', subject.all);

// 특정 과목 정보 추가하기
router.get('/info', subject.info);

// 과목 정보 추가하기
router.post('/add', subject.add);

// 과목 정보 삭제하기
router.delete('/delete', subject.delete);

// 특정 과목 정보 수정하기
router.put('/modify', subject.modify)

module.exports = router;