-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: Capstone
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `board_name` varchar(45) NOT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'자유게시판'),(2,'구인구직'),(3,'전체 공지'),(4,'Q&A게시판'),(5,'1학년 공지'),(6,'2학년 공지'),(7,'3학년 공지'),(8,'4학년 공지'),(90,'피드백'),(99,'휴지통');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(2048) NOT NULL,
  `student_id` int NOT NULL,
  `comment_date` datetime NOT NULL,
  `post_id` int NOT NULL,
  `available` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_user_student_id_fk` (`student_id`),
  KEY `comment_post_post_id_fk` (`post_id`),
  CONSTRAINT `comment_post_post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_user_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_file`
--

DROP TABLE IF EXISTS `gs_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gs_file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `file_name` varchar(200) NOT NULL,
  `file_original_name` varchar(200) NOT NULL,
  `file_size` mediumtext NOT NULL,
  `file_path` varchar(250) NOT NULL,
  PRIMARY KEY (`file_id`),
  KEY `gs_file_gs_post_gspost_id_fk` (`post_id`),
  CONSTRAINT `gs_file_gs_post_gspost_id_fk` FOREIGN KEY (`post_id`) REFERENCES `gs_post` (`gspost_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_file`
--

LOCK TABLES `gs_file` WRITE;
/*!40000 ALTER TABLE `gs_file` DISABLE KEYS */;
INSERT INTO `gs_file` VALUES (2,14,'141685657890853IMG_20230602_042155.jpg','IMG_20230602_042155.jpg','27065','/home/ubuntu/node-api/routes/uploads/141685657890853IMG_20230602_042155.jpg');
/*!40000 ALTER TABLE `gs_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_info`
--

DROP TABLE IF EXISTS `gs_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gs_info` (
  `gsinfo_type` varchar(45) NOT NULL,
  `gsinfo_name` varchar(45) NOT NULL,
  `gsinfo_score` int DEFAULT NULL,
  `gsinfo_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`gsinfo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_info`
--

LOCK TABLES `gs_info` WRITE;
/*!40000 ALTER TABLE `gs_info` DISABLE KEYS */;
INSERT INTO `gs_info` VALUES ('자격증','CISA',400,1),('자격증','CISSP',400,2),('자격증','중등학교정교사 2급',300,3),('자격증','정보처리기사',300,4),('자격증','전자계산기조직응용기사',300,5),('자격증','전자계산기기사',300,6),('자격증','정보보호전문가(SIS)1급',300,7),('자격증','웹프로그래머(WPC)1급',300,8),('자격증','네트워크관리사 1급',300,9),('자격증','인터넷보안전문가 자격증 1급',300,10),('자격증','정보보호기사',300,11),('자격증','MCSE',300,12),('자격증','MCSA',300,13),('자격증','MCITP',300,14),('자격증','MCTS',300,15),('자격증','MCDST',300,16),('자격증','MCDBA',300,17),('자격증','MCSD',300,18),('자격증','MCPD',300,19),('자격증','MTA',300,20),('자격증','MCAD',300,21),('자격증','OCP',300,22),('자격증','OCJAP',300,23),('자격증','OCPJP',300,24),('자격증','OCWCD',300,25),('자격증','OCBCD',300,26),('자격증','OCSA',300,27),('자격증','OCNA',300,28),('자격증','CCNA',300,29),('자격증','CCNP',300,30),('자격증','CCDA',300,31),('자격증','CCDP',300,32),('자격증','CCIE',300,33),('자격증','CCSP',300,34),('자격증','사무자동화산업기사',100,35),('자격증','정보처리산업기사',100,36),('자격증','전자계산기조직응용산업기사',100,37),('자격증','웹디자인산업기사',100,38),('자격증','정보보안산업기사(SIS) 2급',100,39),('자격증','리눅스 마스터 1급',100,40),('자격증','네트워크관리사 2급',100,41),('자격증','인터넷보안전문가 자격증 2급',100,42),('자격증','웹프로그래머(WPC) 2급',100,43),('자격증','정보처리기능사',50,44),('자격증','정보기기운용기능사',50,45),('자격증','전자계산기기능사',50,46),('자격증','멀티미디어콘텐츠제작전문가',50,47),('자격증','게임프로그램전문가',50,48),('자격증','게임그래픽전문가',50,49),('자격증','컴퓨터활용 1급',50,50),('자격증','리눅스마스터 2급',50,51),('자격증','전산회계기능사',50,52),('자격증','컴퓨터그래픽스운용기능사',50,53),('자격증','컴퓨터운용사',50,54),('자격증','점보시스템감리사',50,55),('자격증','웹디자인기능사',50,56),('자격증','웹프로그래머(WPC) 3급',50,57),('외국어능력','TOEIC 400~499',100,58),('외국어능력','TOEIC 500~599',200,59),('외국어능력','TOEIC 600~699',300,60),('외국어능력','TOEIC 700~799',400,61),('외국어능력','TOEIC 800이상',500,62),('외국어능력','TEPS 167~194',100,63),('외국어능력','TEPS 195~226',200,64),('외국어능력','TEPS 227~263',300,65),('외국어능력','TEPS 264~308',400,66),('외국어능력','TEPS 309이상',500,67),('외국어능력','TOEFL 91이상',500,68),('외국어능력','TOEFL 80~90',400,69),('외국어능력','TOEFL 69~79',300,70),('외국어능력','TOEFL 56~68',200,71),('외국어능력','TOEFL 40~55',100,72),('외국어능력','JLPT 2급',350,73),('외국어능력','JLPT 1급',500,74),('외국어능력','TOPCIT',0,75),('상담실적','상담',10,76),('학과행사','세미나',30,77),('학과행사','현장견학',30,78),('학과행사','MT',20,79),('학과행사','체육대회',20,80),('학과행사','학술제',20,81),('학과행사','기타',20,82),('취업훈련','취업 훈련 1회',50,83),('취업훈련','취업 훈련 2회',100,84),('취업훈련','취업 훈련 3회',150,85),('해외연수','30~39일',50,86),('해외연수','40~49일',80,87),('해외연수','50일 이상',0,88),('인턴십','30~39일',50,89),('인턴십','40~49일',80,90),('인턴십','50일 이상',0,91),('S/W공모전','전국 1등',600,92),('S/W공모전','전국 2등',400,93),('S/W공모전','전국 3등',300,94),('S/W공모전','교내 1등',300,95),('S/W공모전','교내 2등',200,96),('S/W공모전','교내 3등',100,97),('졸업작품입상','입상',100,98),('캡스톤디자인','캡스톤 필수 이수',0,99),('취업/대학원진학','취업',850,100),('관리자승인','기타',0,102),('S/W공모전','우주1등',900,111),('S/W공모전','중도포기',5,112);
/*!40000 ALTER TABLE `gs_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_max`
--

DROP TABLE IF EXISTS `gs_max`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gs_max` (
  `max_id` int NOT NULL AUTO_INCREMENT,
  `max_category` varchar(50) NOT NULL,
  `max_score` int NOT NULL,
  PRIMARY KEY (`max_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_max`
--

LOCK TABLES `gs_max` WRITE;
/*!40000 ALTER TABLE `gs_max` DISABLE KEYS */;
INSERT INTO `gs_max` VALUES (1,'자격증',600),(2,'외국어능력',500),(3,'상담실적',150),(4,'학과행사',150),(5,'취업훈련',150),(6,'해외연수',200),(7,'인턴십',300),(8,'S/W공모전',600),(9,'졸업작품입상',100),(10,'캡스톤디자인',0),(11,'취업/대학원진학',850),(12,'총점',1000),(13,'관리자승인',1000);
/*!40000 ALTER TABLE `gs_max` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gs_post`
--

DROP TABLE IF EXISTS `gs_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gs_post` (
  `gspost_id` int NOT NULL AUTO_INCREMENT,
  `gsuser_id` int NOT NULL,
  `gspost_post_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  `gspost_category` varchar(20) NOT NULL,
  `gspost_item` varchar(45) NOT NULL,
  `gspost_score` int NOT NULL,
  `gspost_accepted_score` int NOT NULL DEFAULT '0',
  `gspost_content` varchar(500) DEFAULT NULL,
  `gspost_pass` varchar(10) NOT NULL,
  `gspost_reason` varchar(500) DEFAULT NULL,
  `gspost_start_date` date DEFAULT NULL,
  `gspost_end_date` date DEFAULT NULL,
  `gspost_file` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`gspost_id`),
  KEY `gs_post_user_student_id_fk` (`gsuser_id`),
  CONSTRAINT `gs_post_user_student_id_fk` FOREIGN KEY (`gsuser_id`) REFERENCES `user` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gs_post`
--

LOCK TABLES `gs_post` WRITE;
/*!40000 ALTER TABLE `gs_post` DISABLE KEYS */;
INSERT INTO `gs_post` VALUES (14,20180621,'2023-06-02 07:18:10','자격증','CISA',400,0,'','대기',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `gs_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(128) NOT NULL,
  `post_content` varchar(2048) NOT NULL,
  `student_id` int NOT NULL,
  `post_date` datetime NOT NULL,
  `post_file` varchar(45) DEFAULT NULL,
  `board_id` int NOT NULL,
  `available` int NOT NULL,
  `report` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `post_user_student_id_fk` (`student_id`),
  KEY `post_board_board_id_fk` (`board_id`),
  CONSTRAINT `post_board_board_id_fk` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_user_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (275,'메인테스트\n하려고 넣음','',20200587,'2023-05-31 19:16:07','null',5,1,0),(311,'1234','',20190613,'2023-06-01 22:20:42',NULL,90,1,0),(312,'qwer','',20190580,'2023-06-01 22:22:29','null',6,1,0),(313,'rrrrr','',20190580,'2023-06-01 22:30:51','null',6,1,0),(314,'공지사항 테스트 입니다!','',20190580,'2023-06-01 22:31:08','null',6,1,0),(315,'testtesttesttestetstetsdfsdfasdfasdfgasdjkghasdhkfghljkasdfhjklasfhdljkasdhfjklasdhkjlfghasdljkghasdjkghklasdfjghsdfjklgfdg','',20190580,'2023-06-01 22:31:47','null',6,1,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  `phone_num` varchar(20) DEFAULT NULL,
  `pro_id` int NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='교수';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES ('이만희','manheelee@hnu.kr','컴퓨터공학과','010-7140-6504',1),('이강수','gslee@hnu.kr','컴퓨터공학과','042-629-7549',2),('이극','leegeuk@hnu.kr','컴퓨터공학과','042-629-7550',3),('최의인','eichoi@hnu.kr','컴퓨터공학과','042-629-7981',4),('안기영','kyagrd@gmail.com','컴퓨터공학과','042-629-7497',5),('장준혁','jhjang@hnu.kr','컴퓨터공학과','042-629-7463',6),('장효경','chantellejang@hotmail.com','컴퓨터공학과','010-9678-2146',7),('송지영','jysong@hnu.kr','컴퓨터공학과','042-629-7657',8),('소우영','-','컴퓨터공학과','-',9),('이상구','-','컴퓨터공학과','-',10),('이재광','-','컴퓨터공학과','-',11);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `required_subject`
--

DROP TABLE IF EXISTS `required_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `required_subject` (
  `student_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `pro_id` int DEFAULT NULL,
  KEY `required_subject_subject_subject_id_fk` (`subject_id`),
  KEY `student_id` (`student_id`),
  KEY `required_subject_professor_pro_id_fk` (`pro_id`),
  CONSTRAINT `required_subject_professor_pro_id_fk` FOREIGN KEY (`pro_id`) REFERENCES `professor` (`pro_id`),
  CONSTRAINT `required_subject_subject_subject_id_fk` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `required_subject_user_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `required_subject`
--

LOCK TABLES `required_subject` WRITE;
/*!40000 ALTER TABLE `required_subject` DISABLE KEYS */;
INSERT INTO `required_subject` VALUES (20200587,18323,2),(20200546,19980,5),(20200546,18323,2),(20200546,17851,6),(20200546,12985,4),(20200546,14118,9),(20200546,20782,7),(20200546,20630,6),(20200546,23289,1),(20200546,7,1),(20200546,2,1),(20200546,3,1),(20200546,5,1),(20200546,12047,2),(20200546,20057,4),(20200546,17572,6),(20200546,17582,5),(20200592,10,1),(20200592,9,1),(20200592,12047,2);
/*!40000 ALTER TABLE `required_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subject_id` int NOT NULL,
  `pro_id` int NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `credit` int NOT NULL,
  `subject_division` tinyint NOT NULL,
  `type_md` tinyint DEFAULT NULL,
  `type_tr` tinyint DEFAULT NULL,
  `subject_info` varchar(500) DEFAULT NULL,
  `use_language` varchar(50) DEFAULT NULL,
  `class_goal` varchar(500) DEFAULT NULL,
  `opening_semester` varchar(20) NOT NULL,
  `opening_grade` int NOT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `pro_id` (`pro_id`),
  CONSTRAINT `pro_id` FOREIGN KEY (`pro_id`) REFERENCES `professor` (`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='과목';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (0,1,'오픈소스SW개발',3,2,2,2,NULL,NULL,NULL,'1',2),(2,1,'클라우드컴퓨팅',3,2,2,1,NULL,NULL,NULL,'1',3),(3,1,'역공학',3,2,4,2,NULL,NULL,NULL,'2',3),(4,5,'전산영어',3,2,0,0,NULL,NULL,NULL,'2',3),(5,1,'블록체인',3,2,0,2,'','','','1',4),(6,1,'가상증강현실',3,2,0,0,NULL,NULL,NULL,'1',4),(7,1,'게임서버프로그래밍',3,2,0,0,NULL,NULL,NULL,'1',4),(8,1,'머신러닝의 이해',3,2,0,0,NULL,NULL,NULL,'1',4),(9,1,'데이터마이닝',3,2,0,0,NULL,NULL,NULL,'2',4),(10,1,'양자컴퓨팅',3,2,0,0,NULL,NULL,NULL,'2',4),(11,1,'암호의 이해',3,2,4,2,NULL,NULL,NULL,'1',3),(10990,4,'데이터베이스',3,2,3,1,'데이터베이스의 기본적인 개념, 데이터베이스 설계 기법 및 정규화 과정, SQL에 대하여 소개한다. 첫째목표는 데이터베이스의 기본적인 원리 이해, 둘째목표는 데이터베이스의 개념 이해. 섯째목표는 데이터베이스의 원리 이해를 통한 데이터베이스 모델링 및 프로그래밍. 넷째목표는 SQL을 이용한 실제 응용 습득이다.',NULL,'데이타베이스의 일반적인 개념에 대해 이해. 관계형 데이타베이스에 일반적인 이해. 데이타 종속성과 정규화에 대한 이해. 데이터 모델링(ER)과 저장, 접근. 회복과 병행 제어.','2',3),(10991,7,'데이터통신',3,2,0,0,'일련의 정보(문자, 숫자, 음성, 영상 비디오 등)를 전달하는데 필요한 기본적인 데이터 통신기술에 대한 주요개념과 데이터 링크 프로토콜을 이해하도록 한다. 그리고 개방형 컴퓨터 통신구조인 OSI 7계층의 기본 참조모델과 TCP/IP 프로토콜의 4 계층 구조를 이해함으로써 네트워크 구조를 이해한 다음, 여러 가지 응용네트워크에 대해 살펴봄으로써 통신 프로토콜과 구현 및 응용능력을 습득하도록 한다.',NULL,'데이터 통신 시스템의 구성요소를 이해할 수 있다. 데이터와 신호, 아날로그 신호 및 디지털 신호를 설명할 수 있다. 전송매체의 종류를 설명할 수 있다. 다중화의 정의 및 종류를 이해할 수 있다. 통신을 위한 인터네트워킹 장비를 설명할 수 있다.','2',2),(12047,2,'소프트웨어공학',3,2,0,3,'소프트웨어 공학이란, 최소의 인원, 장비 및 비용을 투입하여 최고 품질의 소프트웨어 시스템을 최단시간에 개발할 수 있도록 하는 절차 및 방법론들을 연구하는 것이다. 이를 위해 기존의 소프트웨어 위기를 이해하고 이를 극복하는 방법을 공부한다. 또한, 기존의 소프트웨어 공학의 해결책들을 조사하고 이를 이용하거나 개량하여 새로운 소프트웨어 개발 기술을 개발한다. 소프트웨어 공학 분야의 기초연구에 해당하는 과목이다. ',NULL,'소프트웨어공학의 필요성을 이해할 수 있다. 구조적 소프트웨어공학기술을 이해하고 활용할 수 있다. 객체지향 소프트웨어공학기술을 이해하고 활용할 수 있다. 컴포넌트기반 소프트웨어공학 기술을 이해하고 활용할 수 있다. 소프트웨어공학의 신기술을 이해하고 사용할 수 있다. ','2',3),(12339,6,'알고리즘',3,2,0,3,'알고리즘은 컴퓨터공학에서 주어진 문제를 해결하는 방법론을 학습하는 것이다. 본 강좌에서는 알고리즘의 정의, 알고리즘의 복잡도 분석, 그리고 설계 방법에 관한 사항을 강의한다. 구체적인 알고리즘 설계 및 분석 방법론으로 분할-정복 기법, 동적프로그래밍, 분기와 한정 등을 알아보고 분석한다. 그리고, 정렬(sorting)과 탐색(search)에 관한 주요 알고리즘을 프로그래밍 언어로 구현하여 알고리즘들의 특성을 이해하도록 한다.','파이썬, C언어','알고리즘에 대한 전반적인 개념을 이해하고 습득할 수 있다. 시간 복잡도 분석 방법을 이해하고 직접 활용할 수 있다. 알려진 알고리즘들을 이해하고 구현할 수 있다. 알고리즘을 활용해서 직접 문제를 분석, 설계하고 해결할 수 있다.','2',2),(12624,6,'운영체제',3,2,0,3,'이 교과목은 어떤 특정 운영체제나 하드웨어에 국한되지 않고 다양한 시스템에 적용될 수 있는 기본적인 개념에 대해 다룬다. 운영체제의 목적, 발전과정, 종류, 컴퓨터 구조, 운영체제의 구조, 자원 관리자로서의 프로세스 경영 및 기억 장치 경영 등에 대해 배운다.',NULL,'운영체제의 개념과 목표, 발전 과정을 이해한다. 프로세스 관리, 메모리 관리 등 시스템 자원의 관리 방법을 이해한다. 컴퓨터 시스템의 구성과 동작 과정을 깊이 이해하고, 습득한 지식을 프로그램 개발에 활용할 수 있다.','1',3),(12985,4,'자료구조',3,2,0,3,'이 과목은 전산학 또는 컴퓨터 공학의 가장 기초적인 과목이다. 모든 전공과목은 이 과목을 근거로 하고 있다. 컴퓨터가 연산하기 위한 자료가 어떻게 추상화되어야 하며, 이 추상화된 자료가 실제로 컴퓨터에서 처리될 때 어떤 자료구조를 가져야하는지를 연구하는 과목이다. 동시에 자료처리를 위한 algorithm을 분석하는 과목이다.','C언어 ','데이터 구조의 개념을 이해하고 SW에서 데이터 구조가 중요함을 이해한다. 소프트웨어 엔지니어링의 개념과 프로그래밍 설계 기술을 익힌다. 화일 또는 데이타베이스 설계 시 필요한 데이타의 구조에 대한 개념을 습득한다. list, stack, queue, tree, graph 등 대표적인 구조에 대해 공부한다.','1',2),(13614,1,'컴퓨터구조',3,2,0,2,'컴퓨터 시스템은 반도체 기술의 발전과 급변하는 시장의 요구 속에 상상을 초월하는 속도로 그 성능이 발전하고 있어 컴퓨터 전공에게는 매우 중요하고도 매력적이라고 할 수 있다. 이 과목은 컴퓨터의 구조와 그 내부 동작을 이해하는 것을 목표로 한다. 하드웨어 설계의 관점에서 컴퓨터 구조와 대표적인 RISC 아키텍쳐인 MIPS 컴퓨터를 예제로 컴퓨터의 내부 구조와 설계 process, 컴퓨터 성능의 정량적인 분석, 메모리 계층 구조를 심도 있게 다룬다. ',NULL,'하드웨어와 소프트웨어의 연관 관계를 이해한다. 데이터 표현 방법과 디지털 논리 회로를 이해한다. CPU의 구조와 명령어 처리 방법을 이해한다. 기억 장치의 계층 구조를 이해한다. 입출력 및 인터럽트 처리 과정을 이해한다.','2',2),(13615,5,'컴퓨터그래픽스',3,2,0,0,'본 과목은 컴퓨터 프로그래밍, 알고리즘, 미분기하학 및 기초 수학을 바탕으로 하는 강좌로서, OpenGL을 이용하여 선 그리기, 다각형 채우기, 그래픽스 시스템과 모델, 프로그래밍, 상호작용, 객체변환, 음영법, 곡선과 곡면, 이산적 기법 등을 배움으로서 컴퓨터 그래픽스의 기본적인 지식 및 실제 활용 기술을 습득하는데 목적이 있다. ',NULL,'삼차원 좌표계 이해. 벡터에 대한 실용적 이해. 그래픽 엔진의 개념에 대한 이해. 그래픽 API의 개념에 대한 이해. 그래픽 엔진으로 기초적 삼차원 그래픽을 표현하는 최소한의 프로그래밍 실무 기초.','2',4),(13616,7,'컴퓨터네트워크',3,2,0,2,'본 과목은 컴퓨터네트워크에 관한 기술 및 구조에 관한 기본원리를 학습하고, 컴퓨터네트워크 분야의 최신연구동향을 살펴본다. 본 과목은 회선교환망, 패킷교환망, LANs, 셀룰라통신망, 그리고 인터넷 표준인 TCP/IP 프로토콜을 학습한다.',NULL,'네트워크의 개념 및 기능을 이해한다. 네트워크의 종류를 안다. TCP/IP를 설명할 수 있다. 라우팅의 개념 및 기능을 이해한다. VPN 및 네트워크 보안을 이해한다.','1',3),(14118,9,'확률 및 통계',3,1,0,0,'본교과목에서는 기본적인 확률이론을 자연계에서 발생할 수 있는 랜덤현상들과 연관지어 학습함으로써 그런 현상들의 수학적 분석에 익숙할 수 있는 능력을 기른다. 확률공간, 확률함수, 확률변수 및 분포, 조건부 확률, 결합분포, 확률변수들의 함수와 분포, 변수변환, 확률생성함수, 기초 확률과 정론 등에 대하여 배운다. 통계학은 결과를 정확히 예측할 수 없는 불확실한 현상에 대한 자료를 수집하고 해석하는 학문이다.',NULL,'통계학의 기본지식 습득. 확률분포의 이해 및 적용. 통계적 추정에 대한 이해','2',1),(16224,7,'컴퓨터신기술',3,2,0,0,'본 과목은 컴퓨터 및 정보통신 분야의 최신 기술과 그에 관련된 주제들에 관하여 학습함으로써 신기술의 발전동향을 파악하고 앞으로 요구될  신기술을 적극적으로 습득하여 급변하는 기술발전 및 사회의 요구에 능동적으로 대처할 수 있는 능력을 배양한다. 따라서 본 과목에서 다루어질 구체적인 학습내용은 장래에 요구될 신기술로서 컴퓨터분야의 기술발전 추세에 따라 결정한다.',NULL,'시대별 컴퓨팅 기술을 설명할 수 있다. 빅데이터와 빅데이터 분석 기법을 설명할 수 있다. 인공지능 및 머신러닝을 설명할 수 있다. 클라우드 컴퓨팅을 설명할 수 있다. 가상화폐와 블록체인을 설명할 수 있다.','2',4),(16309,2,'프로젝트관리',3,2,0,0,'본 강의에서는 소프트웨어 개발의 여러 가지 문제점을 분석하고 이를 효과적으로 관리할 수 있는 기술을 연구 및 개발한다. 또한, 시험적으로 작은 규모의 프로젝트를 관리하는 경험을 갖게 한다. 본 강의는 소프트웨어 시스템 개발 프로젝트를 효과적으로 수행하기 위한 기존의 방법론을 조사 연구하여 문제점을 발견하고 새로운 관리 기법을 연구한다. ',NULL,'일반 및 소프트웨어 프로젝트 관리 문제를 이해할 수 있다. 제한된 자원(시간, 비용, 인원, 장비)을 최적적으로 사용할 수 있다. 프로젝트관리 기법의 장단점을 이해하고 기법을 선택하고 환경에 맞도록 새로운 기법을 만들고 적용할 수 있다. 관리도구인 MS-Project를 사용할수 있다. 건축 토목 분야의 프로젝트관리 기법을 소프트웨어 프로젝트 관리에 응용할수있다.','1',4),(17572,6,'고급프로그래밍',2,2,0,0,'객체지향프로그래밍 (Object-Oriented Programming, 이하에서 OOP로 약기되는 경우도 있음)을 위한 언어 C++ 등에 관해서 공부한다. 특히 OOP의 특성이라고 할수 있는 클래스 및 파생클래스, 상속성 개념, 연산자 다중정의, 테플레이트 및 예외처리 기법에 관한 내용을 다룬다.','C언어, C++','배열과 구조체를 사용해서 집합적, 구조적 데이터를 표현하고 다룰 수 있다. 포인터를 사용한 데이터 전달방식과 프로세스 메모리에 대해 이해하고 함수, 문자열 등에 활용할 수 있다. 포인터, 배열, 구조체에 기반한 복합적인 자료형을 능숙하게 다룰 수 있다. C 언어를 사용해 다양한 형태의 데이터를 다루는 프로그램을 직접 설계하고 작성할 수 있다.','1',1),(17582,5,'프로그래밍언어론',3,2,0,3,'프로그래밍언어에서의 추상화 등의 개념의 발전과정, 설계기준과 구현 및 바인딩, 문법의 표현수단, 변수와 수식 및 제어구조, 자료형 및 자료추상화의 필요성, 명칭의 유효범위 및 기억장소 할당, 예외처리 및 객체지향프로그래밍 패러다임 등에 대해 다룬다.',NULL,'프로그래밍언어이론의 용어와 개념에 대한 이해. 문법구조와 의미구조를 표현하는 방식에 대한 이해와 활용. 함수형 프로그래밍 언어에 대한 기본적인 구사 능력. 프로그래밍언어의 의미구조를 프로그램으로 다룰 수 있는 능력. 프로그래밍언어의 문법구조를 프로그램으로 분석할 수 있는 원리의 이해와 적용.','1',3),(17851,6,'프로그래밍실습',3,1,0,0,'이제 학문뿐만 아니라 모든 분야에서도 컴퓨터는 필수 도구가 되어가고 있다. 특히 공학 및 과학 분야에서는 컴퓨터의 중요성은 아무리 강조해도 지나치지 않을 것이다. 다양한 수학 함수의 해를 구하는 것에서부터 복잡한 수치계산, 다양한 시뮬레이션 등 자신만의 문제 해결을 위해서는 범용 프로그램이 아닌 자신의 프로그램 도구를 제작해야 한다. 이 과목에서는 주어진 문제의 해를 얻으려고 하거나 다양한 입력에 대한 결과를 시뮬레이션하려고 할 때 문제를 풀어나가는 논리의 학습과 연습을 일차적인 목표로 하고 있으며, 프로그래밍 도구로서 요즘 가장 널리 사용되고 있는 MATLAB을 이용하여 논리를 구현하는 연습과 얻은 결과를 그래픽으로 처리하는 실용적인 기술의 습득을 이차 목표로 한다.','C언어','컴퓨터 프로그램의 개발 과정을 이해한다. 프로그래밍의 기본 개념들을 이해하고 적용할 수 있다. C 언어 기초를 숙련하고 기초적인 문제 해결에 응용할 수 있다.','1',1),(18323,2,'이산구조',3,1,0,0,'이산수학은 컴퓨터공학 분야에서 필요로 하는 수학 이론을 정리하고 이들이 컴퓨터공학 분야에서 어떻게 실제 응용되는지를 연구하는 과목이다. 본 과목은 컴퓨터공학의 이론이나 방법의 수학적 기반을 다루는 것 이므로, 전공분야를 깊이 연구할 때 필수적인 과목이다. 본 과목은 자료구조, 알고리즘분석 및 컴파일러 등의 과목 관련이 있으며, 세부내용은 논리, 집합론, 그래프이론, 함수론, 관계론, 라틱스, 벡터와 행렬 등이다.',NULL,'컴퓨터 분야에서 필요로 하는 수학적 개념을 이해한다. 컴퓨터공학 전 분야와 이산수학과의 관계를 이해한다. 컴퓨터시스템내에서 응용되는 과정을 이해한다. 수학적 모델링의 의미 및 방법을 이해한다. 실제 응용사례와 접목시킬수 있도록 한다.','1',1),(19740,6,'임베디드 시스템 및 실습',3,2,0,0,'이 교과목의 주요 목적은 임베디드 시스템에 대한 시스템 소프트웨어를 설계하고 최적화하는 방법을 제공하는 것이다. 이 과정을 통해 성공적인 새로운 제품을 개발하는 데 사용할 수 있는 기본 지식을 배우고 나아가 더욱 다양하게 활용할 수 있도록 한다.','리눅스','임베디드 시스템의 개념과 구조를 이해한다. 임베디드 소프트웨어 개발환경을 사용할 수 있다. 리눅스 커널을 이해하고 다룰 수 있다. 실생활에 유용한 임베디드 시스템을 직접 설계 및 개발할 수 있다.','2',2),(19980,5,'객체지향프로그래밍',3,2,1,1,'객체지향 프로그래밍 언어 Java의 기본특징과 개발환경을 학습하고, 어휘와 자료형 및 기본구문을 통하여 프로그래밍의 기초를 배운다. 또한 클래스, 인터페이스, 예외처리, 멀티스레드 및 애플릿 작성기법을 익힌다.','JAVA, 코틀린','OOP 및 OOPL의 역사적 배경 및 응용 분야에 대한 이해. 클래스, 인터페이스, 상속, 오브젝트, 인스턴스 등 OOP에서 자주 나타나는 기본 개념 숙지. 많이 활용되는 대표족인 OOPL인 Java로 OOP개념을 활용한 프로그래밍 숙달. 제너릭 프로그래밍, 함수형 프로그래밍 등 멀티패러다임으로 발전한 현대적 Java 언어에 대한 관련 배경 지식 이해 및 프로그래밍 숙달. 최근 Java 언어의 대안으로 주목받고 있는 Kotlin의 특징을 Java와 비교하여 이해하고 활용','2',2),(20057,4,'데이터베이스프로그래밍',3,2,3,1,'본 과목은 SD(시스템개발) 트랙 과목이다.데이터베이스 시스템의 개념, 데이터 모델, 데이터베이스 설계, 무결성 제약 조건, SQL 질의 등 전반적인 데이터베이스 이론과 이러한 이론들을 구현해 볼 수 있는 데이터베이스 활용 기법을 습득한다. 이를 위해 SQL 기반 고급 질의 기법, 데이터베이스와 프로그래밍 언어와의 통합 기법을 학습한다. 그리고 실전 프로젝트를 통해 실무에 적용할 수 있는 기초 지식 및 이를 바탕으로 한 문제 해결 능력을 체계적으로 학습한다. ',NULL,'개체 관계형 데이타베이스에 대해 연구한다. 개체 관계형 데이이타베이스를 관계형 데이타베이스로 변환하는 방법에 대해 연구한다. 참조적 무결성에 대해 연구한다. SQL을 공부한다. 정규화를 통해 이상현상등을 해결하는 것에 대해 공부한다.','1',4),(20630,6,'디지털공학',3,2,0,0,'본 과목은 컴퓨터공학과에 입학한 학생들이 이수해야 할 기초과목으로서 디지털 논리의 기본이론을 강의하여 이 과목을 배운 후에 아날로그 디지털 회로설계, 마이크로프로세서및실험 등을 배울 수 있는 발판을 마련하고, 기사 시험과 각종 취업시험에 대비하기 위하여 편성되었다.',NULL,'디지털 논리를 이해하고 적용할 수 있다. 논리게이트와 논리식의 동작 방식을 이해하고 다룰 수 있다. 조합논리회로와 순차논리회로의 동작 방식을 이해한다. 논리회로를 설계하는 능력을 갖춘다.','1',1),(20767,1,'시스템프로그래밍',3,2,0,2,'운영체제의 시스템 호출 API를 이용한 시스템 프로그래밍 기술을 학습한다. 디바이스 드라이버의 개발, 병렬성의 제어, 쓰레드, 에플릿 프로그래밍, Java 패키지, 윈도우 프로그래밍, MFC 구조, 메시지 핸들링, UI, C++ 그래픽 프로세싱. ','리눅스','유닉스/리눅스 시스템의 체계적 이해 및 활용. 시스템 프로그래밍 능력 향상','1',2),(20782,7,'컴퓨터교과교육론',3,2,0,0,'정보통신기술교육 개정 운영지침에는 정보사회의 생활, 정보기기의 이해, 정보처리의 이해, 정보가공과 공유, 종합 활동 영역으로 나누어 컴퓨터 전반에 대해 학습할 수 있는 기회를 제공한다. 본 과목에서는 해당 운영지침을 적용할 구체적인 사례들을 학습하고, 컴퓨터 교수법 및 교재연구의 방향 및 지도법을 학습한다.',NULL,'컴퓨터교과 교수법을 이해하고 적용할 수 있다. 컴퓨터교과의 교육과정을 이해하고 설명할 수 있다. 학교 현장에서 효율적으로 활용할 수 있는 수업과정안을 작성할 수 있다. 수준별 학습교재의 필요성과 수업방법에 대해 이해하고 설명할 수 있다. 컴퓨터교과 교육의 필요성과 가치를 바르게 인식하고 효율적으로 설명할 수 있다','1',4),(20803,7,'컴퓨터교과논리 및 논술',2,2,0,0,'중⋅고등학교의 일선 현장에서 시행되는 논리 및 논술교육의 내용을 검토하고, 적합한 교육방법과 교과과정을 모색한다.',NULL,'국내외 컴퓨터교육을 조사하고 이해한다. 국내외 컴퓨터 교육의 긍정적인 점 및 문제점을 인식한다. 컴퓨터 교육의 변화를 이해한다. 컴퓨터 교육의 나아갈 방향과 철학 등을 이해한다.','1',3),(22906,1,'정보보호개론',3,2,4,2,'본 과목은 기본적인 정보보호와 관련된 가장 기본적인 이유와 원리 등을 다룬다. 기밀성, 무결성, 인증, 식별, 가용성 등과 관련된 보안 정책, 모델 및 알고리즘 등이 포함된다.',NULL,'정보보안에 대한 전반적인 개념을 이해하고 습득한다. 시스템 보안 및 네트워크 보안, 웹 보안 기술을 이해한다. 시스템의 구성 이해를 통한 코드 보안과 악성코드에 대해 이해한다. 기초 암호 알고리즘과 전자상거래 보안 기술을 이해한다. 보안 시스템, IoT, AI 보안을 이해한다.','2',1),(22924,7,'컴퓨터교과교재연구 및 지도법',3,2,0,0,'정보통신기술교육 개정 운영지침에는 정보사회의 생활, 정보기기의 이해, 정보처리의 이해, 정보가공과 공유, 종합 활동 영역으로 나누어 컴퓨터 전반에 대해 학습할 수 있는 기회를 제공한다. 본 과목에서는 해당 운영지침을 적용할 구체적인 사례들을 학습하고, 컴퓨터 교수법 및 교재연구의 방향 및 지도법을 학습한다.',NULL,'컴퓨터교과 교수법을 이해하고 적용할 수 있다. 컴퓨터교과의 교육과정을 이해하고 설명할 수 있다. 학교 현장에서 효율적으로 활용할 수 있는 수업과정안을 작성할 수 있다. 수준별 학습교재의 필요성과 수업방법에 대해 이해하고 설명할 수 있다. 컴퓨터교과 교육의 필요성과 가치를 바르게 인식하고 효율적으로 설명할 수 있다. ','2',3),(22925,3,'시스템보안',3,2,4,2,'본 과목은 보안담당자로써 갖추어야할 기본적인 시스템 보안 능력을 배양하고자 한다. 운영체제 기본 및 운영, 클라이언트 보안(윈도우 보안, 인터넷 활용 보안), 서버보안(인증과 접근통제, 보안관리, 서버보안용 S/W 설치 및 운영) 등이 포함된다.',NULL,'시스템 보안을 위한 기초적인 지식을 습득한다. 시스템 해킹과 운영체제 보안 원리를 이해한다. 정보 보안 및 공격, 방어 기술을 이해한다.','1',2),(23289,1,'컴퓨터개론',3,1,0,0,'본 과목은 컴퓨터에 대한 전반적인 이해를 돕고 각 세부 전공에서 이를 활용할 수 있도록 돕는 교과목이다. 컴퓨터공학의 기초를 탄탄하게 다져 전공에 대한 준비를 할 수 있도록 하는 기초 강의이다. 컴퓨터의 역사를 시작으로, 디지털 논리, 컴퓨터 구조, 운영체제, 자료구조 및 알고리즘, 소프트웨어 공학, 컴퓨터 네트워크 등을 학습한다.',NULL,'컴퓨터 하드웨어와 소프트웨어의 전반적인 구성과 개념을 이해하고 설명할 수 있다. 컴퓨터공학 핵심 교과목들의 기초 개념을 이해하고 문제 해결 과정에 활용할 수 있다. 정보기술의 과거, 현재, 미래의 변화를 이해하고 앞으로의 자기계발 방향을 설계할 수 있다.','1',1),(23300,1,'.NET프로그램',3,2,1,1,'플랫폼에 독립적인 실행환경을 위해 마이크로소트프가 개발한 .NET 프로그래밍은 웹서비스의 확산으로 인해 그 필요성이 늘어나고 있다. 본 교과목에서는 .NET 프레임워크를 소개하고 C#의 기본적인 문법을 학습한 후, 다양한 예제와 실습을 통해 .NET 기반 응용 프로그램을 개발하는데 필요한 기초 지식을 습득하고, 습득한 프로그램 능력을 실제와 비슷한 문제를 해결하는데 활용할 수 있는 능력을 배양한다.','C#','C# 기초 문법 이해. C#을 활용한 객체지향 프로그래밍 이해. 프레임워크를 이용한 프로그래밍 기법 이해.','1',3),(23916,2,'공학과 경영',3,1,0,0,'본 과목은 공학(기술)과 경영의 기초를 학습한다. 기업 경영의 기술적인 문제, 과학과 기술 정책, 기술 예측, R&D 활동의 경영, 신제품 개발, 신사업의 창출, 벤처 사업 및 신기술 동향 등을 학습한다. ',NULL,'엔지니어로서 비즈니스 마인드를 가진다. IT기술분야에서 경영의 필요성을 알고 있다. 기술분야 (특히 IT분야)의 문제점을 알고 있다. 공업경영분야의 방법이나 철학을 기술공학 분야에 적용하는 방법을 알고 있다. 공업경영분야의 개략적인 학문체계를 알고있다.','2',1),(24272,5,'파이썬프로그래밍',3,1,0,0,'파이썬 언어는 간단한 문법구조 및 다양한 라이브러리들을 갖고 있다. 인터프리터 형태의 언어이고, 풍부한 프로그래밍 환경을 갖추고 있다. 이 과목은 데이터 타입, 제어흐름, 객체지향 프로그래밍, 그래픽 사용자 인터페이스 응용 등을 다룬다. 이 강좌에서 사용되는 예제와 문제들은 문서처리, 간단한 그래픽 처리 및 이미지 해석, 웹 프로그래밍 등 여러분야에 걸쳐 나타낸다.','파이썬','프로그래밍의 기초 개념인 식 변수 함수 제어 구조 데이터 타입의 개념을 이해한다. 파이썬 프로그래밍 환경에 익숙해져 파이썬으로 기초적인 프로그램을 작성하는 능력을 갖춘다. 재귀-꼬리재귀-반복의 형태를 자유자재로 넘나들 수 있도록 확실히 프로그램 제어구조의 개념을 확실히 이해한다. 수 문자열 리스트 튜플 딕셔녀리 등 파이썬에서 활용되는 데이터 타입을 이용해 프로그램을 작성하는 능력을 갖춘다. 표준 입출력으로 간단한 사용자 입력을 처리하고 입력 확인을 처리하는 프로그래밍 능력을 갖춘다.','2',1),(24485,8,'웹스크립트프로그래밍',3,2,1,1,'HTML5를 중심으로 한 웹 프론트엔드에 대해 전반적으로 다루는 과목으로 기본적인 HTML, CSS, JavaScript의 활용 및 이러한 웹 기반 기술이 모바일 및 데스크탑 UI 등 다양한 영역으로 전이되어 활용되는 사례, 그리고 최근 빠르게 발전하는 JavaScript 생태계에 대해서도 소개한다.','HTML, CSS, JavaScript','자바스크립트의 변수, 자료형, 연산자, 제어문, 함수와 스코프를 이해하고 활용할 수 있다. 웹문서와 자바스크립트를 이해하고 활용할 수 있다. 자바스크립트와 객체를 이해하고 활용할 수 있다. 서버와 통신을 이해하고 활용할 수 있다. 캔버스로 웹브라우저 창에 그림을 그릴 수 있다.','2',1),(24580,7,'웹서버프로그래밍',3,2,2,1,'본 과목은 급격하게 변화하는 4차 산업혁명 시대에 대처하기 위해 웹 서버 프로그래밍의 기초부터 복잡한 데이터 기반의 웹사이트 설계 및 구축 능력을 습득하는 것을 목표로 한다. 웹 서버를 관리하고, 데이터 베이스 관리 시스템과 연동하여 3-Tier 시스템 구축 능력도 습득한다.','HTML, CSS, Javascript','웹프로그래밍을 이해하고 기초 지식을 습득한다. 프로그래밍 예제들을 통하여 코딩 능력을 함양한다. 데이터베이스를 설계하고 활용한다.','1',4),(24585,4,'빅데이터',3,2,3,1,'빅데이터는 기존 데이터베이스 관리도구의 능력을 넘어서는 대량의 정형 또는 비정형의 데이를 포함한 데이터로부터 가치를 추출하고 결과를 분석하는 기술이다. 이를 위해서는 빅 데이터의 수집, 저장, 처리 및 분석, 사용 및 시각화가 필요하다. 본 교과에서는 이에 따른 여러 개념 및 기술들에 대해 소개를 한다.',NULL,'빅데이터 기본 개념 습득. 정형, 비정형 데이타 공부. 빅데이터 처리 기술. 최근 시스템 및 동향. ','2',4),(24812,3,'인공지능',3,2,0,0,'본 과목에서는 인공지능과 지능시스템에 있어 기본 개념을 이해하고 심화된 내용으로 학습, 게획수립, 영상이해, 자연어처리 등을 강의와 세미나를 통하여 학습하여 인공지능의 이론 및 응용 전반에 관한 지식을 습득한다. 여러 알고리즘을 이용 문제해결의 방법을 익힌 후 지능시스템설계의 각 분야에 대한 과제를 수행할 수 있도록 한다.',NULL,'작업에 지능을 부여하기 위해 인간과 비슷한 생각과 판단을 유도 해내는 방법을 이해한다. 수행 할 작업을 효율적으로 처리하기 위한 방법을 연구한다. 인공지능에 대한 전번적인 이론과 자동추론이론들을 학습한다. 인공신경망과 딥러닝의 원리를 이해한다.','2',3),(24844,3,'모바일프로그래밍',3,2,1,0,'스마트폰 앱의 설계 및 개발에 대한 전반적인 이해를 목표로 한다. 실습을 통해 스마트폰의 특징 및 모바일 프로그래밍의 구현 이슈를 이해한다. 특히 안드로이드 개발 환경에서 안드로이드 앱 프로그래밍 기법을 다루며 스마트폰 앱을 개발할 수 실무 기술을 익힌다. 수강생들은 기본적인 Java 또는 OOP에 대한 배경지식은 있어야 하며, 수강생들은 기말 프로젝트를 통해 자신의 아이디어를 기획하고, 구현할 수 있는 능력을 배양한다.',NULL,'안드로이드 스튜디오를 이용하여 모바일 프로그래밍 기법을 공부한다. 안드로이드 OS의 모바일 애플리케이션을 개발하고 설계한다. 스마트폰에 대한 기본 동작 원리 및 구조를 이해한다.','1',3),(24993,3,'네트워크프로그래밍 및 보안',3,2,4,2,'본 과목은 네트워크 시스템 프로그램의 기본적인 소켓 프로그래밍 개념과, 용어, 입.출력, 파일, 프로세스 등에  대한 내용을 공부함으로써 네트워크 프로그램 개발자와 시스템 운영자로서의 기본적인 능력을 키우는데 중점을 둔다.',NULL,'네트워크프로그램과 보안원리를 이해한다. TCP/IP네트워크의 소켓프로그램의 전반적인기술을 습득한다. 정보보안 및 공격, 방어기술을 습득한다.','2',3),(25257,1,'캡스톤디자인',3,2,0,0,'본 강의를 통하여 학생들은 실용적인 업무/연구 학습 능력을 개발한다. 캡스톤디자인 과정은 학생들에게 산업체나 연구 과제에서 직면하는 실제의 문제, 개방형, 학제적 문제를 해결할 수 있는 기회를 제공한다. 학생들은 공학적 설계 과정, 즉, 기능 요구 정의, 개념화, 분석, 위험 요소와 대책 확인, 선택, 물리적 프로토타이핑 등을 학습하고 적용한다.\n','','캡스톤 디자인 과목의 취지를 이해한다. 프로젝트의 선정을 위한 탐색, 타당성조사 및 분석을 할 수 있다. 팀 내에서 의사소통, 발표, 프로젝트 관린의 일원으로 활동할 수 있다. 팀 별로 주제에 맞는 연구 디자인 및 배경조사를 통하여 실전을 익힌다.','1',4);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `student_id` int NOT NULL,
  `password` varchar(128) NOT NULL,
  `salt` varchar(2048) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `permission` int NOT NULL,
  `grade` int DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `graduation_score` json DEFAULT (_utf8mb4'{"인턴십": 0, "자격증": 0, "S/W공모전": 0, "상담실적": 0, "취업훈련": 0, "학과행사": 0, "해외연수": 0, "관리자승인": 0, "외국어능력": 0, "졸업작품입상": 0,  "취업/대학원진학": 0}'),
  `major_type` varchar(20) DEFAULT NULL,
  `introduction` varchar(1024) DEFAULT '연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',
  `fcm_token` varchar(255) DEFAULT NULL,
  `is_notified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7544,'db0dbd80395585af3b2f7f9336a4687acf685ee45e385a7485eb1f1373e4d9ee825abd3f3659d3f85e9a97fdc6953aa349d7eb030a2817b32e82b59a10552597','0e8f45d94b165f503cd9e6434f487341','조교',2,99,NULL,'{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','d6bbPvS2bE17sOCyi29CU-:APA91bHed3WQcfFxjNvtAiqYtMsNW0i-2JM41Hy38zlnh6y8s2JNtvqliE7iy_x1JTWKsOlIHxXjJ89o5P2mOYDgKSGqp6gPr20vjanqx9iVF_1LeSklB8eO1ENSZJKR6ujBb-fjgKeb',0),(1234567,'6866ee4247109e3024445120f12543138cba60080e9eed6376f4d3bcc399be44fb2740e24379c29d3e66bf34b1dee64a87ef37a1a590cc36e6aa01ca884b0239','6c2e0ba37403527b7be1b3ff03a1cc37','교수니이이이임',3,99,'taking_potato@hnu.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',NULL,1),(20180598,'4393be52403169d45eac2faa56e84ad3b5474f457c3a58a604346cf6a28fab5c7fc56661ecacb458137f2cdb5102c7e437c3cde9f5460d92abd48f1a1d276cf6','797242eb077f583b50f3404e2bd015c6','곽예빈',2,4,'20180598@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','fSutaOjNTbimiVwVG39wQk:APA91bH0SrwGGXALJMCcqDRar4rC4_uH6S_E6n2RkmoDjXMdB64vUwdFXeXD3Nfv6ulY0LubWh7ouXDkXhES4blSadYgny4c7CzpZaUyYBgoPttYUHPR6YRpzEDcXxbGnIKn5UjU-CxZ',0),(20180610,'9f807ee56fe00998b096f62a0271a9210d16d86697b4bea6241d849a2857d73ce195efe31805ba3564205eb4019ac1b122005f2452617a4289ce72c24f68b188','7d827d1082054c1f966f4ca1caad40c6','박태수',1,4,'20180610@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',NULL,1),(20180621,'c147b717344164177a533a92f968f5a3c1f1544ae5d1a06aa06dd9c9119c0fbb6f709727e9162f6b1f4ad4f8bc3d6977490a4c14f9dd28ffffef4729439ccca9','9ca2eed61d48d2dba2473c077ecf4da2','김민구',1,4,'20180621@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','fSutaOjNTbimiVwVG39wQk:APA91bH0SrwGGXALJMCcqDRar4rC4_uH6S_E6n2RkmoDjXMdB64vUwdFXeXD3Nfv6ulY0LubWh7ouXDkXhES4blSadYgny4c7CzpZaUyYBgoPttYUHPR6YRpzEDcXxbGnIKn5UjU-CxZ',1),(20190580,'32732810ab4efff0486f5be6f676bb07f3ed32ef7987f5110edab39cacfca9b4221bd185d4c5d19ce6f5cf052bfcbef1520c7211c4f5513a11ff4de15886af42','92a7524a38b2f6696795f45b46945246','배정훈',2,3,'20190580@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','eGzB-WtVzkm0hyyzC6qGFf:APA91bHEkbMu462Ty3h6EDVO7q2pptvsQWb2KbK1M0a-Gwzh4qDQjxim2ItnJ0vtlvyMZkim-dMBti6O-gvgKrL70VTbPpL7pMkYurlD8uOejOxGkvKP53J9iGGBriDmUQu8Jn1Vy2Ew',0),(20190596,'93a5e667a9ef6eaa290b337e1ae34bf8d5a8c0db56d9104bfbe9752e8c19dde6fdbdd780f5771cd2f4449d5b786c1d0f66e85a576645cda2f00b10b5f9b63c36','56ba9e6831ce1ec403605bd57465ec44','박효영',1,4,'20190596@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','',1),(20190613,'ebe7e337ec8b7315e2ae016880e2c2a4d3b6227e135071288b9fcc83ca39504d7a6cee88b39d32953136b3a47350a2cebd60e81a80405675b715026d172e635c','465aeff77c3a84b264a3778ab8852e3d','유말그미',2,2,'20190613@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n- 010-0101-0101\n\n선호언어\n- 한국어\n\n개발기술\n- 없음\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n- 깃허브\n\n한줄 소개\n- 없음\n\n','eeVat0Z8Rc-PooKzZhej8z:APA91bEx9CVVzIoL6ChGA8B6ph0PPz_r3bM_s-lvXAdjkCj8AAFj_q5sL4yEwea9E4xZFIlQVuAzrLhTsrplnP3ENI887sa3zNbsVUPHcGixG1k0EzJRUkvKDYPxSOzUnVLEHsCv-_p7',0),(20200546,'b71d74e31523b8b2bfb9f4a6bdb3baa15d224d071a67e94d5bd480bb65d6f3551e2e1f917da65ff5e862040f6b9a2c435623e5bb9690489fd6c42efaeaa2b6f9','f29c4682d837739328c33119165ffaa8','김신영',1,4,'20200546@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',NULL,1),(20200559,'86768e197763933af21aac676d79290bf85b59a09e771a5982284535634e94a6558cc6cd84a220a7962ceddbcd2d440f6d6b599589e872d5fb13b434239b451a','c9cda9ebe79bd7eab0e2f53d880fb40e','안혜지',2,4,'20200559@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','',0),(20200587,'b101d3f6f049eb864b051452789d6db913d97fe0a37d7d1a20eb135886ae306beeef9e435249770e2b3f6c666cac2df2fba7a747ef9e5fa1888995393d7819a7','1e7eabdccf4b5cac9080b290aea15a29','정윤정',2,4,'20200587@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',NULL,1),(20200592,'7c9fa50772b7e9c7e496f361b452da2ea66db50a8fe274d28a36239b369028de70913da65289ed204814d98fcb9acf49cc4596a447ee23a676f2dccdc8828e0f','f03e9250cb77513796f6824a00d43873','소재령',1,1,'20200592@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n',NULL,1),(20200599,'3b1f82e56f96e612976daf900ab60e6bc5125d40d8bec0d59c673af614924b3f5a91dad86cc788bf0c1d4f1a84fef4ba6e7400b25586490ab2badd8863eb297b','e57f33f65bd3064ae3edc9662c830737','이희진',2,4,'20200599@gm.hannam.ac.kr','{\"인턴십\": 0, \"자격증\": 0, \"S/W공모전\": 0, \"상담실적\": 0, \"취업훈련\": 0, \"학과행사\": 0, \"해외연수\": 0, \"관리자승인\": 0, \"외국어능력\": 0, \"졸업작품입상\": 0, \"취업/대학원진학\": 0}',NULL,'연락처\n-\n\n선호언어\n-\n\n개발기술\n-\n\n개인 홈페이지 링크(깃허브, 블로그 등)\n-\n\n한줄 소개\n-\n\n','',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02  9:43:52
