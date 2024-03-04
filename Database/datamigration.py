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
dataframe1 = pd.read_excel('toolshed_export.xls');


#Function to insert tools into database
def insertTools():
    # curr.execute('SET GLOBAL connect_timeout=60000')
    for i, j in dataframe1.iterrows():
        try:
            Tool_ID = j['Item ID'] 
            Tool_Name = j['Name'] 
            Tool_Brand = j['Manufacturer'] if not str(j['Manufacturer']) == "nan" else "" 
            # Tool_Model = j['Model'] if not str(j['Model']) == "nan" else ""

            #Calculate Tool Weight
            # if type(j['Weight']) == "str":
            Tool_Weight = float(str(j['Weight']).split(' ')[0]) if not str(j['Weight']) == "nan" else 0.0 
            # else:
                # Tool_Weight = j['Weight'] if not str(j['Weight']) == "nan" else 0.0

            # Need to change data for tool size since format is not consistent
            Tool_Size = j['Size'] if not str(j['Size']) == "nan" else ""
            Tool_Size = 0.0

            # Home Location - blanks
            # Home_Location = int(j['Home Location']) if not str(j['Home Location']) == "nan" else 0
            Home_Location = 1

            # Current Location - blanks
            # Current_Location = j['Current Location'] if not str(j['Current Location']) == "nan" else 0
            Current_Location = 1

            Location_Code = j['Location Code'] if not str(j['Location Code']) == "nan" else ""
            Tool_Description = j['Description'] if not str(j['Description']) == "nan" else ""
            Tool_Admin_Notes = j['Admin Notes'] if not str(j['Admin Notes']) == "nan" else ""
            Tool_Status = j['Status'] if not str(j['Status']) == "nan" else 1

            #For Tool Conditions, we set the default as not set (value of 0)
            # Tool_Condition = j['Condition'] if not str(j['Condition']) == "nan" else 0

            # Eco_Rating = j['Eco Rating'] if not str(j['Eco Rating']) == "nan" else 0.0

            # Only one value, will be done manually
            # Embodied_Carbon = j['Embodied Carbon']#Required, available

            # Clean values
            # Emission_Factor = j['Emission Factor'] if not str(j['Eco Rating']) == "nan" else ""
            # if Emission_Factor == "":
            #     Emission_Factor = 0.0
            # elif Emission_Factor[0] == '$':
            #     Emission_Factor = float(Emission_Factor[1:])

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
            # Tool_Supplier = j['Source / Supplier'] if not str(j['Source / Supplier']) == "nan" else ""

            # Was purchased. Only 1 Y value
            # Was_Purchased = 0

            #Adding the categories to the table 
            # Categories = j['Categories']

            #Query using the tool IDs from excel
            query = """INSERT INTO Tools (Old_Tool_ID, Tool_Name, Tool_Brand, Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Tool_Image, Tool_Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost) 
            VALUES ('%s', '%s', '%s',  %f, '%s', %d, %d, '%s', '%s',  %d, "%s", "%s", %.2f, %d, %d, %.2f)""" % (Tool_ID, Tool_Name, Tool_Brand,Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Image, Manual,Default_Late_Fee, Default_Loan_Length, Renewal_Amount,  Tool_Replacement_Cost)
            curr.execute(query)
        except:
            print(Tool_ID, Tool_Name, Tool_Brand,Tool_Weight, Tool_Size, Home_Location, Current_Location, Location_Code, Tool_Description, Tool_Status, Default_Late_Fee, Default_Loan_Length, Renewal_Amount,  Tool_Replacement_Cost)
        # Committing insertion
        conn.commit()




#Function to add Tools
#Function to add categories - not tested, not working
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


# insertTools()

def insertTest():
    query2 = "SELECT Tool_ID, Tool_Name FROM Tools"
    curr.execute(query2)
    output = curr.fetchall()
    for i in output:
        print(i)
    conn.close()
    
insertTools()
insertTest()