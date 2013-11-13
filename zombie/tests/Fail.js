/**
    @file An example of a failing test
 */

var TestCase = require('../TestCase'); //load base test class

function Fail() {
} //create new test class

Fail.prototype = new TestCase(__filename); //inherit from base test class

//override required run function
Fail.prototype.run = function(browser, baseUrl) {
	var parentThis = this;

	//load page
	browser.visit(baseUrl).then(function() {
        parentThis.fail('Test Failure.');
	});

	return this.deferred.promise;
};

module.exports = Fail;