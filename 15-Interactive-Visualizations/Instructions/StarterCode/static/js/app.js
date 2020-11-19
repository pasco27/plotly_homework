
// 15-3-4 for getting the json parsed
// also, using python server, so utilizing http://localhost:8000/
// running python -m 

// 15-2-7 as example:
// anytime a new sample is selected, update plots 


function optionChanged(sampleID) {
    buildPlot(sampleID);
    buildTable(sampleID);
    // buildGauge(sampleID);
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
    buildGauge("940");
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

        var sample = data.samples.filter(sample => sample.id === selectedID)[0];
        console.log(sample);

        // so now, "sample" in line 47 gives me the dataset for that sample id number
        // which includes otu_labels, otu_ids, and the sample_values 
        // the demographic info I need will need another similar search and be in sample.metadata

        // leaving these lines in here in case I need to come back and create variable-based entries:
        // var otu_ids_all = sample[0].otu_ids;
        // var values = sample[0].sample_values;

        // Example 15-3-5 shows that I need to reverse() these slices due to plot.loy defaults
        // It doesn't seem that I do, but I'm keeping this note in the instance that I need to in the future


        var data = [
            {
                y: sample.otu_ids.map(d => d.toString()).slice(0, 9),
                x: sample.sample_values.slice(0, 9),
                type: 'bar',
                orientation: 'h'
            }
        ];

        var layout = {
            title: "The Top 10 OTU's",
            xaxis: { title: "Count" },
            yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bar-plot", data, layout);

    })
}


function buildTable(selectedID) {
    // pull the data
    d3.json("../samples.json").then(function (data) {


        var metadata_info = data.metadata.filter(metadata => metadata.id.toString() === selectedID)[0];
        //as stated in comments above, metadata was not pulling correctly as integer, converting toString..
        console.log(metadata_info);
        //this will be the metadata plotted on page along with each ID in the Demographic Info area.

        var metaDataTable = d3.select("#sample-metadata")
        // can convert json key-value pairs with Object.entries(returns array of key:value)
        // for a forEach.append the text for each key:value pairs 

        // empty and then regenerate the Demographics Table by appending 
        metaDataTable.html("");

        Object.entries(metadata_info).forEach((key) => {
            metaDataTable.append("h5").text(key[0] + ": " + key[1]);

        });
    });
}


function buildGauge(selectedID) {
    // pull the data
    d3.json("../samples.json").then(function (data) {

        // now I want to drill down to the belly button washing frequency data for easy selected ID
        // within the buildTable function, I'd already called metadata_info
        // so, metadata_info.wfreq should pull the data desired for the selected ID
        // I can use this same procedure to drill down into wfreq

        var wash_freq_proc = data.metadata.filter(metadata => metadata.id.toString() === selectedID)[0];
        var wash_freq = wash_freq_proc.wfreq;
        console.log(wash_freq);
        // this {console.log(wash_freq);} is showing me that the correct data point is being called,
        // but only for the init() function.


        // https://plotly.com/javascript/gauge-charts/
        // pulling in the plot.ly gauge charting package:

        var gauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: 270,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];

        var layout_gauge = { width: 600, height: 500, margin: { t: 0, b: 0 } };

        Plotly.newPlot('myDiv', gauge, layout_gauge);





    });
}












// other notes taken along the path:::


//     // obtain the top 10 samples by value
//     function topIDs(OTU_ID_sorted) {
//         return OTU_ID_sorted[''] > // some slice that is top 10 [0:9] of the sorted list from above?
//             // need to slice here
//         }
//         //OR
//         var sample_values = data.sample.sample_value ...
//     //OR
//     var sample_values = OTU_ID_sorted.map(sample => samples.sample_value > //some top slice [0:9] that gets me top 10?)
//         Math.floor ? ceiling ?

//     // setup trace for plotting (keep in mind, vertical bar chart)
//     var trace1 = {
//         x: sample_values,
//         y: OTU_ID,
//         type: "bar",
//         orientation: "h"
//     };


//     // after trace is setup, var data = [trace]; as in many examples
//     var data = [trace1];


//     // to create the table: the metadata needs to be called for each

// });

// for (var i = 0; i < ___; i++) {
//     x0.push(samples.()...);
//     x1.push(samples.()...);
// }



// d3.json("../samples.json").then(function (data) {
//     var metadata_ID = data.metadata.[''].id }