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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `quiz_id` int NOT NULL,
  `question_id` int NOT NULL,
  `question` varchar(200) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `required` tinyint DEFAULT '0',
  `options` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`quiz_id`,`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (3,1,'您認為主管的溝通方式是否清楚明確？','single',1,'[{\"code\":1,\"optionName\":\"非常清楚\"},{\"code\":2,\"optionName\":\"清楚\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不清楚\"},{\"code\":5,\"optionName\":\"非常不清楚\"}]'),(3,2,'主管在激勵團隊方面的表現如何？','single',1,'[{\"code\":1,\"optionName\":\"非常好\"},{\"code\":2,\"optionName\":\"良好\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"稍弱\"},{\"code\":5,\"optionName\":\"很差\"}]'),(3,3,'您覺得主管在以下哪些方面表現較佳？ (可複選)','multiple',0,'[{\"code\":1,\"optionName\":\"目標設定\"},{\"code\":2,\"optionName\":\"團隊激勵\"},{\"code\":3,\"optionName\":\"提供資源\"},{\"code\":4,\"optionName\":\"協助決策\"},{\"code\":5,\"optionName\":\"衝突管理\"}]'),(3,4,'請分享您認為主管可以改進的地方。','short-answer',0,'[]'),(4,5,'您認為客服人員的態度是否友善？','single',1,'[{\"code\":1,\"optionName\":\"非常友善\"},{\"code\":2,\"optionName\":\"友善\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不太友善\"},{\"code\":5,\"optionName\":\"不友善\"}]'),(4,6,'在服務過程中，您是否感到流程順暢？','single',1,'[{\"code\":1,\"optionName\":\"非常順暢\"},{\"code\":2,\"optionName\":\"順暢\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不順暢\"}]'),(4,7,'您希望客服流程未來能加強哪些部分？ (可複選)','multiple',0,'[{\"code\":1,\"optionName\":\"回應速度\"},{\"code\":2,\"optionName\":\"問題解決效率\"},{\"code\":3,\"optionName\":\"服務態度\"},{\"code\":4,\"optionName\":\"知識專業度\"}]'),(4,8,'請描述一次讓您印象深刻的客服體驗。','short-answer',0,'[]'),(5,13,'您對此次活動的整體滿意度如何？','single',1,'[{\"code\":1,\"optionName\":\"非常滿意\"},{\"code\":2,\"optionName\":\"滿意\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不滿意\"}]'),(5,14,'您覺得活動流程安排是否順暢？','single',1,'[{\"code\":1,\"optionName\":\"非常順暢\"},{\"code\":2,\"optionName\":\"順暢\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不順暢\"}]'),(5,15,'本次活動中，您最喜歡哪些部分？ (可複選)','multiple',0,'[{\"code\":1,\"optionName\":\"場地\"},{\"code\":2,\"optionName\":\"講者/節目內容\"},{\"code\":3,\"optionName\":\"互動環節\"},{\"code\":4,\"optionName\":\"活動禮品\"},{\"code\":5,\"optionName\":\"餐飲\"}]'),(5,16,'請提供對活動的任何建議或回饋。','short-answer',0,'[]'),(6,17,'您對目前的休假制度感到滿意嗎？','single',1,'[{\"code\":1,\"optionName\":\"滿意\"},{\"code\":2,\"optionName\":\"尚可\"},{\"code\":3,\"optionName\":\"不滿意\"}]'),(6,18,'公司提供的保險福利是否符合您的需求？','single',1,'[{\"code\":1,\"optionName\":\"是\"},{\"code\":2,\"optionName\":\"否\"},{\"code\":3,\"optionName\":\"不確定\"}]'),(6,19,'您希望未來加強哪些福利項目？ (可複選)','multiple',0,'[{\"code\":1,\"optionName\":\"彈性工時\"},{\"code\":2,\"optionName\":\"員工旅遊\"},{\"code\":3,\"optionName\":\"進修補助\"},{\"code\":4,\"optionName\":\"健康檢查\"},{\"code\":5,\"optionName\":\"育兒補助\"}]'),(6,20,'請為現行福利制度提供具體建議。','short-answer',0,'[]'),(7,21,'您對公司的整體工作環境滿意嗎？','single',1,'[{\"code\":1,\"optionName\":\"非常滿意\"},{\"code\":2,\"optionName\":\"滿意\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不滿意\"}]'),(7,22,'您認為公司內部的溝通是否順暢？','single',1,'[{\"code\":1,\"optionName\":\"非常順暢\"},{\"code\":2,\"optionName\":\"順暢\"},{\"code\":3,\"optionName\":\"普通\"},{\"code\":4,\"optionName\":\"不順暢\"}]'),(7,23,'您覺得公司有哪些方面值得加強？','single',1,'[{\"code\":1,\"optionName\":\"人力規劃\"},{\"code\":2,\"optionName\":\"溝通透明度\"},{\"code\":3,\"optionName\":\"員工培訓\"},{\"code\":4,\"optionName\":\"升遷制度\"},{\"code\":5,\"optionName\":\"團隊合作\"}]'),(7,24,'請給予公司整體的任何建議或回饋。','short-answer',0,'[]'),(8,1,'新問題內容','single',1,'[{\"code\":1,\"optionName\":\"選項一\"},{\"code\":2,\"optionName\":\"選項二\"}]'),(8,2,'新問題內容','multiple',1,'[{\"code\":1,\"optionName\":\"選項一\"},{\"code\":2,\"optionName\":\"選項二\"}]'),(8,3,'新問題內容','short-answer',0,'[]');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `published` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (3,'主管領導風格評估','領導風格影響團隊氛圍與績效。你認為主管在激勵與指導上表現如何？','2025-12-17','2025-12-20',1),(4,'顧客服務品質調查','顧客滿意是品牌成功的關鍵。你認為我們的服務流程是否友善且高效？','2025-12-17','2025-12-25',0),(5,'年度活動回饋問卷','每一次活動的舉辦，都是團隊努力的成果。你的參與體驗如何？','2025-12-25','2025-12-30',1),(6,'福利制度滿意度調查','福利制度不僅反映企業文化，也影響員工忠誠度。你對現行制度的滿意度如何？','2025-12-22','2025-12-31',1),(7,'公司整體滿意度調查','公司整體的發展與員工感受息息相關。你的滿意度能幫助我們持續改善。','2025-12-31','2026-01-10',0),(8,'晚安','你好','2025-12-01','2025-12-16',0);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('tst@gmail.com','$2a$10$5mtbvszj2uZz5B1Rn21Ws.tpXrVpMFHJ.ahApF1/5fYqkIC6rNC.a','Test','0912345678');
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

-- Dump completed on 2025-12-18 17:15:24
