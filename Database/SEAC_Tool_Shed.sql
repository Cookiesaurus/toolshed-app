DROP Database IF EXISTS SEAC_Tool_Shed;

CREATE Database SEAC_Tool_Shed;
USE SEAC_Tool_Shed;

CREATE TABLE Membership_Levels (
    /* The Membership_Levels table holds all active membership levels. These levels currently include: Registration, Tinkerer, MacGyver, Builder, Contractor */
    Membership_Level TINYINT UNSIGNED AUTO_INCREMENT, -- Membership_Level is the identification number used to uniquely identify each membership tier.  1 -- Registration, 2 -- Tinkerer, 3 -- MacGyver, 4 -- Builder, 5 -- Contractor
    Membership_Title VARCHAR(255) NOT NULL, -- Membership_Title holds the string name of each tieir i.e.  Registration, Tinkerer, MacGyver, Builder, Contractor
    Membership_Price FLOAT NOT NULL, -- Membership_Price holds the decimal value for the price of each membership tier per year
    Max_Tool_Checkout INT UNSIGNED NOT NULL, -- Max_Tool_Checkout holds the maximum value of tools a person with that membership tier can check out
    Is_Organizational BOOL NOT NULL, -- Assigns each membership to an organization or individual
    CONSTRAINT PK_Membership_Levels PRIMARY KEY (Membership_Level) -- Membership_Level is the primary key of this table
);

INSERT INTO Membership_Levels (Membership_Title, Membership_Price, Max_Tool_Checkout, Is_Organizational) VALUES -- Insert Default Membership_Levels into table
/* More Membership_Levels can be added in future and should be an option on admin page */
('Tinkerer', 25.00, 5, 0), -- Tinkerer Level
('MacGyver', 35.00, 10, 0), -- MacGyver Level
('Builder', 50.00, 25, 0), -- Builder Level
('Contractor', 100.00, 50, 1); -- Contractor Level


CREATE TABLE Privilege_Levels (
    /* The Provilege_Levels table holds all active privilege levels. These levels will be used to determine privileges with regard to the web application */
    Privilege_Level TINYINT UNSIGNED, -- Privilege_Level is the identification number used to uniquly identify each privilege level tier. 1 -- Customer 2 -- Volunteer 3 -- Employee 4 -- Manager 5 -- Administrator
    Privilege_Title VARCHAR(255) NOT NULL, -- Privilege_Title holds the string name for each privilege tier i.e.  Customer, Volunteer, Employee, Manager, Administrator
    CONSTRAINT PK_Privilege PRIMARY KEY (Privilege_Level) -- Privilege_Level is the primary key of this table
);

INSERT INTO Privilege_Levels (Privilege_Level,Privilege_Title) VALUES
(1,'Customer'), -- Customer Level
(2,'Volunteer'), -- Volunteer Level
(3,'Employee'), -- Employee Level 
(4,'Manager'), -- Manager Level
(5,'Administrator'); -- Administrator Level

CREATE TABLE Current_Membership_Status (
    /* The Current_Membership_Status table holds all membership status. These currenly being 1 -- Active and 2 -- Inactive */
    Membership_Status TINYINT UNSIGNED, -- Membership_Status holds the identification number for each unique membership status
    Membership_Status_Description VARCHAR(255), -- Membership_Status_Description holds the string value to describe each status i.e. Active and Inactive
    CONSTRAINT PK_Current_Membership_Status PRIMARY KEY (Membership_Status) -- Membership_Status is the primary key of this table
);

INSERT INTO Current_Membership_Status (Membership_Status, Membership_Status_Description) VALUES
(1,'Active'), -- Active Membership Status
(2,'Inactive'); -- Inactive Membership Status

