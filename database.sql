## 平台表
CREATE TABLE `platfrom` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


## 投资记录表
CREATE TABLE `invest_record` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plat_from` varchar(30) DEFAULT NULL,
  `invest_name` varchar(10) DEFAULT NULL,
  `invest_phone` varchar(11) DEFAULT NULL,
  `invest_money` int(11) DEFAULT NULL,
  `invest_rewords` int(11) DEFAULT NULL,
  `invest_start` date DEFAULT NULL,
  `invest_end` date DEFAULT NULL,
  `from_to` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '1、投资中 2、到期已回款 3、逾期',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

## admin 表
CREATE TABLE `admin_user` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `salt` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL DEFAULT '',
  `role_id` int(11) NOT NULL DEFAULT '0',
  `createtime` datetime DEFAULT NULL,
  `create_ip` varchar(15) DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `last_login_ip` varchar(15) DEFAULT NULL,
  `login_cnt` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `idx_1` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;