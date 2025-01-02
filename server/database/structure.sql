-- altere esse dadabase para que seja possivel eu fazer uma rota no express que exiba dados de desempenho do usuario baseado nas categorias que ele resolveu ou total(questoes certas e erradas) tenha analise de desempenho por mensal ou semanal e tamb mostre a quantidade total de questoes respondidas
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS medfy CHARACTER SET utf8 COLLATE utf8_general_ci;
USE medfy;
-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	profileImage VARCHAR(255) DEFAULT 'https://ui-avatars.com/api/?background=008025&color=ffffff&name=Profile&size=100',
	cpf VARCHAR(14) UNIQUE NOT NULL,
	`role` ENUM('user', 'admin') DEFAULT 'user',
	university VARCHAR(255) DEFAULT NULL,
	`period` VARCHAR(50) DEFAULT NULL,
	`phone` VARCHAR(25) DEFAULT NULL,
	trainingYear YEAR DEFAULT NULL,
	specialty VARCHAR(255) DEFAULT NULL,
	meetBy VARCHAR(255) DEFAULT NULL,
	verified BOOLEAN DEFAULT FALSE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de tokens para recuperação/verificação de conta
CREATE TABLE IF NOT EXISTS tokens (
	userId INTEGER NOT NULL,
	token VARCHAR(255) NOT NULL,
	dueDate DATE NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (userId),
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	categoryName VARCHAR(255) NOT NULL,
	parentId INTEGER DEFAULT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de faculdades
CREATE TABLE IF NOT EXISTS colleges (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	acronym VARCHAR(30) NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de perguntas
CREATE TABLE IF NOT EXISTS questions (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	categoryId INTEGER,
	collegeId INTEGER,
	question TEXT NOT NULL,
	justification TEXT NOT NULL,
	`year` YEAR NOT NULL,
	cancelled TINYINT(1) NOT NULL DEFAULT 0,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE
	SET NULL,
		FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de opções
CREATE TABLE IF NOT EXISTS options (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	questionId INTEGER NOT NULL,
	optionText TEXT NOT NULL,
	isRight BOOLEAN NOT NULL DEFAULT FALSE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de desempenho
CREATE TABLE IF NOT EXISTS userPerformance (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	categoryId INTEGER,
	questionsAnswered INTEGER DEFAULT 0,
	questionsCorrect INTEGER DEFAULT 0,
	lastActivity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS userResponses (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	questionId INTEGER NOT NULL,
	answeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	isCorrect BOOLEAN NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS accessLogs (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	ipAddress VARCHAR(45) NOT NULL,
	userAgent TEXT NOT NULL,
	accessedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS appAccess (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	accessCount INTEGER NOT NULL DEFAULT 0,
	lastAccessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Tabela de report de erros de questões
CREATE TABLE IF NOT EXISTS questionReports (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	questionId INTEGER NOT NULL,
	reporterId INTEGER NOT NULL,
	reportReason TEXT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE,
	FOREIGN KEY (reporterId) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de planos de assinatura
CREATE TABLE IF NOT EXISTS subscriptionPlans (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	planName VARCHAR(255) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	benefits TEXT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS planSubscribers (
	planId INTEGER NOT NULL,
	totalSubscribers INTEGER DEFAULT 0,
	FOREIGN KEY (planId) REFERENCES subscriptionPlans(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS planUpdateLogs (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	adminId INTEGER NOT NULL,
	planId INTEGER NOT NULL,
	action ENUM('created', 'updated', 'deleted') NOT NULL,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (adminId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (planId) REFERENCES subscriptionPlans(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS paymentTransactions (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	subscriptionId INTEGER NOT NULL,
	transactionId VARCHAR(255) NOT NULL,
	paymentStatus ENUM('pending', 'approved', 'failed') DEFAULT 'pending',
	paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (subscriptionId) REFERENCES subscriptions(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de assinaturas dos usuários
CREATE TABLE IF NOT EXISTS subscriptions (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	planId INTEGER,
	isTrial BOOLEAN DEFAULT FALSE,
	status ENUM('active', 'expired') DEFAULT 'active',
	startDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	endDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (planId) REFERENCES subscriptionPlans(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Índices para desempenho
CREATE INDEX idx_categoryId ON questions(categoryId);
CREATE INDEX idx_questionId ON options(questionId);
CREATE INDEX idx_userId ON userPerformance(userId);
-- Util commands:
WITH RECURSIVE categoryHierarchy AS (
	SELECT id,
		categoryName,
		parentId
	FROM categories
	WHERE id = < id_da_categoria_desejada > -- Substitua pelo ID da categoria que você quer começar
	UNION ALL
	SELECT c.id,
		c.categoryName,
		c.parentId
	FROM categories c
		INNER JOIN categoryHierarchy ch ON c.parentId = ch.id
)
SELECT *
FROM categoryHierarchy;
SELECT *
FROM categories
WHERE parentId IS NULL;
SELECT *
FROM categories
WHERE parentId = (
		SELECT id
		FROM categories
		WHERE categoryName = 'Cirurgia Geral'
	);