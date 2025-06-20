-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 08:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flexit`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventId` int(11) NOT NULL,
  `eventTitle` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `functionId` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `functions`
--

INSERT INTO `functions` (`functionId`, `type`, `active`) VALUES
(1, 'calendar', 0),
(2, 'gallery', 0),
(3, 'files', 0),
(4, 'blog', 0),
(54, 'calendar', 1),
(55, 'files', 1);

-- --------------------------------------------------------

--
-- Table structure for table `functions_events`
--

CREATE TABLE `functions_events` (
  `functionId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functions_pictures`
--

CREATE TABLE `functions_pictures` (
  `functionId` int(11) NOT NULL,
  `pictureId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functions_posts`
--

CREATE TABLE `functions_posts` (
  `functionId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `pictureID` int(11) NOT NULL,
  `pictureDate` date NOT NULL DEFAULT current_timestamp(),
  `pictureName` varchar(50) NOT NULL,
  `pictureDescription` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `content` mediumtext NOT NULL,
  `postDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `projectId` int(11) NOT NULL,
  `projectName` varchar(50) NOT NULL,
  `color` varchar(40) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `createDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`projectId`, `projectName`, `color`, `active`, `createDate`) VALUES
(1, 'My first Project', 'blue', 1, '2025-06-09'),
(2, 'Yoga class', 'red', 1, '2025-06-09'),
(3, 'Work', 'green', 1, '2025-06-09'),
(4, 'Army', 'purple', 1, '2025-06-13'),
(78, 'try', '#007bff', 1, '2025-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `projects_functions`
--

CREATE TABLE `projects_functions` (
  `projectId` int(11) NOT NULL,
  `functionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects_functions`
--

INSERT INTO `projects_functions` (`projectId`, `functionId`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(78, 54),
(78, 55);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(70) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `bDay` date NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `userName`, `password`, `firstName`, `lastName`, `phoneNumber`, `bDay`, `img`) VALUES
('adiel@gmail.com', 'AdielSM', 'adiel206', 'Adiel Sofia', 'Mendelson', '054-4777627', '2000-09-10', NULL),
('orlosh53@gmail.com', 'orlyW', 'Orly*123', 'orly', 'wallela', '054-4312481', '2000-07-11', NULL),
('orly@gmail.com', 'OrlyWn', 'pass12345', 'OrlyM', 'Wallela', '054-6789456', '1990-01-01', NULL),
('sigalmend@gmail.com', 'sigalM', 'Sigal&0305', 'sigal', 'mendelson', '050-4447894', '1970-05-03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_funcitons`
--

CREATE TABLE `users_funcitons` (
  `email` varchar(70) NOT NULL,
  `functionId` int(11) NOT NULL,
  `ownerFunction` tinyint(1) NOT NULL,
  `readPermission` tinyint(1) NOT NULL,
  `writePermission` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_funcitons`
--

INSERT INTO `users_funcitons` (`email`, `functionId`, `ownerFunction`, `readPermission`, `writePermission`) VALUES
('orly@gmail.com', 1, 1, 1, 1),
('orly@gmail.com', 54, 1, 1, 1),
('orly@gmail.com', 55, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_projects`
--

CREATE TABLE `users_projects` (
  `email` varchar(70) NOT NULL,
  `projectId` int(11) NOT NULL,
  `owner` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_projects`
--

INSERT INTO `users_projects` (`email`, `projectId`, `owner`) VALUES
('orly@gmail.com', 1, 1),
('orly@gmail.com', 2, 1),
('orly@gmail.com', 3, 1),
('adiel@gmail.com', 4, 1),
('orly@gmail.com', 4, 0),
('orly@gmail.com', 78, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`functionId`);

--
-- Indexes for table `functions_events`
--
ALTER TABLE `functions_events`
  ADD KEY `functionId` (`functionId`),
  ADD KEY `eventId` (`eventId`);

--
-- Indexes for table `functions_pictures`
--
ALTER TABLE `functions_pictures`
  ADD KEY `functionId` (`functionId`),
  ADD KEY `pictureId` (`pictureId`);

--
-- Indexes for table `functions_posts`
--
ALTER TABLE `functions_posts`
  ADD KEY `functionId` (`functionId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`pictureID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectId`);

--
-- Indexes for table `projects_functions`
--
ALTER TABLE `projects_functions`
  ADD PRIMARY KEY (`projectId`,`functionId`),
  ADD KEY `projectId` (`projectId`),
  ADD KEY `functionId` (`functionId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users_funcitons`
--
ALTER TABLE `users_funcitons`
  ADD KEY `email` (`email`),
  ADD KEY `functionId` (`functionId`);

--
-- Indexes for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD KEY `email` (`email`),
  ADD KEY `projectId` (`projectId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `functionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `pictureID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `projectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `functions_events`
--
ALTER TABLE `functions_events`
  ADD CONSTRAINT `functions_events_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `event` (`eventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `functions_events_ibfk_2` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `functions_pictures`
--
ALTER TABLE `functions_pictures`
  ADD CONSTRAINT `functions_pictures_ibfk_1` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `functions_posts`
--
ALTER TABLE `functions_posts`
  ADD CONSTRAINT `functions_posts_ibfk_1` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `functions_posts_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`pictureID`) REFERENCES `functions_pictures` (`pictureId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects_functions`
--
ALTER TABLE `projects_functions`
  ADD CONSTRAINT `fk_projects_functions_to_projects` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `functionId` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_funcitons`
--
ALTER TABLE `users_funcitons`
  ADD CONSTRAINT `users_funcitons_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_funcitons_ibfk_2` FOREIGN KEY (`functionId`) REFERENCES `functions` (`functionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD CONSTRAINT `users_projects_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_projects_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
