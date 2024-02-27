import pymysql;
from PyPDF2 import PdfReader;
import io;
import pandas as pd;
import math;
from PIL import Image;
import requests
import base64;
import os;

#Fetch data from CSV file
dataframe1 = pd.read_excel('toolshed_export.xls')

def change_size():
    for i, j in dataframe1.iterrows():
        size = str(j['Size'])
        if any(char.isalpha() for char in size) and 'nan' not in size:
            print(size)
            

change_size()