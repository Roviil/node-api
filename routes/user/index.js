const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('./auth')
const subject= require('./required');

//test
//박효영 test22

/**
 * @swagger
 * paths:
 *  /user:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                               "student_id": 20190580,
 *                               "password": "1111",
 *                               "name": "testname",
 *                               "permission": 1,
 *                               "grade": 3,
 *                               "email": "test@gm.hannam.ac.kr",
 *                               "academic_division": 1
 *                           },
 *                           {
 *                               "student_id": 20190596,
 *                               "password": "1234",
 *                               "name": "park",
 *                               "permission": 1,
 *                               "grade": 3,
 *                               "email": "1234@1234",
 *                               "academic_division": 2
 *                           },
 *                          ]
 */
router.get('/', controller.user);
/**
 * @swagger
 * /user/info?student_id={student_id}:
 *  get:
 *    summary: "특정 유저조회 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: student_id
 *        required: true
 *        description: 학번
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: object
 *                  example: [{
 *                               "student_id": 20190580,
 *                               "password": "1111",
 *                               "name": "bae",
 *                               "permission": 1,
 *                               "grade": 3,
 *                               "email": "4234@gm.hannam.ac.kr",
 *                               "academic_division": null
 *                           }]
 */
router.get('/info', controller.info);
/**
 * @swagger
 * /user/login?student_id={student_id}&password={password}:
 *  post:
 *    summary: "로그인 Query 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: student_id
 *        required: true
 *        description: 학번
 *        schema:
 *          type: integer
 *      - in: query
 *        name: password
 *        required: true
 *        description: 비밀번호
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 로그인 성공시 토큰 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: json
 *                  example: [{
    "message": "로그인 성공",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjAxOTA1ODAiLCJpYXQiOjE2ODA0Mjc5ODAsImV4cCI6MTY4MDQyODA0MCwiaXNzIjoiMjAxOTA1ODAifQ.d56CpEr7jaFXOW10fBZmjE47eazgNLASurS1Ft_jcPE"
}]
 */
router.post('/login', controller.login);
/**
 * @swagger
 *
 * /user/signup:
 *   post:
 *     summary: 유저 회원가입
 *     description: "json 형태로 body에 담아 url로 전송하여 회원가입 진행"
 *     tags:
 *       - Users
 *     requestBody:
 *       description: 회원가입 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *                 description: 학번
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               name:
 *                 type: string
 *                 description: 이름
 *               email:
 *                 type: string
 *                 description: 이메일
 *             example:
 *               student_id: 20190581
 *               password: mypassword
 *               name: John Doe
 *               email: johndoe@example.com
 *     responses:
 *       '200':
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 회원가입 완료 메시지
 *               example:
 *                 message: 회원가입이 완료되었습니다.
 *       '500':
 *         description: 회원가입 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 실패 메시지
 *               example:
 *                 error: 회원가입에 실패했습니다.
 */
router.post('/signup', controller.signup);
router.get('/auth', auth.verifyToken);
router.get('/student', controller.infotoken);
router.put('/password', controller.userupdate);
router.post('/upload', controller.upload);
router.get('/loding', controller.loding);
router.post('/sendverificationemail', controller.sendVerificationEmail)
router.post('/sendverificationpassword', controller.sendVerificationPassword)
router.post('/adminsignup', controller.adminsignup);
router.post("/grade", controller.usergrade);

router.get("/required", subject.required); // 이수 과목
router.get("/required/subject", subject.re_subject); // 이수 과목 subject 테이블 정보 불러오기
router.post("/required/add", subject.add);
router.delete("/required/delete", subject.delete);


module.exports = router;