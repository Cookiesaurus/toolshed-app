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

-- Memebership_Levels Inserts -- 
INSERT INTO Membership_Levels (Membership_Title, Membership_Price, Max_Tool_Checkout, Is_Organizational) VALUES
/* More Membership_Levels can be added in future and should be an option on admin page */
('Tinkerer', 25.00, 5, 0), -- Tinkerer Level
('MacGyver', 35.00, 10, 0), -- MacGyver Level
('Builder', 50.00, 25, 0), -- Builder Level
('Contractor', 100.00, 50, 1), -- Contractor Level
('Registration', 0.00, 0, 0); -- Registration Level

CREATE TABLE Privilege_Levels (
    /* The Privilege_Levels table holds all active privilege levels. These levels will be used to determine privileges with regard to the web application */
    Privilege_Level TINYINT UNSIGNED, -- Privilege_Level is the identification number used to uniquly identify each privilege level tier. 1 -- Customer 2 -- Volunteer 3 -- Employee 4 -- Manager 5 -- Administrator
    Privilege_Title VARCHAR(255) NOT NULL, -- Privilege_Title holds the string name for each privilege tier i.e.  Customer, Volunteer, Employee, Manager, Administrator
    CONSTRAINT PK_Privilege PRIMARY KEY (Privilege_Level) -- Privilege_Level is the primary key of this table
);

-- Privilege_Levels Inserts --
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

-- Current_Membership_Status Inserts --
INSERT INTO Current_Membership_Status (Membership_Status, Membership_Status_Description) VALUES
(1,'Active'), -- Active Membership Status
(2,'Inactive'); -- Inactive Membership Status

CREATE Table Genders (
    Gender_Code TINYINT UNSIGNED AUTO_INCREMENT,
    Gender_Name VARCHAR(255) NOT NULL,
    CONSTRAINT PK_Genders PRIMARY KEY (Gender_Code)
);

-- Genders Inserts --
INSERT INTO Genders (Gender_Name) VALUES
("Male"),
("Female"),
("Other"),
("Would Rather Not Specify");

CREATE TABLE Accounts (
    /* The Accounts table holds all relevant information for any user account. Here, all user account information shall be stored */
    Account_ID INT UNSIGNED AUTO_INCREMENT, -- Account_ID is a unique identifier for all Tool Shed users
    Customer_ID VARCHAR(40),
    First_Name VARCHAR(255) NOT NULL, -- First_Name is a string value which holds a persons first name
    Last_Name VARCHAR(255) NOT NULL,  -- Last_Name is a string value which holds a persons first name
    DOB DATE NOT NULL, -- DOB is the date of birth for the account member
    Gender_Code TINYINT UNSIGNED NOT NULL, -- Gender_Code holds the integer value for the persons sex
    Organization_Name VARCHAR(255), -- Organizational_Name shall be filled if account relates to an organization. This field holds the organizational name
    Email VARCHAR(255) NOT NULL UNIQUE, -- Email holds the email associated to the account
    Password VARBINARY(255) NOT NULL, -- Password here is the string value associated to an account. It will be stored using AES_Encrypt and verified using AES_Decrypt
    Phone_Number CHAR(10) NOT NULL, -- Phone_Number holds the 10 digit code associated with a phone number. Format of XXXXXXXXXX.
    Address_Line1 VARCHAR(255) NOT NULL, -- Address_Line1 hold the accounts registered address line 1
    Address_Line2 VARCHAR(255), -- Address_Line2 hold the accounts registered address line 2 if it is needed
    City VARCHAR(255) NOT NULL,  -- City holds the name of the city associated with the address
    State VARCHAR(255) NOT NULL, -- State holds the name of the state associated with the address
    Postal_Code CHAR(5) NOT NULL, -- Postal_Code holds the postal code associated with the address
    Secondary_First_Name VARCHAR(255),
    Secondary_Last_Name VARCHAR(255),
    Secondary_Email VARCHAR(255),
    Secondary_Phone_Number CHAR(10),
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
    CONSTRAINT FK_Accounts_Current_Membership_Status FOREIGN KEY (Membership_Status) REFERENCES Current_Membership_Status (Membership_Status), -- This statement creates a foreign key on Membership_Status, which is used to connect the Membership_Status table to Accounts
    CONSTRAINT FK_Accounts_Genders FOREIGN KEY (Gender_Code) REFERENCES Genders (Gender_Code) -- This statement creates a foreign key on Gender_Code, which is used to connect the Genders table to Accounts
);