CREATE TABLE Accounts (
    /* The Accounts table holds all relevant information for any user account. Here, all user account information shall be stored */
    Account_ID INT UNSIGNED AUTO_INCREMENT, -- Account_ID is a unique identifier for all Tool Shed users.
    First_Name VARCHAR(255) NOT NULL, -- First_Name is a string value which holds a persons first name
    Last_Name VARCHAR(255) NOT NULL,  -- Last_Name is a string value which holds a persons first name
    -- DOB DATE NOT NULL, -- DOB is a string value which hold a persons DOB. The format is YYYY-MM-DD
    Organization_Name VARCHAR(255), -- Organizational_Name shall be filled if account relates to an organization. This field holds the organizational name
    Email VARCHAR(255) NOT NULL UNIQUE, -- Email holds the email associated to the account
    Password VARBINARY(255) NOT NULL, -- Password here is the string value associated to an account. It will be stored using AES_Encrypt and verified using AES_Decrypt
    Phone_Number CHAR(10) NOT NULL UNIQUE, -- Phone_Number holds the 10 digit code associated with a phone number. Format of XXXXXXXXXX.
    Address_Line1 VARCHAR(255) NOT NULL, -- Address_Line1 hold the accounts registered address line 1
    Address_Line2 VARCHAR(255), -- Address_Line2 hold the accounts registered address line 2 if it is needed
    City VARCHAR(255) NOT NULL,  -- City holds the name of the city associated with the address
    State VARCHAR(255) NOT NULL, -- State holds the name of the state associated with the address
    Postal_Code CHAR(5) NOT NULL, -- Postal_Code holds the postal code associated with the address
    Account_Creation_Date DATE NOT NULL DEFAULT (CURRENT_DATE()), -- Account_Creation_Date holds the date when the account was first created. This value is always defaulted to the current date upon account creation
    Account_Notes TEXT, -- Account_Notes holds any notes important to the account for any employees
    Membership_Level TINYINT UNSIGNED NOT NULL, -- Membership_Level holds the integer code value associated with the account. Membership will be populated following membership signup
    Membership_Status TINYINT UNSIGNED NOT NULL DEFAULT "1", -- Membership_Status holds the integer code value associated with the active / inactive status of the account. The default status of an account is active unless specified by an employee
    Membership_Auto_Renewal BOOL NOT NULL DEFAULT "0", -- Membership_Auto_Renewal holds the boolean value associated with auto membership renewal. By default, this value is set to false (0)
    Membership_Creation_Date DATE NOT NULL DEFAULT (CURRENT_DATE()), -- Membership_Creation_Date holds the date when a membership is activated. This value is always defaulted to the current date when Registration status is set; however, this value will be changed once a new membership is seleted
    Membership_Expiration_Date DATE NOT NULL DEFAULT (DATE_ADD(CURRENT_DATE(), INTERVAL 1 YEAR)), -- Membership_Expiration_Date holds the date when a membership expires. This value is always defaulted to the current date when Registration status is set plus one year; however, this value will be changed once a new membership is seleted
    Privilege_Level TINYINT UNSIGNED NOT NULL DEFAULT "1", -- Privilege_Level is the identification number used to uniquly identify each privilege level tier. 1 -- Customer, 2 -- Volunteer, 3-- Employee, 4 -- Manager, 5 -- Administrator. This value is always defaulted to customer unless specified by an employee
    CONSTRAINT PK_Accounts PRIMARY KEY (Account_ID), -- The Account_ID is the primary key for the Accounts table
    CONSTRAINT FK_Accounts_Membership_Levels FOREIGN KEY (Membership_Level) REFERENCES Membership_Levels (Membership_Level), -- This statement creates a foreign key on Membership_Level, which is used to connect the Membership_Levels table to Accounts
    CONSTRAINT FK_Accounts_Privilege_Levels FOREIGN KEY (Privilege_Level) REFERENCES Privilege_Levels (Privilege_Level), -- This statement creates a foreign key on Privilege_Level, which is used to connect the Privilege_Levels table to Accounts
    CONSTRAINT FK_Accounts_Current_Membership_Status FOREIGN KEY (Membership_Status) REFERENCES Current_Membership_Status (Membership_Status) -- This statement creates a foreign key on Membership_Status, which is used to connect the Membership_Status table to Accounts
);

