-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: rossetta
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `myPicPaint`
--

DROP TABLE IF EXISTS `myPicPaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myPicPaint` (
  `num` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `Picname` varchar(45) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`num`),
  KEY `id_idx` (`id`),
  CONSTRAINT `my_id` FOREIGN KEY (`id`) REFERENCES `parents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myPicPaint`
--

LOCK TABLES `myPicPaint` WRITE;
/*!40000 ALTER TABLE `myPicPaint` DISABLE KEYS */;
/*!40000 ALTER TABLE `myPicPaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paintEx`
--

DROP TABLE IF EXISTS `paintEx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paintEx` (
  `num` int NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `Picname` varchar(45) NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paintEx`
--

LOCK TABLES `paintEx` WRITE;
/*!40000 ALTER TABLE `paintEx` DISABLE KEYS */;
/*!40000 ALTER TABLE `paintEx` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parents` (
  `id` varchar(50) NOT NULL,
  `pw` varchar(45) NOT NULL,
  `gender` varchar(13) NOT NULL,
  `name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phoneNum` int NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `joinDate` datetime NOT NULL,
  `birth` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pattern`
--

DROP TABLE IF EXISTS `pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pattern` (
  `num` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `level` int NOT NULL,
  `time` varchar(45) NOT NULL,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`num`),
  KEY `id_idx` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `parents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pattern`
--

LOCK TABLES `pattern` WRITE;
/*!40000 ALTER TABLE `pattern` DISABLE KEYS */;
/*!40000 ALTER TABLE `pattern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pronunciation`
--

DROP TABLE IF EXISTS `pronunciation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pronunciation` (
  `num` int NOT NULL AUTO_INCREMENT,
  `sentence` text NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pronunciation`
--

LOCK TABLES `pronunciation` WRITE;
/*!40000 ALTER TABLE `pronunciation` DISABLE KEYS */;
INSERT INTO `pronunciation` VALUES (1,'안녕하세요',1),(2,'반갑습니다',1),(3,'안녕히가세요',1),(4,'감사합니다',1),(5,'사랑해요',1),(6,'밥을 먹어요',2),(7,'사이좋게 지내자',2),(8,'집에 가자',2),(9,'동물원에 가요',2),(10,'공을 던져요',2),(11,'사이좋게 지내자',3),(12,'재미있게 놀았습니다',3),(13,'공놀이를 하였습니다.',3),(14,'고구마 하나 더 주세요',3),(15,'나는 요리를 하고 있어요.',3),(16,'음악을 듣고 있어요.',3),(17,'나는 과일을 사러 가고 있어요.',3),(18,'오늘 날씨가 좋네요.',3),(19,'어서오세요',1),(20,'안녕히 다녀오세요',2);
/*!40000 ALTER TABLE `pronunciation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pronunciation_score`
--

DROP TABLE IF EXISTS `pronunciation_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pronunciation_score` (
  `num` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `sentence` text NOT NULL,
  `score` float NOT NULL,
  `level` int NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`num`),
  KEY `pronunciation_id_idx` (`id`),
  CONSTRAINT `pronunciation_id` FOREIGN KEY (`id`) REFERENCES `parents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pronunciation_score`
--

LOCK TABLES `pronunciation_score` WRITE;
/*!40000 ALTER TABLE `pronunciation_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `pronunciation_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `situation`
--

DROP TABLE IF EXISTS `situation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation` (
  `num` int NOT NULL AUTO_INCREMENT,
  `level` int NOT NULL,
  `image` text NOT NULL,
  `answer` int NOT NULL,
  `question` text NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=937983 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situation`
--

LOCK TABLES `situation` WRITE;
/*!40000 ALTER TABLE `situation` DISABLE KEYS */;
INSERT INTO `situation` VALUES (33804,2,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215161119.png',3,'비 오는 날 아이가 밖으로 나가려고 해요. 아이에게 필요한 것은 무엇인가요?'),(187192,1,'http://35.208.138.116:3000/assets/situation3.jpg',2,'다음 그림의 여자 아이는 무엇을 하고 있나요?'),(477519,1,'http://35.208.138.116:3000/assets/situation2.jpg',4,'다음 그림의 상황에 어울리지 않는 말은?'),(514385,3,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215162525.png',3,'아이가 숙제를 마쳤어요. 다음으로 아이가 해야 할 일은 무엇인가요?'),(567097,2,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215160953.png',3,'아이가 배가 고프다고 말했어요. 엄마는 아이에게 무엇을 해줘야 하나요?'),(652237,3,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215162044.png',2,'아이가 책을 읽고 싶어해요. 아이는 무엇을 해야 하나요?'),(714647,2,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215160809.png',2,'아이는 공을 찾고 있어요. 공은 벤치 밑에 있습니다. 아이는 어디를 봐야 하나요?'),(735212,3,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215162351.png',3,'아이의 방이 지저분해요. 아이가 해야 할 일은 무엇인가요?'),(751708,2,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215154915.png',2,'아이는 왜 과자를 살 수 없나요?'),(769003,3,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215161932.png',2,'아이가 저녁을 다 먹었어요. 다음으로 해야 할 일은 무엇인가요?'),(803392,2,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215161217.png',1,'아이가 잠을 자려고 해요. 아이가 먼저 해야 할 일은 무엇인가요?'),(898996,1,'http://35.208.138.116:3000/assets/situation1.jpg',3,'다음 그림에서 초록색 상의를 입은 남자는 무엇을 하고 있나요?'),(937982,3,'http://35.208.138.116:3000/assets/Situation/Pasted_image_20240215161751.png',2,'친구가 오후 3시에 만나자고 했어요. 아이는 몇 시에 나가야 하나요?');
/*!40000 ALTER TABLE `situation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `situation_select`
--

DROP TABLE IF EXISTS `situation_select`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation_select` (
  `num` int NOT NULL AUTO_INCREMENT,
  `situation_num` int NOT NULL,
  `firstNum` text NOT NULL,
  `secondNum` text NOT NULL,
  `thirdNum` text NOT NULL,
  `fourthNum` text NOT NULL,
  PRIMARY KEY (`num`),
  KEY `num_idx` (`situation_num`),
  CONSTRAINT `num` FOREIGN KEY (`situation_num`) REFERENCES `situation` (`num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situation_select`
--

LOCK TABLES `situation_select` WRITE;
/*!40000 ALTER TABLE `situation_select` DISABLE KEYS */;
INSERT INTO `situation_select` VALUES (3,751708,'상점이 너무 바빠서','상점 문이 닫혀 있어서','아이가 과자를 좋아하지 않아서','아이가 돈을 가지고 있지 않아서'),(4,714647,'나무 위','벤치 밑','호수 속','모래 상자 안'),(5,567097,'책을 읽어줘야 해','음악을 틀어줘야 해','밥을 줘야 해','잠을 재워야 해'),(6,33804,'우산','아이스크림','선글라스','모자'),(7,803392,'이를 닦는다','TV를 본다','과자를 먹는다','놀이한다'),(8,937982,'오전 10시','오후 2시','오후 3시',' 오후 4시'),(9,769003,'숙제를 한다','접시를 싱크대에 둔다','더 많은 음식을 요구한다','외출한다'),(10,652237,'책을 집으로 가져간다','책을 읽는다','책을 도서관에 남긴다','책을 친구에게 준다'),(11,735212,'친구를 부른다','TV를 본다','장난감을 정리한다','밖에 나간다'),(12,514385,'숙제를 친구에게 보여준다','숙제를 책상 위에 둔다','숙제를 가방에 넣는다','숙제를 찢는다'),(13,898996,'앉아서 음악을 듣고 있다','춤을 추는 중이다','할머니를 좌석으로 안내해드리고 있다','버스 종류에 대해 소개해주고 있다'),(14,477519,'신호등이 빨간불이여서 사람들이 기다리는 중이다','곱슬 머리 남자아이는 신호등을 기다리고 있는 중이다','여자 아이가 가족들과 서있다','공원에서 사람들이 즐겁게 뛰어다닌다'),(15,187192,'몸을 풀기 위해 스트레칭을 한다','할머니께 인사하고 있다','춤을 추고 있다','돌에 걸려 넘어지려고 한다');
/*!40000 ALTER TABLE `situation_select` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wechsler`
--

DROP TABLE IF EXISTS `wechsler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wechsler` (
  `num` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `lang` int NOT NULL,
  `pr` int NOT NULL,
  `wm` int NOT NULL,
  `ps` int NOT NULL,
  `iq` int NOT NULL,
  PRIMARY KEY (`num`),
  KEY `userId_idx` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`id`) REFERENCES `parents` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wechsler`
--

LOCK TABLES `wechsler` WRITE;
/*!40000 ALTER TABLE `wechsler` DISABLE KEYS */;
/*!40000 ALTER TABLE `wechsler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-18  2:25:45
