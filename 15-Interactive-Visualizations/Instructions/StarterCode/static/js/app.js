
// 15-3-4 for getting the json parsed
// also, using python server, so utilizing http://localhost:8000/
// running python -m 

// 15-2-7 as example:
// anytime a new sample is selected, update plots 

function optionChanged(sampleID) {
    buildPlot(sampleID);
    // buildTable(sampleID);
};



function init() {
    var selector = d3.select('#selDataset');
    d3.json('../samples.json').then(function (data) {
        var chosen = data.names
        chosen.forEach(name => {
            selector.append('option')
                .text(name)
                .property('value', name)
        });
    });
    buildPlot("940");
    buildTable("940");
}

init();

function buildPlot(selectedID) {
    // pull in the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);
        // so I see we have names, metadata, and samples...

        // pull in and parse data: looks like there are 153 ID's, each with the own list of OTU_ID's 
        // want to grab the sample ID, that will eventually be selected from dropdown

        // var sample_ID = "940"


        // something that I'm able to select later via dropdown selection (listener?)
        // within the html this is the 'selDataset'
        // var sample_ID = data.names[.. location... ]

        var sample = data.samples.filter(sample => sample.id === selectedID)[0];
        console.log(sample);

        //this will be the metadata plotted on page along with each ID in the Demographic Info area.

        // from line 28, once the sample_ID is known, the OTU_ID's can be sorted
        //var OTU_ID_sorted = data.samples.otu_id ...


        // plotly stuff here ...

    })
}



function buildTable(selectedID) {
    // pull the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);

        var metadata_info = data.metadata.filter(metadata => metadata.id.toString() === selectedID)[0];
        //metadata was not pulling correctly as integer, converting toString..
        console.log(metadata_info);
        //this will be the metadata plotted on page along with each ID in the Demographic Info area.

        var metaDataTable = d3.select("#sample-metadata")
        // can convert json key-value pairs with Object.entries(returns array of key:value)
        // for a forEach.append the text for each key:value pairs 

    });
}






/*

    // obtain the top 10 samples by value
    function topIDs(OTU_ID_sorted) {
        return OTU_ID_sorted[''] > // some slice that is top 10 [0:9] of the sorted list from above?
            // need to slice here
        }
        //OR
        var sample_values = data.sample.sample_value ...
    //OR
    var sample_values = OTU_ID_sorted.map(sample => samples.sample_value > //some top slice [0:9] that gets me top 10?)
        Math.floor ? ceiling ?

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
    Plotly.newPlot("bar-plot", data, layout);


    // to create the table: the metadata needs to be called for each







});

for (var i = 0; i < ___; i++) {
    x0.push(samples.()...);
    x1.push(samples.()...);
}





}


buildPlot();





d3.json("../samples.json").then(function (data) {
    var metadata_ID = data.metadata.[''].id




 */