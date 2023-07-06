from flask import Flask, jsonify
import requests 
import datetime as dt

from json import dump
import json
import numpy as np

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/us_births.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
Base.classes.keys()

# Save reference to the table
State = Base.classes.State
Education = Base.classes.Education Level of Mother
Weight = Base.classes.avgbirthweight
Births = Base.classes.number of Births

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
    return (
        "Available Routes:<br/>"
        "/api/v1.0/state<br/>"
        "/api/v1.0/education<br/>"
        "/api/v1.0/birthweight<br/>"
        "/api/v1.0/bithnumbers<br/>"
        "/api/v1.0/avgagoofmom<br/>"
    )

@app.route("/api/v1.0/education")
def state():
    # Create our session (link) from Python to the DB
    session = Session(engine)

     ## Display the dataframe only containing the following selected states of interest 
        # CA, TX, DC, NC, AK, FL, HI, NY

    selected_df = df[(df.State_Abbreviation == 'CA') | (df.State_Abbreviation == 'TX') 
                 | (df.State_Abbreviation == 'DC') | (df.State_Abbreviation == 'NC') | (df.State_Abbreviation == 'AK') 
                 | (df.State_Abbreviation == 'FL') | (df.State_Abbreviation == 'HI') | (df.State_Abbreviation == 'NY')]
    session.close()

    # ""dictionary using date as the key and prcp as the value.""
    prcpyearresult = {}
    for x, y in prcpresults:
       prcpyearresult[x] = y
    return jsonify(prcpyearresult)










if __name__ == '__main__':
    app.run(debug=True)

