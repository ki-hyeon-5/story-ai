-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: story
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `story`
--

DROP TABLE IF EXISTS `story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story` (
  `story_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `is_public` tinyint(1) DEFAULT '1',
  `create_time` datetime DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`story_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
INSERT INTO `story` VALUES (1,1,1,'2025-06-15 00:06:07','ㅇㅁㄴㅇㅁㄴㅇㅁㄴ'),(2,1,1,'2025-06-15 00:26:16','동화책 테스트 하게 코끼리'),(3,2,1,'2025-06-15 00:28:50','테스트');
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_slice`
--

DROP TABLE IF EXISTS `story_slice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story_slice` (
  `story_slice_id` bigint NOT NULL AUTO_INCREMENT,
  `story_id` bigint NOT NULL,
  `slice_order` int NOT NULL,
  `prompt` text,
  `slice_content` text,
  `image_url` text,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`story_slice_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `story_slice_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_slice`
--

LOCK TABLES `story_slice` WRITE;
/*!40000 ALTER TABLE `story_slice` DISABLE KEYS */;
INSERT INTO `story_slice` VALUES (1,1,1,'ㅇㅁㄴㅇㅁㄴㅇㅁㄴ',NULL,NULL,'2025-06-15 00:06:07'),(2,2,1,'동화책 테스트 하게 코끼리',NULL,NULL,'2025-06-15 00:26:16'),(3,3,1,'테스트',NULL,NULL,'2025-06-15 00:28:50'),(4,3,2,'추가 프롬프트 입력',NULL,NULL,'2025-06-15 01:00:49');
/*!40000 ALTER TABLE `story_slice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_book_user`
--

DROP TABLE IF EXISTS `use_book_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_book_user` (
  `use_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `story_id` bigint NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`use_id`),
  KEY `user_id` (`user_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `use_book_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `use_book_user_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `story` (`story_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_book_user`
--

LOCK TABLES `use_book_user` WRITE;
/*!40000 ALTER TABLE `use_book_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `use_book_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'곽기현','abcabc@gmail.com','test','010-1234-1234','2025-06-14 15:09:12');
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

-- Dump completed on 2025-06-15  1:32:45
