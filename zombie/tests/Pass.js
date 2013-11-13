/**
    @file An example of a passing test
 */

var TestCase = require('../TestCase'); //load base test class

function Pass() {
} //create new test class

Pass.prototype = new TestCase(__filename); //inherit from base test class

//override required run function
Pass.prototype.run = function(browser, baseUrl) {
	var parentThis = this;

	//load page
	browser.visit(baseUrl).then(function() {
        parentThis.pass();
	});

	return this.deferred.promise;
};

module.exports = Pass;