import pymysql;
import pandas as pd;
import requests
import base64;
import numbers;
from datetime import datetime;
import re;
from square.client import Client
import os

#Connect to the database
conn = pymysql.connect(
    host='localhost',
    user='root',
    db='SEAC_Tool_Shed',
    password='password',
    port=3306
)
curr = conn.cursor()


#Fetch data from CSV file
dataframe1 = pd.read_excel('SEAC_Tool_Shed_Inventory.xlsx')

#Run this in your terminal
#For MAC:
#export SQUARE_ACCESS_TOKEN="EAAAl2jsMOMh4IG_KPRzliYZ4o8k8UVICkdDL8CY6Y0A1ECAua0p4NdUd51Z1LhZ"

#For WINOWS:
#set SQUARE_ACCESS_TOKEN="EAAAl2jsMOMh4IG_KPRzliYZ4o8k8UVICkdDL8CY6Y0A1ECAua0p4NdUd51Z1LhZ"

client = Client(access_token=os.environ['SQUARE_ACCESS_TOKEN'],environment='sandbox')

#Function to insert tools into database
def insertTools():
    for i, j in dataframe1.iterrows():
        # try:
        Tool_ID = j['Item ID'] 
        Tool_Name = j['Name'] 
        Tool_Brand = j['Manufacturer'] if not str(j['Manufacturer']) == "nan" else "" 

        #Calculate Tool Weight
        Tool_Weight = float(str(j['Weight']).split(' ')[0]) if not str(j['Weight']) == "nan" else 0.0 

        Tool_Size = j['Size'] if not str(j['Size']) == "nan" else ""

        # Home_Location = int(j['Home Location']) if not str(j['Home Location']) == "nan" else 0
        Home_Location = j['Home Location']
        location_q = "SELECT Tool_Location FROM Tool_Locations WHERE Location_Name='" + Home_Location + "'"
        curr.execute(location_q)
        Home_Location = curr.fetchone()[0]

        # Current_Location = j['Current Location'] if not str(j['Current Location']) == "nan" else 0
        Current_Location = j['Current Location']
        location_q = "SELECT Tool_Location FROM Tool_Locations WHERE Location_Name='" + Current_Location + "'"
        curr.execute(location_q)
        Current_Location = curr.fetchone()[0]

        Location_Code = j['Location Code'] if not str(j['Location Code']) == "nan" else ""
        Tool_Description = j['Description'] if not str(j['Description']) == "nan" else ""
        Tool_Status = int(j['Status(es)']) if not str(j['Status(es)']) == "nan" else 1
        Default_Loan_Length = j['Default Loan Length'] if not str(j['Default Loan Length']) == "nan" else 7
        Renewal_Amount = j['Maximum number of renewals'] if not str(j['Maximum number of renewals']) == "nan" else 1
        Default_Late_Fee = j['Daily Late Fee'] if not str(j['Daily Late Fee']) == "nan" else 1.0 #Required, available

        # Getting the image from the link if there is one
        Image_Link = j['Image']
        if not ( str(Image_Link) == "nan" ):
            Image = Image_Link
        else:
            Image = ""
        
        # Getting the manual if there is one
        Manual_Link = j['Attachment']
        # Adding attachment if there is one
        if not ( str(Manual_Link) == "nan" ):
            Manual = Manual_Link
        else:
            Manual = ""

        # Item_Type = j['Item Type']#Required, available
        Tool_Replacement_Cost = j['Replacement Cost'] if not str(j['Replacement Cost']) == "nan" else 0.0
        Tool_Replacement_Cost = float(Tool_Replacement_Cost)
        Is_Floating = 1 if str(j['Floating']) == "Y" else 0
        Is_Featured = 1 if str(j['Featured']) == "Y" else 0

        query = """INSERT INTO Tools (Old_Tool_ID, Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Tool_Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, Is_Floating, Is_Featured, Tool_Link) 
        VALUES ("""

        values = [v for v in (Tool_ID, Tool_Name, Tool_Brand,Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount,  Tool_Replacement_Cost, Is_Floating, Is_Featured, Image)]
        for idx, x in enumerate(values):
            if(idx ==3):
                query += "%f,"
            elif idx in [5, 6, 9, 12, 13, 15, 16]:
                query += "%d,"
            elif idx in [11, 14]:
                query += "%.2f,"   
            elif(x == ""):
                values[idx] = 'NULL'
                query += "%s," 
            else:
                x = str(x)
                query += "'%s',"
        query = query[:-1] + ")"
        curr.execute(query % tuple(values))
        conn.commit()
        

        new_query = "SELECT Tool_ID FROM Tools WHERE Old_Tool_ID='" + Tool_ID + "'"
        curr.execute(new_query)
        new_tool_id = curr.fetchone()[0]
        print("New Tool ID : " + str(new_tool_id))

        #Adding the categories to the table 
        Categories = j['Categories']
        addCategories(Categories, new_tool_id)

        #Adding the types to the table 
        Types = j['Item Type']
        addTypes(Types, new_tool_id)

