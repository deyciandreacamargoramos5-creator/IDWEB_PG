-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-12-2025 a las 03:30:34
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `xen_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

DROP TABLE IF EXISTS `compras`;
CREATE TABLE IF NOT EXISTS `compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `vuelo_id` int DEFAULT NULL,
  `fecha_compra` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `vuelo_id` (`vuelo_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `usuario_id`, `vuelo_id`, `fecha_compra`) VALUES
(1, 1, 28, '2025-12-23 21:39:30'),
(2, 1, 25, '2025-12-23 21:40:48'),
(3, 1, 28, '2025-12-23 21:55:15'),
(4, 1, 25, '2025-12-23 22:00:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_documento` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_documento` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `nacionalidad` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_tarjeta` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo_documento`, `numero_documento`, `fecha_nacimiento`, `nacionalidad`, `telefono`, `numero_tarjeta`) VALUES
(1, 'Administrador Xen', 'admin@xen.com', '123456', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Barbara amira', 'barbaraamiracubaguevara@gmail.com', 'amira123', 'dni', '60982844', '2007-01-10', 'Peruana', '974875175', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelos`
--

DROP TABLE IF EXISTS `vuelos`;
CREATE TABLE IF NOT EXISTS `vuelos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `origen` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destino` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `hora_llegada` time DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vuelos`
--

INSERT INTO `vuelos` (`id`, `origen`, `destino`, `fecha`, `hora_salida`, `hora_llegada`, `precio`) VALUES
(1, 'Lima', 'Cusco', '2025-01-15', '06:00:00', '07:20:00', 85.50),
(2, 'Lima', 'Cusco', '2025-01-20', '09:30:00', '10:50:00', 110.00),
(3, 'Lima', 'Cusco', '2025-02-14', '07:00:00', '08:20:00', 125.00),
(4, 'Lima', 'Cusco', '2025-03-10', '05:45:00', '07:05:00', 65.90),
(5, 'Lima', 'Cusco', '2025-04-05', '14:00:00', '15:20:00', 90.00),
(6, 'Lima', 'Cusco', '2025-05-20', '08:15:00', '09:35:00', 88.00),
(7, 'Lima', 'Cusco', '2025-06-24', '06:00:00', '07:20:00', 150.00),
(8, 'Lima', 'Cusco', '2025-06-24', '10:00:00', '11:20:00', 145.00),
(9, 'Lima', 'Cusco', '2025-07-28', '07:30:00', '08:50:00', 130.00),
(10, 'Lima', 'Cusco', '2025-08-15', '16:00:00', '17:20:00', 95.00),
(11, 'Lima', 'Cusco', '2025-09-10', '11:00:00', '12:20:00', 75.00),
(12, 'Lima', 'Cusco', '2025-10-31', '19:00:00', '20:20:00', 105.00),
(13, 'Lima', 'Cusco', '2025-11-15', '06:30:00', '07:50:00', 80.00),
(14, 'Lima', 'Cusco', '2025-12-24', '08:00:00', '09:20:00', 160.00),
(15, 'Lima', 'Cusco', '2026-01-05', '09:00:00', '10:20:00', 90.00),
(16, 'Lima', 'Cusco', '2026-02-14', '07:15:00', '08:35:00', 115.00),
(17, 'Cusco', 'Lima', '2025-01-18', '08:00:00', '09:20:00', 85.00),
(18, 'Cusco', 'Lima', '2025-02-17', '11:00:00', '12:20:00', 100.00),
(19, 'Cusco', 'Lima', '2025-03-15', '15:00:00', '16:20:00', 70.00),
(20, 'Cusco', 'Lima', '2025-05-25', '18:00:00', '19:20:00', 95.00),
(21, 'Cusco', 'Lima', '2025-06-27', '09:00:00', '10:20:00', 140.00),
(22, 'Cusco', 'Lima', '2025-07-30', '10:30:00', '11:50:00', 125.00),
(23, 'Cusco', 'Lima', '2025-12-26', '07:00:00', '08:20:00', 155.00),
(24, 'Cusco', 'Lima', '2026-01-10', '13:00:00', '14:20:00', 85.00),
(25, 'Lima', 'Arequipa', '2025-01-25', '08:00:00', '09:30:00', 75.00),
(26, 'Lima', 'Arequipa', '2025-02-20', '14:00:00', '15:30:00', 68.00),
(27, 'Lima', 'Arequipa', '2025-03-15', '06:30:00', '08:00:00', 90.00),
(28, 'Lima', 'Arequipa', '2025-04-10', '19:00:00', '20:30:00', 55.00),
(29, 'Lima', 'Arequipa', '2025-05-01', '07:00:00', '08:30:00', 100.00),
(30, 'Lima', 'Arequipa', '2025-08-15', '09:00:00', '10:30:00', 120.00),
(31, 'Lima', 'Arequipa', '2025-08-15', '15:00:00', '16:30:00', 115.00),
(32, 'Lima', 'Arequipa', '2025-10-05', '10:00:00', '11:30:00', 80.00),
(33, 'Lima', 'Arequipa', '2025-12-23', '08:00:00', '09:30:00', 130.00),
(34, 'Lima', 'Arequipa', '2026-01-15', '06:00:00', '07:30:00', 70.00),
(35, 'Arequipa', 'Lima', '2025-01-28', '11:00:00', '12:30:00', 75.00),
(36, 'Arequipa', 'Lima', '2025-02-25', '16:00:00', '17:30:00', 65.00),
(37, 'Arequipa', 'Lima', '2025-08-18', '10:00:00', '11:30:00', 110.00),
(38, 'Arequipa', 'Lima', '2025-12-28', '20:00:00', '21:30:00', 125.00),
(39, 'Lima', 'Iquitos', '2025-02-10', '06:00:00', '08:00:00', 95.00),
(40, 'Lima', 'Iquitos', '2025-03-20', '13:00:00', '15:00:00', 85.00),
(41, 'Lima', 'Iquitos', '2025-06-24', '07:00:00', '09:00:00', 120.00),
(42, 'Lima', 'Iquitos', '2025-07-28', '10:00:00', '12:00:00', 130.00),
(43, 'Lima', 'Iquitos', '2025-09-15', '18:00:00', '20:00:00', 90.00),
(44, 'Lima', 'Iquitos', '2025-11-20', '08:30:00', '10:30:00', 80.00),
(45, 'Lima', 'Iquitos', '2026-01-05', '06:00:00', '08:00:00', 95.00),
(46, 'Iquitos', 'Lima', '2025-02-15', '14:00:00', '16:00:00', 90.00),
(47, 'Iquitos', 'Lima', '2025-06-28', '10:00:00', '12:00:00', 115.00),
(48, 'Lima', 'Piura', '2025-01-10', '07:00:00', '08:30:00', 100.00),
(49, 'Lima', 'Piura', '2025-01-25', '11:00:00', '12:30:00', 110.00),
(50, 'Lima', 'Piura', '2025-02-14', '09:00:00', '10:30:00', 120.00),
(51, 'Lima', 'Piura', '2025-04-01', '15:00:00', '16:30:00', 75.00),
(52, 'Lima', 'Piura', '2025-07-15', '08:00:00', '09:30:00', 90.00),
(53, 'Lima', 'Piura', '2025-10-10', '18:00:00', '19:30:00', 65.00),
(54, 'Lima', 'Piura', '2025-12-30', '10:00:00', '11:30:00', 140.00),
(55, 'Lima', 'Piura', '2026-01-02', '12:00:00', '13:30:00', 150.00),
(56, 'Piura', 'Lima', '2025-01-15', '19:00:00', '20:30:00', 100.00),
(57, 'Piura', 'Lima', '2025-03-01', '08:00:00', '09:30:00', 70.00),
(58, 'Lima', 'Tarapoto', '2025-02-05', '09:00:00', '10:15:00', 85.00),
(59, 'Lima', 'Tarapoto', '2025-04-15', '14:30:00', '15:45:00', 75.00),
(60, 'Lima', 'Tarapoto', '2025-06-20', '07:00:00', '08:15:00', 110.00),
(61, 'Lima', 'Tarapoto', '2025-08-10', '11:00:00', '12:15:00', 95.00),
(62, 'Lima', 'Tarapoto', '2025-11-05', '16:00:00', '17:15:00', 80.00),
(63, 'Tarapoto', 'Lima', '2025-02-10', '12:00:00', '13:15:00', 80.00),
(64, 'Tarapoto', 'Lima', '2025-06-25', '09:00:00', '10:15:00', 105.00),
(65, 'Lima', 'Trujillo', '2025-01-20', '06:00:00', '07:15:00', 60.00),
(66, 'Lima', 'Trujillo', '2025-03-10', '18:00:00', '19:15:00', 55.00),
(67, 'Lima', 'Trujillo', '2025-05-15', '08:30:00', '09:45:00', 70.00),
(68, 'Lima', 'Trujillo', '2025-09-25', '20:00:00', '21:15:00', 65.00),
(69, 'Lima', 'Trujillo', '2025-12-15', '07:00:00', '08:15:00', 85.00),
(70, 'Trujillo', 'Lima', '2025-01-25', '09:00:00', '10:15:00', 60.00),
(71, 'Trujillo', 'Lima', '2025-09-30', '16:00:00', '17:15:00', 70.00),
(72, 'Lima', 'Cusco', '2026-03-01', '06:00:00', '07:20:00', 85.00),
(73, 'Lima', 'Arequipa', '2026-03-02', '08:00:00', '09:30:00', 75.00),
(74, 'Lima', 'Piura', '2026-03-03', '10:00:00', '11:30:00', 90.00),
(75, 'Lima', 'Iquitos', '2026-03-04', '12:00:00', '14:00:00', 95.00),
(76, 'Lima', 'Tarapoto', '2026-03-05', '14:00:00', '15:15:00', 80.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
