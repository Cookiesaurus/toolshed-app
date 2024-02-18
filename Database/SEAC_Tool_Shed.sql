DROP Database IF EXISTS SEAC_Tool_Shed;

CREATE Database SEAC_Tool_Shed;
USE SEAC_Tool_Shed;

CREATE TABLE Membership_Levels (
    Membership_Level TINYINT UNSIGNED,
    Membership_Title VARCHAR(255) NOT NULL,
    Membership_Price FLOAT NOT NULL,
    Max_Tool_Checkout INT UNSIGNED NOT NULL,
    CONSTRAINT PK_Membership_Levels PRIMARY KEY (Membership_Level)
);

INSERT INTO Membership_Levels (Membership_Level, Membership_Title, Membership_Price, Max_Tool_Checkout) VALUES
(1,'Registration', 0.00, 0),
(2,'Tinkerer', 25.00, 5),
(3,'MacGyver', 35.00, 10),
(4,'Builder', 50.00, 25),
(5,'Contractor', 100.00, 50);

CREATE TABLE Privilege_Levels (
    Privilege_Level TINYINT UNSIGNED,
    Privilege_Title VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Privilege PRIMARY KEY (Privilege_Level)
);

INSERT INTO Privilege_Levels (Privilege_Level,Privilege_Title) VALUES
(1,'Customer'),
(2,'Volunteer'),
(3,'Employee'),
(4,'Manager'),
(5,'Administrator');

CREATE TABLE Current_Membership_Status (
    Membership_Status TINYINT UNSIGNED,
    Membership_Status_Description VARCHAR(255),
    CONSTRAINT PK_Current_Membership_Status PRIMARY KEY (Membership_Status)
);

INSERT INTO Current_Membership_Status (Membership_Status, Membership_Status_Description) VALUES
(1,'Active'),
(2,'Inactive');

CREATE TABLE Accounts (
    Account_ID INT UNSIGNED AUTO_INCREMENT,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    Organization_Name VARCHAR(255),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL, -- Store and retrieve with AES ENCRYPT and AES DECRYPT
    Phone_Number CHAR(10) NOT NULL UNIQUE, -- Not including Country Code
    Address_Line1 VARCHAR(255) NOT NULL,
    Address_Line2 VARCHAR(255),
    City VARCHAR(255) NOT NULL, 
    State VARCHAR(255) NOT NULL, -- Should this be not null?
    Postal_Code CHAR(5) NOT NULL, -- Should this be not null?
    Account_Creation_Date DATE NOT NULL DEFAULT (CURRENT_DATE),
    -- Account_Balance FLOAT NOT NULL DEFAULT "0.00", -- Should this be not null?
    Account_Notes TEXT,
    Membership_Level TINYINT UNSIGNED NOT NULL DEFAULT "0", -- Default Account made to be at Registration level (0); Should this be not null?
    Membership_Status TINYINT UNSIGNED NOT NULL DEFAULT "1",
    Membership_Auto_Renewal BOOLEAN NOT NULL DEFAULT "0",
    Membership_Creation_Date DATE NOT NULL DEFAULT (CURRENT_DATE()),
    Membership_Expiration_Date DATE NOT NULL DEFAULT (DATE_ADD(CURRENT_DATE(), INTERVAL 1 YEAR)), -- 
    Privilege_Level TINYINT UNSIGNED NOT NULL DEFAULT "0", -- Default Account made to be at privilege level (0); Should this be not null?
    CONSTRAINT PK_Accounts PRIMARY KEY (Account_ID),
    CONSTRAINT FK_Accounts_Membership_Levels FOREIGN KEY (Membership_Level) REFERENCES Membership_Levels (Membership_Level),
    CONSTRAINT FK_Accounts_Privilege_Levels FOREIGN KEY (Privilege_Level) REFERENCES Privilege_Levels (Privilege_Level),
    CONSTRAINT FK_Accounts_Current_Membership_Status FOREIGN KEY (Membership_Status) REFERENCES Current_Membership_Status (Membership_Status)
);

