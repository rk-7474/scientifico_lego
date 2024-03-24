-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: space4art
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `editors`
--

CREATE DATABASE `space4art`;

USE `space4art`;

DROP TABLE IF EXISTS `editors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editors` (
  `user_id` int unsigned NOT NULL,
  `room_id` int unsigned NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`,`room_id`),
  KEY `fk_editor_room` (`room_id`),
  CONSTRAINT `fk_editor_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `fk_editor_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editors`
--

LOCK TABLES `editors` WRITE;
/*!40000 ALTER TABLE `editors` DISABLE KEYS */;
INSERT INTO `editors` VALUES (1,12,'test'),(3,12,'test1234'),(5,12,'ciao1234');
/*!40000 ALTER TABLE `editors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(2048) COLLATE utf8mb4_general_ci NOT NULL,
  `uuid` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(10000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` enum('public','reserved','private') COLLATE utf8mb4_general_ci DEFAULT 'private',
  `user_id` int unsigned DEFAULT NULL,
  `tags` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT '',
  `owner` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_room_user_owner` (`user_id`),
  CONSTRAINT `fk_room_user_owner` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (0000000005,'ciao','ciao','1461f7a5-c7d7-4897-88ab-400e4ecc32aa','ciao','private',1,'',''),(0000000006,'Ciao','ciao','b42b9afb-fb9a-4ceb-acad-d664a97bdb7b','ciao','public',1,'',''),(0000000007,'stanza','ciao','814fe569-1bce-4c38-9396-f3136b4c5323','ciao','public',3,'',''),(0000000008,'max','https://www.addlance.com/blog/wp-content/uploads/2019/04/immagini-da-scaricare.jpg','d5aceba9-9f2c-4223-9e99-df7ccc6091a6','ciao','public',4,'',''),(0000000009,'stanza','ciao','6f89cddb-b527-404f-8067-cf270d26873e','ciao','public',2,'',''),(0000000010,'cIAO','ciao','d6e33401-5205-4409-91e5-d037863dd311','ciao','public',1,'',''),(0000000011,'Scabello','ciao','04d897d5-6865-4f50-8584-f394956630ac','ciao','public',2,'',''),(0000000012,'lazza','ciao','ea40fd28-9779-49fb-b060-015dbab0fb53','ciao','public',4,'',''),(0000000013,'ciao','ciao','96d66dc7-ff1a-48dd-bc0e-9c9213a9e697','caio','public',2,'','');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenes`
--

DROP TABLE IF EXISTS `scenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int unsigned NOT NULL,
  `path` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  `scale` float DEFAULT NULL,
  `rotation_x` float NOT NULL,
  `rotation_y` float NOT NULL,
  `rotation_z` float NOT NULL,
  `tags` varchar(10000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desc` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_scene_room` (`room_id`),
  CONSTRAINT `fk_scene_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenes`
--

LOCK TABLES `scenes` WRITE;
/*!40000 ALTER TABLE `scenes` DISABLE KEYS */;
INSERT INTO `scenes` VALUES (14,13,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsfondo.info%2Fi%2Foriginal%2F5%2F0%2Fe%2F12051.jpg&f=1&nofb=1&ipt=b690017e4bc2b8d5c48ad32ad0635894d1eda00e4dcf7d49645591b9620024eb&ipo=images',2.91098,1.52204,-1.15806,1,0,1.5708,0,'ciao','ciao','ciao');
/*!40000 ALTER TABLE `scenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_session_user` (`user_id`),
  CONSTRAINT `fk_session_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2d3u1e3unfxtzkveve6xludfd3ic0u4q217wcy9k','2024-03-27 09:24:50',1),('8au8fygfklqtsub55gtbgg9gwue5ky07pixzhdd1','2024-04-06 15:53:20',2),('ff8qyrjkej2eohtgk93rjzo82mqyqpr09o1jxpe9','2024-03-24 16:02:55',1),('j9trzdtwp1ghz3t3t1cputpykf6n8klzdugmm3re','2024-03-28 09:01:57',3),('l78572jdg0t09yj0wdjpsjzdfvjtlr6ies0sz2dh','2024-03-30 16:47:18',1),('lbryakvedrwj4xymgwgislx1xvgtxb6tlntdbxp0','2024-03-23 15:19:19',2),('lm15t62e2nzvhmuwcyevsr59xr4qih4rnm5pxujd','2024-04-12 17:46:35',4),('o1ikd482uk068r4ryegduhpwq3pqcoxvtymyaavs','2024-03-28 16:52:51',2),('soqz3jfauhy5ux12nmufbi1dl91elur2q96v9kln','2024-03-28 14:50:58',2),('szu7uyx027u2yil0nqbkpwi9o2uhg961lyq42vek','2024-03-23 09:51:52',1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0000000001,'test','$argon2id$v=19$m=19456,t=2,p=1$7VBJHVRlDknmJIHnKcWDXA$0W1ugKE8kLKM8sNZ1/gHCfega4Ke9ryTh0I2FC5WPoc'),(0000000002,'test123','$argon2id$v=19$m=19456,t=2,p=1$+W8ye705lXRDTrlHJjrCwA$rN6tNflRw0mh9CdhY+8IDPxvrJpXdAEASt8IEzU0jdo'),(0000000003,'test1234','$argon2id$v=19$m=19456,t=2,p=1$J8oobuIxOzSWCl3u9gPA9Q$jC2XWXrGUanteTdnxrYOtdynGLc+3r79bC4tyPktS2I'),(0000000004,'ciao123','$argon2id$v=19$m=19456,t=2,p=1$C8BMw7n8ZBKg/q2YvEDF7A$GTrbBI8KVIiE0WHGyz8CcUWXMS6R7dslsEHShLWgcEM'),(0000000005,'ciao1234','$argon2id$v=19$m=19456,t=2,p=1$yA4CNpiddV5jXPvlXTWLXQ$yIxeMN5y2UAOEW0OrT3OjjOHWldpRHEG2x6GkYTCx8A');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-24 17:13:48
