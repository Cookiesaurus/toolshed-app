USE SEAC_Tool_Shed;
-- Memebership_Levels Inserts -- 

INSERT INTO Membership_Levels (Membership_Title, Membership_Price, Max_Tool_Checkout, Is_Organizational) VALUES
/* More Membership_Levels can be added in future and should be an option on admin page */
('Tinkerer', 25.00, 5, 0), -- Tinkerer Level
('MacGyver', 35.00, 10, 0), -- MacGyver Level
('Builder', 50.00, 25, 0), -- Builder Level
('Contractor', 100.00, 50, 1); -- Contractor Level


-- Privilege_Levels Inserts --

INSERT INTO Privilege_Levels (Privilege_Level,Privilege_Title) VALUES
(1,'Customer'), -- Customer Level
(2,'Volunteer'), -- Volunteer Level
(3,'Employee'), -- Employee Level 
(4,'Manager'), -- Manager Level
(5,'Administrator'); -- Administrator Level

-- Current_Membership_Status Inserts --

INSERT INTO Current_Membership_Status (Membership_Status, Membership_Status_Description) VALUES
(1,'Active'), -- Active Membership Status
(2,'Inactive'); -- Inactive Membership Status

-- Accounts Inserts --

-- Administrator ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level) VALUES
("Mike", "Evans", "South East Area Coalition", "mike@SEACrochester.org", AES_Encrypt("password", "Mike"), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 5); -- Mike Admin Account

-- Manager ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level) VALUES
("Nick", "Wilbur", "South East Area Coalition", "nick@SEACrochester.org", AES_Encrypt("password", "Nick"), "5852718665", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 4); -- Nick Manager Account

-- Employee ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level) VALUES
("Kiki", "Smith", "South East Area Coalition", "kirstyn@SEACrochester.org", AES_Encrypt("password", "Kiki"), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3), -- Kiki Employee Account
("Lori", "Wood", "South East Area Coalition", "lori@SEACrochester.org", AES_Encrypt("password", "Lori"), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3), -- Lori Employee Account
("Sara", "Glauser", "South East Area Coalition", "sara@SEACrochester.org", AES_Encrypt("password", "Sara"), "5852109140", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 3); -- Sara Employee Account

-- Voluteer ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal, Membership_Expiration_Date, Privilege_Level) VALUES
("SEAC Tool Shed", "Volunteer", "South East Area Coalition", "toolshed@seacrochester.org", AES_Encrypt("password", "Volunteer"), "0000000000", "1255 University Ave", "Rochester", "New York", "14607", 4, 1, "9999-12-31", 2); -- Volunteer Account

-- Customer ACCOUNTS -- 
INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer
("Bryce", "Hofstom", "bgh3077@g.rit.edu", AES_Encrypt("password","Bryce"), "2164075162", "8439 Sharp Lane", "Chesterland", "Ohio", 44026, 1);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with tinkerer status
("Michael", "Pacholarz", "mfp7158@g.rit.edu", AES_Encrypt("password","Michael"), "7609223761", "7750 Sleepy Hollow Road", "Folsom", "California", 95630, 1);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with tinkerer status plus two address lines
("Andy", "Erskine", "ate9624@g.rit.edu", AES_Encrypt("password","Andy"), "9037539683", "760 Lexington Ave.", "Apt. 4", "Cleburne", "Texas", 76031, 1);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level, Membership_Auto_Renewal) VALUES -- Normal Customer with MacGyver Status and Auto-renewal membership payment set to true
("Fei", "Gao", "fxg8365@g.rit.edu", AES_Encrypt("password","Fei"), "2184549695", "7908 South Durham St.", "Cottage Grove", "Minnesota", 55016, 3, 2);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Account_Notes, Membership_Level) VALUES -- Normal Customer with Builder Status and account notes
("Ian", "Dinga", "iad2750@g.rit.edu", AES_Encrypt("password","Ian"), "6462316017", "8402 Bridgeton Lane", "Corona", "New York", 11368, "Ian has not had any activity with the Tool Shed despite owning a Builder membership. Effort should be had to reach out and ensure he would still like to be a member.", 3);

INSERT INTO Accounts (First_Name, Last_Name, Organization_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Membership_Level) VALUES -- Normal Customer with Contractor Status and Organization name
("Aryan", "Todi", "The Handymen LLC.","at1203@g.rit.edu", AES_Encrypt("password","Aryan"), "4236953998", "4 Windsor Ave.", "Memphis", "Tennessee", 38106, 4);

INSERT INTO Accounts (First_Name, Last_Name, Email, Password, Phone_Number, Address_Line1, City, State, Postal_Code, Account_Notes, Membership_Level, Membership_Status) VALUES -- Disabled Customer
("Evan", "Hiltzik", "eh8319@g.rit.edu", AES_Encrypt("password","Evan"), "5704143466", "98 Lilac Street", "Gibsonia", "Pennsylvania", 15044, "User account was disabled on 01/10/24 as customer decided to drop membership.", 1, 1);

-- Gift_Cards Inserts --

