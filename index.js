var sampleData = 
	{ sumVendTop: 
		[
			{ "_id" : "AGENCY FOR HEALTH CARE ADMIN", "total" : 20923882780.100025 },
			{ "_id" : "STATE BOARD OF ADMINISTRATION", "total" : 5585115582.389993 },
			{ "_id" : "MIAMI-DADE COUNTY SCHOOL BOARD", "total" : 1664458036.2000022 },
			{ "_id" : "FL CFO SPEC PURPOSE INVEST ACCT", "total" : 1596296192.7299998 },
			{ "_id" : "BROWARD COUNTY SCHOOL BOARD", "total" : 1263273147.2300034 },
			{ "_id" : "HILLSBOROUGH CO SCHOOL BOARD", "total" : 1180955374.4900005 },
			{ "_id" : "FL DFS TAX REVOLVING ACCOUNT", "total" : 1164839659.46 },
			{ "_id" : "ORANGE COUNTY SCHOOL BOARD", "total" : 1161125745.7300036 },
			{ "_id" : "MIAMI DADE COUNTY", "total" : 857798335.5299993 },
			{ "_id" : "DUVAL COUNTY SCHOOL BOARD", "total" : 710290560.6599996 },
			{ "_id" : "PALM BEACH COUNTY SCHOOL BOARD", "total" : 683468142.6599997 },
			{ "_id" : "POLK COUNTY SCHOOL BOARD", "total" : 625411137.5099989 },
			{ "_id" : "STATE OF FLORIDA EMPLOYEE'S", "total" : 617100000 },
			{ "_id" : "DMS SELF INSURED AVMED CLAIMS", "total" : 471000000 },
			{ "_id" : "MEDCO", "total" : 470088659.87999994 },
			{ "_id" : "PINELLAS COUNTY SCHOOL BOARD", "total" : 469469925.3399996 },
			{ "_id" : "CENTERS FOR MEDICARE & MEDICAID", "total" : 430777480.21 },
			{ "_id" : "PASCO COUNTY SCHOOL BOARD", "total" : 424303326.3099998 },
			{ "_id" : "UNIVERSITY OF SOUTH FLORIDA", "total" : 423745211.9399995 },
			{ "_id" : "HILLSBOROUGH CO BOCC", "total" : 397885099.3099999 },
			{ "_id" : "AGENCY FOR HEALTH CARE ADMIN.", "total" : 395932238.31 },
			{ "_id" : "BREVARD COUNTY SCHOOL BOARD", "total" : 370516888.8599997 },
			{ "_id" : "LEE COUNTY SCHOOL BOARD", "total" : 358684408.36999977 },
			{ "_id" : "OSCEOLA COUNTY SCHOOL BOARD", "total" : 343539505.30999964 },
			{ "_id" : "VOLUSIA COUNTY SCHOOL BOARD", "total" : 339323925.04999983 },
			{ "_id" : "CITY OF JACKSONVILLE, TREASURY", "total" : 336732720.1800006 },
			{ "_id" : "SEMINOLE COUNTY SCHOOL BOARD", "total" : 316862210.3299996 }
		]
	};


$(function() {
	InitChart();
});

function InitChart() {
	var diameter = 600;

	var svg = d3.select('#svgVisualize')
	   .attr('width', diameter)
	   .attr('height', diameter);

	var bubble = d3.layout.pack()
	   .size([diameter, diameter])
	   .padding(3)   // padding between adjacent circles
	   // new data will be loaded to bubble layout
	   .value(function(d) {return d.size;});

	var nodes = bubble.nodes(processData(sampleData))
	   // filter out the outer bubble
	   .filter(function(d) { return !d.children; });

      var vis = svg.selectAll('circle')
					.data(nodes);
  
  vis.enter().append('circle')
			.attr('transform', function(d) { 
				return 'translate(' + d.x + ',' + d.y + ')'; 
			})
			.attr('r', function(d) { 
				return d.r; 
			})
			.attr('class', function(d) { 
				return d.className; 
			});
}

  function processData(data) {
    var obj = data.sumVendTop;

    var newDataSet = [];

    for(var prop in obj) {
      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    }
    return {children: newDataSet};
  }