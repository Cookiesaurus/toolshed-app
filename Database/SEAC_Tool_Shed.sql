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

CREATE TABLE Privilege_Levels (
    /* The Privilege_Levels table holds all active privilege levels. These levels will be used to determine privileges with regard to the web application */
    Privilege_Level TINYINT UNSIGNED, -- Privilege_Level is the identification number used to uniquly identify each privilege level tier. 1 -- Customer 2 -- Volunteer 3 -- Employee 4 -- Manager 5 -- Administrator
    Privilege_Title VARCHAR(255) NOT NULL, -- Privilege_Title holds the string name for each privilege tier i.e.  Customer, Volunteer, Employee, Manager, Administrator
    CONSTRAINT PK_Privilege PRIMARY KEY (Privilege_Level) -- Privilege_Level is the primary key of this table
);

CREATE TABLE Current_Membership_Status (
    /* The Current_Membership_Status table holds all membership status. These currenly being 1 -- Active and 2 -- Inactive */
    Membership_Status TINYINT UNSIGNED, -- Membership_Status holds the identification number for each unique membership status
    Membership_Status_Description VARCHAR(255), -- Membership_Status_Description holds the string value to describe each status i.e. Active and Inactive
    CONSTRAINT PK_Current_Membership_Status PRIMARY KEY (Membership_Status) -- Membership_Status is the primary key of this table
);

CREATE TABLE Accounts (
    /* The Accounts table holds all relevant information for any user account. Here, all user account information shall be stored */
    Account_ID INT UNSIGNED AUTO_INCREMENT, -- Account_ID is a unique identifier for all Tool Shed users
    First_Name VARCHAR(255) NOT NULL, -- First_Name is a string value which holds a persons first name
    Last_Name VARCHAR(255) NOT NULL,  -- Last_Name is a string value which holds a persons first name
    Organization_Name VARCHAR(255), -- Organizational_Name shall be filled if account relates to an organization. This field holds the organizational name
    Email VARCHAR(255) NOT NULL UNIQUE, -- Email holds the email associated to the account
    Password VARBINARY(255) NOT NULL, -- Password here is the string value associated to an account. It will be stored using AES_Encrypt and verified using AES_Decrypt
    Phone_Number CHAR(10) NOT NULL, -- Phone_Number holds the 10 digit code associated with a phone number. Format of XXXXXXXXXX.
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

CREATE TABLE Payment_Methods (
    /* TBD NEED SQUARE INFO FIRST*/
    Account_ID INT UNSIGNED AUTO_INCREMENT,
    Payment_Method CHAR(16) NOT NULL,
    Payment_Type VARCHAR(255) NOT NULL,
    Expiration_Date DATE NOT NULL,
    Security_Code CHAR(3) NOT NULL,
    CONSTRAINT PK_Payment_Methods PRIMARY KEY (Account_ID),
    CONSTRAINT FK_Payment_Methods_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID)
);

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

CREATE TABLE Waivers (
    /* The Waivers table holds all waivers necessary for the SEAC Tool Shed buisness. Currently, there is the "Tool Waiver and Indemnification" and "Tool Lending Agreement" */
    Waiver_ID INT UNSIGNED, -- Waiver_ID holds the unique identifier for each waiver i.e. Waiver_ID -- 1 = "Tool Waiver and Indemnification" and  -- 2 = "Tool Lending Agreement"
    Waiver_Name VARCHAR(255) NOT NULL, -- Waiver_Name holds the string characters for the waiver_name
    Waiver_Details TEXT NOT NULL, -- Waiver_Details holds the text for each waiver
    CONSTRAINT PK_Waivers PRIMARY KEY (Waiver_ID) -- Waiver_ID is the primary key for the Waivers table
);

CREATE TABLE Account_Waivers (
    /* The Account_Waivers tables is an associative table joining the Accounts table to the Waivers table. This table will be populated upon Account creation */
    Account_ID INT UNSIGNED, -- Account_ID is a unique identifier for all Tool Shed users
    Waiver_ID INT UNSIGNED, -- Waiver_ID holds the unique identifier for each waiver i.e. Waiver_ID -- 1, "Tool Lending Agreement" -- 2
    Is_Signed BOOLEAN NOT NULL DEFAULT "0", -- Is_Signed determines whether each waiver, for each account, is signed
    CONSTRAINT PK_Account_Waivers PRIMARY KEY (Account_ID, Waiver_ID), -- Account_ID and Waiver_ID make up the primary keys for this table
    CONSTRAINT FK_Account_Waivers_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID), -- This statement creates a foreign key on Account_ID, which is used to connect the Account_Waivers table to Accounts 
    CONSTRAINT FK_Account_Waivers_Waivers FOREIGN KEY (Waiver_ID) REFERENCES Waivers (Waiver_ID) --  This statement creates a foreign key on Waiver_ID, which is used to connect the Account_Waivers table to Waivers 
);

