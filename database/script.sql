-- Criação do banco e da tabela de leads
CREATE DATABASE IF NOT EXISTS azulcred
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE azulcred;

CREATE TABLE IF NOT EXISTS leads (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  cpf            CHAR(11) NOT NULL,
  nome           VARCHAR(150) NOT NULL,
  telefone       VARCHAR(20) NOT NULL,
  banco_recebe   VARCHAR(100),
  fonte_renda    ENUM('Aposentado_INSS', 'Servidor_Federal', 'Servidor_Estadual', 'Servidor_Municipal') NOT NULL,
  matricula      VARCHAR(50),
  motivo         VARCHAR(255),
  valor_desejado DECIMAL(12,2),
  parcelas       INT,
  valor_parcela  DECIMAL(12,2),
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  UNIQUE KEY uq_cpf_matricula (cpf, matricula)
) ENGINE=InnoDB;

-- Enum values, significa que o valor da fonte de renda deve ser um dos valores da enum