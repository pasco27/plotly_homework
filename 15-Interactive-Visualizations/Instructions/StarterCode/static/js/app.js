// 15-3-4 as example:
// sort data
// slide what is desired for plotting
// reverse array to accommodate Plotly's defaults

// then set up trace

// 15-3-4 for getting the json parsed
// also, using python server, so utilizing http://localhost:8000/
// running python -m 

// 15-2-7 as example:
// anytime a new sample is selected, update plots 



function buildPlot() {
    // pull in the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);
    });

    // pull in and parse metadata



    // sort the samples



    // obtain the top 10 samples



    // setup trace for plotting (keep in mind, vertical bar chart)



    // after trace is setup, var data = [trace]; as in many examples



    // create any layout work that is desired




    // plot with plotly





}


buildPlot();