-- CUSTOMER ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer
("Bryce", "Hofstom", "bgh3077@g.rit.edu", AES_Encrypt("password","Bryce"), "2164075162", "8439 Sharp Lane", "Chesterland", "Ohio", 44026, 1);

INSERT INTO ACCOUNTS (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with tinkerer status
("Michael", "Pacholarz", "mfp7158@g.rit.edu", AES_Encrypt("password","Michael"), "7609223761", "7750 Sleepy Hollow Road", "Folsom", "California", 95630, 1);

INSERT INTO ACCOUNTS (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with tinkerer status plus two address lines
("Andy", "Erskine", "ate9624@g.rit.edu", AES_Encrypt("password","Andy"), "9037539683", "760 Lexington Ave.", "Apt. 4", "Cleburne", "Texas", 76031, 1);

INSERT INTO ACCOUNTS (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal) VALUES -- Normal Customer with MacGyver Status and Auto-renewal membership payment set to true
("Fei", "Gao", "fxg8365@g.rit.edu", AES_Encrypt("password","Fei"), "2184549695", "7908 South Durham St.", "Cottage Grove", "Minnesota", 55016, 3, 2);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Account_Notes, Membership_Level) VALUES -- Normal Customer with Builder Status and account notes
("Ian", "Dinga", "iad2750@g.rit.edu", AES_Encrypt("password","Ian"), "6462316017", "8402 Bridgeton Lane", "Corona", "New York", 11368, "Ian has not had any activity with the Tool Shed despite owning a Builder membership. Effort should be had to reach out and ensure he would still like to be a member.", 3);

INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with Contractor Status and Organization name
("Aryan", "Todi", "The Handymen LLC.","at1203@g.rit.edu", AES_Encrypt("password","Aryan"), "4236953998", "4 Windsor Ave.", "Memphis", "Tennessee", 38106, 4);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Account_Notes, Membership_Level, Membership_Status) VALUES -- Disabled Customer
("Evan", "Hiltzik", "eh8319@g.rit.edu", AES_Encrypt("password","Evan"), "5704143466", "98 Lilac Street", "Gibsonia", "Pennsylvania", 15044, "User account was disabled on 01/10/24 as customer decided to drop membership.", 1, 1);

-- Voluteer ACCOUNTS -- 

-- Employee ACCOUNTS -- 

-- Manager ACCOUNTS -- 

-- Administrator ACCOUNTS -- 
--------------- ADD MORE ------------------

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
    Card_Code CHAR(6) DEFAULT (LPAD(FLOOR(RAND() * 999999.99), 6, '0')),
    Membership_Level TINYINT UNSIGNED NOT NULL,
    Is_Applied BOOLEAN NOT NULL DEFAULT "0",
    CONSTRAINT PK_Gift_Cards PRIMARY KEY (Account_ID, Card_Code),
    CONSTRAINT FK_Gift_Cards_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID),
    CONSTRAINT FK_Gift_Cards_Membership_Levels FOREIGN KEY (Membership_Level) REFERENCES Membership_Levels (Membership_Level)
);

INSERT INTO Gift_Cards (Account_ID, Membership_Level, Is_Applied) VALUES 
(1, 2, 0),
(5, 4, 0),
(3, 3, 1);

CREATE TABLE Waivers (
    /* The Waivers table holds all waivers necessary for the SEAC Tool Shed buisness. Currently, there is the "Tool Waiver and Indemnification" and "Tool Lending Agreement" */
    Waiver_ID INT UNSIGNED, -- Waiver_ID holds the unique identifier for each waiver i.e. Waiver_ID -- 1, "Tool Lending Agreement" -- 2
    Waiver_Name VARCHAR(255) NOT NULL, -- Waiver_Name holds the string characters for the waiver_name
    Waiver_Details TEXT NOT NULL, -- Waiver_Details holds the text for each waiver
    CONSTRAINT PK_Waivers PRIMARY KEY (Waiver_ID) -- Waiver_ID is the primary key for the Waivers table
);

