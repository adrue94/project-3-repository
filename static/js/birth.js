// connect the console log to the javascript file
console.log("birth.js")

// Place url in a constant variable
const url = "http://127.0.0.1:5000/api/v1.0/eduLevel"
const gender_url = "http://127.0.0.1:5000/api/v1.0/gender"


d3.json(gender_url).then(function (data) {
    console.log(data)
})


// Fetch the JSON data and console log it 
d3.json(url).then(function (data) {
    console.log(data);

    // assign a variable to access the data
    let elom = data
    //iterate over the array to create indexes
    data.forEach(function(row, index) {
        row.index = index;
      });
     
    // console log the new array
    console.log(data);
    
    //
    // create a function to return only North Carolina data
    function northCarolina(state) {
        return state.State == "North Carolina";
    }
    // call the custom function with a filter
    let stateInData = data.filter(northCarolina);

    //Display the result in console
    console.log(stateInData);
    //

    // assign a variable to access the Education Level data
    let elom = data.EduLevel

    // assign a variable to access the HTML tag for the dropdown menu location
    dropdown = d3.select("#selDataset")

    // for loop to iterate through the values and display the index of choice
    for (let i = 0; i < data.length; i++) {
        dropdown
            .append("option")
            .text(data[i])
            .property("value", data[i]);
    };

    buildMetaData(data[0])
});

// create a function to populate sample metadata class with info
function buildMetaData(id) {
    d3.json(url).then(function (data) {
        let meta = data.EduLevelCode

        let resultArray = data.filter(sampleObj => sampleObj.data == data);
        console.log("resultArray")
        // console.log(resultArray)

        // assign result variable to grab the first index of the resulting array
        let result = resultArray[0];

        // assign a box variable where the data will display
        let box = d3.select("#sample-metadata");

        // clears the metadata in the console log so it can be filled with the next pull
        box.html("");
        
        // loop for the display box and format to uppercase
        Object.keys(result).forEach((key) => {
            box.append("h6").text(key.toUpperCase() + ":" + result[key]);
           
          });
    })
};

function optionChanged(meta){
    buildMetaData(meta)
};