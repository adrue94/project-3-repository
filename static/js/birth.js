d3.json("http://127.0.0.1:5000//api/v1.0/state").then(function (stateData) {
    console.log(stateData)
})

// Michael's code starts here
// connect the console log to the javascript file
console.log("birth.js")

// Place url in a constant variable
const url = "http://127.0.0.1:5000//api/v1.0/state"

// Fetch the JSON data and console log it (tutor session with David Chao)
d3.json(url).then(function (data) {
    console.log(data);

    // assign a variable to access the data
    let names = data.names

    // assign a variable to access the HTML tag for the dropdown menu
    dropdown = d3.select("#selDataset")

    // for loop to iterate through the values and display the index of choice
    for (let i = 0; i < names.length; i++) {
        dropdown
            .append("option")
            .text(names[i])
            .property("value", names[i]);
    };

    buildMetaData(names[0])
});

// create a function to 
function buildMetaData(id) {
    d3.json(url).then(function (data) {
        let meta = data.metadata

        let resultArray = meta.filter(sampleObj => sampleObj.id == id);
        console.log("resultArray")
        // console.log(resultArray)

        // assign result variable to grab the first index of the resulting array
        let result = resultArray[0];

        // assign a box variable which grabs the metadata for the display
        let box = d3.select("#sample-metadata");

        // clears the metadata in the console log so it can be filled with the next pull
        box.html("");
        
        // loop for the display box and format to uppercase
        Object.keys(result).forEach((key) => {
            box.append("h6").text(key.toUpperCase() + ":" + result[key]);
           
          });
    })
};

function optionChanged(id){
    buildMetaData(id)
};