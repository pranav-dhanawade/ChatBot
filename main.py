from flask import Flask, render_template , jsonify , request
from flask_pymongo import PyMongo

from meta_ai_api import MetaAI

ai = MetaAI()

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://aithinker:Thinker%403112@cluster0.ywkonip.mongodb.net/aithinker"
mongo = PyMongo(app)

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    print(myChats)
    return render_template("index.html", myChats = myChats)

@app.route("/api",methods=["GET","POST"])
def qa():
    
    if request.method == "POST":
        print(request.json)
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        print(chat)
        if chat:
            data = {"question": question , "answer": f"{chat['answer']}"}
            return jsonify(data)
        else:
            response = ai.prompt(message = question)
            ans= next(iter(response.values()), None)
            data = {"question":question, "answer":ans}
            mongo.db.chats.insert_one({"question":question, "answer":ans})
            return jsonify(data)
            
    data = {"result":"Thank You For Using Me"}
    return jsonify(data)

app.run(debug=True)