-- Accounts Inserts --
-- Manager Accounts -- 
INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level, Customer_ID) VALUES
("Nick", "Wilbur", "2000-01-01", 1, "South East Area Coalition", "nick@SEACrochester.org", AES_Encrypt("password", ""), "5852718665", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 4, "XB18BCSMW9P2BAE2RPGY6HTEPR"); -- Nick Manager Account

-- Employee Accounts -- 
INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level, Customer_ID) VALUES
("Kiki", "Smith", "2000-01-01", 2, "South East Area Coalition", "kirstyn@SEACrochester.org", AES_Encrypt("password", ""), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3, "6YQB5EXJDCS7C13Z51YGA8YHXR"), -- Kiki Employee Account
("Lori", "Wood", "2000-01-01", 2, "South East Area Coalition", "lori@SEACrochester.org", AES_Encrypt("password", ""), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3, "N3XWDD97DWW3R4VZQRKRQCKKH4"), -- Lori Employee Account
("Sara", "Glauser", "2000-01-01", 2, "South East Area Coalition", "sara@SEACrochester.org", AES_Encrypt("password", ""), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3, "5PC4ZWXC49KPBNSZ4SVZJQGY7G"); -- Sara Employee Account

-- Customer Accounts -- 
INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Email, Password, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Secondary_First_Name, Secondary_Last_Name, Secondary_Email, Secondary_Phone_Number, Membership_Level, Privilege_Level, Customer_ID) VALUES -- Normal Customer W/Secondary Account
("The", "Handymen", "2023-07-16", "1", "thehandymen@rit.edu", AES_Encrypt("password", ""), "5852034445", "8439 Sharp Lane", "Apt. 4", "Chesterland", "Ohio", "44026", "Bryce", "Hofstrom", "bgh3077@g.rit.edu", "2164075162", 1, 1, "X4EMHE468TT9WHMZAPRRBVXQPC"),
("The", "HandymenAdmin", "2023-07-17", "1", "thehandymenadmin@rit.edu", AES_Encrypt("password", ""), "5852034446", "1111 Sharp Lane", "Apt. 7", "Chesterland", "Ohio", "44026", "Ian", "Dinga", "dinga@g.rit.edu", "1111111111", 4, 5, "EMKNY9JCDEV0T0DTNC4Y26CXFR");

CREATE TABLE Gift_Cards (
    /* The Gift_Cards table will hold all gift cards following thier purchase */
    Account_ID INT UNSIGNED, -- Account_ID is a unique identifier for all Tool Shed users
    Card_Code CHAR(6) DEFAULT (LPAD(FLOOR(RAND() * 999999.99), 6, '0')), -- Card_Code generates a random 6 digit number code to be used when claiming gift cards. These values will be sent to recipients via email
    Membership_Level TINYINT UNSIGNED NOT NULL, -- Membership_Level holds the integer code value associated with the account level to be granted by the gift code
    Is_Applied BOOL NOT NULL DEFAULT "0", -- Is_Applied determines if the gift card has been applied yet. This value is defaulted to false (0)
    CONSTRAINT PK_Gift_Cards PRIMARY KEY (Account_ID, Card_Code), -- Account_ID and Card_Code make up the primary keys for this table
    CONSTRAINT FK_Gift_Cards_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID), -- This statement creates a foreign key on Account_ID, which is used to connect the Gift_Cards table to Accounts 
    CONSTRAINT FK_Gift_Cards_Membership_Levels FOREIGN KEY (Membership_Level) REFERENCES Membership_Levels (Membership_Level)-- This statement creates a foreign key on Membership_Level, which is used to connect the Gift_Cards table to Membership_Levels 
);

INSERT INTO Gift_Cards (Account_ID, Membership_Level, Is_Applied) VALUES 
(5, 2, 0); -- The Handymen MacGuyver Unapplied Gift Card

