# THIS FILE CONVERTS THE CSV FILES INTO A SQL TABLE
# SQL Server - Required 

import pandas as pd
import mysql.connector

db_name = input('Enter database name :')
pwd = input('Enter password :')

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = pwd,
    database = db_name
    )

mycursor = mydb.cursor()

def main():
    mycursor.execute('create table music (sno int,singer varchar(20),decade varchar(3),genre varchar(20),language varchar(20),link varchar(100))')
    mydb.commit()
    music = pd.read_csv('/Users/Sathish/Desktop/project/musicdb.csv')
    for i in range(len(music)):
        mycursor.execute('insert into music values(\"{}\",\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")'.format(i+1,(music['singer'])[i],(music['decade'])[i],(music['genre'])[i],(music['language'])[i],(music['ytlink'])[i]))
        mydb.commit()
    mycursor.execute('create table movies (sno int,title varchar(20),genre varchar(10),language varchar(20),decade varchar(20),link varchar(100))')
    mydb.commit()
    movie = pd.read_csv('/Users/Sathish/Desktop/project/moviedb.csv')
    for i in range(len(movie)):
        mycursor.execute('insert into movies values(\"{}\",\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")'.format(i+1,(movie['title'])[i],(movie['genre'])[i],(movie['language'])[i],(movie['decade'])[i],(movie['link'])[i]))
        mydb.commit()
main()
