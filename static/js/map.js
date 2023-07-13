    // Function to get color based on value
    function getColor(d) {
        return d > 400000 ? '#e00404' :
               d > 300000 ? '#d56016' :
               d > 200000 ? '#d5a216' :
               d > 150000 ? '#ccd516' :
               d > 100000 ? '#cfd642' :
               d > 10000 ? '#cfd642' :
               '#d0d570'; // default color for values below or equal to 10000
      }

      function getColorForLegend(opacity) {
        var color = 'rgba(255, 0, 0, ' + opacity + ')'; // Red color with the specified opacity
        return color;
      }

      function getOpacity(d) {
        var opacity = 1 - (d / 400000); // Calculate opacity based on the value of d
        return opacity;
      }

      function getInverseOpacity(d, min, max) {
          var logScale = d3.scaleLinear().domain([min, max]).range([0, 1]);
        
          var opacity = logScale(d);
          var inverseOpacity = 1 - opacity;
            return inverseOpacity;
          }

          function getNormalizedColor(d, min, max) {

            // get color gradient from rainbow vis with 6 items
            var numberOfItems = 6;
            var rainbow = new Rainbow(); 
            rainbow.setNumberRange(1, numberOfItems);
            rainbow.setSpectrum('#f69697', '#c30010');

            var logScale = d3.scaleLog().domain([min, max]).range([0.1, 1]);
            var opacity = logScale(d);
             
            var inverseOpacity = 1 - opacity;
            return inverseOpacity > 0.8 ? rainbow.colourAt(6) :
            inverseOpacity > 0.6 ? rainbow.colourAt(5) :
            inverseOpacity > 0.4 ? rainbow.colourAt(4) :
            inverseOpacity > 0.2 ? rainbow.colourAt(3) :
            inverseOpacity > 0.1 ? rainbow.colourAt(2) :
            inverseOpacity > 0 ? rainbow.colourAt(1) :
            rainbow.colourAt(1); // default color for values below or equal to 10000
            }

            
