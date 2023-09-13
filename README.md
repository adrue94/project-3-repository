#   Project 3 - US Birth Data by State & Education Analysis

![pageHeader](https://github.com/adrue94/project-3-repository/assets/126558641/d395acfd-9185-4c5b-90e3-907341bb78c4)

For the third porject our team wanted to focus on generating a dashboard that was intuitive in function and presentation, as such we have selected an accessible dataset that has U.S. births by geography, gender and educational level over a 5 year period. The base CSV file has over 5000 entries, which may be trimmed to highlight differences between different subjects / states. The database span a period before and after CoVID which can reveal its impact on population births across the United States. 

# Study Objective: 
1. Perform ETL on a sufficiently large dataset; housed in a SQL database and powered with Python Flask API.
    - ETL done by viewing and processing the CSV through Python and Pandas, doing the necessary cleaning before loading it into PostgresQL. The data was then exported in JSON format for use.
2. Construct an engaging webpage with to facilitate interpretation and usability for users of all-levels.
    - The webpage was built with of HTML and CSS. It uses Bootstrap for general layout, Granim for the animated background gradient and an smooth scrolling library to enable navbar scrolling. 
3. Deploy webpage to showcase user-driven interactive data visualizations and tables.
    - The team used D3.js to read the JSON files and generated maps and visualizations through a combination of Leaflet and Plotly before integrating them in index.html.

# Data Source:
Origin: [Census.gov](https://data.census.gov/table?q=S1501&g=0100000US$0400000)

Dataset: [Kaggle](https://www.kaggle.com/datasets/danbraswell/temporary-us-births)

# Writeup

Our group created a dashboard displaying various comparisons between birth rates, average weights, and genders of the babies in conjuction with the education level of the mother, state of birth and the average age of the mothers. For the sake of interest, we decided to focus our analysis on 8 of the 50 states. The 8 states we selected are Alaska, California, District of Columbia, Hawaii, Florida, North Carolina, New York and Texas.

The navigational bar at the top of the page allows for the user to seamlessly transition from one section to another. Clicking on the 'US Birth Data' or the baby with the blue pacifier in the top left corner will return you to the top of the page. In the background, we have chosen the JavaScript library Granim.js, which animates color gradients through a canvas element across the screen. More information can be found at Granim.js.

We first have the Metadata table where the education level for the mothers of Alaskan female babies born in 2016 can be selected displaying the average birth weight (in grams), average age of the mother, number of births, and education level code.

Below the Metadata Table, Gender Data shows the total of births within the 8 selected states for male and female genders compared across years ranging from 2016 to 2021. The overall births decline year after year and every year more males are born than females. Hovering over the bars displays the number of births in multiples of one thousand.

Below the Gender Data, we have Weight Data in the form of a pie chart and associated dropdown displaying a comparison of the average birth weights in grams by education level for each of the eight selected states. Hovering over the pie chart will display the the average birth weight in grams for each state, inclusive of male and female genders. Observe how, regardless of the state or education level, the average birth weight is generally consistent. The percentage of the average birth weights generally range between 10.5% and 11.5% or 3,000 and 3,300 grams.

Finally, we have a map showing the proportional size and location of each of the 8 selected states where you can select any number of the different education levels to display the number of births expressed in saturation of the color red. The darker shades of red represent lower numbers of births, while the lighter shades represent higher numbers of birth. Hovering over any of the selected states, displays the total number of births for the education level(s) chosen. Upon observation, we can see that California has the highest number of births, while Alaska and Hawaii are among the lowest.

## Media Highlights 

Media showing the layout of our web dashboard.

[pageHighlightwebm.webm](https://github.com/adrue94/project-3-appTest/assets/126558641/f3704f56-63c2-4a69-acba-65221c0ea115)

[pageTablewebm.webm](https://github.com/adrue94/project-3-repository/assets/126558641/e3a3d7cc-cc0b-4aa5-b3e6-ce46b8ff3b8b)

[pageLeaflet.webm](https://github.com/adrue94/project-3-appTest/assets/126558641/f12fdc47-7b79-4142-bcad-7fd60ec38b37)

![pageBarStatic](https://github.com/adrue94/project-3-repository/assets/126558641/24ba7848-93ac-43d9-be52-c6af01c017bb)

![pagePieStatic](https://github.com/adrue94/project-3-repository/assets/126558641/ae5a24fe-2053-477b-a463-4b4746b7f7e0)
