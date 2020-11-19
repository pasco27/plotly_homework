
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
    buildTable("940"); s
}

init();

function buildPlot(selectedID) {
    // pull in the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);

        // so I see we have names, metadata, and samples...

        // pull in and parse data: looks like there are 153 ID's, each with the own list of OTU_ID's 
        // want to grab the sample ID, that will eventually be selected from dropdown

        // I will be shaping the pulls/matching of data via the otu_id
        // within metadata, this item is an integer 
        // within names and samples, this item is a string

        // once the user has made a selection, the dataset can be searched
        // this line is the first return array that matches in the sample...
        var sample = data.samples.filter(sample => sample.id === parseInt(selectedID))[0];
        console.log(sample);

        // so now, "sample" in line 47 gives me the dataset for that sample id number
        // which includes otu_labels, otu_ids, and the sample_values 
        // the demographic info I need will need another similar search and be in sample.metadata

        // data for charting.. 2nd try 

        var otu_id_top10_inSample = sample.samples.otu_ids.slice(0, 9).reverse();
        console.log(otu_id_top10_inSample)

        var chart_labels = sample.otu_labels.map(d => d.otu_ids.toString()).slice(0, 9).reverse();
        // var chart_labels = otuIdsTop10.map(item => "OTU ID " + item);
        console.log(chart_labels);

        //var sampleValuesTop10 = sampleFiltered[0].sample_values.slice(0, 10).reverse();
        var sample_values_top10_inSample = sample.sample_values.slice(0, 10).reverse();
        console.log(sample_values_top10_inSample);


        var data = [
            {
                // tried to be clever here and pull in what I wanted all in one line, wasn't particularly working
                // instead I went back out of this list and created variables to carry each x, y

                // y: sample.otu_ids.map(d => d.otu_ids.toString()).slice(0, 9).reverse(),
                y: otu_id_top10_inSample,
                // this one should work..
                x: sample_values_top10_inSample,
                // x: sample.sample_values.slice(0, 9).reverse(),
                type: 'bar',
                orientation: 'h'
            }

        ];

        var layout = {
            title: "Count by OTU ID",
            xaxis: { title: "Count" },
            yaxis: { title: "OTU ID" }
        };


        Plotly.newPlot("bar-plot", data, layout);



    })
}



function buildTable(selectedID) {
    // pull the data
    d3.json("../samples.json").then(function (data) {
        console.log(data);

        var metadata_info = data.metadata.filter(metadata => metadata.id.toString() === selectedID)[0];
        //as stated in comments above, metadata was not pulling correctly as integer, converting toString..
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