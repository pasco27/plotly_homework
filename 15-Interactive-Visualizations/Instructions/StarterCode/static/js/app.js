
// 15-3-4 for getting the json parsed
// also, using python server, so utilizing http://localhost:8000/
// running python -m 

// 15-2-7 as example:
// anytime a new sample is selected, update plots 


function optionChanged(sampleID) {
    buildPlot(sampleID);
    buildTable(sampleID);
    buildGauge(sampleID);
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
        console.log("buildPlot", data);
        // so I see we have names, metadata, and samples...

        // pull in and parse data: looks like there are 153 ID's, each with the own list of OTU_ID's 
        // want to grab the sample ID, that will eventually be selected from dropdown

        // I will be shaping the pulls/matching of data via the otu_id
        // within metadata, this item is an integer 
        // within names and samples, this item is a string

        // once the user has made a selection, the dataset can be searched
        // this line is the first return array that matches in the sample...

        var sample = data.samples.filter(sample => sample.id === selectedID)[0];
        console.log("buildPlot", sample);

        // so now, "sample" in line 47 gives me the dataset for that sample id number
        // which includes otu_labels, otu_ids, and the sample_values 
        // the demographic info I need will need another similar search and be in sample.metadata

        // leaving these lines in here in case I need to come back and create variable-based entries:
        // var otu_ids_all = sample[0].otu_ids;
        // var values = sample[0].sample_values;

        // the below chart is not pulling the OTU_IDs correctly: 
        // it's showing the 10 OTU_ID's pulled in a long range of the values.
        // instead trying: 
        var top_otu_labels = data.samples[0].otu_ids.slice(0, 10).map(row => 'OTU' + row)
        console.log("buildPlot", top_otu_labels)

        // Example 15-3-5 shows that I need to reverse() these slices due to plot.loy defaults
        // It doesn't seem that I do, but I'm keeping this note in the instance that I need to in the future

        var chart_data = [
            {
                // y: sample.otu_ids.map(d => d.toString()).slice(0, 9),
                y: top_otu_labels,
                x: sample.sample_values.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        var layout_chart = {
            title: "The Top 10 OTU's",
            xaxis: { title: "Count" },
            // yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bar-plot", chart_data, layout_chart);


        // to display similar data utilizing the bubble chart format, 
        // pulling in the plot.ly bubble chart package: https://plotly.com/javascript/bubble-charts/

        var bubble_data = [
            {
                // x: sample.otu_ids.map(d => d.toString()).slice(0, 9),
                x: sample.otu_ids,
                y: sample.sample_values,  // <-- removing the slice
                mode: "markers",
                text: sample.otu_ids,
                marker: {
                    color: sample.otu_ids,
                    opacity: [1, 0.8, 0.6, 0.4],
                    size: sample.sample_values
                }
            }
        ];
        // installed the two spaces into this for troubleshooting of 'bubble data'
        console.log("\n \nbubble data", bubble_data);


        var layout_bubble = {
            title: "OTU Bubbles",
            xaxis: { title: "OTU ID" },
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bubble", bubble_data, layout_bubble);

    })
}
// I'm not getting my bubble plot to work correctly --  I feel that this may be because
// I may possibly have to create it's own function



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


        // pulling in the plot.ly gauge charting package: https://plotly.com/javascript/gauge-charts/

        var gauge = [
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: wash_freq_proc.wfreq,
                title: { text: "Scrubs per Week", font: { size: 18 } },
                // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                    axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "red" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 2], color: "white" },
                        { range: [2, 5], color: "cyan" },
                        { range: [5, 8], color: "royalblue" },
                        { range: [8, 10], color: "darkblue" },
                    ],
                    // threshold: {
                    //     line: { color: "red", width: 4 },
                    //     thickness: 0.75,
                    //     value: 5
                    // }
                }
            }
        ];

        var layout_gauge = {
            width: 400,
            height: 300,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
        };

        var layout_gauge = { width: 500, height: 400, margin: { t: 0, b: 0 } };

        Plotly.newPlot("gauge", gauge, layout_gauge);


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