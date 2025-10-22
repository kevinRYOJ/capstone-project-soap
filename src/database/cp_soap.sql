-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 22, 2025 at 01:17 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cp_soap`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int NOT NULL,
  `nama_admin` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `nama_admin`, `email`, `password`) VALUES
(1, 'heru nur', 'heru@gmail.com', '1234'),
(2, 'kevin ryo', 'kevin@gmail.com', '$2b$10$vVlbHnUXKK4LfGsCDB3yRuzSoJsJqM0ZURTYuz.WoQBtR/1iQB5G.'),
(3, 'nopal', 'nopal@gmail.com', '$2b$10$1dXmy2vOtZ7N6CITQCMZS.650MM4IdVoKsG/XAWt0WqMb5h.BcKd2');

-- --------------------------------------------------------

--
-- Table structure for table `cabuy`
--

CREATE TABLE `cabuy` (
  `id_cabuy` int NOT NULL,
  `nama_cabuy` text NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `status` enum('Baru','Follow Up','Closing','Lost') NOT NULL DEFAULT 'Baru',
  `tanggal_follow_up` datetime NOT NULL,
  `tanggal_masuk` datetime NOT NULL,
  `id_member` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cabuy`
--

INSERT INTO `cabuy` (`id_cabuy`, `nama_cabuy`, `kontak`, `status`, `tanggal_follow_up`, `tanggal_masuk`, `id_member`) VALUES
(3, 'Novan Awangga', '0093483234', 'Baru', '2025-10-15 12:55:45', '2025-10-15 12:55:45', 2);

-- --------------------------------------------------------

--
-- Table structure for table `crm`
--

CREATE TABLE `crm` (
  `id_crm` int NOT NULL,
  `id_cabuy` int NOT NULL,
  `id_member` int NOT NULL,
  `interaksi_terakhir` datetime DEFAULT NULL,
  `strategi_followup` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kinerja_member`
--

CREATE TABLE `kinerja_member` (
  `id_kinerja` int NOT NULL,
  `jumlah_proyek` int NOT NULL,
  `jumlah_followup` int NOT NULL,
  `rate` float DEFAULT NULL,
  `id_member` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kinerja_member`
--

INSERT INTO `kinerja_member` (`id_kinerja`, `jumlah_proyek`, `jumlah_followup`, `rate`, `id_member`) VALUES
(2, 2, 10, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id_member` int NOT NULL,
  `nama_member` text NOT NULL,
  `kontak` text,
  `id_admin` int NOT NULL,
  `jabatan` enum('Member','Leader','Senior leader') NOT NULL DEFAULT 'Member',
  `leader_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id_member`, `nama_member`, `kontak`, `id_admin`, `jabatan`, `leader_id`) VALUES
(1, 'nopal', '085753092', 1, 'Member', NULL),
(2, 'heru', '09324', 1, 'Senior leader', NULL),
(3, 'fathur', '023423', 1, 'Leader', 2),
(4, 'kevin', '324324', 1, 'Leader', 2);

-- --------------------------------------------------------

--
-- Table structure for table `proyek`
--

CREATE TABLE `proyek` (
  `id_proyek` int NOT NULL,
  `nama_proyek` varchar(255) NOT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `tipe` varchar(255) DEFAULT NULL,
  `harga` int DEFAULT NULL,
  `status` enum('Proses','Tersedia','Dibatalkan','Tidak Tersedia') DEFAULT 'Proses',
  `id_member` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `proyek`
--

INSERT INTO `proyek` (`id_proyek`, `nama_proyek`, `lokasi`, `tipe`, `harga`, `status`, `id_member`) VALUES
(1, 'Gedung J', 'UNP', 'lima lantai', 22111, 'Tidak Tersedia', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rekomendasi_ai`
--

CREATE TABLE `rekomendasi_ai` (
  `id_rekomendasi` int NOT NULL,
  `skor` int NOT NULL,
  `id_cabuy` int NOT NULL,
  `id_proyek` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `survey`
--

CREATE TABLE `survey` (
  `id_survey` int NOT NULL,
  `id_cabuy` int NOT NULL,
  `id_member` int NOT NULL,
  `id_proyek` int NOT NULL,
  `status_survey` enum('Sudah','Belum') DEFAULT 'Belum',
  `tanggal_survey` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`);

--
-- Indexes for table `cabuy`
--
ALTER TABLE `cabuy`
  ADD PRIMARY KEY (`id_cabuy`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `crm`
--
ALTER TABLE `crm`
  ADD PRIMARY KEY (`id_crm`),
  ADD KEY `id_cabuy` (`id_cabuy`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `kinerja_member`
--
ALTER TABLE `kinerja_member`
  ADD PRIMARY KEY (`id_kinerja`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`),
  ADD KEY `id_admin` (`id_admin`),
  ADD KEY `leader_id` (`leader_id`);

--
-- Indexes for table `proyek`
--
ALTER TABLE `proyek`
  ADD PRIMARY KEY (`id_proyek`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `rekomendasi_ai`
--
ALTER TABLE `rekomendasi_ai`
  ADD PRIMARY KEY (`id_rekomendasi`),
  ADD KEY `id_cabuy` (`id_cabuy`),
  ADD KEY `id_proyek` (`id_proyek`);

--
-- Indexes for table `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`id_survey`),
  ADD KEY `id_cabuy` (`id_cabuy`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_proyek` (`id_proyek`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cabuy`
--
ALTER TABLE `cabuy`
  MODIFY `id_cabuy` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `crm`
--
ALTER TABLE `crm`
  MODIFY `id_crm` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kinerja_member`
--
ALTER TABLE `kinerja_member`
  MODIFY `id_kinerja` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `proyek`
--
ALTER TABLE `proyek`
  MODIFY `id_proyek` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rekomendasi_ai`
--
ALTER TABLE `rekomendasi_ai`
  MODIFY `id_rekomendasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `survey`
--
ALTER TABLE `survey`
  MODIFY `id_survey` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cabuy`
--
ALTER TABLE `cabuy`
  ADD CONSTRAINT `cabuy_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm`
--
ALTER TABLE `crm`
  ADD CONSTRAINT `crm_ibfk_23` FOREIGN KEY (`id_cabuy`) REFERENCES `cabuy` (`id_cabuy`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `crm_ibfk_24` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kinerja_member`
--
ALTER TABLE `kinerja_member`
  ADD CONSTRAINT `kinerja_member_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_17` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_ibfk_18` FOREIGN KEY (`leader_id`) REFERENCES `member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `proyek`
--
ALTER TABLE `proyek`
  ADD CONSTRAINT `proyek_ibfk_1` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rekomendasi_ai`
--
ALTER TABLE `rekomendasi_ai`
  ADD CONSTRAINT `rekomendasi_ai_ibfk_25` FOREIGN KEY (`id_cabuy`) REFERENCES `cabuy` (`id_cabuy`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rekomendasi_ai_ibfk_26` FOREIGN KEY (`id_proyek`) REFERENCES `proyek` (`id_proyek`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_ibfk_58` FOREIGN KEY (`id_cabuy`) REFERENCES `cabuy` (`id_cabuy`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `survey_ibfk_59` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `survey_ibfk_60` FOREIGN KEY (`id_proyek`) REFERENCES `proyek` (`id_proyek`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
