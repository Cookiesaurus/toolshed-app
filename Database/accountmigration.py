import pymysql;
import pandas as pd;
import requests
import base64;
from datetime import datetime;


data = pd.read_excel('Accounts_ToolShed.xls')

def insertAccounts():
    for i, j in data.iterrows():
        Account_ID = j['Customer ID'] 
        First_Name = j['First Name'] 
        Last_Name = j['Last Name'] 
        
        
        date_DOB = j['Date of Birth']
        DOB_obj = datetime.strptime(date_DOB, '%m/%d/%Y')
        DOB = DOB_obj.strftime('%Y-%m-%d')
        
        
        
        gender = j['Sex'] 
        if(gender == 'male'):
            Gender_Code = 1
        
        
        Organization_Name = j['Organization'] if not str(j['Organization']) == "nan" else "" #this is confirmed
        Email = j['Email'] #this works
        Phone = j['Phone'] #this works
        Phone_Number = Phone.replace("-","")
        Address_Line1 = j['Address'] if not str(j['Address']) == "nan" else "" #this works
        Address_Line2 = j['Address2'] if not str(j['Address2']) == "nan" else "" #this works
        City = j['City'] #this works
        State = j['State/Province'] #this works
        Postal_Code = j['Postal Code'] #this works
        
        
        
        date_Create = j['Member Created (M/D/YYYY)'] #this works
        Account_obj = datetime.strptime(date_Create, '%m/%d/%Y')
        Account_Creation_Date = Account_obj.strftime('%Y-%m-%d')
        
        
        
        Account_Notes = j['User Note'] if not str(j['User Note']) == "nan" else "" #this works
        Membership_Level = j['Current Membership Type'] #this works
        Membership_Auto_Renewal = j['Renews Automatically'] #this works
        if(Membership_Auto_Renewal == True):
            Membership_Auto_Renewal = 1
        else:
            Membership_Auto_Renewal = 2

        Membership_Creation_Date = 'NULL'
        
        
        
        
        check_exp = j['Current Membership Expiration (M/D/YYYY)'] if not str(j['Current Membership Expiration (M/D/YYYY)']) == "nan" else 'NULL'
        
        
        if(check_exp == 'NULL'):
            Membership_Status = 2
            Membership_Expiration_Date = ''
        else:
            Membership_Exp_obj = datetime.strptime(check_exp, '%m/%d/%Y')
            Membership_Expiration_Date = Membership_Exp_obj.strftime('%Y-%m-%d')
            Membership_Status = 1
        Priviledge_Level = 1
        Password = 'password'
        
        
        
        query = """INSERT INTO Accounts (Account_ID, First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Privilege_Level, Password)
        VALUES ('%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s')""" % (Account_ID, First_Name, Last_Name, DOB, Gender_Code, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, Priviledge_Level, Password)
        
        
        print(query)
        
        
        
        
insertAccounts()