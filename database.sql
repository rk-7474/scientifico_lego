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
-- Table structure for table `membri`
--

DROP TABLE IF EXISTS `membri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membri` (
  `id_utente` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_stanza` int(10) unsigned zerofill NOT NULL,
  `role` enum('admin','pubblico','membro') DEFAULT NULL,
  PRIMARY KEY (`id_utente`,`id_stanza`),
  KEY `fk_stanza_me` (`id_stanza`),
  CONSTRAINT `fk_stanza_me` FOREIGN KEY (`id_stanza`) REFERENCES `stanze` (`id_stanza`),
  CONSTRAINT `fk_utente_me` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membri`
--

LOCK TABLES `membri` WRITE;
/*!40000 ALTER TABLE `membri` DISABLE KEYS */;
/*!40000 ALTER TABLE `membri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opere`
--

DROP TABLE IF EXISTS `opere`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opere` (
  `id_opera` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `path` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`id_opera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opere`
--

LOCK TABLES `opere` WRITE;
/*!40000 ALTER TABLE `opere` DISABLE KEYS */;
/*!40000 ALTER TABLE `opere` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opere_stanze`
--

DROP TABLE IF EXISTS `opere_stanze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opere_stanze` (
  `id_opera` int(10) unsigned zerofill NOT NULL,
  `id_stanza` int(10) unsigned zerofill NOT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `z` int DEFAULT NULL,
  `a` int DEFAULT NULL,
  `Dy` int DEFAULT NULL,
  `Dx` int DEFAULT NULL,
  PRIMARY KEY (`id_opera`,`id_stanza`),
  KEY `fk_stanze_op` (`id_stanza`),
  CONSTRAINT `fk_opera` FOREIGN KEY (`id_opera`) REFERENCES `opere` (`id_opera`),
  CONSTRAINT `fk_stanze_op` FOREIGN KEY (`id_stanza`) REFERENCES `stanze` (`id_stanza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opere_stanze`
--

LOCK TABLES `opere_stanze` WRITE;
/*!40000 ALTER TABLE `opere_stanze` DISABLE KEYS */;
/*!40000 ALTER TABLE `opere_stanze` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessioni`
--

DROP TABLE IF EXISTS `sessioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessioni` (
  `id` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessioni`
--

LOCK TABLES `sessioni` WRITE;
/*!40000 ALTER TABLE `sessioni` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stanze`
--

DROP TABLE IF EXISTS `stanze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stanze` (
  `id_stanza` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `stato` enum('pubblica','privata') NOT NULL,
  PRIMARY KEY (`id_stanza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stanze`
--

LOCK TABLES `stanze` WRITE;
/*!40000 ALTER TABLE `stanze` DISABLE KEYS */;
/*!40000 ALTER TABLE `stanze` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id_utente` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `password` text,
  `username` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti_stanze`
--

DROP TABLE IF EXISTS `utenti_stanze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti_stanze` (
  `id_utente` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_stanza` int(10) unsigned zerofill NOT NULL,
  `role` enum('admin','pubblico') DEFAULT NULL,
  PRIMARY KEY (`id_utente`,`id_stanza`),
  KEY `fk_stanza_ut` (`id_stanza`),
  CONSTRAINT `fk_stanza_ut` FOREIGN KEY (`id_stanza`) REFERENCES `stanze` (`id_stanza`),
  CONSTRAINT `fk_utente` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti_stanze`
--

LOCK TABLES `utenti_stanze` WRITE;
/*!40000 ALTER TABLE `utenti_stanze` DISABLE KEYS */;
/*!40000 ALTER TABLE `utenti_stanze` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-18 14:01:59