INSERT INTO Waivers (Waiver_ID, Waiver_Name, Waiver_Details) VALUES 
(1, "Tool Waiver and Indemnification", 
"I do hereby for myself, on behalf of my heirs, successors, and assigns, in consideration of being permitted to borrow tools, waive any and all claims against the SEAC’s Tool Shed for any personal injury, illness, death, or liability resulting from or arising out of the carelessness, recklessness, negligence and/or fault of the Tool Shed.

I do hereby for myself, on behalf of my heirs, successors, and assigns, in consideration of being permitted to borrow tools, agree to release and indemnify and hold harmless and defend SEAC’s Tool Shed, their offices, agents, volunteers, and employees from any and all liability, loss, claims, and demands, actions or cause of action for the death or injury to any persons and for any property damage suffered or incurred by any person which arises or may arise or be occasioned in any way from the use or possession of tools I am borrowing from the Tool Shed.

I grant to SEAC’s Tool Shed its representatives, volunteers, and employees the right to take photographs of me and my property. I authorize the Tool Shed, its assigns and transferees to copyright, use and publish the same in print and/or electronically. I agree that the Tool Shed may use such photographs of me with or without my name and for any lawful purpose, including for example such purposes as publicity, illustration, advertising, and web content.

The parties intend each provision to be severable and separate and apart from one another.

The parties agree that any and all disputes resulting in litigation will be commenced, litigated, and adjudicated only in the County of Monroe, State of New York pursuant the laws of the State of New York."),
(2, "Tool Lending Agreement", 
"1. Only residents of the Greater Rochester Area (Livingston, Monroe, Ontario, Orleans, Wayne, and Yates counties) who are over the age of 18 are eligible to borrow tools from SEAC’s Tool Shed.
2. Prior to borrowing tools, all Members must (a) complete a Membership Application; (b) pay a membership fee; and (c) verify his/her identity and residency. Verification is accomplished by presenting a valid photo ID and piece of mail, both displaying a local address. In the event that the Member’s photo ID does not display a local address, a second ID or piece of mail must be produced to verify residency. Additionally, the Member must sign this Tool Lending Agreement and the attached Waiver and Indemnification.
3. Members will be authorized a Membership Card. If the card is lost or stolen, the Member is responsible for reporting the loss or theft immediately. If a report is not made, the Member will be held responsible for any tools borrowed with a lost or stolen card.
4. Only the Member is authorized to use Tool Shed tools. The Member shall not permit the use of items checked out to them by any other person unless by the expressed permission of SEAC and its staff. Volunteers do not have the right to authorize this.
5. For those unfamiliar with a particular tool, safety training materials such as manuals (if in the possession of SEAC’s Tool Shed) will be made available upon request. However, by taking possession of any item, the member is certifying that they are capable of using that item in a safe and proper manner.
6. Necessary safety equipment is available upon request by the Member.
7. The Member agrees that SEAC and the Tool Shed is not responsible for any manufacturing defects in the quality of workmanship or materials inherent in any borrowed tools.
8. The Member agrees that if any borrowed tool becomes unsafe or in a state of disrepair, they will immediately discontinue use of the tool and notify SEAC’s Tool Shed of the issue on return, if not earlier. If a Member fails to inform SEAC’s Tool Shed that a tool is not in working order upon return, said Member may be held liable for full replacement.
9. Tools may only be reserved ahead of time for large community projects. Reservations should be made at least one week prior to project date. Requests should be in written form and can either be emailed or dropped off at SEAC’s Tool Shed in-person. Individual loans are on a first come first serve basis.
10. The loan period for tools is five days unless otherwise specified. Tools are to be returned to SEAC’s Tool Shed by closing time one (1) week from the day borrowed.
11. Late fees will be levied for each tool kept past the loan period. The late fee is $1 per tool per day, including days which the Tool Shed is not open. All tools borrowed from the Tool Shed must be returned during normal business hours.
12. When tools are not returned by the designated due date, the Tool Shed will issue an overdue notice after 30 days. If tools are not returned after an overdue notice is issued, appropriate steps will be taken to retrieve them, including the use of a collection agency and/or legal action, the cost of which will be assessed to the delinquent member. The Tool Shed may replace severely delinquent tools, holding the Member responsible for full replacement cost. Fines must be paid in full before borrowing additional items.
13. Any tools (including but not limited to those that require batteries and/or electric power to operate) require a member’s credit card to be kept on file as a deposit. Members will be assessed the full replacement cost of delinquent tools if they are not returned within thirty (30) days from the date they were originally checked out. The credit card on file will be charged on day thirty-one (31). A receipt of the charge or notice of the charge will be emailed to the address on file.
14. All items may be renewed once, for a second five day loan period, by contacting the Tool Shed and requesting a renewal in advance of the due date. Additional renewals are at the discretion of the Tool Shed.
14a. Renewal requests can be denied if tools have been requested for a community project.
15. Items are to be returned in the same condition as they were issued, barring normal wear and tear. All items must be returned clean. A $5 cleaning fee will be assessed if tools are returned dirty. The Member agrees to pay for the loss of or damage to any items and further agrees to accept Tool Shed staff’s assessment of condition of items and to further agree to Tool Shed staff’s assessment of fair restitution for damage, dirtiness, delinquency and/or loss of items in part or total. This restitution amount could equal as much as replacement cost of the item.
16. The Tool Shed retains the right to refuse the loan of any item to any person for any reason.
17. The membership and borrowing privileges of all Tool Shed members are subject to the provisions of this Lending Agreement, and failure to comply with this Lending Agreement may result in revocation of membership, loss of borrowing privileges, or legal action, as appropriate. The Tool Shed’s board of directors may, at its sole discretion, modify this Lending Policy, and all Tool Shed members will be subject to any such modified version.

I affirm that the information that I have provided on the Membership Application is current, true and correct. I understand that this information may be subject to verification.

I further state that I have read and fully understand the rules and regulations of the Tool Shed, and I understand that failure to comply with any of these rules may result in revocation of my borrowing privileges and/or legal action against me. I have read and signed a Waiver and Indemnification form, relinquishing any and all claims against the Tool Shed.");

CREATE TABLE Account_Waivers (
    Account_ID INT UNSIGNED,
    Waiver_ID INT UNSIGNED,
    Is_Signed BOOLEAN NOT NULL DEFAULT "0",
    CONSTRAINT PK_Account_Waivers PRIMARY KEY (Account_ID, Waiver_ID),
    CONSTRAINT FK_Account_Waivers_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID),
    CONSTRAINT FK_Account_Waivers_Waivers FOREIGN KEY (Waiver_ID) REFERENCES Waivers (Waiver_ID)
);

INSERT INTO Account_Waivers (Account_ID, Waiver_ID, Is_Signed) VALUES -- Insert Data into Associative Table
(1, 1, 0),
(1, 2, 0),
(2, 1, 0),
(2, 2, 0),
(3, 1, 0),
(3, 2, 0),
(4, 1, 0),
(4, 2, 1),
(5, 1, 0),
(5, 2, 1),
(6, 1, 1),
(6, 2, 1),
(7, 1, 1),
(7, 2, 1);

CREATE TABLE Transaction_Types (
    /* The Transaction Types table holds all codes related to all system transactions*/
    Transaction_Type TINYINT UNSIGNED, -- Transaction_Type holds the integer value code for each type of transaction i.e. Membership Change -- 1, Tool Check Out -- 2, Tool Return -- 3, Gift Card Purchase -- 4, Gift Card Activation -- 4, Rental Late Fee -- 6, Tool Replacement Fee -- 7
    Transaction_Details VARCHAR(255), -- Transaction_Details hold the string name value for each transaction code i.e. Membership Change, Tool Check Out, Tool Return, Gift Card Purchase, Tool Return Late Fee, Tool Replacement Fee
    CONSTRAINT PK_Transaction_Types PRIMARY KEY (Transaction_Type) -- Transaction_Type is the primary key for the Transaction_Types table
);

INSERT INTO Transaction_Types (Transaction_Type, Transaction_Details) VALUES 
(1, "Membership Change"), -- Membership Change Type
(2, "Tool Check Out"), -- Tool Check Out Type
(3, "Tool Return"), -- Tool Return Type
(4, "Gift Card Purchase"), -- Gift Card Purchase Type
(5, "Gift Card Activation"), -- Gift Card Activation Type
(6, "Rental Late Fee"), -- Rental Late Fee Type
(7, "Tool Replacement Fee"); -- Tool Replacement Fee Type

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
    /* Tool_Status table holds all tool status codes for tool availablity */
    Tool_Status TINYINT UNSIGNED, -- Tool_Status holds the number code which identifies that status of a tool i.e. Available -- 1, Checked Out -- 2, Maintenance -- 3, Disabled -- 4
    Tool_Status_Details VARCHAR(255) NOT NULL, -- Tool_Status_Details holds the string code defining each Tool_Status code
    CONSTRAINT PK_Tool_Statuses PRIMARY KEY (Tool_Status) -- Tool_Status is the primary key
);

