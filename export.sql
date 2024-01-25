
DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` varchar(150) NOT NULL,
  `data` text,
  `label` varchar(32) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