CREATE TABLE Payment_Methods (
    Account_ID INT UNSIGNED AUTO_INCREMENT,
    Payment_Method CHAR(16) NOT NULL,
    Payment_Type VARCHAR(255) NOT NULL,
    Expiration_Date DATE NOT NULL,
    Security_Code CHAR(3) NOT NULL,
    CONSTRAINT PK_Payment_Methods PRIMARY KEY (Account_ID),
    CONSTRAINT FK_Payment_Methods_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID)
);

CREATE TABLE Gift_Cards (
    Account_ID INT UNSIGNED,
    Card_Code CHAR(6) NOT NULL UNIQUE DEFAULT (FLOOR(RAND() * 999999.99)),
    Membership_Level TINYINT UNSIGNED NOT NULL,
    Is_Applied BOOLEAN NOT NULL DEFAULT "0",
    CONSTRAINT PK_Gift_Cards PRIMARY KEY (Account_ID, Card_Code),
    CONSTRAINT FK_Gift_Cards_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID),
    CONSTRAINT FK_Gift_Cards_Membership_Levels FOREIGN KEY (Membership_Level) REFERENCES Membership_Levels (Membership_Level)
);

CREATE TABLE Waivers (
    Waiver_ID INT UNSIGNED,
    Waiver_Name VARCHAR(255) NOT NULL,
    Waiver_Details TEXT NOT NULL,
    CONSTRAINT PK_Waivers PRIMARY KEY (Waiver_ID)
);

CREATE TABLE Account_Waivers (
    Account_ID INT UNSIGNED,
    Waiver_ID INT UNSIGNED,
    Is_Signed BOOLEAN NOT NULL DEFAULT "0",
    CONSTRAINT PK_Account_Waivers PRIMARY KEY (Account_ID, Waiver_ID),
    CONSTRAINT FK_Account_Waivers_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID),
    CONSTRAINT FK_Account_Waivers_Waivers FOREIGN KEY (Waiver_ID) REFERENCES Waivers (Waiver_ID)
);

CREATE TABLE Transaction_Types (
    Transaction_Type TINYINT UNSIGNED,
    Transaction_Details VARCHAR(255),
    CONSTRAINT PK_Transaction_Types PRIMARY KEY (Transaction_Type)
);

CREATE TABLE Transactions ( -- 7 DAY LOAN AMOUNT FOR LOANS
    Transaction_ID INT UNSIGNED AUTO_INCREMENT,
    Account_ID INT UNSIGNED NOT NULL,
    Transaction_Date DATE NOT NULL,
    Transaction_Type TINYINT UNSIGNED NOT NULL,
    Tool_ID INT UNSIGNED, -- Come back to later. Will need to address how reservations, and loads -- Can be empty
    Start_Date DATE,
    End_Date DATE,
    Check_Out_Date DATE,
    Check_In_Date DATE,
    Payment_Amount FLOAT, -- MONEY VALYE
    CONSTRAINT PK_Transactions PRIMARY KEY (Transaction_ID),
    CONSTRAINT FK_Transaction_Transaction_Types FOREIGN KEY (Transaction_Type) REFERENCES Transaction_Types (Transaction_Type),
    CONSTRAINT FK_Trasactions_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID)
);

CREATE TABLE Tool_Statuses (
    Tool_Status TINYINT UNSIGNED,
    Tool_Status_Details VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Tool_Statuses PRIMARY KEY (Tool_Status)
);

INSERT INTO Tool_Statuses (Tool_Status, Tool_Status_Details) VALUES
(1, 'Available'),
(2, 'Checked Out'),
(3, 'Reserved'),
(4, 'Maintenance'),
(5, 'Disabled');

CREATE TABLE Tool_Conditions (
    Tool_Condition TINYINT UNSIGNED,
    Tool_Condition_Details VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Tool_Conditions PRIMARY KEY (Tool_Condition)
);

CREATE TABLE Tool_Locations (
    Tool_Location_ID INT UNSIGNED NOT NULL,
    Location_Name VARCHAR(255) NOT NULL, -- Location_Name versus Location_Code
    CONSTRAINT PK_Tool_Locations PRIMARY KEY (Tool_Location_ID)

);

