var fs = require("fs"),
	inputFileName = './top100',
	outputFileName = 'top100.json';

fs.readFile( inputFileName, function(err, data) {
	// console.log('err = ', err);
    // console.log('data = ', data.toString());
    var s = data.toString();
    var myArray = s.split(/\n/);
    var output = [];
    for(var i in myArray){
    	if(myArray[i].length < 1){
    		continue;
    	}

    	var c = escape(myArray[i]).replace(/%u/, '');
    	console.log( 'c = ', c, ' || ', myArray[i]);
    	var obj = {}
    	obj['uni'] = c;
    	obj['zh'] = myArray[i];
    	output.push(obj);
    }

    console.log(output);
    fs.writeFile( outputFileName, JSON.stringify(output, null, 4), function(err) {
	    if(err) {
	      	console.log(err);
	    } else {
	      	console.log("JSON saved to "+ __dirname+ '/'+outputFileName);
	    }
	});
});