/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.5.40 : Database - cps
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cps` /*!40100 DEFAULT CHARACTER SET gbk */;

USE `cps`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`id`,`name`,`username`,`password`) values ('111','王瑞平','111','123456'),('112','嘿嘿','112','123456'),('113','哈哈','113','123456'),('201203010121','牛新星','201203010121','123456');

/*Table structure for table `bisai` */

DROP TABLE IF EXISTS `bisai`;

CREATE TABLE `bisai` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `award_grade` varchar(20) NOT NULL,
  `award_department` varchar(20) NOT NULL,
  `workload` decimal(10,0) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bisai` */

/*Table structure for table `bisai_final` */

DROP TABLE IF EXISTS `bisai_final`;

CREATE TABLE `bisai_final` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `award_grade` varchar(20) NOT NULL,
  `award_department` varchar(20) NOT NULL,
  `workload` decimal(10,0) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bisai_final` */

/*Table structure for table `biyesheji` */

DROP TABLE IF EXISTS `biyesheji`;

CREATE TABLE `biyesheji` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL DEFAULT '',
  `grade` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `formula` varchar(100) DEFAULT NULL,
  `workload` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`,`class_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `biyesheji_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `biyesheji_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `biyesheji` */

/*Table structure for table `biyesheji_final` */

DROP TABLE IF EXISTS `biyesheji_final`;

CREATE TABLE `biyesheji_final` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL DEFAULT '',
  `grade` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `formula` varchar(100) DEFAULT NULL,
  `workload` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`,`class_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `biyesheji_final_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `biyesheji_final_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `biyesheji_final` */

/*Table structure for table `classes` */

DROP TABLE IF EXISTS `classes`;

CREATE TABLE `classes` (
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `grade` char(4) NOT NULL,
  `class_num` smallint(6) NOT NULL,
  `class_flag` tinyint(4) NOT NULL,
  `class_type` tinyint(4) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `classes` */

insert  into `classes`(`class_id`,`class_name`,`grade`,`class_num`,`class_flag`,`class_type`) values ('0301','计算机科学与技术','12',50,0,0),('0302','网络工程','12',55,0,0),('0303','物联网','12',45,0,0),('0304','软件工程','12',60,0,0);

/*Table structure for table `cmenu` */

DROP TABLE IF EXISTS `cmenu`;

CREATE TABLE `cmenu` (
  `mcode` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(40) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`mcode`),
  KEY `index_mc` (`mcode`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

/*Data for the table `cmenu` */

/*Table structure for table `course` */

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `c_id` varchar(20) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `version` char(4) NOT NULL,
  `c_year` year(4) NOT NULL,
  `c_term` tinyint(4) NOT NULL,
  `c_type` tinyint(4) NOT NULL,
  `c_theory` tinyint(4) NOT NULL,
  `c_test` tinyint(4) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `course` */

insert  into `course`(`c_id`,`c_name`,`version`,`c_year`,`c_term`,`c_type`,`c_theory`,`c_test`) values ('031001','c程序设计','12',2015,0,2,15,25),('032009','软件工程','10',2015,1,1,20,20),('033103','web系统与技术','12',2015,1,3,25,15);

/*Table structure for table `csmenu` */

DROP TABLE IF EXISTS `csmenu`;

CREATE TABLE `csmenu` (
  `mcode` int(8) NOT NULL,
  `cod` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(40) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`cod`),
  KEY `index_cod` (`cod`),
  KEY `fk_mc` (`mcode`),
  CONSTRAINT `fk_mc` FOREIGN KEY (`mcode`) REFERENCES `cmenu` (`mcode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `csmenu` */

/*Table structure for table `ctmenu` */

DROP TABLE IF EXISTS `ctmenu`;