CREATE TABLE Waivers (
    /* The Waivers table holds all waivers necessary for the SEAC Tool Shed buisness. Currently, there is the "Tool Waiver and Indemnification" and "Tool Lending Agreement" */
    Waiver_ID INT UNSIGNED, -- Waiver_ID holds the unique identifier for each waiver i.e. Waiver_ID -- 1 = "Tool Waiver and Indemnification" and  -- 2 = "Tool Lending Agreement"
    Waiver_Name VARCHAR(255) NOT NULL, -- Waiver_Name holds the string characters for the waiver_name
    Waiver_Details TEXT NOT NULL, -- Waiver_Details holds the text for each waiver
    CONSTRAINT PK_Waivers PRIMARY KEY (Waiver_ID) -- Waiver_ID is the primary key for the Waivers table
);

-- Waivers Inserts --
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

CREATE TABLE Transaction_Types (
    /* The Transaction Types table holds all codes related to all system transactions*/
    Transaction_Type TINYINT UNSIGNED, -- Transaction_Type holds the integer value code for each type of transaction i.e. Membership Change -- 1, Tool Check Out -- 2, Tool Return -- 3, Gift Card Purchase -- 4, Gift Card Activation -- 4, Rental Late Fee -- 6, Tool Replacement Fee -- 7
    Transaction_Details VARCHAR(255), -- Transaction_Details hold the string name value for each transaction code i.e. Membership Change, Tool Check Out, Tool Return, Gift Card Purchase, Tool Return Late Fee, Tool Replacement Fee
    CONSTRAINT PK_Transaction_Types PRIMARY KEY (Transaction_Type) -- Transaction_Type is the primary key for the Transaction_Types table
);

-- Tool_Transaction_Types Inserts --
INSERT INTO Transaction_Types (Transaction_Type, Transaction_Details) VALUES 
(1, "New Membership"), -- New Membership 
(2, "Membership Change"), -- Membership Change
(3, "Membership Renewal"), -- Membership Renewal
(4, "Cancelled Membership"), -- Cencelled Membership
(5, "Tool Check Out"), -- Tool Check Out Type
(6, "Tool Return"), -- Tool Return Type
(7, "Gift Card Purchase"), -- Gift Card Purchase Type
(8, "Gift Card Activation"), -- Gift Card Activation Type
(9, "Tool Late Fee"), -- Tool Loan Fee Type
(10, "Rental Fee"), -- Rental Late Fee Type
(11, "Tool Replacement Fee"), -- Tool Replacement Fee Type
(12, "Cleaning Fee"); -- Tool Cleaning Fee

CREATE TABLE Tool_Statuses ( 
    /* Tool_Status table holds all tool status codes for tool availablity */
    Tool_Status TINYINT UNSIGNED, -- Tool_Status holds the number code which identifies that status of a tool i.e. Available -- 1, Checked Out -- 2, Maintenance -- 3, Disabled -- 4
    Tool_Status_Details VARCHAR(255) NOT NULL, -- Tool_Status_Details holds the string code defining each Tool_Status code
    CONSTRAINT PK_Tool_Statuses PRIMARY KEY (Tool_Status) -- Tool_Status is the primary key
);

-- Tool_Statuses Inserts --
INSERT INTO Tool_Statuses (Tool_Status, Tool_Status_Details) VALUES
(1, 'Available'), -- Available Status
(2, 'Checked Out'), -- Checked Out Status
(3, 'Maintenance'), -- Maintenance Status
(4, 'Disabled'); -- Disabled Status

CREATE TABLE Tool_Locations (
    /* Tool_Locations table holds all the current locations related to the Tool Shed System */
    Tool_Location INT UNSIGNED AUTO_INCREMENT, -- Tool_Location holds the number code which identifies the location code for locations
    Location_Name VARCHAR(255) NOT NULL, -- Location_Name holds the string value for each location code
    CONSTRAINT PK_Tool_Locations PRIMARY KEY (Tool_Location) -- Tool_Location is the primary key
);

-- Tool_Locations Inserts --
INSERT INTO Tool_Locations (Location_Name) VALUES
/* More Tool_Locations can be added in future and should be an option on admin page */
('Main Location'), -- Main Location Location
('Mobile Unit - Thomas P. Ryan Center (Monday)'), -- Mobile Unit Location
('Mobile Unit - Edgerton Recreation Center (Tuesday)'), -- Mobile Unit Location
('Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)'), -- Mobile Unit Location
('Mobile Unit - David F. Gantt Reacreation Center (Thursday)'); -- Mobile Unit Location

