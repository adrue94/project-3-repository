// Begin code for Pie Chart and associated Dropdown

// connect the console log to the javascript file
console.log("weight.js");
console.log("data.js");

// Create an array of each state's data
let alaska = Object.values(data.alaska);
let california = Object.values(data.california);
let districtOfColumbia = Object.values(data.districtOfColumbia);
let florida = Object.values(data.florida);
let hawaii = Object.values(data.hawaii);
let newYork = Object.values(data.newYork);
let northCarolina = Object.values(data.northCarolina);
let texas = Object.values(data.texas);

// log to console
console.log(data);

// Create an array of category labels
let labels = Object.keys(data.alaska);

// Display the default plot
function init() {
  let plotData = [{
    values: alaska,
    labels: labels,
    marker: {
      colors: [
        'rgb(108, 80, 223)',
        'rgb(180, 80, 223)',
        'rgb(223, 80, 195)',
        'rgb(223, 80, 124)',
        'rgb(223, 108, 80)',
        'rgb(223, 179, 80)',
        'rgb(91, 177, 243)',
        'rgb(80, 130, 223)',
        'rgb(158, 129, 174)'
      ]
    },
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800,
    font: {
      color: 'black',
      family: 'Arial'
    },
  };

  Plotly.newPlot("pie", plotData, layout);
}

// On change to the DOM, call getData()
dropdown = d3.selectAll("#selDatasetWeight").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDatasetWeight");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the state data
  let selectedData = [];

  if (dataset === 'alaska') {
    selectedData = alaska;
  } else if (dataset === 'california') {
    selectedData = california;
  } else if (dataset === 'districtOfColumbia') {
    selectedData = districtOfColumbia;
  } else if (dataset === 'hawaii') {
    selectedData = hawaii;
  } else if (dataset === 'florida') {
    selectedData = florida;
  } else if (dataset === 'newYork') {
    selectedData = newYork;
  } else if (dataset === 'northCarolina') {
    selectedData = northCarolina;
  } else if (dataset === 'texas') {
    selectedData = texas;
  }

  // Call function to update the chart
  updatePlotly(selectedData);
}

// Update the restyled plot's values
function updatePlotly(newData) {
  Plotly.restyle("pie", "values", [newData]);
}

init();
