var totals = {};

var sampleData = [{
  "x": 1,
  "y": 5
}, {
  "x": 20,
  "y": 20
}, {
  "x": 40,
  "y": 10
}, {
  "x": 60,
  "y": 40
}, {
  "x": 80,
  "y": 5
}, {
  "x": 100,
  "y": 60
}];

$(function() {
	InitChart();
});

function InitChart() {
	// Chart creation code goes here
    var vis = d3.select("#svgVisualize");
    var xRange = d3.scale.linear().range([40, 400]).domain([0,100]);
    var yRange = d3.scale.linear().range([40, 400]).domain([0,100]);
    var xAxis = d3.svg.axis().scale(xRange);
    var yAxis = d3.svg.axis().scale(yRange);
    vis.append("svg:g").call(xAxis);
    vis.append("svg:g").call(yAxis);

    var xRange = d3.scale.linear()
                .range([40, 400])
                .domain([d3.min(sampleData, function(d) {
                  return (d.x);
                }), d3.max(sampleData, function(d) {
                  return d.x;
                })]);
	var yRange = d3.scale.linear()
                .range([400, 40])
                .domain([d3.min(sampleData, function(d) {
                  return d.y;
                }), d3.max(sampleData, function(d) {
                  return d.y;
                })]);

	var circles = vis.selectAll("circle").data(sampleData);
 
	circles
	    .enter()
	    .insert("circle")
	    .attr("cx", function(d) { return xRange (d.x); })
	    .attr("cy", function(d) { return yRange (d.y); })
	    .attr("r", 10)
	    .style("fill", "red");
}

$.getJSON("https://opendata.demo.socrata.com/resource/ixay-a4di.json", function( data ) {
	$.each(data, function(key, value) {
		console.log(value);
		if(totals[value.vendor_name] != null){
			totals[value.vendor_name] += value.amount;
		}
		else{
			totals[value.vendor_name] = value;
		}
	});
});