# Add functionality for gender




# Function to add Tools
def addCategories( string , tool_id ):
    if (str(string) == "nan"):
        return
    cat = string.split(',')
    cat_indexes = list()
    for i in cat:
        query = "SELECT Category_ID FROM Categories WHERE Category_Name=\'" + str(i).strip() + "\'";
        curr.execute(query)
        result = curr.fetchone()[0]
        insert_query = "INSERT INTO Tool_Categories Values (%d, %d)" % ( tool_id, int(result))

        curr.execute(insert_query)
        conn.commit()

# Function to add types
def addTypes( string, tool_id ):
    if (str(string) == "nan"):
        return
    cat = string.split(',')
    cat_indexes = list()
    for i in cat:
        query = "SELECT Type_ID FROM Types WHERE Type_Name=\'" + str(i).strip() + "\'";
        curr.execute(query)
        result = curr.fetchone()[0]
        insert_query = "INSERT INTO Tool_Types Values (%d, %d)" % ( tool_id, int(result))

        curr.execute(insert_query)
        conn.commit()

def alter_Tools():
    
    query = """UPDATE Tools
        SET Brand_Name = "Lowe's"
        WHERE Old_Tool_ID IN ('I000104', 'I000105', 'I000106');"""
    curr.execute(query)
    conn.commit()
    
    query = """UPDATE Tools
        SET Tool_Description = "Rotary Tool Kit with 2- attachment's & 30 accessories- Grinder, sander, Engraver- router. has storage case"
        WHERE Old_Tool_ID = "M000148";"""
    curr.execute(query)
    conn.commit()
    
    query = """UPDATE Tools
        SET Tool_Description = "Dremel Multi Tool with Case can cut and sand with the correct attachment's"
        WHERE Old_Tool_ID = "M000159";"""
    curr.execute(query)
    conn.commit()
    
    query = """UPDATE Tools
        SET Tool_Description = "Follow instructions provided to clean the carpet cleaner before returning - a $20 fee will be applied to the card on file if it hasn't! :)"
        WHERE Old_Tool_ID = "Z000037";"""
    curr.execute(query)
    conn.commit()

def import_transactions():
    data = pd.read_excel('SEAC_Tool_Shed_Inventory.xlsx', sheet_name='Sheet2')
    for i, j in data.iterrows():
        Tool_ID = j['Item ID']
        First_Name = j['First Name']
        Last_Name = j['Last Name']
        Checked_Out = str(j['Checked Out']).split()[0]
        Due_Date = str(j['Due Date']).split()[0]
        
        Account_ID = "SELECT Account_ID FROM Accounts WHERE First_Name = '" + First_Name + "' AND Last_Name = '" + Last_Name + "'"
        curr.execute(Account_ID)
        Account_ID = curr.fetchone()[0]
        
        Tool_ID = "SELECT Tool_ID FROM Tools WHERE Old_Tool_ID = '" + Tool_ID + "'"
        curr.execute(Tool_ID)
        Tool_ID = curr.fetchone()[0]
        
        query = """INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, End_Date)
                    VALUES('%s', '%s', "Open", '%s', 5, '%s')""" % (Account_ID, Tool_ID, Checked_Out, Due_Date)
        curr.execute(query)
        conn.commit()
    
