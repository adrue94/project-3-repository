from flask import Flask, jsonify, render_template, request
import requests
import datetime as dt
import pandas as pd


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from json import dump
import json


engine = create_engine("sqlite:///sql_files/us_births.sqlite")
test = pd.read_sql("select * from EightStatesData", con=engine.raw_connection())
print(test)

app = Flask(__name__)

# Changed default template to index_granim.html
@app.route("/")
def US_births():
    """List all available API routes."""
    # return render_template("index.html")
    return render_template("index_granim.html")

@app.route("/map")
def map_page():
    """List all available API routes."""
    return render_template("map.html")

@app.route("/index_with_map")
def index_with_map():
    """List all available API routes."""
    return render_template("index_with_map.html")

@app.route("/api/v1.0/state")
def state():

    return jsonify(test.to_dict(orient="records"))


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

    plot.bar(x='Birth Gender per Year', ylabel='No. of Births', title='Total number of births group by year and gender', color=['blue', 'green'])



@app.route("/api/v1.0/eduLevel")
def education():
    edu = list(test["EduLevel"].unique())
    return jsonify(edu)

@app.route("/api/v1.0/eduLevel/<edu_level>")
def education_level(edu_level):
    filtered_data = test[test["EduLevel"] == edu_level]
    metadata = filtered_data.to_dict("records")
    return jsonify(metadata)

@app.route("/api/v1.0/births-by-state-education")
def births_by_state_education():
    edu_level = request.args.get('edu_level')
    if edu_level:
        births_by_state_edu = test[test['EduLevel'] == edu_level].groupby('State')['Births'].sum().reset_index()
        return births_by_state_edu.to_json(orient="records")
    
@app.route("/api/v1.0/us-state-boundaries")
def us_state_boundaries():
    with open("data/us_state_boundaries.json") as json_file:
        data = json.load(json_file)
    return jsonify(data)

@app.route("/api/v1.0/state_births_merged_years")
def us_state_births_merged_years():
    csv_file_path = "data/merged_years.csv"
    data = pd.read_csv(csv_file_path)
    json_data = data.to_json(orient="records")
    return json_data

if __name__ == '__main__':
    app.run(debug=True)