INSERT INTO Gift_Cards (Account_ID, Membership_Level, Is_Applied) VALUES 
(7, 2, 0), -- Bryce MacGuyver Unapplied Gift Card
(12, 4, 0), -- Aryan Constructor Unapplied Gift Card
(9, 3, 1); -- Andy Builder Applied Gift Card

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

-- Account_Waivers Inserts --

INSERT INTO Account_Waivers (Account_ID, Waiver_ID, Is_Signed) VALUES -- Insert Data into Associative Table
-- Admin Accounts --
(1, 1, 1), -- Mike Tool Waiver and Indemnification Waiver *Signed
(1, 2, 1), -- Mike Tool Lending Agreement Waiver *Signed
(2, 1, 1), -- Nick Tool Waiver and Indemnification Waiver *Signed
(2, 2, 1), -- Nick Tool Lending Agreement Waiver *Signed
(3, 1, 1), -- Kiki Tool Waiver and Indemnification Waiver *Signed
(3, 2, 1), -- Kiki Tool Lending Agreement Waiver *Signed
(4, 1, 1), -- Lori Tool Waiver and Indemnification Waiver *Signed
(4, 2, 1), -- Lori Tool Lending Agreement Waiver *Signed
(5, 1, 1), -- Sara Tool Waiver and Indemnification Waiver *Signed
(5, 2, 1), -- Sara Tool Lending Agreement Waiver *Signed
(6, 1, 1), -- Volunteer Tool Waiver and Indemnification Waiver *Signed
(6, 2, 1), -- Volunteer Tool Lending Agreement Waiver *Signed
-- Admin Accounts --
(7, 1, 0), -- Bryce Tool Waiver and Indemnification Waiver *Unsigned
(7, 2, 0), -- Bryce Tool Lending Agreement Waiver *Unsigned
(8, 1, 0), -- Michael Tool Waiver and Indemnification Waiver *Unsigned
(8, 2, 0), -- Michael Tool Lending Agreement Waiver *Unsigned
(9, 1, 0), -- Andy Tool Waiver and Indemnification Waiver *Unsigned
(9, 2, 0), -- Andy Tool Lending Agreement Waiver *Unsigned
(10, 1, 0), -- Fei Tool Waiver and Indemnification Waiver *Unsigned
(10, 2, 1), -- Fei Tool Lending Agreement Waiver *Signed
(11, 1, 0), -- Ian Tool Waiver and Indemnification Waiver
(11, 2, 1), -- Ian Tool Lending Agreement Waiver *Signed
(12, 1, 1), -- Aryan Tool Waiver and Indemnification Waiver *Signed
(12, 2, 1), -- Aryan Tool Lending Agreement Waiver *Signed
(13, 1, 1), -- Evan Tool Waiver and Indemnification Waiver *Signed
(13, 2, 1); -- Evan Tool Lending Agreement Waiver *Signed

-- Tool_Transaction_Types Inserts --

INSERT INTO Transaction_Types (Transaction_Type, Transaction_Details) VALUES 
(1, "Membership Change"), -- Membership Change Type
(2, "Tool Check Out"), -- Tool Check Out Type
(3, "Tool Return"), -- Tool Return Type
(4, "Gift Card Purchase"), -- Gift Card Purchase Type
(5, "Gift Card Activation"), -- Gift Card Activation Type
(6, "Tool Loan Fee"), -- Tool Loan Fee Type
(7, "Rental Late Fee"), -- Rental Late Fee Type
(8, "Tool Replacement Fee"); -- Tool Replacement Fee Type

-- Tool_Statuses Inserts --

INSERT INTO Tool_Statuses (Tool_Status, Tool_Status_Details) VALUES
(1, 'Available'), -- Available Status
(2, 'Checked Out'), -- Checked Out Status
(3, 'Maintenance'), -- Maintenance Status
(4, 'Disabled'); -- Disabled Status

-- Tool_Locations Inserts --

INSERT INTO Tool_Locations (Location_Name) VALUES
/* More Tool_Locations can be added in future and should be an option on admin page */
('Main Location'), -- Main Location Location
('Mobile Unit'); -- Mobile Unit Location

-- Sub_Tool_Locations Inserts --

INSERT INTO Tool_Sub_Locations (Sub_Location_Name, Tool_Location) VALUES
("David F. Gantt Reacreation Center (Thursday)", 2), -- David F. Gantt Reacreation Center (Thursday) Mobile Unit sub location
("Edgerton Recreation Center (Tuesday)", 2), -- Edgerton Recreation Center (Tuesday) Mobile Unit sub location
("Thomas P. Ryan Center (Monday)", 2), -- Thomas P. Ryan Center (Monday) Mobile Unit sub location
("Willie Walker Lightfoot Recreation Center (Wednesday)", 2); -- Willie Walker Lightfoot Recreation Center (Wednesday) Mobile Unit sub location

-- Categories Inserts --

