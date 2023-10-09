CREATE DATABASE ticket_project_DB;
USE ticket_project_DB;

CREATE TABLE users (
   userID INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(255) NOT NULL,
   phoneNumber VARCHAR(255) NOT NULL,
   phoneVerified BOOLEAN NOT NULL,
   PRIMARY KEY (userID)
);

CREATE TABLE attorneys (
   attorneyID INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(255) NOT NULL,
   phoneNumber VARCHAR(255) NOT NULL,
   phoneVerified BOOLEAN NOT NULL,
   PRIMARY KEY (attorneyID)
);

CREATE TABLE tickets (
    ticketID INT NOT NULL AUTO_INCREMENT,
    userID INT,
    date DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL,
    offense VARCHAR(255) NOT NULL,
    notePicture VARCHAR(255),
    ticketPicture VARCHAR(255),
    PRIMARY KEY (ticketID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE offers (
    offerID INT NOT NULL AUTO_INCREMENT,
    ticketID INT,
    attorneyID INT,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (offerID),
    FOREIGN KEY (ticketID) REFERENCES tickets(ticketID),
    FOREIGN KEY (attorneyID) REFERENCES attorneys(attorneyID)
);


-- Testdaten 

INSERT INTO users (username, phoneNumber, phoneVerified) VALUES 
('user1', '+1234567890', TRUE),
('user2', '+1234567891', FALSE),
('user3', '+1234567892', TRUE);

INSERT INTO attorneys (username, phoneNumber, phoneVerified) VALUES 
('attorney1', '+9876543210', TRUE),
('attorney2', '+9876543211', FALSE),
('attorney3', '+9876543212', TRUE);

INSERT INTO tickets (userID, date, status, offense, notePicture, ticketPicture) VALUES 
(1, '2023-10-08 10:00:00', 'open', 'Speeding', 'https://example.com/notes/note1.jpg', 'https://example.com/tickets/ticket1.jpg'),
(2, '2023-10-08 11:00:00', 'open', 'Illegal Parking', 'https://example.com/notes/note2.jpg', 'https://example.com/tickets/ticket2.jpg'),
(3, '2023-10-08 12:00:00', 'closed', 'Running a Red Light', 'https://example.com/notes/note3.jpg', 'https://example.com/tickets/ticket3.jpg');

INSERT INTO offers (ticketID, attorneyID, price, description, date, status) VALUES 
(1, 1, 150.00, 'Offer for speeding', '2023-10-08 13:00:00', 'pending'),
(2, 2, 100.00, 'Offer for illegal parking', '2023-10-08 14:00:00', 'accepted'),
(3, 3, 200.00, 'Offer for running a red light', '2023-10-08 15:00:00', 'rejected');

