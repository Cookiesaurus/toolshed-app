import pymysql;
import pandas as pd;
import requests
import base64;
from datetime import datetime;
import re;

conn = pymysql.connect(
    host='localhost',
    user='root',
    db='SEAC_Tool_Shed',
    password='password',
    port=3306
    
)
curr = conn.cursor();

data = pd.read_excel('Accounts_ToolShed.xls')

def insertAccounts():
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
        if(memb_level == 'Registration'):
            memb_level = 'Expired'
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

        #all memberships that have expired are left blank therefore we enter here
        if(check_exp == ''):
            Membership_Status = 2
            Membership_Expiration_Date = Membership_Creation_Date
        else:
            #if not blank it gets the date in the right format and sets status
            Membership_Exp_obj = datetime.strptime(check_exp, '%m/%d/%Y') 
            Membership_Expiration_Date = Membership_Exp_obj.strftime('%Y-%m-%d')
            Membership_Status = 1
            
        Priviledge_Level = 1
        if(Email == 'mike@seacrochester.org'):
            Priviledge_Level = 5
        if(Email == 'toolshed@seacrochester.org'):
            Priviledge_Level = 2
        Password = 'password'
        
        
        
        query = """INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Privilege_Level, Password, Secondary_First_Name, Secondary_Last_Name, Secondary_Email, Secondary_Phone_Number)
        VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%d", "%s", "%s", "%s", "%s","%s","%s","%s","%s")""" % (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Priviledge_Level, Password, Secondary_First_Name, Secondary_Last_Name, Secondary_Email, Secondary_Phone)
        
        curr.execute(query)
        conn.commit()
        
        print('Added Account: ' + First_Name + ' ' + Last_Name)
        
        
        
        
insertAccounts()