CREATE TABLE Transaction_Types (
    /* The Transaction Types table holds all codes related to all system transactions*/
    Transaction_Type TINYINT UNSIGNED, -- Transaction_Type holds the integer value code for each type of transaction i.e. Membership Change -- 1, Tool Check Out -- 2, Tool Return -- 3, Gift Card Purchase -- 4, Gift Card Activation -- 4, Rental Late Fee -- 6, Tool Replacement Fee -- 7
    Transaction_Details VARCHAR(255), -- Transaction_Details hold the string name value for each transaction code i.e. Membership Change, Tool Check Out, Tool Return, Gift Card Purchase, Tool Return Late Fee, Tool Replacement Fee
    CONSTRAINT PK_Transaction_Types PRIMARY KEY (Transaction_Type) -- Transaction_Type is the primary key for the Transaction_Types table
);

CREATE TABLE Transactions (
    /* The Transactions table holds all transactions related to each account */
    Transaction_ID INT UNSIGNED AUTO_INCREMENT, -- Transaction_ID holds a unique integer value to describe each transaction
    Account_ID INT UNSIGNED NOT NULL, -- Account_ID is a unique identifier for all Tool Shed users
    Transaction_Date DATE NOT NULL, -- Transaction_Date holds the date value for the transaction
    Transaction_Type TINYINT UNSIGNED NOT NULL, -- Transaction_Type holds the integer value describing each transaction
    Start_Date DATE, -- Start_Date holds the start date value for a transaction
    End_Date DATE, -- End_Date holds the end date value for a transaction. Tools must be returned by this date or result in a Rental Late Fee
    Check_Out_Date DATE, -- Check_Out_Date holds the date value describing when tools are picked up by renter
    Check_In_Date DATE, -- Check_Out_Date holds the date value describing when tools are returned up by renter
    Payment_Amount FLOAT, -- Payment_Amount holds the float integer value describing any money amounts payed to the SEAC Tool Shed for a transaction
    CONSTRAINT PK_Transactions PRIMARY KEY (Transaction_ID), -- Transaction_ID is the primary key for this table
    CONSTRAINT FK_Transaction_Transaction_Types FOREIGN KEY (Transaction_Type) REFERENCES Transaction_Types (Transaction_Type), -- This statement creates a foreign key on Transaction_Type, which is used to connect the to the Transaction_Types table
    CONSTRAINT FK_Trasactions_Accounts FOREIGN KEY (Account_ID) REFERENCES Accounts (Account_ID) -- This statement creates a foreign key on Account_ID, which is used to connect the to the Accounts table
);

CREATE TABLE Tool_Statuses ( 
    /* Tool_Status table holds all tool status codes for tool availablity */
    Tool_Status TINYINT UNSIGNED, -- Tool_Status holds the number code which identifies that status of a tool i.e. Available -- 1, Checked Out -- 2, Maintenance -- 3, Disabled -- 4
    Tool_Status_Details VARCHAR(255) NOT NULL, -- Tool_Status_Details holds the string code defining each Tool_Status code
    CONSTRAINT PK_Tool_Statuses PRIMARY KEY (Tool_Status) -- Tool_Status is the primary key
);

CREATE TABLE Tool_Locations (
    /* Tool_Locations table holds all the current locations related to the Tool Shed System */
    Tool_Location INT UNSIGNED AUTO_INCREMENT, -- Tool_Location holds the number code which identifies the location code for locations
    Location_Name VARCHAR(255) NOT NULL, -- Location_Name holds the string value for each location code
    CONSTRAINT PK_Tool_Locations PRIMARY KEY (Tool_Location) -- Tool_Location is the primary key
);