CREATE TABLE Brands (
    /* Brands table holds all the brands locations related to the Tool Shed System */
    Brand_Name VARCHAR(255), -- Brand_Name which holds the string value of each brand
    CONSTRAINT PK_Brands PRIMARY KEY (Brand_Name) -- Brand_Name is the primary key
);

-- Brands Inserts -- 
INSERT INTO Brands (Brand_Name) VALUES
("noBrand"),
("Ace Hardware"),
("ADIRpro"),
("AdTech"),
("Air Stream"),
("Amana Tool"),
("AMC"),
("American Hickory"),
("American Power Pull"),
("Ames"),
("AMT"),
("Anvil"),
("Arrow Fastener"),
("Aspen Manufacturing Company"),
("Avanti"),
("B & K"),
("Bare Bones"),
("Bauer"),
("Benchtop"),
("Bessey"),
("Bissell"),
("BLACK+DECKER"),
("BlackHawk"),
("Blue Hawk"),
("Blum"),
("Bosch"),
("Boss Industries"),
("Bostitch"),
("Brasscraft"),
("Broan"),
("Brother"),
("Buffalo"),
("Bussmann"),
("C.S. Osbourne"),
("Cen-Tech"),
("Central Forge"),
("Central Hydraulics"),
("Central Pneumatic"),
("Centurion"),
("Chicago Electric"),
("Christmas Tree Shops"),
("Collins Axe"),
("Commander"),
("Commercial Electric"),
("Companion"),
("Convenience Concepts"),
("Cosco"),
("CRAFTSMAN"),
("Crofton"),
("Cummins"),
("Cuprum"),
("Dasco"),
("Delta"),
("DeWalt"),
("Dexter"),
("Dirt Devil"),
("Dowel Crafter"),
("Dremel"),
("Drillmaster"),
("Durakut International Corp."),
("Earthwise"),
("EDM"),
("Ego"),
("Elmers"),
("Eklind"),
("Empire"),
("Estwing"),
("Everbilt"),
("Exact"),
("Fiskars"),
("Fletcher"),
("Freud"),
("Garden Basics"),
("Gardener Bender"),
("General"),
("Gilmour"),
("Goldblatt"),
("Grabber"),
("Great Neck Saw"),
("Green Thumb"),
("Grizzly Industrial"),
("Hart"),
("HDC"),
("HDX"),
("Hercules"),
("Hi-Tech"),
("Hitachi"),
("Home Depot"),
("Homelife"),
("Honey Safety"),
("Husky"),
("Hyde"),
("HyperTough"),
("IDC"),
("Illinois Industrial Tool"),
("Industrial Manufacturer Inc"),
("Irwin"),
("Jiffy Steamer"),
("Johnson"),
("K-D mfg. co"),
("Keson"),
("KingCraft"),
("Klein Tools"),
("Kobalt"),
("Kreg"),
("Little Giant"),
("Lowe's"),
("Makita"),
("Marco"),
("Marshalltown"),
("Master Appliance"),
("Mastercraft"),
("Masterhand"),
("Mayer Paint & Hardware"),
("MBI"),
("Metabo"),
("Milwaukee"),
("Moen"),
("Mr. Long Arm"),
("Myro"),
("Nelson"),
("Newborn"),
("Nilfisk"),
("Pacific Hydrostar"),
("Performance Tool"),
("Pittsburgh"),
("Porter Cable"),
("Portland"),
("Powershot Pro"),
("Precision Components"),
("QEP"),
("QLP"),
("Quick-Grip"),
("RectorSeal"),
("Red Devil"),
("RIDGID"),
("Roberts"),
("RYOBI"),
("Scotts"),
("Sears"),
("Seymour"),
("SharkBite"),
("Shockproof"),
("Simer"),
("Singer"),
("Skil"),
("Snap Cut"),
("Southwire"),
("Sperry Instruments"),
("STAKON"),
("STANLEY"),
("Stark"),
("Straight Line"),
("Superior Tools"),
("Swingline"),
("Task Force"),
("TELVAC"),
("The Ridge Tool"),
("The Tile Shop"),
("Tool Source"),
("Toro"),
("TrimPro"),
("Triumph"),
("True Temper"),
("True Value"),
("Truper"),
("Tuff Tools"),
("Unger"),
("Vaughan"),
("Veritas"),
("Vermont American"),
("Vigaro"),
("Wagner"),
("Walco"),
("Warren Tool Group"),
("Warrior"),
("Waxx Pro"),
("Weed Eater"),
("Weller"),
("Wen"),
("Wendel"),
("White"),
("Wiha"),
("Wiss"),
("Work Sharp"),
("Workforce"),
("Workpro"),
("Worx"),
("Xcelite"),
("XLC"),
("Zircon");

