<<<<<<< HEAD
// Connect the console log to the JavaScript file
console.log("birth.js");

// Place URL in constant variables
const eduLevelUrl = "http://127.0.0.1:5000/api/v1.0/eduLevel";
const state_url = "http://127.0.0.1:5000/api/v1.0/state";
const gender_url = "http://127.0.0.1:5000/api/v1.0/gender";



// Fetch the JSON data and console log it
d3.json(eduLevelUrl).then(function (edu_data) {
  d3.json(state_url).then(function(state_data) {
    console.log(eduLevelUrl); // Log edu_data to console
    console.log(state_data); // Log state_data to console

    // Assign a variable to access the HTML tag for the dropdown menu location
    dropdown = d3.select("#selDataset");

    // For loop to iterate through the values and display the index of choice
    dropdown.html(""); // Clear existing options

// For loop to iterate through the values and display the index of choice
    for (let i = 0; i < edu_data.length; i++) {
      dropdown
    .append("option")
    .text(edu_data[i])
    .property("value", edu_data[i]);
}
  });
});

function buildMetaData(id) {
  const url = `${eduLevelUrl}/${id}`;

  d3.json(url).then(function (data) {
    let result = data[0];
    let box = d3.select("#sample-metadata");
    box.html("");

    Object.entries(result).forEach(([key, value]) => {
      box.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function optionChanged(meta) {
  buildMetaData(meta);
}

// Populate dropdown options on page load
d3.json("http://127.0.0.1:5000/api/v1.0/eduLevel").then(function (edu_data) {
  let dropdown = d3.select("#selDataset");

  edu_data.forEach((edu) => {
    dropdown
      .append("option")
      .text(edu)
      .property("value", edu);
  });

  // Trigger metadata population for the initial selection
  let initialSelection = edu_data[0];
  buildMetaData(initialSelection);
});

// Fetch the state data from the API endpoint
d3.json("/api/v1.0/state").then(function (data) {
  // Print the received data in the console
  console.log(data);

  // Select the panel body element to display the state information
  let panelBody = d3.select("#sample-metadata");

  // Clear existing content
  panelBody.html("");

  // Loop through the data and display the state information
  data.forEach(function (state) {
    Object.entries(state).forEach(function ([key, value]) {
      panelBody.append("p").text(`${key}: ${value}`);
    });
    panelBody.append("hr"); // Add a horizontal line between state information
  });
});



d3.json(gender_url).then(function (data) {
  let male_x = data.male_x;
  let male_y = data.male_y;
  let female_x = data.female_x;
  let female_y = data.female_y;

  let maleBarTrace = {
    x: male_x,
    y: male_y,
    name: "Male",
    type: "bar",
    marker: {
      color: "#b8e6f2"
    }
  };

  let femaleBarTrace = {
    x: female_x,
    y: female_y,
    name: "Female",
    type: "bar",
    marker: {
      color:"#faa4a7"
    }
  };

  let barData = [maleBarTrace, femaleBarTrace];

  // let barLayout = {
  //   title: "Gender",
  //   barmode: "group",
  //   xaxis: {
  //     tickmode: "linear"
  //   }
  // };

  let barLayout = {
    title: "Gender of Births and total count of birth 2016-2021 ",
    barmode: "group",
    xaxis: {
      title: " Birth Gender per Year 2016-2021"
    },
    yaxis: {
      title: " Total No. of Birth per Year"
    }
  };
  

  let responsive = {
    responsive: true
  };

  Plotly.newPlot("genderBarChart", barData, barLayout, responsive);
});




=======
// connect the console log to the javascript file
console.log("birth.js")
console.log("data.js")

// // // Place url in a constant variable
// // const url = "http://127.0.0.1:5000/api/v1.0/eduLevel"
// // const gender_url = "http://127.0.0.1:5000/api/v1.0/gender"


// Create an array of each state's data
let alaska = Object.values(data.alaska);
let california = Object.values(data.california);
let districtOfColumbia = Object.values(data.districtOfColumbia);
let florida = Object.values(data.florida);
let hawaii = Object.values(data.hawaii);
let newYork = Object.values(data.newYork);
let northCarolina = Object.values(data.northCarolina);
let texas = Object.values(data.texas);

// // log each array into console
// console.log(alaska);
// console.log(california);
// console.log(districtOfColumbia);
// console.log(florida);
// console.log(hawaii);
// console.log(newYork);
// console.log(northCarolina);
// console.log(texas);

// Create an array of category labels
let labels = Object.keys(data.alaska);

// Display the default plot
function init() {
  let data = [{
    values: alaska,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the state data
  let data = [];

  if (dataset == 'alaska') {
      data = alaska;
  }
  else if (dataset == 'california') {
      data = californa;
  }
  else if (dataset == 'districtOfColumbia') {
      data = districtOfColumbia;
  }
  else if (dataset == 'hawaii') {
    data = hawaii;
  }
  else if (dataset == 'florida') {
    data = florida;
  }
  else if (dataset == 'newYork') {
      data = newYork;
  }
  else if (dataset == 'northCarolina') {
    data = northCarolina;
  }
  else if (dataset == 'texas') {
    data = texas;
  } 
// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();
>>>>>>> bbeb03e (working pie chart w/ dropdown)
