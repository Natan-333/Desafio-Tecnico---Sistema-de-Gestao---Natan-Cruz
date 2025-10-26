use crud;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fone` varchar(45) NOT NULL,
  `data_nascimento` varchar(255) NOT NULL,
  `CNPJ` varchar(14) NOT NULL,
  `nome_razao_social` varchar(80) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `endereco` varchar(150) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `senha` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

SELECT * FROM crud.usuarios;