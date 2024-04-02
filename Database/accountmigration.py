import pymysql;
import pandas as pd;
import requests
import base64;
from datetime import datetime;

conn = pymysql.connect(
    host='ls-7627deed71079a866e6ed3198046fb55dada7381.c3i8ssyyouhq.us-east-2.rds.amazonaws.com',
    user='dbmasteruser',
    db='SEAC_Tool_Shed',
    password='>R)Eo;wkX{-OC_ltmLa&6.^#wa,VXR{_',
    port=3306
)
curr = conn.cursor();

data = pd.read_excel('Accounts_ToolShed.xls')

def insertAccounts():
    for i, j in data.iterrows():
        Account_ID = j['Customer ID'] #These are standard
        First_Name = j['First Name'] 
        Last_Name = j['Last Name'] 
        Organization_Name = j['Organization'] if not str(j['Organization']) == "nan" else "" #this is confirmed
        Email = j['Email'] 
        Address_Line1 = j['Address'] if not str(j['Address']) == "nan" else "" #this works
        Address_Line2 = j['Address2'] if not str(j['Address2']) == "nan" else "" #this works
        City = j['City'] 
        State = j['State/Province'] 
        Postal_Code = j['Postal Code'] 
        Account_Notes = j['User Note'] if not str(j['User Note']) == "nan" else "" #this works

        
        #Needed to change the DOB to correct format
        date_DOB = j['Date of Birth']
        DOB_obj = datetime.strptime(date_DOB, '%m/%d/%Y')
        DOB = DOB_obj.strftime('%Y-%m-%d')
        
        #collects the gender code from the table
        gender = j['Sex'] 
        gender_query = "SELECT Gender_Code FROM Genders WHERE Gender_Name = '" + gender + "'"
        curr.execute(gender_query)
        Gender_Code = curr.fetchone()[0]
        
        #drops all of the - so that it fits in the database
        Phone = j['Phone'] 
        Phone_Number = Phone.replace("-","")
        
        #changes the account creation date to correct format
        date_Create = j['Member Created (M/D/YYYY)'] 
        Account_obj = datetime.strptime(date_Create, '%m/%d/%Y')
        Account_Creation_Date = Account_obj.strftime('%Y-%m-%d')
        
        #needed to set the Membership level based on table
        memb_level = j['Current Membership Type'] 
        level_query = "SELECT Membership_Level FROM Membership_Levels WHERE Membership_Title = '" + memb_level + "'" 
        curr.execute(level_query)
        Membership_Level = curr.fetchone()[0]
        
        #Converts the true false to a 1 or 2
        Membership_Auto_Renewal = j['Renews Automatically']
        if(Membership_Auto_Renewal == True):
            Membership_Auto_Renewal = 1
        else:
            Membership_Auto_Renewal = 2

        #Not sure how to handle this yet!!
        Membership_Creation_Date = '1900-01-01'
        
        
        #gets the expiration date
        check_exp = j['Current Membership Expiration (M/D/YYYY)'] if not str(j['Current Membership Expiration (M/D/YYYY)']) == "nan" else 'NULL'

        #all memberships that have expired are left blank therefore we enter here
        if(check_exp == 'NULL'):
            Membership_Status = 2
            Membership_Expiration_Date = '' #sets the two vales
            Membership_Creation_Date = ''
        else:
            #if not blank it gets the date in the right format and sets status
            Membership_Exp_obj = datetime.strptime(check_exp, '%m/%d/%Y') 
            Membership_Expiration_Date = Membership_Exp_obj.strftime('%Y-%m-%d')
            Membership_Status = 1
            
        Priviledge_Level = 1
        Password = 'password'
        
        
        
        query = """INSERT INTO Accounts (Account_ID, First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Privilege_Level, Password)
        VALUES ('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s')""" % (Account_ID, First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Priviledge_Level, Password)
        
        
        print(query)
        
        
        
        
insertAccounts()