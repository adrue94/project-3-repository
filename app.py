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

#################################################
# Database Setup
#################################################
## engine = create_engine("sqlite:///data/USbirths.sqlite")
engine = create_engine("sqlite:///sql_files/us_births.sqlite")
test = pd.read_sql("select * from EightStatesData", con=engine.raw_connection())
print(test)


# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# print(Base.classes.keys())
# # Save reference to the table
# Births = Base.classes.EightStatesData

##############################################
# Flask Setup
#################################################
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
    return df2['Births'].agg('sum').to_json()


@app.route("/api/v1.0/eduLevel")
def education():

    edu = list(test.EduLevel.unique())
    print(edu)
    return jsonify(edu)

    #plot.bar(x='Gender', ylabel='Number of Births', title='Total number of births group by year and gender', color=['blue', 'green'])


if __name__ == '__main__':
    app.run(debug=True)
