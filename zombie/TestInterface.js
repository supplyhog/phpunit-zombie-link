/**
    @file Run the tests and parse the results
    @author Chaz Birge <chaz@supplyhog.com>
    @license MIT http://opensource.org/licenses/MIT
    @copyright (c) 2013, SupplyHog Inc.
    @module phpunit-zombie-link
 */

var Q = require('q');
var Browser = require("zombie");
var baseUrl = process.argv[2]; //first argument is base url
var specificTest = process.argv[3]; //Second argument is optional, and the specific test to run
if(typeof baseUrl === 'undefined')
	baseUrl = 'http://localhost';

//setup default browser
browser = new Browser({debug: false, loadCSS: false, silent: true});

//get all files in the current directory
var queue = [];
var testDir = __dirname + '/tests/';
//@todo Add failure for if the directory does not exist.

var fs = require('fs');
if(typeof specificTest === 'undefined'){
	fs.readdirSync(testDir).forEach(function(file) {
        if(require('path').extname(file) === '.js') { //only run .js files
            //get the test
            var test = require(testDir + file);
    
            //add the test to the queue to be ran
            queue.push(new test().run(browser, baseUrl));
        }
	});
}
else if(fs.existsSync(testDir + specificTest)){
	//get the test
	var test = require(testDir + specificTest);
	//add the test to the queue to be ran
	queue.push(new test().run(browser, baseUrl));
}
else{
	var testCase = require('./TestCase');
	queue.push(new testCase().run());
}

//run all tests
var testResults = {};
Q.all(queue).then(function(resp) {
	//check if each result is an error and add to result list
	resp.forEach(function(result){
		if(Object.prototype.toString.call(result) === '[object Error]'){
			testResults[result] = false;
		} else{
			testResults[result] = true;
		}
	})
}).fin(function() {
	//return results
	console.log(testResults);
});