/**
    @file The base prototype all tests are based off of
    @author Chaz Birge <chaz@supplyhog.com>
    @license MIT http://opensource.org/licenses/MIT
    @copyright (c) 2013, SupplyHog Inc.
    @module phpunit-zombie-link
 */

/**
 * string file name must be based due to module caching
 * @param {type} fileName
 * @returns {TestCase}
 */
function TestCase(fileName) {
	this.deferred = require('q').defer();
	this.currentFile = require('path').basename(fileName);
}

/**
 * Run the test
 * @returns {TestCase.deferred.promise}
 */
TestCase.prototype.run = function() {
	this.fail('Test not implemented.');
	return this.deferred.promise;
};

/**
 * mark the test as passed
 */
TestCase.prototype.pass = function() {
	this.deferred.resolve(this.currentFile);
};

/**
 * Mark the test as failed with a message
 * @param string message
 */
TestCase.prototype.fail = function(message) {
	var error = new Error(message);
	error.name = this.currentFile;
	this.deferred.resolve(error);
}

module.exports = TestCase;