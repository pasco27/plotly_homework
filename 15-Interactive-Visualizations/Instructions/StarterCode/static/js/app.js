
// 15-3-4 for getting the json parsed
// also, using python server, so utilizing http://localhost:8000/
// running python -m 

// 15-2-7 as example:
// anytime a new sample is selected, update plots 



function buildPlot() {
    // pull in the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);
        // so I see we have names, metadata, and samples...

        // pull in and parse data: looks like there are 153 ID's, each with the own list of OTU_ID's 
        // want to grab the sample ID, that will eventually be selected from dropdown

        var sample_ID = "940"// something that I'm able to select later via dropdown selection (listener?)
        // within the html this is the 'selDataset'
        // var sample_ID = data.names[.. location... ]

        var sample = data.samples.filter(sample => sample.id === sample_ID);
        console.log(sample);


        var metadata_info = data.metadata.filter(metadata => metadata.id.toString() === sample_ID);
        //metadata was not pulling correctly as integer, converting toString..
        console.log(metadata_info);
        //this will be the metadata plotted on page along with each ID in the Demographic Info area.




        // from line 28, once the sample_ID is known, the OTU_ID's can be sorted
        var OTU_ID = data.samples.otu_id ...



        // obtain the top 10 samples by value
        var sample_values = data.sample.sample_value ...



    // setup trace for plotting (keep in mind, vertical bar chart)
    var trace1 = {
        x: sample_values,
        y: OTU_ID,
        type: "bar",
        orientation: "h"
    };


    // after trace is setup, var data = [trace]; as in many examples
    var data = [trace1];


    // create any layout work that is desired
    var layout = {
        title: "The nasty shit in your bellybutton",
        xaxis: { title: "OTU Count" },
        yaxis: { title: "OTU ID" }
    };


    // plot the bar chart with plot.ly
    Plotly.newPlot("plot", data, layout);


    // to create the table: the metadata needs to be called for each 







});







}


buildPlot();
