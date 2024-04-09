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

-- Adding New Customers into the DB --
INSERT INTO Accounts (
-- Get Customers based on names --


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

--Membership Levels Query --
SELECT Membership_Levels.Membership_Title
FROM Membership_Levels;