CREATE Table Tool_Sub_Locations (
      /* Tool_Sub_Locations table holds all the current sub locations related to the Tool Shed System */
    Tool_Sub_Location INT UNSIGNED AUTO_INCREMENT, -- Tool_Sub_Location holds the number code which identifes the sub locations
    Sub_Location_Name VARCHAR(255) NOT NULL, -- Sub_Location_Name holds the string value for the sub location name
    Tool_Location INT UNSIGNED NOT NULL, -- Tool_Location holds the number code which identifies the location code for locations
    CONSTRAINT PK_Tool_Sub_Locations PRIMARY KEY (Tool_Sub_Location), -- Tool_Sub_Location holds the number code which identifies the sub location code
    CONSTRAINT FK_Tool_Sub_Locations_Tool_Locations FOREIGN KEY (Tool_Location) REFERENCES Tool_Locations (Tool_Location) -- This statement creates a foreign key on Tool_Location , which is used to connect the to the Tool_Locations table
);

CREATE TABLE Brands (
      /* Brands table holds all the brands locations related to the Tool Shed System */
    Brand_Name VARCHAR(255), -- Brand_Name which holds the string value of each brand
    CONSTRAINT PK_Brands PRIMARY KEY (Brand_Name)
);

CREATE TABLE Tools (
    /* The Tools table contains all tools in the SEAC Tool Shed*/
    Tool_ID INT UNSIGNED AUTO_INCREMENT, -- Tool_ID holds an integer value for each individual tool
    Old_Tool_ID VARCHAR(255), -- Tool_ID holds an integer value for each individual tool
    Tool_Name VARCHAR(255) NOT NULL, -- Tool_Name holds the name associated to each tool
    Brand_Name VARCHAR(255), -- Tool_Brand holds the code of each tool brand manufacturer
    Tool_Weight FLOAT, -- Tool_Weight holds the weight of the tool 
    Tool_Size VARCHAR(255), -- Tool_Size holds the size of the tool
    Home_Location INT UNSIGNED NOT NULL, -- Home_Location is the location where the tool is supposed to be returned to. 
    Current_Location INT UNSIGNED NOT NULL, -- Current_Location is the location where the tool is currently located. This value and Home_Location will mostly be the same unless the tool is classified as floating
    Location_Code VARCHAR(255), -- Location_Code is the string descriptor describing where the tool can be located at its current location
    Tool_Description TEXT, -- Tool_Description holds any details regarding the tool
    Tool_Status TINYINT UNSIGNED NOT NULL, -- Tool_Status determines the current status of the tool, these being Available, Checked Out, Maintenance, or Disabled
    Tool_Image MEDIUMBLOB, -- Tool_Image holds the image for a tool
    Tool_Link VARCHAR(2000), -- Tool Image Link
    Tool_Manual MEDIUMBLOB, -- Tool Manual holds any manual to assist with using a tool
    Tool_Loan_Fee FLOAT NOT NULL DEFAULT "0", -- Tool_Loan_Fee holds the monitary value for loaning a tool
    Default_Late_Fee FLOAT NOT NULL DEFAULT "1.00", -- Default_Late_Fee is the dollar amount to be charged to a user every day a tool is overdue. This value will continue to add up until returned until eventually charged
    Default_Loan_Length TINYINT UNSIGNED NOT NULL DEFAULT "7", -- Default_Loan_Length is used to determine the length of a loan before its required to be returned. By default, this value is 7 days
    Renewal_Amount TINYINT UNSIGNED NOT NULL Default "1", -- Renewal_Amount is the number value associated to the number of times a loan may be extened by a certain number of days.
    Tool_Replacement_Cost FLOAT NOT NULL, -- Tool_Replacement_Cost holds the cost of replacing a tool
    Is_Floating BOOLEAN NOT NULL, -- Is_Floating determines if a tool must be returned to home location or not
    Is_Featured BOOLEAN NOT NULL, -- Is_Featured determines if a tool will be featured on the main page
    CONSTRAINT PK_Tools PRIMARY KEY (Tool_ID), -- Tool_ID is the primary key of this table
    CONSTRAINT FK_Tools_Tool_Statuses FOREIGN KEY (Tool_Status) REFERENCES Tool_Statuses (Tool_Status), -- This statement creates a foreign key on Tool_Status , which is used to connect the to the Tool_Statuses table
    CONSTRAINT FK_Tools_Tool_Locations_Home FOREIGN KEY (Home_Location) REFERENCES Tool_Locations (Tool_Location), -- This statement creates a foreign key on Home_Location , which is used to connect the to the Tool_Locations table
    CONSTRAINT FK_Tools_Tool_Locations_Current FOREIGN KEY (Current_Location) REFERENCES Tool_Locations (Tool_Location), -- This statement creates a foreign key on Current_Location , which is used to connect the to the Tool_Locations table
    CONSTRAINT FK_Tools_Brands FOREIGN KEY (Brand_Name) REFERENCES Brands (Brand_Name)
);

