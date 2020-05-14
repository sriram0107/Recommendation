import requests
import json
from flask import Flask,render_template,request,session,url_for
from flask_session import Session
import mysql.connector

db_name = input('Enter Database :')
pwd = input ('Enter Password :')

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = pwd,
    database = db_name
    )


mycursor = mydb.cursor()
mycursor.execute('select count(*) from movies')
myresult = mycursor.fetchall()
movielength = (myresult[0])[0]
mycursor = mydb.cursor()
mycursor.execute('select count(*) from music')
myresult = mycursor.fetchall()
musiclength = (myresult[0])[0]


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


def music_func(d,g,l):
    global mycursor
    mycursor.execute("select * from music where decade = \"{}\" and genre = \"{}\" and language = \"{}\"".format(d,g,l))
    myresult = mycursor.fetchall()
    music_data = []
    y=0
    for x in myresult:
         music_data.append({})
         temp = music_data[y]
         temp['sno'] = x[0]
         temp['singer'] = x[1]
         temp['decade'] = x[2]
         temp['genre'] = x[3]   
         temp['language'] = x[4]
         temp['ytlink'] = x[5]
         y+=1
    return(music_data)


def movie_func(d,g,l):
    global mycursor
    mycursor.execute("select * from movies where decade = \"{}\" and genre = \"{}\"and language = \"{}\" ".format(d,g,l))
    myresult = mycursor.fetchall()
    movie_data = []
    y=0
    for x in myresult:
         movie_data.append({})
         temp = movie_data[y]
         temp['sno'] = x[0]
         temp['title'] = x[1]
         temp['genre'] = x[2]
         temp['language'] = x[3]
         temp['decade'] = x[4]
         temp['link'] = x[5]
         y+=1
    return(movie_data)

    
def apicall(ingr):
    foods=[]
    session['info'] = [] 
    url = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser"
    querystring = {"ingr":ingr}
    headers = {
    'x-rapidapi-host': "edamam-food-and-grocery-database.p.rapidapi.com",
    'x-rapidapi-key': "1d8864a5e2msh9a5a9c975608277p116899jsn9ab4039b88c3"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    data = json.loads(response.text)
    data = data["hints"]
    for i in data:
        foods.append(i['food'])
    k=0
    for i in foods :
        temp = {}
        session['info'].append({})
        for j in i :
            if (j=='label' or j=='brand') and i['categoryLabel']=='meal':
                temp[j]=i[j]

        (session['info'])[k] = temp
        k+=1
    
    return session['info'] 

def checkmovie(movie):
    global mycursor
    mycursor.execute('select * from movies')
    myresult = mycursor.fetchall()
    movies = {}
    for i in myresult :
        movies[i[1]]= i[3]
    for i in movies :
        if movie['title'].lower() == i.lower() and movie['language'].lower() == movies[i].lower():
            return False

    return True

def checkmusic(music):
    global mycursor
    mycursor.execute('select * from music')
    myresult = mycursor.fetchall()
    singers = {}
    for i in myresult :
        singers[i[1]]= i[4]
    for i in singers :
        if music['singer'].lower() == i and music['language'].lower() == singers[i].lower():
            return False

    return True
                   
def addtodb(movie,music):
    global mycursor
    global movielength
    global musiclength
    key = 0 
    if movie and checkmovie(movie) :
        size = movielength
        mycursor.execute("insert into movies values({},\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")".format(size,movie['title'],movie['genre'],movie['language'],movie['decade'],movie['link']))
        mydb.commit()
        movielength+=1
        key = 1 
    if music and checkmusic(music) :
        size = musiclength
        mycursor.execute("insert into music values({},\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")".format(size,music['singer'],music['decade'],music['genre'],music['language'],music['ytlink']))
        mydb.commit()
        musiclength+=1
        key = 1
    if key == 1 :
        return True
    else:
        return False
    
    
    
@app.route('/')
def main():
    return render_template('index.html')

@app.route('/form')
def form():
    global mycursor
    mycursor.execute('select language,decade,genre from music;')
    music_result = mycursor.fetchall()
    mycursor.execute('select language,decade,genre from movies;')
    movie_result = mycursor.fetchall()
    return render_template('form.html',music=music_result,movie=movie_result)

@app.route('/recommendation')
def recommendation():
    movie = {}
    music = {}
    food = {}
    movie['genre'] = request.args.get('movie_genre')
    movie['language'] = request.args.get('movie_language')
    movie['decade'] = request.args.get('movie_decade')
    music['genre'] = request.args.get('music_genre')
    music['language'] = request.args.get('music_language')
    music['decade'] = request.args.get('music_decade')
    ingr = request.args.get('ingr')
    
    if movie['genre'] != 'None':
           movie_data = movie_func(movie['decade'],movie['genre'],movie['language'])
    else :
           movie_data = None
    if music['genre'] != 'None':
           music_data = music_func(music['decade'],music['genre'],music['language'])
    else:
           music_data = None
    if ingr!= '':
           food_data = apicall(ingr)
    else:
           food_data = None
    
    
    return render_template('recommendation.html',movie=movie_data, music=music_data, food=food_data)

@app.route('/add')
def add():
    return render_template('add.html')

@app.route('/message')
def message():
     global movielength
     global musiclength
     movie = {}
     music = {}
     movie['sno'] = movielength
     movie['title'] = request.args.get('movie_title')
     movie['genre'] = request.args.get('movie_genre')
     movie['language'] = request.args.get('movie_language')
     movie['decade'] = request.args.get('movie_decade')
     movie['link'] = request.args.get('movie_link')
     music['sno'] = musiclength
     music['singer'] = request.args.get('music_singer')
     music['decade'] = request.args.get('music_decade')
     music['genre'] = request.args.get('music_genre')
     music['language'] = request.args.get('music_language')
     music['ytlink'] = request.args.get('music_ytlink')
     if addtodb(movie,music):
         message = "Added Successfully !"
     else :
         message = "Record Present in Database"
     return render_template('message.html',message=message)
    
if __name__ == '__main__' :
    app.run()







    
    
 
