-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: doenet_local
-- ------------------------------------------------------
-- Server version	5.7.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `doenet_local`
--

/*!40000 DROP DATABASE IF EXISTS `doenet_local`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `doenet_local` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `doenet_local`;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assignment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `assignmentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseHeadingId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Untitled Assignment',
  `sourceBranchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'matches code table contentId',
  `contentId` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `private` int(1) DEFAULT '0',
  `creationDate` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means open until the dueDate. If dueDate is also NULL then open all the time.',
  `assignedDate` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means open until the dueDate. If dueDate is also NULL then open all the time.',
  `dueDate` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means never closes',
  `timeLimit` time DEFAULT NULL COMMENT 'NULL means it''s not timed',
  `numberOfAttemptsAllowed` int(11) DEFAULT NULL COMMENT 'NULL means infinite, Assignment Level Number Of Attempts',
  `sortOrder` int(11) DEFAULT NULL,
  `attemptAggregation` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `totalPointsOrPercent` float DEFAULT NULL COMMENT 'Assignment level',
  `gradeCategory` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `individualize` tinyint(1) NOT NULL DEFAULT '0',
  `multipleAttempts` tinyint(1) NOT NULL DEFAULT '0',
  `showSolution` tinyint(1) NOT NULL DEFAULT '1',
  `showFeedback` tinyint(1) NOT NULL DEFAULT '1',
  `showHints` tinyint(1) NOT NULL DEFAULT '1',
  `showCorrectness` tinyint(1) NOT NULL DEFAULT '1',
  `proctorMakesAvailable` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Released by proctor or instructor',
  `examCoverHTML` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `assignmentId` (`assignmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'kXhVAtL0zDjJI7p3ZpUOq',NULL,NULL,'kXh Assignment',NULL,'contenta',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'l',100,'experiment',0,0,0,0,0,0,0,NULL),(2,'LF3_ONicEdcWgbuSqgxTa',NULL,NULL,'LF3 Assignment',NULL,'contentb',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'l',100,'experiment',0,0,0,0,0,0,0,NULL);
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_obj`
--

DROP TABLE IF EXISTS `assignment_obj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assignment_obj` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` char(11) DEFAULT NULL,
  `pId` char(11) DEFAULT NULL,
  `HeadingOrAssignmentId` char(21) DEFAULT NULL,
  `name` char(21) DEFAULT NULL,
  `attribute` char(11) DEFAULT NULL,
  `children` char(21) DEFAULT NULL,
  `sortOrder` int(11) DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_obj`
--

LOCK TABLES `assignment_obj` WRITE;
/*!40000 ALTER TABLE `assignment_obj` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment_obj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branchId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doenetML` longtext COLLATE utf8_unicode_ci,
  `contentId` char(64) COLLATE utf8_unicode_ci DEFAULT '0',
  `timestamp` datetime DEFAULT NULL,
  `draft` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'When this is true (1) is the running draft version between published versions',
  `removedFlag` tinyint(1) NOT NULL DEFAULT '0',
  `public` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `contentId` (`contentId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (3,'brancha','title','<p>Dog <answer type=\"text\">Dog</answer></p>\n<p>Cat <answer type=\"text\">Cat</answer></p>','contenta','2020-10-19 19:00:01',0,0,1),(4,'branchb','title','<p>This is B</p>','contentb','2020-10-19 19:00:01',0,0,1);
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_branch`
--

DROP TABLE IF EXISTS `content_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content_branch` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doenetML` longtext COLLATE utf8_unicode_ci,
  `updateDate` timestamp NULL DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `public` int(1) DEFAULT '0',
  `latestContentId` char(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `removedFlag` int(1) NOT NULL DEFAULT '0',
  `isPinned` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `contentId` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_branch`
--

LOCK TABLES `content_branch` WRITE;
/*!40000 ALTER TABLE `content_branch` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_interactions`
--

DROP TABLE IF EXISTS `content_interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content_interactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci NOT NULL,
  `deviceName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `assignmentId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `contentId` char(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `stateVariables` mediumtext COLLATE utf8_unicode_ci,
  `variant` text COLLATE utf8_unicode_ci NOT NULL,
  `attemptNumber` int(11) DEFAULT NULL,
  `interactionSource` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_interactions`
--

LOCK TABLES `content_interactions` WRITE;
/*!40000 ALTER TABLE `content_interactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `term` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `longName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gradeCategoriesInPercent` bit(1) NOT NULL DEFAULT b'0',
  `browserExamKeys` text COLLATE utf8_unicode_ci,
  `overviewEnabled` int(1) DEFAULT NULL,
  `syllabusEnabled` int(1) DEFAULT NULL,
  `gradeEnabled` int(1) DEFAULT NULL,
  `assignmentEnabled` int(1) DEFAULT NULL,
  `overview_branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `syllabus_branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `section` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `authPasscode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` char(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseId` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (6,'experiement1','Fall 2020','Experiment 1','exp1','Experiment 1',_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test1','857620'),(7,'experiement2','Fall 2020','Experiment 2','exp2','Experiment 2',_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test1','857620');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_content`
--

DROP TABLE IF EXISTS `course_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `itemId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `itemType` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `private` int(1) DEFAULT '0',
  `removedFlag` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_content`
--

LOCK TABLES `course_content` WRITE;
/*!40000 ALTER TABLE `course_content` DISABLE KEYS */;
INSERT INTO `course_content` VALUES (5,'aI8sK4vmEhC5sdeSP3vNW','gPn_nJmbSEDpjEZdJS7bZ','folder','2020-01-29 13:58:18',0,0),(6,'aI8sK4vmEhC5sdeSP3vNW','DJ_Drx_aRY-EHOhv-5fU1','folder','2020-01-29 13:58:22',0,0),(7,'aI8sK4vmEhC5sdeSP3vNW','Efg9g5jLABCKexVFxK0np','content','2020-01-29 13:58:58',0,0),(8,'NfzKqYtTgYRyPnmaxc7XB','r5zYs7dMiDYYaiq8nYKPF','content','2020-06-03 20:55:59',0,1),(9,'NfzKqYtTgYRyPnmaxc7XB','MVHoKTLwjEvuZPNm3x90S','content','2020-06-01 16:56:49',0,0);
/*!40000 ALTER TABLE `course_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_enrollment`
--

DROP TABLE IF EXISTS `course_enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_enrollment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(127) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(127) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `empId` int(7) DEFAULT NULL,
  `dateEnrolled` datetime DEFAULT NULL COMMENT 'UTC DateTime',
  `section` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `withdrew` bit(1) DEFAULT b'0',
  `dateWithdrew` datetime DEFAULT NULL COMMENT 'UTC DateTime',
  `forTesting` bit(1) DEFAULT b'0' COMMENT 'Flags account to not to be included in course calculations',
  `courseCredit` float DEFAULT NULL,
  `courseGrade` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `overrideCourseGrade` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_courseId` (`username`,`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enrollment`
--

LOCK TABLES `course_enrollment` WRITE;
/*!40000 ALTER TABLE `course_enrollment` DISABLE KEYS */;
INSERT INTO `course_enrollment` VALUES (128,'experiment1','4VYp5dOrVWGz0OKB2hkLW',NULL,NULL,NULL,NULL,NULL,'2020-08-04 00:02:56',NULL,_binary '\0',NULL,_binary '\0',NULL,NULL,NULL);
/*!40000 ALTER TABLE `course_enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_grade_category`
--

DROP TABLE IF EXISTS `course_grade_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_grade_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `gradeCategory` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `totalPointsOrPercent` float NOT NULL DEFAULT '0',
  `numberToDrop` int(11) NOT NULL DEFAULT '0',
  `assignmentsInPercent` bit(11) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_grade_category`
--

LOCK TABLES `course_grade_category` WRITE;
/*!40000 ALTER TABLE `course_grade_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_grade_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_heading`
--

DROP TABLE IF EXISTS `course_heading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_heading` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `courseHeadingId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `childrenId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `headingLevel` tinyint(11) DEFAULT NULL,
  `sortOrder` int(11) DEFAULT NULL,
  `tempSortOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9255 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_heading`
--

LOCK TABLES `course_heading` WRITE;
/*!40000 ALTER TABLE `course_heading` DISABLE KEYS */;
INSERT INTO `course_heading` VALUES (9238,'root','','','qAgAnGbEblNmlebe3sJOh','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9239,'root','','','3oSXu2L31eZBlZKKc4F7X','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9240,'root','','','kwpKwEwW144tqROdo9dl5','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9241,'3oSXu2L31eZBlZKKc4F7X','root','header3','Sj7wQR-L2xFIxmS6QFMKn','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9242,'3oSXu2L31eZBlZKKc4F7X','root','header3','W0wTw4cG2klV1nS51BPSm','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9243,'3oSXu2L31eZBlZKKc4F7X','root','header3','iaROshxrgaz63vZ5xFdxE','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9244,'qAgAnGbEblNmlebe3sJOh','root','header4','mBUlzP63SK38l7XrWpyC','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9245,'5RdWCHX3Z-zHGi3-rupzq','Sj7wQR-L2xFIxmS6QFMKn','header5','fm3-3BxtVsMA0vqCyAOMA','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9246,'W0wTw4cG2klV1nS51BPSm','3oSXu2L31eZBlZKKc4F7X','header6','','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9247,'kwpKwEwW144tqROdo9dl5','root','header1','yfP_Pslr-WC1D8g2rEqhF','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9248,'kwpKwEwW144tqROdo9dl5','root','header1','4P7WK6V4HvxS9fIT8IY4i','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9249,'Sj7wQR-L2xFIxmS6QFMKn','3oSXu2L31eZBlZKKc4F7X','header2','5RdWCHX3Z-zHGi3-rupzq','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9250,'Sj7wQR-L2xFIxmS6QFMKn','3oSXu2L31eZBlZKKc4F7X','header2','VffOCH1I0h_ymB9KQHR24','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9251,'Sj7wQR-L2xFIxmS6QFMKn','3oSXu2L31eZBlZKKc4F7X','header2','zxVi-pXiUtf3PodIXm45n','aI8sK4vmEhC5sdeSP3vNW',NULL,NULL,NULL),(9252,'3JDHbhgJ9lq7GLQSG6_fQ','root','cal2-header01','J5EeoMBiv5f4z4zEUJU-Z','uTMfKhSmcNtLDaK8oJ3U',NULL,NULL,NULL),(9253,'root','','','3JDHbhgJ9lq7GLQSG6_fQ','uTMfKhSmcNtLDaK8oJ3U',NULL,NULL,NULL),(9254,'3JDHbhgJ9lq7GLQSG6_fQ','root','cal2-header01','ML3g50DgilyeODVZN4X8d','uTMfKhSmcNtLDaK8oJ3U',NULL,NULL,NULL);
/*!40000 ALTER TABLE `course_heading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_instructor`
--

DROP TABLE IF EXISTS `course_instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_instructor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Used as a label in the interface not for permissions',
  `modifyGrades` bit(1) DEFAULT b'0',
  `modifyAssignments` bit(1) DEFAULT b'0',
  `allSections` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_courseId` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_instructor`
--

LOCK TABLES `course_instructor` WRITE;
/*!40000 ALTER TABLE `course_instructor` DISABLE KEYS */;
INSERT INTO `course_instructor` VALUES (1,'4VYp5dOrVWGz0OKB2hkLW','aI8sK4vmEhC5sdeSP3vNW',NULL,_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `course_instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_section_instructor`
--

DROP TABLE IF EXISTS `course_section_instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_section_instructor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `section` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_section_courseid` (`username`,`section`,`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_section_instructor`
--

LOCK TABLES `course_section_instructor` WRITE;
/*!40000 ALTER TABLE `course_section_instructor` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_section_instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci NOT NULL,
  `verb` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contentId` char(64) COLLATE utf8_unicode_ci NOT NULL,
  `assignmentId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `attemptNumber` int(11) DEFAULT NULL,
  `variant` text COLLATE utf8_unicode_ci NOT NULL,
  `object` mediumtext COLLATE utf8_unicode_ci,
  `context` mediumtext COLLATE utf8_unicode_ci,
  `result` mediumtext COLLATE utf8_unicode_ci,
  `timestamp` timestamp NULL DEFAULT NULL,
  `timestored` timestamp NULL DEFAULT NULL,
  `version` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deviceName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiment`
--

DROP TABLE IF EXISTS `experiment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experiment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `experimentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `waitingContentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means open until the dueDate. If dueDate is also NULL then open all the time.',
  `assignedDate` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means open until the dueDate. If dueDate is also NULL then open all the time.',
  `hasBegun` int(1) DEFAULT '0',
  `numberOfGroups` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiment`
--

LOCK TABLES `experiment` WRITE;
/*!40000 ALTER TABLE `experiment` DISABLE KEYS */;
INSERT INTO `experiment` VALUES (1,'experimentId1',NULL,'2020-09-30 22:17:54','2020-09-30 22:17:54',1,1),(2,'experimentId2',NULL,'2020-09-30 22:17:54','2020-09-30 22:17:54',1,1);
/*!40000 ALTER TABLE `experiment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folder`
--

DROP TABLE IF EXISTS `folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folder` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `folderId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `public` int(1) DEFAULT '0',
  `removedFlag` int(1) NOT NULL DEFAULT '0',
  `isRepo` int(1) DEFAULT NULL,
  `isPinned` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `folderId` (`folderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folder`
--

LOCK TABLES `folder` WRITE;
/*!40000 ALTER TABLE `folder` DISABLE KEYS */;
/*!40000 ALTER TABLE `folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folder_content`
--

DROP TABLE IF EXISTS `folder_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folder_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rootId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `folderId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `childType` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `childId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `private` int(1) DEFAULT '0',
  `removedFlag` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `childId` (`childId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folder_content`
--

LOCK TABLES `folder_content` WRITE;
/*!40000 ALTER TABLE `folder_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `folder_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `header_name`
--

DROP TABLE IF EXISTS `header_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `header_name` (
  `id` char(21) DEFAULT NULL,
  `name` char(21) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `header_name`
--

LOCK TABLES `header_name` WRITE;
/*!40000 ALTER TABLE `header_name` DISABLE KEYS */;
INSERT INTO `header_name` VALUES ('kwpKwEwW144tqROdo9dl5','header1'),('DB-pHP_VwdVnC93D5qMT4','header2'),('RS6_ZTKIZLhPpIF2f1-Mp','header3');
/*!40000 ALTER TABLE `header_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` VALUES (1,'one','UrsKPscKdJNIuN58JIDHt'),(2,'two','UrsKPscKdJNIuN58JIDHt'),(12,'one','OizJ2AFpvXn1kLDVe20YB'),(13,'two','OizJ2AFpvXn1kLDVe20YB'),(14,'three','OizJ2AFpvXn1kLDVe20YB'),(15,'one','emKNt7GX_QAbXlulSYLv_'),(16,'fgh','UrsKPscKdJNIuN58JIDHt'),(17,'46767','UrsKPscKdJNIuN58JIDHt'),(18,'780789','UrsKPscKdJNIuN58JIDHt'),(19,'fghfg','UrsKPscKdJNIuN58JIDHt');
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publish_category`
--

DROP TABLE IF EXISTS `publish_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publish_category` (
  `overview` int(1) unsigned NOT NULL DEFAULT '1',
  `grade` int(1) unsigned NOT NULL DEFAULT '1',
  `syllabus` int(1) unsigned DEFAULT '1',
  `assignment` int(1) unsigned DEFAULT '1',
  PRIMARY KEY (`overview`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publish_category`
--

LOCK TABLES `publish_category` WRITE;
/*!40000 ALTER TABLE `publish_category` DISABLE KEYS */;
INSERT INTO `publish_category` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `publish_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repo_access`
--

DROP TABLE IF EXISTS `repo_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repo_access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `repoId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teamId` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `removedFlag` int(1) NOT NULL DEFAULT '0',
  `owner` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repo_access`
--

LOCK TABLES `repo_access` WRITE;
/*!40000 ALTER TABLE `repo_access` DISABLE KEYS */;
INSERT INTO `repo_access` VALUES (1,'DJ_Drx_aRY-EHOhv-5fU1','4VYp5dOrVWGz0OKB2hkLW','1','devuser@example.com','2020-01-29 13:57:48',0,1),(2,'IYBInj5bFTUDxBCEdLKED','4VYp5dOrVWGz0OKB2hkLW','1','devuser@example.com','2020-05-28 17:05:02',0,1),(3,'WjFvT03knOGtbmbic7YNH','4VYp5dOrVWGz0OKB2hkLW','1','devuser@example.com','2020-07-20 01:02:42',0,1),(4,'WjFvT03knOGtbmbic7YNH','lqU5UNaNdsAE0thLXHNZd','1','char0042@umn.edu','2020-07-20 02:19:41',0,0);
/*!40000 ALTER TABLE `repo_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url`
--

DROP TABLE IF EXISTS `url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `urlId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `removedFlag` tinyint(1) NOT NULL DEFAULT '0',
  `usesDoenetAPI` tinyint(1) NOT NULL DEFAULT '1',
  `isPinned` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url`
--

LOCK TABLES `url` WRITE;
/*!40000 ALTER TABLE `url` DISABLE KEYS */;
INSERT INTO `url` VALUES (2,'s3ehEtP5IS3pH8n5O62Q4','Test','www.google.com','ff','2020-01-28 09:22:47',0,0,0,0),(3,'fgoKv18CPPOMhqQlxmuJ1','Doenet','www.google.com1','fsa','2020-01-28 09:23:09',0,0,1,0),(4,'5R10hQo1SyIwrcEa_A_2n','Test','www.google.com','fff','2020-01-28 09:32:06',0,0,0,0),(5,'LTarPpyVJwhfgWfWyDz_A','Test','www.google.com','ffsa','2020-01-28 09:32:35',0,0,0,0),(6,'BsJi_9ZdADaeSJsYPjWUw','Test','www.google.com','das','2020-01-28 09:33:04',0,0,0,0),(7,'3EwbIcH64vHK7TKDAQVpP','Test','https://soundcloud.com/o-nei-ric-tapes/sets/3am-ep-anxious','f','2020-01-28 09:34:29',0,0,0,0),(8,'GS_AkqadR6wlDmBcu1jvN','f','www.google.com1','afs','2020-01-28 09:34:47',0,0,0,0),(9,'gJF8REDcHMxgaVLXTBxIi','Test','fsa','fas','2020-01-28 09:35:47',0,0,0,0),(10,'nllv3bBVgbD2MZdTHI31Z','dsa','fsa','fsa','2020-01-28 09:36:29',0,0,0,0),(11,'jOyA1q4mai479w6MjaIhq','Test','www.google.com','f','2020-01-28 09:37:41',0,0,0,0),(12,'QbwblybNRZgY0o5dMyvVJ','Doenet','www.google.com','ffff','2020-01-28 09:51:18',0,0,0,0),(13,'pZiUefGRj5QHxzeK_P4MV','Doenet','www.google.com','ff','2020-01-28 09:52:10',0,0,0,0),(14,'Q7VeR1fp36v0Rnc8bfUcN','Doenet','fff','fff','2020-01-28 09:53:14',0,0,0,0),(15,'FDwQILDPGV8EmfNO3sPcc','Test','fff','fff','2020-01-28 09:55:41',0,0,0,0),(16,'wlVn3gZpaWCenqKY7cqJ9','Doenet','www.google.com','fsa','2020-01-28 09:55:59',0,0,0,0),(17,'FTZVGn0vENQ8ZrFSaPiUM','Doenet2','www.google.com','dsa','2020-01-28 09:56:15',0,0,0,0),(18,'MSCJKLOaCaaqzjM7U37J0','Doenet3','www.google.com','321','2020-01-28 09:58:49',0,0,0,0),(19,'0cuiOsNqzxr4yFoSvoOq9','Test','fsa','fasfsa','2020-01-28 10:00:29',1,0,0,0),(20,'x46VZmWfvmYnnIj5V0J7b','fsa','fas','fas','2020-01-28 10:00:36',0,0,0,0),(21,'EA-P1_FnRmFpyz8UJTpUB','Doenet2','www.google.com','fs','2020-01-28 10:01:00',1,0,0,0),(22,'Z1kDWLcmJ7nqfAhbHPxNM','dasfas','fsafas','fas','2020-01-28 10:01:07',0,0,0,0);
/*!40000 ALTER TABLE `url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'username will be deleted. Use screenName or userId',
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `screenName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'full email address',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'full email address',
  `studentId` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profilePicture` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trackingConsent` tinyint(1) DEFAULT '0',
  `roleStudent` tinyint(1) DEFAULT '1',
  `roleInstructor` tinyint(1) DEFAULT '0',
  `roleCourseDesigner` tinyint(1) DEFAULT '0',
  `roleWatchdog` tinyint(1) DEFAULT '0',
  `roleCommunityTA` tinyint(1) DEFAULT '0',
  `roleLiveDataCommunity` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','devuserid','DEV','devuser@example.com',NULL,'User','Dev','quokka',1,1,1,0,0,0,0),(2,'1','s1userid','S1','s1@example.com',NULL,'User','Student1','quokka',1,1,0,0,0,0,0),(26,'2','s2userid','S2','s2@example.com',NULL,'User','Student2','quokka',1,1,0,0,0,0,0),(27,'3','i1userid','I1','i1@example.com',NULL,'User','Instructor1','quokka',1,1,1,0,0,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_assignment`
--

DROP TABLE IF EXISTS `user_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_assignment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `assignmentId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NULL means no group',
  `username` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dueDateOverride` datetime DEFAULT NULL COMMENT 'UTC DATETIME NULL means no override',
  `timeLimitOverride` time DEFAULT NULL COMMENT 'NULL means no override',
  `numberOfAttemptsAllowedOverride` int(11) DEFAULT NULL,
  `groupId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NULL means no group',
  `groupName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NULL means no group',
  `completed` bit(1) DEFAULT NULL COMMENT 'For ToDo list',
  `completedDate` datetime DEFAULT NULL,
  `credit` float NOT NULL DEFAULT '0' COMMENT 'Overwritten by metric used to calculate it from other tables. Always 0-1 scale.',
  `creditOverride` float DEFAULT NULL COMMENT 'if not NULL then credit field will be set to this',
  PRIMARY KEY (`id`),
  UNIQUE KEY `assignment-userId` (`assignmentId`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_assignment`
--

LOCK TABLES `user_assignment` WRITE;
/*!40000 ALTER TABLE `user_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_assignment_attempt`
--

DROP TABLE IF EXISTS `user_assignment_attempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_assignment_attempt` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `userId` char(21) COLLATE utf8_unicode_ci NOT NULL,
  `assignmentId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `attemptNumber` int(11) NOT NULL DEFAULT '1',
  `credit` float DEFAULT NULL,
  `creditOverride` float DEFAULT NULL,
  `assignedVariant` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Like seed. Informs the selects what values to use for the content. NULL means didn''t view yet.',
  `generatedVariant` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Based on code',
  `contentId` char(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `began` datetime DEFAULT NULL,
  `finished` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid-assignmentid-attemptnum` (`userId`,`assignmentId`,`attemptNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_assignment_attempt`
--

LOCK TABLES `user_assignment_attempt` WRITE;
/*!40000 ALTER TABLE `user_assignment_attempt` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_assignment_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_assignment_attempt_item`
--

DROP TABLE IF EXISTS `user_assignment_attempt_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_assignment_attempt_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `assignmentId` char(21) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `attemptNumber` int(11) NOT NULL,
  `itemNumber` int(11) NOT NULL COMMENT 'The number of the scored item found in the Doenet code.',
  `credit` float DEFAULT NULL COMMENT 'maximum credit',
  `creditOverride` float DEFAULT NULL,
  `weight` float NOT NULL DEFAULT '1' COMMENT 'Weight comes from Doenet code.',
  `generatedVariant` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `viewedSolution` tinyint(1) DEFAULT '0',
  `viewedSolutionDate` datetime DEFAULT NULL COMMENT 'Datetime when they first viewed the solution',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`,`assignmentId`,`attemptNumber`,`itemNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_assignment_attempt_item`
--

LOCK TABLES `user_assignment_attempt_item` WRITE;
/*!40000 ALTER TABLE `user_assignment_attempt_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_assignment_attempt_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_assignment_attempt_item_submission`
--

DROP TABLE IF EXISTS `user_assignment_attempt_item_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_assignment_attempt_item_submission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `assignmentId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `attemptNumber` int(11) DEFAULT NULL,
  `itemNumber` int(11) DEFAULT NULL,
  `submissionNumber` int(11) DEFAULT NULL,
  `itemState` longtext COLLATE utf8_unicode_ci COMMENT 'JSON used to persist state of user''s experience',
  `credit` float DEFAULT NULL,
  `submittedDate` datetime NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Past the due date. When the assesment wasn''t open.',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique rows` (`username`,`assignmentId`,`attemptNumber`,`itemNumber`,`submissionNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_assignment_attempt_item_submission`
--

LOCK TABLES `user_assignment_attempt_item_submission` WRITE;
/*!40000 ALTER TABLE `user_assignment_attempt_item_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_assignment_attempt_item_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_content`
--

DROP TABLE IF EXISTS `user_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `branchId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestampOfSignInCode` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_content`
--

LOCK TABLES `user_content` WRITE;
/*!40000 ALTER TABLE `user_content` DISABLE KEYS */;
INSERT INTO `user_content` VALUES (6,'4VYp5dOrVWGz0OKB2hkLW','devuser','Efg9g5jLABCKexVFxK0np',NULL),(7,'4VYp5dOrVWGz0OKB2hkLW','devuser','HCK8dpDSJIYTNjw1So5MH',NULL),(8,'4VYp5dOrVWGz0OKB2hkLW','devuser','MPQ2c4t-jALzQYeGRk8vw',NULL),(9,'4VYp5dOrVWGz0OKB2hkLW','devuser','r5zYs7dMiDYYaiq8nYKPF',NULL),(10,'4VYp5dOrVWGz0OKB2hkLW','devuser','MVHoKTLwjEvuZPNm3x90S',NULL),(11,'4VYp5dOrVWGz0OKB2hkLW','devuser','GTRwbadxhxI7OWJejs1mA',NULL),(12,'4VYp5dOrVWGz0OKB2hkLW','devuser','8gsu2TT2X7otX5XjtVD9R',NULL),(13,'4VYp5dOrVWGz0OKB2hkLW','devuser','JoVoeD9M9--hORrWX0TGz',NULL),(14,'4VYp5dOrVWGz0OKB2hkLW','devuser','jIV5Ijk85TvpirThq1tlv',NULL),(15,'4VYp5dOrVWGz0OKB2hkLW','devuser','QqQ_rVz7xBog1jm1pY-pc',NULL),(16,'4VYp5dOrVWGz0OKB2hkLW','devuser','yTfzco0fbTHL_JDCq8Tgz',NULL),(17,'4VYp5dOrVWGz0OKB2hkLW','devuser','U3_GUY9poJdTs-nABsmJB',NULL),(18,'4VYp5dOrVWGz0OKB2hkLW','devuser','0xx9sQ44yb8ia7yNTHiE3',NULL),(19,'4VYp5dOrVWGz0OKB2hkLW','devuser','1q6e28Dg7HLaPaVzM0YSu',NULL),(20,'4VYp5dOrVWGz0OKB2hkLW','devuser','o2_lyeApeJXh7pKw1yvIm',NULL),(21,'4VYp5dOrVWGz0OKB2hkLW','devuser','htjJcGAQefth_uAPLcUdh',NULL),(22,'4VYp5dOrVWGz0OKB2hkLW','devuser','H_K4CgBesKl_q6QZ5GOb5',NULL),(23,'4VYp5dOrVWGz0OKB2hkLW','devuser','09kEYJQBB8v_AG5UEjtkG',NULL),(24,'4VYp5dOrVWGz0OKB2hkLW','devuser','GJqovNClEobHRxhtj4YCX',NULL),(25,'4VYp5dOrVWGz0OKB2hkLW','devuser','rZem0ySmb8MuVN8uTLBNU',NULL),(26,'4VYp5dOrVWGz0OKB2hkLW','devuser','oqUuyupD-SfL3arUpHsvv',NULL),(27,'4VYp5dOrVWGz0OKB2hkLW','devuser','RvsyZwgVgccDcctfT4lyH',NULL),(28,'4VYp5dOrVWGz0OKB2hkLW','devuser','feJogWinKYz4cMwh13775',NULL),(29,'4VYp5dOrVWGz0OKB2hkLW',NULL,'6soU1bOi77NmxYQz8nfnf',NULL);
/*!40000 ALTER TABLE `user_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_dashboard_modification`
--

DROP TABLE IF EXISTS `user_dashboard_modification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_dashboard_modification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) DEFAULT NULL,
  `courseId` char(21) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `color` char(21) DEFAULT NULL,
  `image` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_dashboard_modification`
--

LOCK TABLES `user_dashboard_modification` WRITE;
/*!40000 ALTER TABLE `user_dashboard_modification` DISABLE KEYS */;
INSERT INTO `user_dashboard_modification` VALUES (1,'4VYp5dOrVWGz0OKB2hkLW','aI8sK4vmEhC5sdeSP3vN-',3,NULL,NULL),(2,'4VYp5dOrVWGz0OKB2hkL-','uTMfKhSmcNtLDaK8oJ3U',4,NULL,NULL),(4,'4VYp5dOrVWGz0OKB2hkL-','NfzKqYtTgYRyPnmaxc7XB',5,NULL,NULL),(5,'4VYp5dOrVWGz0OKB2hkL-','test1',1,NULL,NULL),(6,'4VYp5dOrVWGz0OKB2hkL-','test2',2,'ff3477',NULL);
/*!40000 ALTER TABLE `user_dashboard_modification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_device`
--

DROP TABLE IF EXISTS `user_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_device` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `signInCode` decimal(9,0) DEFAULT NULL,
  `timestampOfSignInCode` datetime DEFAULT NULL,
  `deviceName` varchar(255) DEFAULT NULL,
  `signedIn` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_device`
--

LOCK TABLES `user_device` WRITE;
/*!40000 ALTER TABLE `user_device` DISABLE KEYS */;
INSERT INTO `user_device` VALUES (1,'devuserid','devuser@example.com',123456789,'3000-01-01 12:01:01','Cacao tree',0),(2,'s1userid','student1@example.com',123456789,'3000-01-01 12:01:01','Cacao tree',1),(3,'s2userid','student2@example.com',123456789,'3000-01-01 12:01:01','Cacao tree',1),(4,'i1userid','i1@example.com',123456789,'3000-01-01 12:01:01','Cacao tree',1);
/*!40000 ALTER TABLE `user_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_folders`
--

DROP TABLE IF EXISTS `user_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_folders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `folderId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_folders`
--

LOCK TABLES `user_folders` WRITE;
/*!40000 ALTER TABLE `user_folders` DISABLE KEYS */;
INSERT INTO `user_folders` VALUES (2,'4VYp5dOrVWGz0OKB2hkLW','devuser','gPn_nJmbSEDpjEZdJS7bZ'),(3,'4VYp5dOrVWGz0OKB2hkLW','devuser','cN07KIt2btQTlPQXqG0ed'),(4,'4VYp5dOrVWGz0OKB2hkLW','devuser','D9K5vETXe7J9iy9-tyhnO'),(5,'4VYp5dOrVWGz0OKB2hkLW','devuser','L53eYmiC9Hs9HgBqP18ws'),(6,'4VYp5dOrVWGz0OKB2hkLW','devuser','Ni_36AOLPXjRc2lfTSy1t'),(7,'4VYp5dOrVWGz0OKB2hkLW',NULL,'a4RgYCshyTo_3Yu3wsqNv');
/*!40000 ALTER TABLE `user_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions_on_courses`
--

DROP TABLE IF EXISTS `user_permissions_on_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions_on_courses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'username is email username for now',
  `courseId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `roleInstructor` tinyint(1) unsigned DEFAULT '0',
  `roleStudent` tinyint(1) unsigned DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions_on_courses`
--

LOCK TABLES `user_permissions_on_courses` WRITE;
/*!40000 ALTER TABLE `user_permissions_on_courses` DISABLE KEYS */;
INSERT INTO `user_permissions_on_courses` VALUES (1,NULL,'devuser','aI8sK4vmEhC5sdeSP3vNW',1,1),(2,NULL,'fake_user',NULL,NULL,NULL),(3,NULL,'char0042',NULL,NULL,NULL),(4,NULL,'nykamp',NULL,NULL,NULL),(5,NULL,'spride',NULL,NULL,NULL),(6,NULL,'moone237',NULL,NULL,NULL),(7,'4VYp5dOrVWGz0OKB2hkLW','devuser','uTMfKhSmcNtLDaK8oJ3U',0,1),(8,'4VYp5dOrVWGz0OKB2hkLW','devuser','NfzKqYtTgYRyPnmaxc7XB',1,0);
/*!40000 ALTER TABLE `user_permissions_on_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_urls`
--

DROP TABLE IF EXISTS `user_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_urls` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `urlId` char(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_urls`
--

LOCK TABLES `user_urls` WRITE;
/*!40000 ALTER TABLE `user_urls` DISABLE KEYS */;
INSERT INTO `user_urls` VALUES (2,'4VYp5dOrVWGz0OKB2hkLW','devuser','jOyA1q4mai479w6MjaIhq'),(4,'4VYp5dOrVWGz0OKB2hkLW','devuser','FDwQILDPGV8EmfNO3sPcc'),(6,'4VYp5dOrVWGz0OKB2hkLW','devuser','0cuiOsNqzxr4yFoSvoOq9'),(7,'4VYp5dOrVWGz0OKB2hkLW','devuser','jknEx1pvdcw4KpEk1bjdP'),(8,'4VYp5dOrVWGz0OKB2hkLW','devuser','aXPBcP3w2ZYLpWTlmk7qY');
/*!40000 ALTER TABLE `user_urls` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-22 20:10:47
