var consoleBreak = '\n----------------------------------------\n';

var glob = require("glob"),
	path = require("path"),
	fs = require("fs");


var directory, currentString, newString;


process.argv.forEach((val, index) => {
	switch (index) {
		case 2:
			directory = '/' + val + '/';
		case 3:
			currentString = val;
			break;
		case 4:
			newString = val;
	}
});

console.log('Directory:          ' + directory + 
			'\nCurrent String:     ' + currentString + 
			'\nNew String:         ' + newString + consoleBreak);

glob(__dirname + directory + '*.*', function(err, files) {
	
	var processed = 0;

	files.forEach(function(file) {

		var dir = path.dirname(file) + '/';

		var filename = path.basename(file);

		var newfilename = filename.replace(currentString, newString);
		console.log('Replace ' + dir + filename + ' with ' + dir + newfilename);

		fs.renameSync(dir + filename, dir + newfilename);

		processed++;
	});
	console.log(processed + " files processed");
});