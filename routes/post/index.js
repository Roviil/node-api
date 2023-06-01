const express = require('express');
const router = express.Router();
const controller = require('./post.controller');

/* GET users listing. *d/

/**
 * @swagger
 * paths:
 *  /post:
 *    get:
 *      summary: "게시글 전체 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Post]
 *      responses:
 *        "200":
 *          description: 전체 게시글 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  post:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        post_id:
 *                          type: integer
 *                          description: "게시글 ID"
 *                          example: 1
 *                        post_title:
 *                          type: string
 *                          description: "게시글 제목"
 *                          example: "게시글 제목입니다."
 *                        post_content:
 *                          type: string
 *                          description: "게시글 내용"
 *                          example: "게시글 내용입니다."
 *                        student_id:
 *                          type: integer
 *                          description: "작성자 학번"
 *                          example: 20190580
 *                        post_date:
 *                          type: string
 *                          format: date-time
 *                          description: "작성일"
 *                          example: "2022-04-04T12:30:00Z"
 *                        post_file:
 *                          type: string
 *                          description: "파일 첨부 여부"
 *                          example: null
 *                        board_id:
 *                          type: integer
 *                          description: "게시판 ID"
 *                          example: 1
 */
router.get('/', controller.posts);
/**
 * @swagger
 * /post/posts:
 *   get:
 *     summary: "게시글 조회"
 *     description: "특정 게시판의 게시글을 조회합니다. 최신순으로 보여줍니다"
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: board_id
 *         description: "게시글을 조회할 게시판의 id"
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   post_id:
 *                     type: integer
 *                   post_title:
 *                     type: string
 *                   post_content:
 *                     type: string
 *                   student_id:
 *                     type: integer
 *                   post_date:
 *                     type: string
 *                     format: date-time
 *                   post_file:
 *                     type: string
 *                   board_id:
 *                     type: integer
 *       "500":
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/posts', controller.postsget);
/**
 * @swagger
 * securityDefinitions:
 *  Bearer:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 * /post/write:
 *  post:
 *    summary: 글 작성 api, 그냥 이런 주소가 있구나 정도 참고, 토큰 값 못 추가해서 페이지에서 사용 불가능
 *    tags:
 *      - Post
 *    security:
 *      - api_key: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              post_title:
 *                type: string
 *              post_content:
 *                type: string
 *              post_file:
 *                type: string
 *              board_id:
 *                type: integer
 *                example: 1
 *            required:
 *              - post_title
 *              - post_content
 *              - board_id
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      '500':
 *        description: Internal Server Error
 */
router.post('/write', controller.write);
/**
 * @swagger
 * /post/comment:
 *  get:
 *    summary: 전체 댓글 조회
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  comment_id:
 *                    type: integer
 *                  comment_content:
 *                    type: string
 *                  student_id:
 *                    type: integer
 *                  comment_date:
 *                    type: string
 *                  post_id:
 *                    type: integer
 */
router.get('/comment', controller.comment);
/**
 * @swagger
 * /post/comment::
 *   get:
 *     summary: 게시물의 댓글 요청
 *     tags:
 *       - Post
 *     parameters:
 *       - in: query
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: post_id의 값으로 해당 게시물의 댓글 불러오기
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment_id:
 *                     type: integer
 *                   comment_content:
 *                     type: string
 *                   student_id:
 *                     type: integer
 *                   comment_date:
 *                     type: string
 *                     format: date-time
 *                   post_id:
 *                     type: integer
 *       '500':
 *         description: Internal Server Error
 */
router.get('/comment:', controller.commentget);
/**
 * @swagger
 * /post/updatepost:
 *   post:
 *     summary: 게시물 수정하기
 *     tags:
 *       - Post
 *     parameters:
 *       - in: query
 *         name: post_id
 *         required: true
 *         description: 수정할 게시물의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: 수정할 게시물의 제목과 내용
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_title:
 *                 type: string
 *                 description: 수정할 게시물의 제목
 *               post_content:
 *                 type: string
 *                 description: 수정할 게시물의 내용
 *             example:
 *               post_title: 수정된 제목
 *               post_content: 수정된 내용
 *     responses:
 *       200:
 *         description: 게시물 수정 완료
 */
router.post('/updatepost', controller.updatePost);
/**
 * @swagger
 * /post/deletepost/{post_id}:
 *   post:
 *     summary: 게시글 삭제
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: post_id값을 가져와 게시글 삭제
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The post was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Post was successfully deleted
 *       403:
 *         description: User does not have permission to delete this post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message
 *                   example: You do not have permission to delete this post
 *       404:
 *         description: The specified post was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message
 *                   example: The specified post was not found
 *       500:
 *         description: An error occurred on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message
 *                   example: An error occurred on the server
 */
router.post('/deletepost/:post_id', controller.deletePost);
/**
 * @swagger
 * /post/commentwrite/{post_id}:
 *   post:
 *     summary: 댓글 작성
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: post_id
 *         description: post_id값을 가져와 해당 게시글에 댓글 작성
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_content:
 *                 type: string
 *                 description: The content of the comment.
 *                 example: This is a comment.
 *             required:
 *               - comment_content
 *     responses:
 *       201:
 *         description: The comment was successfully written.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글이 성공적으로 작성되었습니다.
 *       400:
 *         description: The request was invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 잘못된 요청입니다.
 *       401:
 *         description: The request requires authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인을 해주세요.
 *       500:
 *         description: An error occurred on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 내부 오류
 */
router.post('/commentwrite/:post_id', controller.commentwrite);
/**
 * @swagger
 * /post/deletecomment:
 *   delete:
 *     summary: 댓글 삭제
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         description: comment_id을 가져와 해당 댓글 삭제
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       201:
 *         description: The comment was successfully written.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 삭제 성공
 *       400:
 *         description: The request was invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 잘못된 요청입니다.
 *       401:
 *         description: The request requires authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인을 해주세요.
 *       500:
 *         description: An error occurred on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 내부 오류
 */
router.post('/deletecomment/:comment_id', controller.deleteComment);
router.get('/commentsAll', controller.getCommentCount)
router.post('/updatecomment/:comment_id', controller.updateComment);
router.get('/mypost', controller.mypost);
router.post('/introduction', controller.introduction_update);
router.get('/board', controller.board);
router.post('/reportPost/:post_id', controller.reportPost);
router.get('/getReport', controller.getReport);
router.get('/updatenotification', controller.updateNotificationStatus);
router.get('/getnotification', controller.getNotificationStatus);
module.exports = router;