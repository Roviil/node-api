const express = require('express');
const router = express.Router();
const prof = require('./professor');

// 전체 교수님 정보
router.get('/', prof.all);

//특정 교수님 정보
router.get('/info', prof.info);

// 교수 정보 추가
router.post('/add', prof.add);

// 특정 교수님 정보 삭제하기 
router.delete('/delete', prof.delete);

// 특정 교수님 정보 수정하기
router.put('/modify', prof.modify);



module.exports = router;