CREATE TABLE Tools (
    /* The Tools table contains all tools in the SEAC Tool Shed*/
    Tool_ID INT UNSIGNED AUTO_INCREMENT, -- Tool_ID holds an integer value for each individual tool
    Old_Tool_ID VARCHAR(255), -- Tool_ID holds an integer value for each individual tool
    Tool_Name VARCHAR(255) NOT NULL, -- Tool_Name holds the name associated to each tool
    Brand_Name VARCHAR(255) NULL, -- Tool_Brand holds the code of each tool brand manufacturer
    Tool_Weight FLOAT, -- Tool_Weight holds the weight of the tool 
    Tool_Size VARCHAR(255), -- Tool_Size holds the size of the tool
    Home_Location INT UNSIGNED NOT NULL, -- Home_Location is the location where the tool is supposed to be returned to. 
    Current_Location INT UNSIGNED NOT NULL, -- Current_Location is the location where the tool is currently located. This value and Home_Location will mostly be the same unless the tool is classified as floating
    Location_Code VARCHAR(255), -- Location_Code is the string descriptor describing where the tool can be located at its current location
    Tool_Description TEXT, -- Tool_Description holds any details regarding the tool
    Tool_Status TINYINT UNSIGNED NOT NULL, -- Tool_Status determines the current status of the tool, these being Available, Checked Out, Maintenance, or Disabled
    Tool_Link VARCHAR(2000), -- Tool Image Link
    Tool_Manual VARCHAR(2000), -- Tool Manual holds any manual to assist with using a tool
    Tool_Loan_Fee FLOAT NOT NULL DEFAULT "0", -- Tool_Loan_Fee holds the monitary value for loaning a tool
    Default_Late_Fee FLOAT NOT NULL DEFAULT "1.00", -- Default_Late_Fee is the dollar amount to be charged to a user every day a tool is overdue. This value will continue to add up until returned until eventually charged
    Default_Loan_Length TINYINT UNSIGNED NOT NULL DEFAULT "7", -- Default_Loan_Length is used to determine the length of a loan before its required to be returned. By default, this value is 7 days
    Renewal_Amount TINYINT UNSIGNED NOT NULL Default "1", -- Renewal_Amount is the number value associated to the number of times a loan may be extened by a certain number of days.
    Tool_Replacement_Cost FLOAT NOT NULL, -- Tool_Replacement_Cost holds the cost of replacing a tool
    Is_Floating BOOLEAN NOT NULL, -- Is_Floating determines if a tool must be returned to home location or not
    Is_Featured BOOLEAN NOT NULL DEFAULT 0, -- Is_Featured determines if a tool will be featured on the main page
    CONSTRAINT PK_Tools PRIMARY KEY (Tool_ID), -- Tool_ID is the primary key of this table
    CONSTRAINT FK_Tools_Tool_Statuses FOREIGN KEY (Tool_Status) REFERENCES Tool_Statuses (Tool_Status), -- This statement creates a foreign key on Tool_Status , which is used to connect the to the Tool_Statuses table
    CONSTRAINT FK_Tools_Tool_Locations_Home FOREIGN KEY (Home_Location) REFERENCES Tool_Locations (Tool_Location), -- This statement creates a foreign key on Home_Location , which is used to connect the to the Tool_Locations table
    CONSTRAINT FK_Tools_Tool_Locations_Current FOREIGN KEY (Current_Location) REFERENCES Tool_Locations (Tool_Location), -- This statement creates a foreign key on Current_Location , which is used to connect the to the Tool_Locations table
    CONSTRAINT FK_Tools_Brands FOREIGN KEY (Brand_Name) REFERENCES Brands (Brand_Name)
);