CREATE TABLE `ctmenu` (
  `mcode` int(8) NOT NULL,
  `cod` int(8) NOT NULL AUTO_INCREMENT,
  `cname` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `img` varchar(40) NOT NULL,
  `path` varchar(40) NOT NULL,
  `mmcode` int(8) NOT NULL,
  PRIMARY KEY (`cod`),
  KEY `index_tcod` (`cod`),
  KEY `fk_tmc` (`mcode`),
  KEY `fk_mmc` (`mmcode`),
  CONSTRAINT `fk_mmc` FOREIGN KEY (`mmcode`) REFERENCES `cmenu` (`mcode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tmc` FOREIGN KEY (`mcode`) REFERENCES `csmenu` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8;

/*Data for the table `ctmenu` */

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `gclasscode` int(8) NOT NULL,
  `gcode` int(8) NOT NULL AUTO_INCREMENT,
  `gname` varchar(40) NOT NULL,
  `gdescription` text NOT NULL,
  `price` int(5) NOT NULL,
  `img` varchar(40) NOT NULL,
  `path` varchar(40) NOT NULL,
  PRIMARY KEY (`gcode`),
  KEY `gccode` (`gclasscode`),
  CONSTRAINT `gccode` FOREIGN KEY (`gclasscode`) REFERENCES `goodsclass` (`gclasscode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

/*Table structure for table `goodsclass` */

DROP TABLE IF EXISTS `goodsclass`;

CREATE TABLE `goodsclass` (
  `gclasscode` int(8) NOT NULL AUTO_INCREMENT,
  `gclassname` varchar(20) NOT NULL,
  PRIMARY KEY (`gclasscode`),
  UNIQUE KEY `gclassname` (`gclassname`),
  KEY `gcindex` (`gclasscode`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `goodsclass` */

/*Table structure for table `jiaoxue` */

DROP TABLE IF EXISTS `jiaoxue`;

CREATE TABLE `jiaoxue` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `c_term` tinyint(4) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_id` varchar(20) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `total_num` tinyint(4) NOT NULL,
  `ci_week` tinyint(4) NOT NULL,
  `mi_week` tinyint(4) NOT NULL,
  `cd_week` tinyint(4) NOT NULL,
  `c_coe` decimal(10,0) NOT NULL,
  `real_week` tinyint(4) NOT NULL,
  `hours_week` tinyint(4) NOT NULL,
  `hours_test` tinyint(4) DEFAULT NULL,
  `hours_theory` tinyint(4) DEFAULT NULL,
  `s_theory_coe` decimal(10,0) DEFAULT NULL,
  `s_test_coe` decimal(10,0) DEFAULT NULL,
  `theory_work` decimal(10,0) DEFAULT NULL,
  `theory_formula` varchar(100) DEFAULT NULL,
  `test_work` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`,`class_id`,`c_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `jiaoxue_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jiaoxue_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jiaoxue_ibfk_3` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `jiaoxue` */

/*Table structure for table `jiaoxue_final` */

DROP TABLE IF EXISTS `jiaoxue_final`;

CREATE TABLE `jiaoxue_final` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `c_term` tinyint(4) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_id` varchar(20) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `total_num` tinyint(4) NOT NULL,
  `ci_week` tinyint(4) NOT NULL,
  `mi_week` tinyint(4) NOT NULL,
  `cd_week` tinyint(4) NOT NULL,
  `c_coe` decimal(10,0) NOT NULL,
  `real_week` tinyint(4) NOT NULL,
  `hours_week` tinyint(4) NOT NULL,
  `hours_test` tinyint(4) DEFAULT NULL,
  `hours_theory` tinyint(4) DEFAULT NULL,
  `s_theory_coe` decimal(10,0) DEFAULT NULL,
  `s_test_coe` decimal(10,0) DEFAULT NULL,
  `theory_work` decimal(10,0) DEFAULT NULL,
  `theory_formula` varchar(100) DEFAULT NULL,
  `test_work` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`,`class_id`,`c_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `jiaoxue_final_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jiaoxue_final_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jiaoxue_final_ibfk_3` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `jiaoxue_final` */

/*Table structure for table `jkgzlb` */

DROP TABLE IF EXISTS `jkgzlb`;

CREATE TABLE `jkgzlb` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `category` tinyint(4) NOT NULL,
  `c_term` tinyint(4) NOT NULL,
  `time` tinyint(4) NOT NULL,
  `workload` decimal(10,0) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`),
  KEY `t_id` (`t_id`),
  CONSTRAINT `jkgzlb_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `jkgzlb` */

insert  into `jkgzlb`(`id`,`t_id`,`t_name`,`category`,`c_term`,`time`,`workload`,`content`) values (2,'111','李永刚',1,1,2,'10','');

/*Table structure for table `kcsjb` */

DROP TABLE IF EXISTS `kcsjb`;

CREATE TABLE `kcsjb` (
  `t_id` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `date` tinyint(4) NOT NULL,
  `term` tinyint(4) NOT NULL,
  `workload` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`t_id`,`c_id`,`class_id`),
  KEY `c_id` (`c_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `kcsjb_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`),
  CONSTRAINT `kcsjb_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`),
  CONSTRAINT `kcsjb_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `kcsjb` */

insert  into `kcsjb`(`t_id`,`c_id`,`class_id`,`date`,`term`,`workload`) values ('111','032009','0301',5,0,NULL);

/*Table structure for table `shiyan` */

DROP TABLE IF EXISTS `shiyan`;

CREATE TABLE `shiyan` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_professional` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `c_term` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `test_num` tinyint(4) DEFAULT NULL,
  `hours_test` tinyint(4) DEFAULT NULL,
  `e_hours_test` tinyint(4) DEFAULT NULL,
  `workload` decimal(10,0) NOT NULL,
  `total_workload` decimal(10,0) NOT NULL,
  `test_id` varchar(20) NOT NULL,
  `test_name` varchar(20) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test_id` (`test_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `shiyan_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shiyan_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shiyan_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shiyan` */