INSERT INTO Tool_Statuses (Tool_Status, Tool_Status_Details) VALUES
(1, 'Available'), -- Available Status
(2, 'Checked Out'), -- Checked Out Status
(3, 'Maintenance'), -- Maintenance Status
(4, 'Disabled'); -- Disabled Status

CREATE TABLE Tool_Conditions (
    /* Tool_Conditions table holds all condition codes for all tools */ 
    Tool_Condition TINYINT UNSIGNED, -- Tool_Condition holds the number code which identifies the condition of a tool
    Tool_Condition_Details VARCHAR(255) NOT NULL, -- Tool_Condition_Details holds the string value of each Tool_Condition
    CONSTRAINT PK_Tool_Conditions PRIMARY KEY (Tool_Condition) -- Tool_Condition is the primary key
);

INSERT INTO Tool_Conditions (Tool_Condition, Tool_Condition_Details) VALUES
(1, "Poor"), -- Poor Status
(2, "Fair"), -- Fair Status
(3, "Good"), -- Good Status
(4, "Very Good"), -- Very Good Status
(5, "Excellent"); -- Excellent Status

CREATE TABLE Tool_Locations (
    /* Tool_Locations table holds all the current locations related to the Tool Shed System */
    Tool_Location INT UNSIGNED AUTO_INCREMENT, -- Tool_Location holds the number code which identifies the location code for locations
    Location_Name VARCHAR(255) NOT NULL, -- Location_Name holds the string value for each location code
    CONSTRAINT PK_Tool_Locations PRIMARY KEY (Tool_Location) -- Tool_Location is the primary key
);

INSERT INTO Tool_Locations (Location_Name) VALUES
/* More Tool_Locations can be added in future and should be an option on admin page */
('Main Location'), -- Main Location Location
('Mobile Unit'); -- Mobile Unit Location
-- ('Mobile Unit -> David F. Gantt Reacreation Center (Thursday)'),
-- ('Mobile Unit -> Edgerton Recreation Center (Tuesday)'),
-- ('Mobile Unit -> Thomas P. Ryan Center (Monday)'),
-- ('Mobile Unit -> Willie Walker Lightfoot Recreation Center (Wednesday)');

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
    CONSTRAINT FK_Tools_Tool_Locations_Home FOREIGN KEY (Home_Location) REFERENCES Tool_Locations (Tool_Location),
    CONSTRAINT FK_Tools_Tool_Locations_Current FOREIGN KEY (Current_Location) REFERENCES Tool_Locations (Tool_Location)
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

