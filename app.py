from flask import Flask, jsonify, render_template
import requests
import datetime as dt
import pandas as pd


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from json import dump
import json
import numpy as np

engine = create_engine("sqlite:///sql_files/us_births.sqlite")
test = pd.read_sql("select * from EightStatesData", con=engine.raw_connection())
print(test)

app = Flask(__name__)


@app.route("/")
def US_births():
    """List all available API routes."""
    return render_template("index.html")


@app.route("/api/v1.0/state")
def state():

    return test.to_json(orient="records")


@app.route("/api/v1.0/gender")
def gender():
    df2 = test.groupby(['Year', 'Gender'])
    result = df2['Births'].agg('sum').reset_index()

    male_data = result[result['Gender'] == 'M']
    female_data = result[result['Gender'] == 'F']

    male_x = male_data['Year']
    male_y = male_data['Births']

    female_x = female_data['Year']
    female_y = female_data['Births']

    data = {
        'male_x': male_x.tolist(),
        'male_y': male_y.tolist(),
        'female_x': female_x.tolist(),
        'female_y': female_y.tolist()
    }

    return jsonify(data)

    plot.bar(x='Gender', ylabel='Number of Births', title='Total number of births group by year and gender', color=['blue', 'green'])



@app.route("/api/v1.0/eduLevel")
def education():
    edu = list(test["EduLevel"].unique())
    return jsonify(edu)

@app.route("/api/v1.0/eduLevel/<edu_level>")
def education_level(edu_level):
    filtered_data = test[test["EduLevel"] == edu_level]
    metadata = filtered_data.to_dict("records")
    return jsonify(metadata)

    

if __name__ == '__main__':
    app.run(debug=True)




