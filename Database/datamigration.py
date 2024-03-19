import pymysql;
from PyPDF2 import PdfReader;
import io;
import pandas as pd;
import math;
from PIL import Image;
import requests
import base64;

#Connect to the database
conn = pymysql.connect(
    host='ls-7627deed71079a866e6ed3198046fb55dada7381.c3i8ssyyouhq.us-east-2.rds.amazonaws.com',
    user='dbmasteruser',
    db='SEAC_Tool_Shed',
    password='>R)Eo;wkX{-OC_ltmLa&6.^#wa,VXR{_',
    port=3306
)
curr = conn.cursor();


#Fetch data from CSV file
dataframe1 = pd.read_excel('Gate_Review_2_Tools.xlsx');


#Function to insert tools into database
def insertTools():
    for i, j in dataframe1.iterrows():
        # try:
        Tool_ID = j['Item ID'] 
        print(Tool_ID)
        Tool_Name = j['Name'] 
        Tool_Brand = j['Manufacturer'] if not str(j['Manufacturer']) == "nan" else "" 

        #Calculate Tool Weight
        Tool_Weight = float(str(j['Weight']).split(' ')[0]) if not str(j['Weight']) == "nan" else 0.0 

        Tool_Size = j['Size'] if not str(j['Size']) == "nan" else ""

        # Home_Location = int(j['Home Location']) if not str(j['Home Location']) == "nan" else 0
        Home_Location = 1

        # Current_Location = j['Current Location'] if not str(j['Current Location']) == "nan" else 0
        Current_Location = 1

        Location_Code = j['Location Code'] if not str(j['Location Code']) == "nan" else ""
        Tool_Description = j['Description'] if not str(j['Description']) == "nan" else ""
        Tool_Status = int(j['Status']) if not str(j['Status']) == "nan" else 1
        Default_Loan_Length = j['Default Loan Length'] if not str(j['Default Loan Length']) == "nan" else 7
        Renewal_Amount = j['Maximum number of renewals'] if not str(j['Maximum number of renewals']) == "nan" else 1
        Default_Late_Fee = j['Daily Late Fee'] if not str(j['Daily Late Fee']) == "nan" else 1.0 #Required, available

        # Getting the image from the link if there is one
        Image_Link = j['Image']
        if not ( str(Image_Link) == "nan" ):
            Image = base64.b64encode(requests.get( Image_Link ).content)
        else:
            Image = ""
        
        # Getting the manual if there is one
        Manual_Link = j['Attachment']
        # Adding attachment if there is one
        if not ( str(Manual_Link) == "nan" ):
            Manual = base64.b64encode(requests.get( Manual_Link ).content)
        else:
            Manual = ""

        # Item_Type = j['Item Type']#Required, available
        Tool_Replacement_Cost = j['Replacement Cost'] if not str(j['Replacement Cost']) == "nan" else 0.0
        Tool_Replacement_Cost = float(Tool_Replacement_Cost)

        #Adding the categories to the table 
        Categories = j['Categories']
        addCategories(Categories, Tool_ID)

        #Adding the types to the table 
        Types = j['Item Type']
        addTypes(Types, Tool_ID)

        #Query using the tool IDs from excel
        query = """INSERT INTO Tools (Old_Tool_ID, Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Tool_Image, Tool_Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost) 
        VALUES ('%s', '%s', '%s',  %f, '%s', %d, %d, '%s', '%s',  %d, "%s", "%s", %.2f, %d, %d, %.2f)""" % (Tool_ID, Tool_Name, Tool_Brand,Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Image, Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount,  Tool_Replacement_Cost)
        curr.execute(query)
        # except:
        #     print(Tool_ID, Tool_Name, Tool_Brand,Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Default_Late_Fee, Default_Loan_Length, Renewal_Amount,  Tool_Replacement_Cost)
        # Committing insertion
        conn.commit()




# Function to add Tools
def addCategories( string , tool_id ):
    if (str(string) == "nan"):
        return
    cat = string.split(',')
    cat_indexes = list()
    for i in cat:
        query = "SELECT Category_ID FROM Categories WHERE Category_Name=\'" + str(i).strip() + "\'";
        print(query)
        curr.execute(query)
        result = curr.fetchone()[0]
        print(result)
        insert_query = "INSERT INTO Tool_Categories Values (%d, %d)" % ( tool_id, result)

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
        print(query)
        curr.execute(query)
        result = curr.fetchone()[0]
        print(result)
        insert_query = "INSERT INTO Tool_Types Values (%d, %d)" % ( tool_id, result)

        curr.execute(insert_query)
        conn.commit()
    
insertTools()