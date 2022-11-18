Create database to_do;

CREATE TABLE users(
`user_id` int not null auto_increment primary key,
`username` varchar(255)
);

CREATE TABLE posts(
`post_id` int not null auto_increment primary key,
`timestamp` timestamp not null default current_timestamp,
`title` varchar(255) not null,
`body` varchar(255),
`status` varchar(255) not null default "not done",
`owner` int not null 
);