-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:13306
-- Tiempo de generación: 19-03-2025 a las 18:25:51
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `uni_2023_students`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mongodb_objects`
--

DROP TABLE IF EXISTS `mongodb_objects`;
CREATE TABLE IF NOT EXISTS `mongodb_objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `object_mongodb` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mongodb_objects`
--

INSERT INTO `mongodb_objects` (`id`, `object_mongodb`) VALUES
(1, '{\"building\": \"Packard\", \"capacity\": 500, \"room_number\": \"101\"}'),
(2, '{\"building\": \"Painter\", \"capacity\": 10, \"room_number\": \"514\"}'),
(3, '{\"building\": \"Taylor\", \"capacity\": 70, \"room_number\": \"3128\"}'),
(4, '{\"building\": \"Watson\", \"capacity\": 30, \"room_number\": \"100\"}'),
(5, '{\"building\": \"Watson\", \"capacity\": 50, \"room_number\": \"120\"}');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
