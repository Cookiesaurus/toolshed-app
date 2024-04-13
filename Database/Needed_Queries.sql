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

-- Updating Customer Info -- -> Very Dependent On what is changed
-- UPDATE Accounts
-- SET column_name = new_value, column_name = new_value, ... Column Names Found on Line 10
-- WHERE Accounts.Account_ID = whatever user ID is selected

-- Adding New Tools into the DB --
INSERT INTO Tools (Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, 
				   Tool_Link, Tool_Manual, Tool_Loan_Fee, Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, Is_Floating, 
                   Is_Featured)
		    VALUES ("Test Insert Tool", "Husky", 13, "55", 1, 2, "Can be found in the Test Tool Section", "This is a tester tool to be tested for inserting tools",
            1, "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", "https://seachtoolshedimages.s3.us-east-2.amazonaws.com/20230329_164430-5FC70911-E23D-FE6E-819F-26950F09F1DD.jpg", 0, 7, 7, 1, 225, 1, 1);
INSERT INTO Tool_Categories VALUES (1, 1), (1, 2), (1, 5), (1, 9);
INSERT INTO Tool_Types VALUES (1, 1);

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

-- Adding New Customers into the DB --
-- INSERT INTO Tools (Customer_ID, First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, ) VALUES
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


