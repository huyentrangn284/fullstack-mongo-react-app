
from datetime import datetime
import os

from pymongo.collection import Collection, ReturnDocument

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from mongo_object import MongoObject
from flask_cors import CORS, cross_origin
# Configure Flask & Flask-PyMongo:
app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/QLTT_mongo"
app.config["CORS"] = 'Content-Type'
mongo = PyMongo(app)
db = mongo.db.student

# define function


@app.route("/students", methods=['POST'])
def create():
    object = {
        'name': request.json['name'],
        'email': request.json['email'],
        'address': request.json['address'],
        'contact': request.json['contact'],
        'age': int(request.json['age']),
        'is_delete': 0
    }
    id = db.insert_one(object)
    return {"id": str(id), 'msg': f"Student {object['name']} has been added successfully"}


@app.route("/students", methods=['GET'])
def list():
    students = [MongoObject(obj).to_dict()
                for obj in db.find({'is_delete': 0})]
    return {
        'students': students,
        'total': len(students)
    }


@app.route("/students/<id>", methods=['GET'])
def get_one(id):
    data = db.find_one({'_id': ObjectId(id), 'is_delete': 0})
    if not data:
        return {'students': {}}
    student = MongoObject(data).to_dict()
    return {
        'student': student,
    }


@app.route("/students/<id>", methods=['DELETE'])
def delete(id):
    data = db.find_one({'_id': ObjectId(id)})
    student = MongoObject(data)
    db.update_one({'_id': ObjectId(id)}, {'$set': {'is_delete': 1}})
    return {"id": id, 'msg': f"Student {student.name} has been deleted successfully"}


@app.route("/students/<id>", methods=['PUT'])
def update(id):
    object = {
        'name': request.json['name'],
        'email': request.json['email'],
        'address': request.json['address'],
        'contact': request.json['contact'],
        'age': int(request.json['age']),
        'is_delete': 0
    }
    db.update_one({'_id': ObjectId(id)}, {'$set': object})
    return {"id": id, 'msg': f"Student {object['name']} has been updated successfully"}


if __name__ == "__main__":
    app.run(debug=True)
