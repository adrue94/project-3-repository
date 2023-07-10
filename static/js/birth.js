d3.json("http://127.0.0.1:5000//api/v1.0/state").then(function (stateData) {
    console.log(stateData)
})

// Code Michael Added
// Granim JavaScript Library - Interactive Gradients
var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500,
    states : {
        "default-state": {
            gradients: [
                ['#B3FFAB', '#12FFF7'],
                ['#ADD100', '#7B920A'],
                ['#1A2980', '#26D0CE']
            ],
            transitionSpeed: 10000
        },
        "violet-state": {
            gradients: [
                ['#9D50BB', '#6E48AA'],
                ['#4776E6', '#8E54E9']
            ],
            transitionSpeed: 2000
        },
        "orange-state": {
            gradients: [ ['#FF4E50', '#F9D423'] ],
            loop: false
        }
    }
});

// With jQuery
$('#default-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('default-state');
    setClass('#default-state-cta')
});
$('#violet-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('violet-state');
    setClass('#violet-state-cta')
});
$('#orange-state-cta').on('click', function(event) {
    event.preventDefault();
    granimInstance.changeState('orange-state');
    setClass('#orange-state-cta')
});

function setClass(element) {
    $('.canvas-interactive-wrapper a').removeClass('active');
    $(element).addClass('active');
};

// Code Michael Added
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