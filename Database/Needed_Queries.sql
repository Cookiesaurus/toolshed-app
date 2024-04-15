-- Admin Page Queries -- 

-- All Customer Info -> Show All Customers List --
SELECT Accounts.Account_ID, CONCAT(Accounts.First_Name, " ", Accounts.Last_Name) AS "Name", Accounts.Email AS "Email", Accounts.Organization_Name 
AS "Organization", Membership_Levels.Membership_Title As "Membership Title", Accounts.Membership_Expiration_Date "Expiration Date" FROM Accounts
INNER JOIN Membership_Levels ON Accounts.Membership_Level=Membership_Levels.Membership_Level
WHERE Accounts.Privilege_Level = 1; -- (Remove if we want all users)

-- All Customer Info Based on Account_ID -> Edit User Page --
SELECT Accounts.Account_ID, Accounts.First_Name, Accounts.Last_Name, Accounts.DOB, Genders.Gender_Name, Accounts.Organization_Name, Accounts.Email, Accounts.Password, Accounts.Phone_Number, Accounts.Address_Line1, Accounts.Address_Line2, Accounts.City, Accounts.State, Accounts.Postal_Code, Accounts.Secondary_First_Name, Accounts.Secondary_Last_Name, Accounts.Secondary_Email, Accounts.Secondary_Phone_Number, Accounts.Account_Creation_Date, Accounts.Account_Notes, Membership_Levels.Membership_Title, Current_Membership_Status.Membership_Status_Description, Accounts.Membership_Auto_Renewal, Accounts.Membership_Creation_Date, Accounts.Membership_Expiration_Date, Privilege_Levels.Privilege_Title FROM Accounts
INNER JOIN Genders ON Accounts.Gender_Code = Genders.Gender_Code
INNER JOIN Privilege_Levels ON Accounts.Privilege_Level = Privilege_Levels.Privilege_Level
INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level
INNER JOIN Current_Membership_Status ON Accounts.Membership_Status = Current_Membership_Status.Membership_Status
WHERE Accounts.Account_ID = 1; -- Set to whatever user ID is selected

-- Adding New Tools into the DB --
INSERT INTO Tools (Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, 
				   Tool_Link, Tool_Manual, Tool_Loan_Fee, Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, Is_Floating, 
                   Is_Featured)
		    VALUES ("Test Insert Tool", "Husky", 13, "55", 1, 2, "Can be found in the Test Tool Section", "This is a tester tool to be tested for inserting tools",
            1, "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", 0, 7, 7, 1, 225, 1, 1);
INSERT INTO Tool_Categories VALUES (1, 1), (1, 2), (1, 5), (1, 9);
INSERT INTO Tool_Types VALUES (1, 1);

INSERT INTO Tools (Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, 
				   Tool_Link, Tool_Manual, Tool_Loan_Fee, Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, Is_Floating, 
                   Is_Featured)
		    VALUES ("Test Insert Tool", "Husky", 13, "55", 1, 2, "Can be found in the Test Tool Section", "This is a tester tool to be tested for inserting tools",
            1, "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", 0, 7, 7, 1, 225, 1, 1);
INSERT INTO Tool_Categories VALUES (2, 1), (2, 2), (2, 5), (2, 9);
INSERT INTO Tool_Types VALUES (2, 1);

-- Updating Tool Information --
UPDATE Tools
SET Tool_Name = "Test Tool Insert 2", Brand_Name = "Ace Hardware", Tool_Weight = 15, Tool_Size = "77", Home_Location = 2, Current_Location = 2, Location_Code = "Near new Tester Tools", Tool_Description = "Tester Update Tool 2", Tool_Status = 1,
Tool_Link = "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", Tool_Manual = "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", Tool_Loan_Fee = 5, Default_Late_Fee = 2, Default_Loan_Length = 10, Renewal_Amount = 2, Tool_Replacement_Cost = 300, Is_Floating = 1, 
Is_Featured = 1
WHERE Tool_ID = 1;