INSERT INTO Categories VALUES
(1, "Crafting"), -- Crafting Category
(2, "Drill Extension"), -- Drill Extension Category
(3, "Drywall"), -- Drywall Category
(4, "Masonry"), -- Masonry Category
(5, "Electrical"), -- Electrical Category
(6, "Carpentry/Woodworking"), -- Carpentry & Woodworking Category
(7, "Miscellaneous"), -- Miscellaneous Category
(8, "Painting"), -- Painting Category
(9, "Plumbing"), -- Plumbing Category
(10, "Roofing"), -- Roofing Category
(11, "Metalworking/Welding"), -- Welding Category
(12, "Pneumatic"), -- Pneumatic Category
(13, "Automotive"), -- Automotive Category
(14, "Bike"), -- Bike Category
(15, "Clamps/Vises"), -- Clamps & Vises Category
(16, "Flooring"), -- Flooring Category
(17, "Gardening/Landscape"), -- Gardening & Landscape Category
(18, "Measuring/Diagnostics"), -- Measuring & Diagnostics Category
(19, "Crafting/Arts"), -- Crafting & Arts Category
(20, "Event Planning"); -- Event Planning Category

-- Brands Inserts -- 
INSERT INTO Brands (Brand_Name) VALUES
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

-- Tool Inserts --
INSERT INTO Tools (Old_Tool_ID, Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Tool_Image, Tool_Manual, Tool_Loan_Fee, Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, Is_Floating, Is_Featured) VALUES
('M000161', '1/2" Hammer Drill', 'DeWalt', 13, NULL, 1, 1, 'Tool Shed', '1/2" V R S hammer Drill with metal case', 1, NULL, NULL, 0, 1, 7, 1, 129.00, 0, 0), -- M000161
('M000101', '1/2" Hammer Drill & 1/4" impact set', 'Milwaukee', 16, NULL, 1, 1, 'Tool Shed', '1/2" Hammer Drill Driver variable speed with side handle\n1/4" impact\ntwo batteries and one charger\nwith hard case', 2, NULL, NULL, 0, 1, 7, 1, 449.00, 0, 0), -- M000101
('M000100', '1/2" Hammer Drill (Cordless)', 'CRAFTSMAN', 3.5, NULL, 1, 1, 'Tool Shed', '1/2" Hammer Drill Driver\nvariable speed\ntwo batteries and one charger\nwith case', 1, NULL, NULL, 0, 1, 7, 1, 139.00, 0, 0), -- M000100
('M000087', '1/2" Hammer Drill (Cordless)', 'DeWalt', 10, NULL, 1, 1, 'Tool Shed', '1/2" Hammer Drill\n18V\n2 Batteries, 1 charger', 1, NULL, NULL, 0, 1, 7, 1, 179.00, 0, 0), -- M000087
('M000179', '1/2" Hammer Drill (Cordless)', 'DeWalt', 4, '1/2"', 1, 1, 'Tool Shed', '1/2" Hammer Drill (Cordless)', 1, NULL, NULL, 0, 1, 7, 1, 35.00, 0, 0), -- M000179
-- Disabled --
('J000237', 'Ratchet Socket Set', NULL, 3, NULL, 1, 1, NULL, '21 Piece, SAE/Metric', 4, NULL, NULL, 0, 1, 7, 1, 24.99, 0, 0), -- J000237
-- In Maintenance
('M000145', 'Oscillating Multitool', 'Chicago Electric', 2.5, NULL, 1, 1, 'Main Office', NULL, 3, NULL, NULL, 0, 1, 7, 1, 49.99, 0, 0); -- M000145

INSERT INTO States (State_Name, State_Code) VALUES
('Alabama', 'AL'),
('Alaska', 'AK'),
('Arizona', 'AZ'),
('Arkansas', 'AR'),
('California', 'CA'),
('Colorado', 'CO'),
('Connecticut', 'CT'),
('Delaware', 'DE'),
('Florida', 'FL'),
('Georgia', 'GA'),
('Hawaii', 'HI'),
('Idaho', 'ID'),
('Illinois', 'IL'),
('Indiana', 'IN'),
('Iowa', 'IA'),
('Kansas', 'KS'),
('Kentucky', 'KY'),
('Louisiana', 'LA'),
('Maine', 'ME'),
('Maryland', 'MD'),
('Massachusetts', 'MA'),
('Michigan', 'MI'),
('Minnesota', 'MN'),
('Mississippi', 'MS'),
('Missouri', 'MO'),
('Montana', 'MT'),
('Nebraska', 'NE'),
('Nevada', 'NV'),
('New Hampshire', 'NH'),
('New Jersey', 'NJ'),
('New Mexico', 'NM'),
('New York', 'NY'),
('North Carolina', 'NC'),
('North Dakota', 'ND'),
('Ohio', 'OH'),
('Oklahoma', 'OK'),
('Oregon', 'OR'),
('Pennsylvania', 'PA'),
('Rhode Island', 'RI'),
('South Carolina', 'SC'),
('South Dakota', 'SD'),
('Tennessee', 'TN'),
('Texas', 'TX'),
('Utah', 'UT'),
('Vermont', 'VT'),
('Virginia', 'VA'),
('Washington', 'WA'),
('West Virginia', 'WV'),
('Wisconsin', 'WI'),
('Wyoming', 'WY');