INSERT INTO Tool_Locations (Tool_Location_ID, Location_Name) VALUES
(1, 'Main Location'),
(2, 'Mobile Unit'), 
(3, 'Mobile Unit -> David F. Gantt Reacreation Center (Thursday)'),
(4, 'Mobile Unit -> Edgerton Recreation Center (Tuesday)'),
(5, 'Mobile Unit -> Thomas P. Ryan Center (Monday)'),
(6, 'Mobile Unit -> Willie Walker Lightfoot Recreation Center (Wednesday)');

CREATE TABLE Tools (
    Tool_ID INT UNSIGNED AUTO_INCREMENT,
    Tool_Name VARCHAR(255) NOT NULL,
    Tool_Brand VARCHAR(255),
    Tool_Model VARCHAR(255),
    Tool_Weight FLOAT, -- Decimals 
    Tool_Size FLOAT, -- Floats
    Home_Location INT UNSIGNED NOT NULL,
    Current_Location INT UNSIGNED NOT NULL,
    Location_Code VARCHAR(255),
    Tool_Description TEXT,
    Tool_Admin_Notes TEXT,
    Tool_Status TINYINT UNSIGNED NOT NULL, -- Default Value?
    Tool_Condition TINYINT UNSIGNED NOT NULL,
    Eco_Rating VARCHAR(255),
    Embodied_Carbon VARCHAR(255),
    Emission_Factor FLOAT, -- MONEY VALUE
    Tool_Image MEDIUMBLOB,
    Tool_Manual MEDIUMBLOB,
    Default_Loan_Length TINYINT UNSIGNED NOT NULL DEFAULT "7",
    Renewal_Amount TINYINT UNSIGNED NOT NULL Default "1",
    Default_Late_Fee FLOAT NOT NULL DEFAULT "1.00",
    Was_Purchased BOOLEAN,
    Date_Purchased DATE,
    Purchase_Cost FLOAT, -- MONEY VALYE
    Tool_Replacement_Cost FLOAT NOT NULL, -- MONEY VALYE
    Tool_Supplier VARCHAR(255),
    CONSTRAINT PK_Tools PRIMARY KEY (Tool_ID),
    CONSTRAINT FK_Tools_Tool_Conditions FOREIGN KEY (Tool_Condition) REFERENCES Tool_Conditions (Tool_Condition),
    CONSTRAINT FK_Tools_Tool_Statuses FOREIGN KEY (Tool_Status) REFERENCES Tool_Statuses (Tool_Status),
    CONSTRAINT FK_Tools_Tool_Locations_Home FOREIGN KEY (Home_Location) REFERENCES Tool_Locations (Tool_Location_ID),
    CONSTRAINT FK_Tools_Tool_Locations_Current FOREIGN KEY (Current_Location) REFERENCES Tool_Locations (Tool_Location_ID)
);

CREATE TABLE Tool_Transactions (
    Tool_ID INT UNSIGNED,
    Transaction_ID INT UNSIGNED,
    CONSTRAINT PK_Tool_Transaction PRIMARY KEY (Tool_ID, Transaction_ID),
    CONSTRAINT FK_Tool_Transactions_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID),
    CONSTRAINT FK_Tool_Transactions_Transactions FOREIGN KEY (Transaction_ID) REFERENCES Transactions (Transaction_ID)
);

CREATE TABLE Categories (
    Category_ID INT UNSIGNED AUTO_INCREMENT,
    Category_Name VARCHAR(255),
    CONSTRAINT PK_Categories PRIMARY KEY (Category_ID)
);

INSERT INTO Categories (Category_ID, Category_Name) VALUES
(1, 'Crafting'),
(2, 'Drill Extension'),
(3, 'Drywall Tools'),
(4, 'Electrical'),
(5, 'Flooring'),
(6, 'Masonry'),
(7, 'Misc'),
(8, 'Painting'),
(9, 'Plumbing'),
(10, 'Roofing'),
(11, 'Saw Blades'),
(12, 'Welding'),
(13, 'Woodworking');

CREATE TABLE Tool_Categories (
    Tool_ID INT UNSIGNED,
    Category_ID INT UNSIGNED,
    CONSTRAINT PK_Tool_Categories PRIMARY KEY (Tool_ID, Category_ID),
    CONSTRAINT FK_Tool_Categories_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID),
    CONSTRAINT FK_Tool_Categories FOREIGN KEY (Category_ID) REFERENCES Categories (Category_ID)
);