CREATE TABLE Transactions (
    /* The Transactions table holds all transactions related to each account */
    Transaction_ID INT UNSIGNED AUTO_INCREMENT, -- Transaction_ID holds a unique integer value to describe each transaction
    Account_ID INT UNSIGNED NOT NULL, -- Account_ID is a unique identifier for all Tool Shed users
    Tool_ID INT UNSIGNED,
    Transaction_Status VARCHAR(255),
    Transaction_Date DATE NOT NULL, -- Transaction_Date holds the date value for the transaction
    Transaction_Type TINYINT UNSIGNED NOT NULL, -- Transaction_Type holds the integer value describing each transaction
    End_Date DATE, -- End_Date holds the end date value for a transaction. Tools must be returned by this date or result in a Rental Late Fee
    Check_In_Date DATE, -- Check_Out_Date holds the date value describing when tools are returned up by renter
    Payment_Amount FLOAT DEFAULT 0.00, -- Payment_Amount holds the float integer value describing any money amounts payed to the SEAC Tool Shed for a transaction
    CONSTRAINT PK_Transactions PRIMARY KEY (Transaction_ID), -- Transaction_ID is the primary key for this table
    CONSTRAINT FK_Transaction_Transaction_Types FOREIGN KEY (Transaction_Type) REFERENCES Transaction_Types (Transaction_Type), -- This statement creates a foreign key on Transaction_Type, which is used to connect the to the Transaction_Types table
    CONSTRAINT FK_Transactions_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID), -- This statement creates a foreign key on Account_ID, which is used to connect the to the Accounts table
    CONSTRAINT FK_Transactions_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID) 
);

CREATE TABLE Transaction_Payments (
    Transaction_ID INT UNSIGNED,
    Invoice_Number VARCHAR(255),
    Payment_ID VARCHAR(2000) NOT NULL,
    CONSTRAINT PK_Transaction_Payments PRIMARY KEY (Transaction_ID, Invoice_Number),
    CONSTRAINT FK_Transaction_Payments_Transactions FOREIGN KEY (Transaction_ID) REFERENCES Transactions (Transaction_ID)
);


CREATE TABLE Categories (
    /* The Categories table contains all of the avaialble tool categories for the SEAC Tool Shed */
    Category_ID INT UNSIGNED AUTO_INCREMENT, -- Category_ID contains the integer value for each category
    Category_Name VARCHAR(255) NOT NULL, -- Category_Name describes the string value for each category
    CONSTRAINT PK_Categories PRIMARY KEY (Category_ID) -- Category_ID is the primary key
);

-- Categories Inserts --
INSERT INTO Categories (Category_Name) VALUES
("Crafting"), -- Crafting Category
("Drill Extension"), -- Drill Extension Category
("Drywall"), -- Drywall Category
("Masonry"), -- Masonry Category
("Electrical"), -- Electrical Category
("Carpentry/Woodworking"), -- Carpentry & Woodworking Category
("Miscellaneous"), -- Miscellaneous Category
("Painting"), -- Painting Category
("Plumbing"), -- Plumbing Category
("Roofing"), -- Roofing Category
("Metalworking/Welding"), -- Welding Category
("Pneumatic"), -- Pneumatic Category
("Automotive"), -- Automotive Category
("Bike"), -- Bike Category
("Clamps/Vises"), -- Clamps & Vises Category
("Flooring"), -- Flooring Category
("Gardening/Landscape"), -- Gardening & Landscape Category
("Measuring/Diagnostics"), -- Measuring & Diagnostics Category
("Crafting/Arts"), -- Crafting & Arts Category
("Event Planning"); -- Event Planning Category

CREATE TABLE Tool_Categories (
    /* The Tool_Categories tables is an associative table joining the Tools table to the Categories table. This table will be populated upon Tool creation */
    Tool_ID INT UNSIGNED, -- Tool_ID holds an integer value for each individual tool
    Category_ID INT UNSIGNED, -- Category_ID holds an integer value for each individual category
    CONSTRAINT PK_Tool_Categories PRIMARY KEY (Tool_ID, Category_ID), -- Tool_ID and Category_ID make up the primary keys
    CONSTRAINT FK_Tool_Categories_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID) ON DELETE CASCADE, -- This statement creates a foreign key on Tool_ID, which is used to connect the to the Tools table
    CONSTRAINT FK_Tool_Categories_Categories FOREIGN KEY (Category_ID) REFERENCES Categories (Category_ID) ON DELETE CASCADE -- This statement creates a foreign key on Category_ID, which is used to connect the to the Categories table
);