d3.json('../data/us_state_boundaries.json')
  .then(data => {
    var states = data;

    var map = new L.Map('map-id');
    map.setView(new L.LatLng(39.5, -98.35), 3); // Adjust the center and zoom level to include Alaska

    var street = L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: '27d8f9327b65469c9e36e2665272b7f7',
        maxZoom: 22
    }).addTo(map);
    

    var geojsonMarkerOptions = {
      radius: 1,
      fillColor: "white",
      color: "rgba(255,100,100,0.7)",
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    };

       //START COPY -----------------------------------------------------------------------
    // Create the GeoJSON layer for eighth grade or less
    var eighth_grade_or_less = new L.GeoJSON(null, {
      pointToLayer: function (latlng) {
        return new L.CircleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: function (feature, layer) {
        var state = feature.properties.NAME;
        
        
        d3.csv('../data/state_data_merged_years.csv').then(function(data) {
          var educationData = data.find(function(d) {
            return d.State === state && d.Education_Level_Code === "1";
            //CHANGE THE EDUCATION LEVEL CODE --------------------------------------------------- - USE STRING
          });
         
          if (educationData) {
            var birthsByEducationLevel = +educationData.Number_of_Births;
            var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 2448, 576186);
            console.log('Color:', hexColor);
            layer.setStyle({
              fillColor: hexColor,
              fillOpacity: getInverseOpacity(birthsByEducationLevel, 2448, 576186),
              color: 'black',
              weight: 3
            });

            layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
          } else {
            // No birth data for the state
            layer.setStyle({
              fillColor: '#999999', // Gray fill color
              fillOpacity: 0.1, // Low opacity
              color: 'black',
              weight: 1
            });
      
            layer.bindPopup("No birth data available for " + feature.properties.NAME);
          }
        });
      }
    });

    // Iterate through states array and add each state's geojson data to the geojsonLayer
    states.features.forEach(function(state) {
        eighth_grade_or_less.addData(state); 
    });


    // Create the GeoJSON layer for ninth grade with no diploma
    var ninth_no_diploma = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "2";
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 30894, 1344240);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 30894, 1344240),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
        ninth_no_diploma.addData(state); //CHANGE VARIABLE NAME FOR GRADE
      });


    // Create the GeoJSON layer for bachelors
    var bachelors = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "6";
              //CHANGE THE EDUCATION LEVEL CODE!!! ---------------------------------------------
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 61548, 3277230);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 61548, 3277230),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
  
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
          bachelors.addData(state); 
      });



    // Create the GeoJSON layer for Doctorate/Professional degree
    var doctorate_professional = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "8";
              //CHANGE THE EDUCATION LEVEL CODE --------------------------------------------------- - USE STRING
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 7506, 501528);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 7506, 501528),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
        doctorate_professional.addData(state); 
      });


   
    // Create the GeoJSON layer for Doctorate/Professional degree
    var highschool_ged = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "3";
              //CHANGE THE EDUCATION LEVEL CODE --------------------------------------------------- - USE STRING
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 109842, 3860538);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 109842, 3860538),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
  
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
        highschool_ged.addData(state); 
      });



    // Create the GeoJSON layer for Master's degree
    var masters = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "7";
              //CHANGE THE EDUCATION LEVEL CODE --------------------------------------------------- - USE STRING
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 23712, 1492872);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 23712, 1492872),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
  
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
        masters.addData(state); 
      });
  

  
    // Create the GeoJSON layer for Some College,no degree
    var some_college_no_degree = new L.GeoJSON(null, {
        pointToLayer: function (latlng) {
          return new L.CircleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          var state = feature.properties.NAME;
          
          d3.csv('../data/state_data_merged_years.csv').then(function(data) {
            var educationData = data.find(function(d) {
              return d.State === state && d.Education_Level_Code === "4";
              //CHANGE THE EDUCATION LEVEL CODE --------------------------------------------------- - USE STRING
            });
           
            if (educationData) {
              var birthsByEducationLevel = +educationData.Number_of_Births;
              var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 91158, 3117966);
              console.log('Color:', hexColor);
              layer.setStyle({
                fillColor: hexColor,
                fillOpacity: getInverseOpacity(birthsByEducationLevel, 91158, 3117966),
                color: 'black',
                weight: 3
              });
  
              layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
            } else {
              // No birth data for the state
              layer.setStyle({
                fillColor: '#999999', // Gray fill color
                fillOpacity: 0.1, // Low opacity
                color: 'black',
                weight: 1
              });
        
              layer.bindPopup("No birth data available for " + feature.properties.NAME);
            }
          });
        }
      });
  
      // Iterate through states array and add each state's geojson data to the geojsonLayer
      states.features.forEach(function(state) {
        some_college_no_degree.addData(state); //CHANGE VARIABLE NAME FOR GRADE-------------------------------
      });
  //END COPY PER EDUCATION -------------------------------------------------------------------
   // Create the GeoJSON layer for associates or less
   var associates = new L.GeoJSON(null, {
    pointToLayer: function (latlng) {
      return new L.CircleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function (feature, layer) {
      var state = feature.properties.NAME;
      
      d3.csv('../data/state_data_merged_years.csv').then(function(data) {
        var educationData = data.find(function(d) {
          return d.State === state && d.Education_Level_Code === "5";
          //CHANGE THE EDUCATION LEVEL CODE!!! ---------------------------------------------
        });
       
        if (educationData) {
          var birthsByEducationLevel = +educationData.Number_of_Births;
          var hexColor = '#' + getNormalizedColor(birthsByEducationLevel, 29574, 1077582);
          console.log('Color:', hexColor);
          layer.setStyle({
            fillColor: hexColor,
            fillOpacity: getInverseOpacity(birthsByEducationLevel, 29574, 1077582),
            color: 'black',
            weight: 3
          });

          layer.bindPopup(feature.properties.NAME + "<br>Number of Births: " + birthsByEducationLevel);
        } else {
          // No birth data for the state
          layer.setStyle({
            fillColor: '#999999', // Gray fill color
            fillOpacity: 0.1, // Low opacity
            color: 'black',
            weight: 1
          });
    
          layer.bindPopup("No birth data available for " + feature.properties.NAME);
        }
      });
    }
  });

  // Iterate through states array and add each state's geojson data to the geojsonLayer
  states.features.forEach(function(state) {
      associates.addData(state); //CHANGE VARIABLE NAME FOR GRADE --------------------------------
  });


// Legend
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  var opacityValues = [1, 0.8, 0.6, 0.4, 0.2, 0]; // Example opacity values

  // Iterate through opacity values and create legend items
  for (var i = 0; i < opacityValues.length; i++) {
    var opacity = opacityValues[i];
    var opacityPercentage = Math.round(opacity * 100);

    div.innerHTML +=
      '<i style="background:' + getColorForLegend(opacity) + '; box-shadow: 0 0 3px rgba(0, 0, 0, 0.5); width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ';

    if (i === 0) {
      div.innerHTML += 'Lower number of births<br>';
    } else if (i === opacityValues.length - 1) {
      div.innerHTML += 'Higher number of births<br>';
    } else {
      div.innerHTML += '<br>';
    }
  }

  return div;
};

legend.addTo(map);


    // Create a layer group to hold both GeoJSON layers
    //For any new layer, add here
    var layerGroup = L.layerGroup([eighth_grade_or_less, ninth_no_diploma, associates, bachelors, doctorate_professional, highschool_ged, masters, some_college_no_degree]);

    // Add the layer group to the toggle control
    //AND ADD NEW LAYER HERE
    var overlayMaps = {
      "8th Grade or Less": eighth_grade_or_less,
      "9th through 12th with no diploma": ninth_no_diploma,
      "Associate's": associates,
      "Bachelor's": bachelors,
      "Doctorate or Professional": doctorate_professional,
      "Highschool or GED": highschool_ged,
      "Master's": masters,
      "Some college, no degree": some_college_no_degree



    };
    L.control.layers(null, overlayMaps, { title: 'Education Level of Mother', collapsed: false }).addTo(map);

    // Add the layer group to the map
    layerGroup.addTo(map);
  })
  .catch(error => {
    console.log('Error:', error);
  });