def account_migration():
    data = pd.read_excel('Accounts_ToolShed.xlsx')
    for i, j in data.iterrows():
        #Account_ID = j['Customer ID'] #These are standard
        First_Name = j['First Name'] 
        Last_Name = j['Last Name'] 
        Organization_Name = j['Organization'] if not str(j['Organization']) == "nan" else "" 
        Email = j['Email'] 
        Address_Line1 = j['Address'] if not str(j['Address']) == "nan" else "" 
        Address_Line2 = j['Address2'] if not str(j['Address2']) == "nan" else "" 
        City = j['City'] 
        State = j['State/Province'] 
        Postal_Code = j['Postal Code']
        Account_Notes = j['User Note'] if not str(j['User Note']) == "nan" else "" 
        Secondary_First_Name = j['Secondary First Name'] if not str(j['Secondary First Name']) == "nan" else ""
        Secondary_Last_Name = j['Secondary Last Name'] if not str(j['Secondary Last Name']) == "nan" else ""
        Secondary_Email = j['Secondary Email'] if not str(j['Secondary Email']) == "nan" else ""
        
        Secondary_Numb = j['Secondary Phone'] if not str(j['Secondary Phone']) == "nan" else ""
        Secondary_Phone = re.sub(r'\D', '', Secondary_Numb)
        if(len(Secondary_Phone) == 11 and Secondary_Phone.startswith('1')):
            Secondary_Phone = Secondary_Phone[1:]
        
        
        #Needed to change the DOB to correct format
        date_DOB = j['Date of Birth']
        DOB_obj = datetime.strptime(date_DOB, '%m/%d/%Y')
        DOB = DOB_obj.strftime('%Y-%m-%d')
        
        #collects the gender code from the table
        gender = j['Sex'] 
        if(gender == "would rather not say"):
            gender = "Would Rather Not Specify"
        gender_query = "SELECT Gender_Code FROM Genders WHERE Gender_Name = '" + gender + "'"
        curr.execute(gender_query)
        Gender_Code = curr.fetchone()[0]
        
        #drops all of the - so that it fits in the database
        Phone = j['Phone']
        Phone_Number = re.sub(r'\D', '', Phone)
        if(len(Phone_Number) == 11 and Phone_Number.startswith('1') ):
            Phone_Number = Phone_Number[1:]
        if len(Phone_Number) > 10:
            Phone_Number = Phone_Number[:10]
        
        
        #changes the account creation date to correct format
        date_Create = j['Member Created (M/D/YYYY)'] 
        Account_obj = datetime.strptime(date_Create, '%m/%d/%Y')
        Account_Creation_Date = Account_obj.strftime('%Y-%m-%d')
        
        #needed to set the Membership level based on table
        memb_level = j['Current Membership Type']
        if('Level' in memb_level):
            memb_level = memb_level.replace(' Level', '')
        level_query = "SELECT Membership_Level FROM Membership_Levels WHERE Membership_Title = '" + memb_level + "'"
        curr.execute(level_query)
        Membership_Level = curr.fetchone()[0]
        
        #Converts the true false to a 1 or 2
        Membership_Auto_Renewal = j['Renews Automatically']
        if(Membership_Auto_Renewal == True):
            Membership_Auto_Renewal = 1
        else:
            Membership_Auto_Renewal = 0
            
        
        memb_creation_date = j['Latest Membership Change (request, upgrade, renewal, cancellation...) (M/D/YYYY)']
        creation_date_obj = datetime.strptime(memb_creation_date, '%m/%d/%Y')
        Membership_Creation_Date = creation_date_obj.strftime('%Y-%m-%d')
        
        
        #gets the expiration date
        check_exp = j['Current Membership Expiration (M/D/YYYY)'] if not str(j['Current Membership Expiration (M/D/YYYY)']) == "nan" else ''

        #all memberships that have are set to registration are left blank therefore we go here
        if(check_exp == ''):
            Membership_Status = 2
            Membership_Expiration_Date = Membership_Creation_Date
        else:
            #if not blank it gets the date in the right format and sets status
            Membership_Exp_obj = datetime.strptime(check_exp, '%m/%d/%Y') 
            Membership_Expiration_Date = Membership_Exp_obj.strftime('%Y-%m-%d')
            Membership_Status = 1
            if(Membership_Exp_obj.date() < datetime.now().date()): #If expired it will set the status
                Membership_Status = 2
                   
        Priviledge_Level = 1 
        if(Email == 'mike@seacrochester.org'): #sets accounts levels
            Priviledge_Level = 5
        if(Email == 'toolshed@seacrochester.org'):
            Priviledge_Level = 2
        Password = 'password'
        
        
        
        query = """INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Privilege_Level, Password, Secondary_First_Name, Secondary_Last_Name, Secondary_Email, Secondary_Phone_Number)
        VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%d", "%s", "%s", "%s", AES_Encrypt("%s",""),"%s","%s","%s","%s")""" % (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Priviledge_Level, Password, Secondary_First_Name, Secondary_Last_Name, Secondary_Email, Secondary_Phone)
        
        curr.execute(query)
        conn.commit()
        '''
        result = client.customers.create_customer(
        body = {
            "given_name": First_Name,
            "family_name": Last_Name,
            "email_address": Email
        }
        )
        if(result.is_success()):
            created_customer = result.body.get('customer')
            
            if created_customer:
                customer_id = created_customer.get('id')
                print("Customer created, ID: " + customer_id)
            else:
                print("Error")
            query = 'UPDATE Accounts SET Customer_ID = "' + str(customer_id) + '" WHERE First_Name = "' + First_Name + '" AND Last_Name = "' + Last_Name + '"'
            curr.execute(query)
            conn.commit()
        else:
            print('Error creating customer: ', result.errors)
        
        '''
        print("Added Account: " + First_Name + " " + Last_Name)    
    
insertTools()
alter_Tools()
account_migration()
import_transactions()
