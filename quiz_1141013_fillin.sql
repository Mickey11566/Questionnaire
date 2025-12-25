-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: quiz_1141013
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `fillin`
--

DROP TABLE IF EXISTS `fillin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fillin` (
  `quiz_id` int NOT NULL,
  `question_id` int NOT NULL,
  `email` varchar(60) NOT NULL,
  `answer` varchar(500) DEFAULT NULL,
  `fillin_date` date DEFAULT (curdate()),
  PRIMARY KEY (`quiz_id`,`question_id`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fillin`
--

LOCK TABLES `fillin` WRITE;
/*!40000 ALTER TABLE `fillin` DISABLE KEYS */;
INSERT INTO `fillin` VALUES (4,5,'test@gmail.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(4,6,'test@gmail.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(4,7,'test@gmail.com','[{\"code\":2,\"optionName\":\"問題解決效率\",\"check\":true}]','2025-12-24'),(4,8,'test@gmail.com','[{\"code\":1,\"optionName\":\"不錯\",\"check\":true}]','2025-12-24'),(7,21,'alice.w@company.com','[{\"code\":1,\"optionName\":\"非常滿意\",\"check\":true}]','2025-12-24'),(7,21,'bob.lee@company.com','[{\"code\":2,\"optionName\":\"滿意\",\"check\":true}]','2025-12-24'),(7,21,'charlie.chen@company.com','[{\"code\":4,\"optionName\":\"不滿意\",\"check\":true}]','2025-12-24'),(7,21,'david.h@company.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(7,21,'frank.y@company.com','[{\"code\":2,\"optionName\":\"滿意\",\"check\":true}]','2025-12-24'),(7,21,'grace.shih@company.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(7,21,'helen.k@company.com','[{\"code\":1,\"optionName\":\"非常滿意\",\"check\":true}]','2025-12-24'),(7,21,'ivan.m@company.com','[{\"code\":4,\"optionName\":\"不滿意\",\"check\":true}]','2025-12-24'),(7,21,'judy.t@company.com','[{\"code\":2,\"optionName\":\"滿意\",\"check\":true}]','2025-12-24'),(7,22,'alice.w@company.com','[{\"code\":2,\"optionName\":\"順暢\",\"check\":true}]','2025-12-24'),(7,22,'bob.lee@company.com','[{\"code\":2,\"optionName\":\"順暢\",\"check\":true}]','2025-12-24'),(7,22,'charlie.chen@company.com','[{\"code\":4,\"optionName\":\"不順暢\",\"check\":true}]','2025-12-24'),(7,22,'david.h@company.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(7,22,'frank.y@company.com','[{\"code\":3,\"optionName\":\"普通\",\"check\":true}]','2025-12-24'),(7,22,'grace.shih@company.com','[{\"code\":2,\"optionName\":\"順暢\",\"check\":true}]','2025-12-24'),(7,22,'helen.k@company.com','[{\"code\":1,\"optionName\":\"非常順暢\",\"check\":true}]','2025-12-24'),(7,22,'ivan.m@company.com','[{\"code\":4,\"optionName\":\"不順暢\",\"check\":true}]','2025-12-24'),(7,22,'judy.t@company.com','[{\"code\":2,\"optionName\":\"順暢\",\"check\":true}]','2025-12-24'),(7,23,'alice.w@company.com','[{\"code\":3,\"optionName\":\"員工培訓\",\"check\":true},{\"code\":5,\"optionName\":\"團隊合作\",\"check\":true}]','2025-12-24'),(7,23,'bob.lee@company.com','[{\"code\":1,\"optionName\":\"人力規劃\",\"check\":true}]','2025-12-24'),(7,23,'charlie.chen@company.com','[{\"code\":1,\"optionName\":\"人力規劃\",\"check\":true},{\"code\":2,\"optionName\":\"溝通透明度\",\"check\":true},{\"code\":4,\"optionName\":\"升遷制度\",\"check\":true}]','2025-12-24'),(7,23,'david.h@company.com','[{\"code\":4,\"optionName\":\"升遷制度\",\"check\":true}]','2025-12-24'),(7,23,'frank.y@company.com','[{\"code\":2,\"optionName\":\"溝通透明度\",\"check\":true}]','2025-12-24'),(7,23,'grace.shih@company.com','[{\"code\":1,\"optionName\":\"人力規劃\",\"check\":true},{\"code\":3,\"optionName\":\"員工培訓\",\"check\":true}]','2025-12-24'),(7,23,'helen.k@company.com','[{\"code\":5,\"optionName\":\"團隊合作\",\"check\":true}]','2025-12-24'),(7,23,'ivan.m@company.com','[{\"code\":1,\"optionName\":\"人力規劃\",\"check\":true},{\"code\":2,\"optionName\":\"溝通透明度\",\"check\":true},{\"code\":3,\"optionName\":\"員工培訓\",\"check\":true},{\"code\":4,\"optionName\":\"升遷制度\",\"check\":true},{\"code\":5,\"optionName\":\"團隊合作\",\"check\":true}]','2025-12-24'),(7,23,'judy.t@company.com','[{\"code\":2,\"optionName\":\"溝通透明度\",\"check\":true}]','2025-12-24'),(7,24,'alice.w@company.com','[{\"code\":0,\"optionName\":\"希望能增加更多內訓課程。\",\"check\":false}]','2025-12-24'),(7,24,'bob.lee@company.com','[]','2025-12-24'),(7,24,'charlie.chen@company.com','[{\"code\":0,\"optionName\":\"部門間溝通常常斷層，希望主管能正視問題。\",\"check\":false}]','2025-12-24'),(7,24,'david.h@company.com','[{\"code\":0,\"optionName\":\"加油。\",\"check\":false}]','2025-12-24'),(7,24,'frank.y@company.com','[]','2025-12-24'),(7,24,'grace.shih@company.com','[{\"code\":0,\"optionName\":\"專案進度趕的時候人力明顯不足。\",\"check\":false}]','2025-12-24'),(7,24,'helen.k@company.com','[{\"code\":0,\"optionName\":\"整體氛圍很棒！\",\"check\":false}]','2025-12-24'),(7,24,'ivan.m@company.com','[{\"code\":0,\"optionName\":\"感覺各方面都有很大的進步空間。\",\"check\":false}]','2025-12-24'),(7,24,'judy.t@company.com','[{\"code\":0,\"optionName\":\"希望零食櫃可以多補一點點心。\",\"check\":false}]','2025-12-24'),(12,1,'test@gmail.com','[{\"code\":2,\"optionName\":\"你的天\",\"check\":true}]','2025-12-25'),(12,2,'test@gmail.com','[{\"code\":1,\"optionName\":\"超想\",\"check\":true},{\"code\":2,\"optionName\":\"很想\",\"check\":true},{\"code\":3,\"optionName\":\"非常想\",\"check\":true}]','2025-12-25'),(12,3,'test@gmail.com','[{\"code\":1,\"optionName\":\"還好\",\"check\":true}]','2025-12-25');
/*!40000 ALTER TABLE `fillin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-25 23:08:15
