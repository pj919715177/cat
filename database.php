<?php
-- 2017-3-8
--创建数据库
create database cat character set utf8;

use cat;
-- 猫表
CREATE TABLE `cat`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`masterId` int(11) NOT NULL DEFAULT 0 COMMENT '主人id',
	`name` varchar(180) NOT NULL DEFAULT '' COMMENT '猫名',
	`isHomeless` tinyint(1) NOT NULL DEFAULT 2 COMMENT '是否流浪，1:流浪，2:不流浪',
	`latitude` int(11) NOT NULL DEFAULT 0 COMMENT '坐标纬度*1000000',
	`longitude` int(11) NOT NULL DEFAULT 0 COMMENT '坐标经度*1000000',
	`adcode` int(11) NOT NULL DEFAULT 0 COMMENT '市区编码',
	`location` varchar(180) NOT NULL DEFAULT '' COMMENT '地址',
	`age` int(11) NOT NULL DEFAULT 0 COMMENT '年龄',
	`type` varchar(180) NOT NULL DEFAULT '' COMMENT '品种',
	`introduce` text DEFAULT '' COMMENT '简介',
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='猫表';

--图片表
CREATE TABLE `catImg`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`imgType` tinyint(5) NOT NULL DEFAULT 0 COMMENT '0：猫图，1：活动图',
	`outId` int(11) NOT NULL DEFAULT 0 COMMENT '外键id，猫的id或者活动id',
	`imgUrl` varchar(500) NOT NULL DEFAULT '' COMMENT '图片url',
	`updataTime` int(11) NOT NULL DEFAULT 0 COMMENT '图片上传时间',
	primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片表';

-- 用户表
CREATE TABLE `user`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`nickname` varchar(180) NOT NULL DEFAULT '' COMMENT '用户昵称',
	`email` varchar(180) NOT NULL DEFAULT '' COMMENT '用户邮箱（账号）',
	`password` varchar(180) NOT NULL DEFAULT '' COMMENT '用户密码',
	`imgUrl` varchar(500) NOT NULL DEFAULT '' COMMENT '用户头像图片链接',
	`signature` text NOT NULL DEFAULT '' COMMENT '签名',
	`createTime` int(11) NOT NULL DEFAULT 0 COMMENT '开户时间',
	primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--关注表
CREATE TABLE `focus`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`focusUserId` int(11) NOT NULL DEFAULT 0 COMMENT '关注者id',
	`beFocusId` int(11) NOT NULL DEFAULT 0 COMMENT '被关注者id',
	`focusTime` int(11) NOT NULL DEFAULT 0 COMMENT '关注时间',
	primary key(`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='关注表';

--活动表
CREATE TABLE `activity`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`activityName` varchar(180) NOT NULL DEFAULT '' COMMENT '活动名',
	`latitude` int(11) NOT NULL DEFAULT 0 COMMENT '坐标纬度*1000000',
	`longitude` int(11) NOT NULL DEFAULT 0 COMMENT '坐标经度*1000000',
	`location` text NOT NULL DEFAULT '' COMMENT '活动地址',
	`host_id` int(11) NOT NULL DEFAULT 0 COMMENT '发起用户id',
	`applyStartTime` int(11) NOT NULL DEFAULT 0 COMMENT '活动报名开始时间',
	`applyEndTime` int(11) NOT NULL DEFAULT 0 COMMENT '活动报名结束时间',
	`startTime` int(11) NOT NULL DEFAULT 0 COMMENT '活动开始时间',
	`endTime` int(11) NOT NULL DEFAULT 0 COMMENT '活动结束时间',
	`theme` varchar(500) NOT NULL DEFAULT '' COMMENT '活动主题',
	`introduce` text NOT NULL DEFAULT '' COMMENT '活动简介',
	`process` text NOT NULL DEFAULT '' COMMENT '活动回顾',
	`coverImg` varchar(255) NOT NULL DEFAULT '' COMMENT '活动封面',
	primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';

--活动报名表
CREATE TABLE `apply`(
	`id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`activityId` int(11) NOT NULL DEFAULT 0 COMMENT '活动id',
	`userId` int(11) NOT NULL DEFAULT 0 COMMENT '用户id',
	`applyTime` int(11) NOT NULL DEFAULT 0 COMMENT '报名时间',
	`other` text NOT NULL DEFAULT '' COMMENT '备注',
	primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动报名表';