import pymysql;
import pandas as pd;
import requests
import base64;


data = pd.read_excel('../Accounts_ToolShed.xls')

def insertAccounts():
    for i, j in data.iterrows():
        Account_ID = j['Customer ID']
        First_Name = j['First Name']
        Last_Name = j['Last Name']
        Organization_Name = j['Organization'] if not str(j['Organization']) == "nan" else ""
        Email = j['Email']
        Phone_Number = j['Phone'] if not str(j['Phone']) == "nan" else ""
        Address_Line1 = j['Address']  if not str(j['Address']) == "nan" else ""
        Address_Line2 = j['Address2'] if not str(j['Address2']) == "nan" else ""
        City = j['City'] if not str(j['City']) == "nan" else ""
        State = j['State/Province'] if not str(j['State/Province']) == "nan" else ""
        Account_Creation_Date = j['Member Created (M/D/YYYY)'] if not str(j['Member Created (M/D/YYYY)']) == "nan" else ""
        Account_Notes = j['User Note'] if not str(j['User Note']) == "nan" else ""
        Membership_Level = j['Current Membership Type'] if not str(j['Current Membership Type']) == "nan" else ""
        #Membership_Status = j['']
        #Membership_Auto_Renewal = j['Renews Automatically']
        #Membership_Creation_Date = j['']
        Membership_Expiration_Date = j['Current Membership Expiration (M/D/YYYY)'] if not str(j['Current Membership Expiration (M/D/YYYY)']) == "nan" else ""
        #Priviledge = j['']
        
        
        
        
        
        
insertAccounts()