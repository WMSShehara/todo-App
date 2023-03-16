drop database if exists todoo;
create database todoo;
use todoo;
create table task (
    id int primary key auto_increment,
    description varchar(255) not null
);
insert into task (description) values ('My test task');
insert into task (description) values ('My another task');