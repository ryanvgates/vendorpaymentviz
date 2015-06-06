var totals = {};

$.getJSON("https://opendata.demo.socrata.com/resource/ixay-a4di.json", function( data ) {
	$.each(data, function(key, value) {
		console.log(value);
		
    	if (totals.vendor_name != null){
    		totals.amount += value.amount;
    	}
    	else{

    	}
	});
});