DELETE FROM Tool_Categories WHERE Tool_ID = 1;
INSERT INTO Tool_Categories VALUES (1, 1), (1, 2), (1,3);

DELETE FROM Tool_Types WHERE Tool_ID = 1;
INSERT INTO Tool_Types VALUES (1, 2);

-- Deleting Tool Information --
DELETE FROM Tools WHERE Tool_ID = 1;

-- Transaction Queries --
-- Add Some Transaction Types --
INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, End_Date) VALUES -- Check Out Closed
(5, 1, "Closed", "2024-04-02", 5, "2024-04-09");
INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, End_Date, Check_In_Date, Payment_Amount) VALUES -- Check In Closed
(5, 1, "Closed", "2024-04-09", 6, "2024-04-09", "2024-04-09", 0);
INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, End_Date) VALUES -- Check Out Open (Late)
(5, 2, "Open", "2024-04-05", 5, "2024-04-12");

-- Adding New Users into the DB --
INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Password, Phone_Number, Address_Line1,
					 Address_Line2, City, State, Postal_Code, Secondary_First_Name, Secondary_Last_Name,
                     Secondary_Email, Secondary_Phone_Number, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal,
                     Privilege_Level) 
VALUES ("Test Add", "User", "2002-04-13", 1, "The Handymen", "thehandymentester@gmail.com", AES_Encrypt("password", ""), "5867771234", 
       "1234 Kilmour Road", "Unit 7", "Rochester", "New York", "14623", "Test Add 2", "User 2", "thehandymentester2@gmail.com",
       "5857775678", "This is a newly added Test User via the create new user option!", 1, 1, 0, 1);
       
-- Still need Logic to insert Square Customer ID and Charge User per Membership_Level
	
-- Updating Users --
UPDATE Accounts 
SET First_Name = "Test Update", Last_Name = "User", DOB = "2002-04-13", Gender_Code = 2, Organization_Name = "The Handymen", Email = "thehandymenupdatetester@gmail.com", Password = AES_Encrypt("test", ""), Phone_Number = "5867771234", Address_Line1 = "1234 Kilmour Road",
					 Address_Line2 = "Unit 7", City = "Rochester", State = "New York", Postal_Code = "14623", Secondary_First_Name = "Test Update 3", Secondary_Last_Name = "User",
                     Secondary_Email = "thehandymentester3@gmail.com", Secondary_Phone_Number = "5857775678", Account_Notes = "This is a newly added Test User via the update new user option!", Membership_Level = 1, Membership_Status = 1, Membership_Auto_Renewal = 1,
                     Privilege_Level = 1
WHERE Account_ID = 7;

-- This Query takes into account no membership changes. If a change were to take place, more logic would be needed!

-- Delete (Archive) Users
UPDATE Accounts
SET Membership_Level = 5, Membership_Status = 2, Membership_Auto_Renewal = 0, Membership_Creation_Date = CURDATE(), 
Membership_Expiration_Date = CURDATE()
WHERE Account_ID = 7;

-- Sets User to Inactive Status, and moved all membership information to registration status. Should we make a page to deal with expired users? --

-- Get Customers based on names --

-- Filters Query -- 
-- Revenue/Expense Reports --
-- Get data based on revenue earned from membership fees
-- Get data based on revenue earned from late fees
-- Get data based on money saved from tool purchases
-- Get data based on expenses from tool replacement purchases

-- Tool Reports --
-- Get data based on number of tool loans completed --
-- Get data based on number of tools checked out --
-- Generate maintenance report based on tools in maintenance --

-- Misc Reports -- 
-- Custom reports based on selecting fields from a list --
-- Get data based on estimated waste kept from landfills -- 

-- Customer Page Queries --

-- Updating Personal Customer Information -- 
-- Updating Membership Information (Delete payment methods?) --
-- Deleting Membership Information (Delete payment methods?) --
-- Updating payment method --
-- Viewing transaction history --
-- Query for login (Update to get privilege level so auth can be done)
-- Update transactions when a tool is checked out --

-- Membership Levels Query --


