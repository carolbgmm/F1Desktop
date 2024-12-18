	
CREATE TABLE `receta` (
  `id_receta` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre_receta` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nomre_categoria` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `ingredientes` (
  `id_ingrediente` int(11) NOT NULL,
  `nombre_ingrediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `instrucciones` (
  `id_instruccion` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `descripción` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `receta_ingredientes` (
  `id_receta` int(11) NOT NULL,
  `id_ingrediente` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('1','entrante');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('2','carne');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('3','pescado');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('4','ensalada');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('5','postre');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('6','pasta');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('7','verdura');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('8','caldo');
INSERT INTO `categoria`(`id_categoria`, `nomre_categoria`) VALUES ('9','otros');