/*Table structure for table `shiyan_final` */

DROP TABLE IF EXISTS `shiyan_final`;

CREATE TABLE `shiyan_final` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_professional` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `c_term` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `test_num` tinyint(4) DEFAULT NULL,
  `hours_test` tinyint(4) DEFAULT NULL,
  `e_hours_test` tinyint(4) DEFAULT NULL,
  `workload` decimal(10,0) NOT NULL,
  `total_workload` decimal(10,0) NOT NULL,
  `test_id` varchar(20) NOT NULL,
  `test_name` varchar(20) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test_id` (`test_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `shiyan_final_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shiyan_final_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shiyan_final_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shiyan_final` */

/*Table structure for table `syyxxb` */

DROP TABLE IF EXISTS `syyxxb`;

CREATE TABLE `syyxxb` (
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_profession` varchar(20) NOT NULL,
  `flag` varchar(20) NOT NULL,
  `text` text,
  PRIMARY KEY (`t_id`),
  CONSTRAINT `syyxxb_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `syyxxb` */

/*Table structure for table `t_c_class` */

DROP TABLE IF EXISTS `t_c_class`;

CREATE TABLE `t_c_class` (
  `t_id` varchar(20) NOT NULL,
  `c_id` varchar(20) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `term` tinyint(4) NOT NULL,
  PRIMARY KEY (`t_id`,`c_id`,`class_id`,`term`),
  KEY `class_id` (`class_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `t_c_class_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`),
  CONSTRAINT `t_c_class_ibfk_2` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`),
  CONSTRAINT `t_c_class_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_c_class` */

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `t_username` varchar(20) NOT NULL,
  `t_password` varchar(20) NOT NULL,
  `t_year` year(4) NOT NULL,
  `t_term` tinyint(4) NOT NULL,
  `t_professional` varchar(20) NOT NULL,
  `tester_flag` tinyint(4) NOT NULL,
  `newteacher_flag` tinyint(4) NOT NULL,
  `flag` tinyint(4) NOT NULL,
  `test` text,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`t_id`,`t_name`,`t_username`,`t_password`,`t_year`,`t_term`,`t_professional`,`tester_flag`,`newteacher_flag`,`flag`,`test`) values ('111','李永刚','111','123456',2015,0,'讲师',0,0,0,NULL),('112','王瑞平','112','123456',2015,0,'讲师',0,0,0,NULL),('113','常老师','113','123456',2015,0,'教授',0,0,0,''),('114','李娜','114','123456',2015,0,'教授',0,0,0,'');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userid` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `userpassword` varchar(40) NOT NULL,
  `useridentity` enum('user','admin') NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`),
  KEY `indexuser_id` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`userid`,`username`,`userpassword`,`useridentity`) values (1,'kingli','19cee92d5e6e705ff369b75feeef9433','user'),(24,'admin','21232f297a57a5a743894a0e4a801fc3','admin'),(25,'user','ee11cbb19052e40b07aac0ca060c23ee','user'),(26,'1','c4ca4238a0b923820dcc509a6f75849b','user'),(27,'ad1','21232f297a57a5a743894a0e4a801fc3','admin'),(28,'ad2','21232f297a57a5a743894a0e4a801fc3','admin'),(29,'ad3','21232f297a57a5a743894a0e4a801fc3','admin'),(30,'ad4','21232f297a57a5a743894a0e4a801fc3','admin');

/*Table structure for table `zdshsj` */

DROP TABLE IF EXISTS `zdshsj`;

CREATE TABLE `zdshsj` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `theme` tinyint(4) NOT NULL,
  `pdate` varchar(20) NOT NULL,
  `weeks` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `workload` decimal(10,0) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `zdshsj_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `zdshsj_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `zdshsj` */

/*Table structure for table `zdshsj_final` */

DROP TABLE IF EXISTS `zdshsj_final`;

CREATE TABLE `zdshsj_final` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `t_id` varchar(20) NOT NULL,
  `t_name` varchar(20) NOT NULL,
  `theme` tinyint(4) NOT NULL,
  `pdate` varchar(20) NOT NULL,
  `weeks` tinyint(4) NOT NULL,
  `class_id` varchar(20) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `class_num` tinyint(4) NOT NULL,
  `number` tinyint(4) NOT NULL,
  `workload` decimal(10,0) NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`t_id`),
  KEY `t_id` (`t_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `zdshsj_final_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `teacher` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `zdshsj_final_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `zdshsj_final` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