CREATE TABLE Tool_Transactions (
    /* The Tool_Transactions tables is an associative table joining the Tools table to the Transactions table. This table will be populated upon Transaction creation */
    Tool_ID INT UNSIGNED, -- Tool_ID holds an integer value for the tool involved in a transaction. Only applies to transactions related to tools
    Transaction_ID INT UNSIGNED, -- Transaction_ID holds a unique integer value to describe each transaction
    CONSTRAINT PK_Tool_Transaction PRIMARY KEY (Tool_ID, Transaction_ID), -- Tool_ID and Transaction_ID are the primary keys
    CONSTRAINT FK_Tool_Transactions_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID), -- This statement creates a foreign key on Tool_ID, which is used to connect the to the Tools table
    CONSTRAINT FK_Tool_Transactions_Transactions FOREIGN KEY (Transaction_ID) REFERENCES Transactions (Transaction_ID) -- This statement creates a foreign key on Transaction_ID, which is used to connect the to the Transactions table
);

CREATE TABLE Categories (
    /* The Categories table contains all of the avaialble tool categories for the SEAC Tool Shed */
    Category_ID INT UNSIGNED AUTO_INCREMENT, -- Category_ID contains the integer value for each category
    Category_Name VARCHAR(255) NOT NULL, -- Category_Name describes the string value for each category
    CONSTRAINT PK_Categories PRIMARY KEY (Category_ID) -- Category_ID is the primary key
);

CREATE TABLE Tool_Categories (
    /* The Tool_Categories tables is an associative table joining the Tools table to the Categories table. This table will be populated upon Tool creation */
    Tool_ID INT UNSIGNED, -- Tool_ID holds an integer value for each individual tool
    Category_ID INT UNSIGNED, -- Category_ID holds an integer value for each individual category
    CONSTRAINT PK_Tool_Categories PRIMARY KEY (Tool_ID, Category_ID), -- Tool_ID and Category_ID make up the primary keys
    CONSTRAINT FK_Tool_Categories_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID), -- This statement creates a foreign key on Tool_ID, which is used to connect the to the Tools table
    CONSTRAINT FK_Tool_Categories_Categories FOREIGN KEY (Category_ID) REFERENCES Categories (Category_ID) -- This statement creates a foreign key on Category_ID, which is used to connect the to the Categories table
);

CREATE TABLE Types (
    /* The Types table contains all of the available tool types for the SEAC Tool Shed */
    Type_ID INT UNSIGNED AUTO_INCREMENT, -- Type_ID contains the integer value for each tool type
    Type_Name VARCHAR(255) NOT NULL, -- Type_Name contains the string value for each tool type
    CONSTRAINT PK_Types PRIMARY KEY (Type_ID) -- PK_Types is the primary key
);

CREATE TABLE Tool_Types (
    /* The Tool_Categories tables is an associative table joining the Tools table to the Categories table. This table will be populated upon Tool creation */
    Tool_ID INT UNSIGNED, -- Tool_ID holds an integer value for each individual tool
    Type_ID INT UNSIGNED, -- Type_ID holds an integer value for each individual type
    CONSTRAINT PK_Tool_Categories PRIMARY KEY (Tool_ID, Type_ID), -- Tool_ID and Type_ID make up the primary keys
    CONSTRAINT FK_Tool_Types_Tools FOREIGN KEY (Tool_ID) REFERENCES Tools (Tool_ID), -- This statement creates a foreign key on Tool_ID, which is used to connect the to the Tools table
    CONSTRAINT FK_Tool_Types_Types FOREIGN KEY (Type_ID) REFERENCES Types (Type_ID) -- This statement creates a foreign key on Type_ID, which is used to connect the to the Types table
);

CREATE TABLE States (
    State_ID INT AUTO_INCREMENT,
    State_Name VARCHAR(50),
    State_Code CHAR(2),
    CONSTRAINT PK_States PRIMARY KEY (State_ID)
);
