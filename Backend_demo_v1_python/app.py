from flask import Flask,render_template,request,jsonify
import pickle
import numpy as np
import pandas as pd
from dbs.init_db_mysql import initialize_connection_pool, get_connection
from train_model import train_model

popular_df = pickle.load(open('popular.pkl','rb'))
pt = pickle.load(open('pt.pkl','rb'))
books = pickle.load(open('books.pkl','rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))
connection_pool = initialize_connection_pool()

app = Flask(__name__)


# Define a function to insert data into the database
def insert_popular_data_to_database(popular_df):
    connection = get_connection(connection_pool)
    if connection:
        try:
            cursor = connection.cursor()
            for index, row in popular_df.iterrows():
                # Insert data into the database
                cursor.execute("""
                    INSERT INTO mydb.popularitems (BookTitle, BookAuthor, ImageURLM, num_ratings, avg_rating)
                    VALUES (%s, %s, %s, %s, %s)
                """, (row['Book-Title'], row['Book-Author'], row['Image-URL-M'], row['num_ratings'], row['avg_rating']))
            connection.commit()
            cursor.close()
            connection.close()
            print("Data inserted successfully.")
        except Exception as e:
            print("Error inserting data:", e)
    else:
        print("Error connecting to the database.")

@app.route('/')
def index():
    return render_template('index.html',
                           book_name = list(popular_df['Book-Title'].values),
                           author=list(popular_df['Book-Author'].values),
                           image=list(popular_df['Image-URL-M'].values),
                           votes=list(popular_df['num_ratings'].values),
                           rating=list(popular_df['avg_rating'].values)
                           )

@app.route('/retrain')
def call_retrainFunction():
    try:
        # Collect data
        books = pd.read_csv('dataset/Books.csv')
        users = pd.read_csv('dataset/Users.csv')
        ratings = pd.read_csv('dataset/Ratings.csv')
        # preprocessing
        
        # Retrain model
        status = train_model(books, users, ratings)
        if status != 'DONE':
            return jsonify({"status": "error"})
        popular_df = pickle.load(open('popular.pkl','rb'))
        # Call the function to insert data into the database
        insert_popular_data_to_database(popular_df)
        return jsonify({"status": status})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/recommend')
def recommend_ui():
    return render_template('recommend.html')

@app.route('/recommend_books',methods=['post'])
def recommend():
    user_input = request.form.get('user_input')
    print(user_input)
    if user_input not in pt.index:
        return render_template('recommend.html',data=[])
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]

    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))

        data.append(item)

    print(data)

    return render_template('recommend.html',data=data)

if __name__ == '__main__':
    app.run(debug=True, port=4040)