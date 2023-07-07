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
engine = create_engine("sqlite:///data/USbirths.sqlite")
test = pd.read_sql("select * from births",con = engine.raw_connection())
print(test)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# print(Base.classes.keys())
# # Save reference to the table
# Births = Base.classes.births

##############################################
# Flask Setup
#################################################
app = Flask(__name__)

################################################
# Flask Routes
#################################################

@app.route("/")
def US_births():
    """List all available API routes."""
    return render_template("index.html")
        

@app.route("/api/v1.0/state")
def state():

    # Create our session (link) from Python to the DB
    # session = Session(engine)
    # result = session.query(Births).all()

    # ""list using date as the key and prcp as the value.""
        # stateresult = []
        # for x in stateresult:
        #     statedata = {
        #         "State":x.State, "Education_Level_of_mother":x.Education_Level_of_Mother
        #     }
        #     stateresult.append(statedata)
        # return jsonify(stateresult)

    return test.to_json(orient="records")

if __name__ == '__main__':
    app.run(debug=True)