CREATE TABLE Types (
    /* The Types table contains all of the available tool types for the SEAC Tool Shed */
    Type_ID INT UNSIGNED AUTO_INCREMENT, -- Type_ID contains the integer value for each tool type
    Type_Name VARCHAR(255) NOT NULL, -- Type_Name contains the string value for each tool type
    CONSTRAINT PK_Types PRIMARY KEY (Type_ID) -- PK_Types is the primary key
);
-- Type Inserts
INSERT INTO Types (Type_Name) VALUES
("Action Clamps"),
("Air Guns"),
("Air Tanks"),
("Angle Grinders"),
("Automotive Jacks"),
("Automotive Tools"),
("Axes"),
("Back Saws"),
("Ball Peen Hammers"),
("Band Saws"),
("Bar Clamps"),
("Basin Wrenches"),
("Belt Sanders"),
("Bench Grinders"),
("Biscuit Joiners"),
("Bolt Cutters"),
("Books"),
("Bow Saws"),
("Braces & Bits"),
("Brad Nailers"),
("Brick Hammers"),
("Brick Trowels"),
("Brooms"),
("Brushes and Rollers"),
("Buffers"),
("Buffs"),
("C Clamps"),
("Carpet Cutters"),
("Carpet Kickers"),
("Carpet Seam Irons"),
("Carpet Steam Cleaners"),
("Caulk Guns"),
("Cement Chisels"),
("Chain Wrenches"),
("Chains, Ropes, and Straps"),
("Chainsaws"),
("Chalklines"),
("Channellock Pliers"),
("Chop Saws"),
("Circuit Testers"),
("Circular Saws"),
("Clamps"),
("Claw Hammers"),
("Cold Chisels"),
("Combination Wrench Sets"),
("Compound Miter Saws"),
("Compressors"),
("Concrete Rakes"),
("Conduit Benders"),
("Corded"),
("Cordless"),
("Corner Clamps"),
("Corner Trowels"),
("Crimpers"),
("Crosscut Saws"),
("Cultivators"),
("Dado Saw Blades"),
("Detail Sanders"),
("Die Grinders"),
("Dollies"),
("Dovetail Jigs"),
("Drain Augers"),
("Drain Spade Shovels"),
("Drill Bits"),
("Drill Press"),
("Drills"),
("Drywall Lifts"),
("Drywall Saws"),
("Drywall Tools"),
("Electric"),
("Electrical Tools"),
("Extension Cords"),
("Extension Poles"),
("F Clamps"),
("Fans"),
("Fence Pliers"),
("Files"),
("Finish Nailers"),
("Finishing Power Sanders"),
("Fish Tapes"),
("Flat Screwdrivers"),
("Floats"),
("Flooring Nailers"),
("Flooring Tools"),
("Framing Nailers"),
("Garden Rakes"),
("Garden Tools"),
("Gear Pullers"),
("Grinders"),
("Grout Trowels"),
("Hack Saws"),
("Hammer Drills"),
("Hammers & Mallets"),
("Hand Miter Saws"),
("Hand Pruner"),
("Hand Pump Sprayers"),
("Hand Seeders"),
("Hand Tamps"),
("Hand Tile Cutters"),
("Hand Tillers"),
("Hand Tools"),
("Hatchets"),
("Heat Guns"),
("Heaters"),
("Hedge Trimmers"),
("Hex Keys"),
("Hobbies & Crafts"),
("Hobby & Craft Kits"),
("Hoes"),
("Hole Saw Kits"),
("Hole Saws"),
("Impact Drivers"),
("Jack Stands"),
("Jackhammers"),
("Jig Saws"),
("Jigs"),
("Joiners"),
("Jumper Cables"),
("Ladders"),
("Laminate Flooring Cutters"),
("Lawn Edgers"),
("Lawn Mowers"),
("Leaf Blowers"),
("Leaf Mulchers"),
("Leaf Rakes"),
("Levels"),
("Lights"),
("Lineman Pliers"),
("Linoleum Knives"),
("Locking Pliers"),
("Loppers"),
("Lug Wrenches"),
("Manual Drain Augers"),
("Margin Trowels"),
("Measuring & Layout Tools"),
("Meters & Diagnostics"),
("Meters & Diagnostics Accessories"),
("Misc Hand Tools"),
("Miscellaneous Stands"),
("Mixers"),
("Mud Pans"),
("Multimeters"),
("Multitools"),
("Nail Pullers"),
("Needle Nose Pliers"),
("Notched Trowels"),
("Orbit Sanders"),
("Paint Nozzles"),
("Paint Removers"),
("Paint Scrapers"),
("Paint Sprayers"),
("Parallel Action Pliers"),
("Pedal Wrenches"),
("Pick Mattocks"),
("Pickaxes"),
("Pipe Clamps"),
("Pipe Cutters"),
("Pipe Wrenches"),
("Pitchforks"),
("Planters"),
("Plastic Tip Hammers"),
("Pliers"),
("Plumb Bobs"),
("Plumbing Tools"),
("Pocket Hole Jigs"),
("Pole Pickers"),
("Post Hole Diggers"),
("Power Drills"),
("Power Planers"),
("Power Sanders"),
("Power Tools"),
("Pressure Washers"),
("Pruning Saws"),
("Pruning Shears"),
("Pry Bars & Crowbars"),
("Pumps"),
("Rachet Sets"),
("Rasps"),
("Ratcheting Wrench Sets"),
("Reciprocating Saws"),
("Respirators"),
("Rip Hammers"),
("Rivet Tools"),
("Roller Tools"),
("Roof Brackets"),
("Roofing Nailers"),
("Roofing Shovels"),
("Rotary Tools"),
("Rototiller"),
("Round Point Shovels"),
("Router Tables"),
("Routers"),
("Rubber Mallets"),
("Rulers"),
("Safety Equipment"),
("Safety Glasses"),
("Sandblasters"),
("Sanders"),
("Saw Horses"),
("Saws"),
("Scissors"),
("Screwdriver Sets"),
("Screwdrivers"),
("Screwguns"),
("Scroller Power Saws"),
("Sewer Cables"),
("Sewing Machines"),
("Sharpeners"),
("Sheet Sanders"),
("Shovels"),
("Sledgehammers"),
("Sliding Compound Miter Saws"),
("Socket Sets"),
("Soldering Irons"),
("Spade Shovels"),
("Spiral Saws"),
("Splitters"),
("Sprinklers"),
("Square Shovel"),
("Square Shovels"),
("Squares"),
("Squeegees"),
("Staple Guns"),
("Staplers"),
("Steam Cleaners"),
("Stem Keys"),
("Stepstools"),
("String Trimmer"),
("String Trimmers"),
("Striping Tools"),
("Stud Finders"),
("Submersible Pumps"),
("Table Rollers"),
("Table Saws"),
("Tachometers"),
("Tack Hammers"),
("Tap and Die"),
("Tape Measures"),
("Taping Knives"),
("Tents & Canopies"),
("Testers "),
("Tile Nippers"),
("Timing Lights"),
("Tin Snips"),
("Toilet Augers"),
("Tool Bench Work Mate"),
("Tool Boxes"),
("Tool Kits"),
("Tool Stands & Work Tables"),
("Torque Wrenches"),
("Trimmers"),
("Trowels"),
("Tubbing Benders"),
("Tuck Point Trowels"),
("Tuck Pointers"),
("Utility Knives"),
("Vacuums"),
("Vises"),
("Voltage Testers"),
("Wallpaper Steamers"),
("Weeders"),
("Wet Tile Saws"),
("Wet-Dry Vacs"),
("Wheel Seeders"),
("Wheelbarrows"),
("Wire Cutters"),
("Wire Strippers"),
("Worm Drive Circular Saws"),
("Wrenches");

CREATE TABLE Tool_Types (
    /* The Tool_Categories tables is an associative table joining the Tools table to the Categories table. This table will be populated upon Tool creation */
    Tool_ID INT UNSIGNED, -- Tool_ID holds an integer value for each individual tool
    Type_ID INT UNSIGNED, -- Type_ID holds an integer value for each individual type
    CONSTRAINT PK_Tool_Categories PRIMARY KEY (Tool_ID, Type_ID), -- Tool_ID and Type_ID make up the primary keys
    CONSTRAINT FK_Tool_Types_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID) ON DELETE CASCADE, -- This statement creates a foreign key on Tool_ID, which is used to connect the to the Tools table
    CONSTRAINT FK_Tool_Types_Types FOREIGN KEY (Type_ID) REFERENCES Types (Type_ID) ON DELETE CASCADE -- This statement creates a foreign key on Type_ID, which is used to connect the to the Types table
);