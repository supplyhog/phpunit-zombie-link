phpunit-zombie-link
===================

A simple interface to use the Zombie.js(Node.js) framework with PHPUnit for functional testing.

Features
--------
* Execute Zombie.js functional tests in PHPUnit
* Tests run in parallel and are easily scaled
* Allows for using the latest version of Node.js and Zombie.js

Prerequisites
-------------
* [Node.js](http://nodejs.org/) (tested with version 0.10.21)
* [Zombie.js](http://zombie.labnotes.org/) (tested with version 2.0.0-alpha24)
* [Q](https://github.com/kriskowal/q) (tested with version 0.9.7)
* `npm install zombie q`

Getting Started
---------------
* Modify the existing test case to point to the correct Node execution path and test URL
* Tests should inherit from the TestCase class and be placed in zombie/tests
* Run all tests in PHPUnit, or run a specific test with: `node TestInterface.js http://localhost Path/To/YourTest.js`

Example Test
------------
```javascript
var TestCase = require('../TestCase'); //load base test class
function ExampleTest() {
} //create new test class
ExampleTest.prototype = new TestCase(__filename); //inherit from base test class

//override required run function
ExampleTest.prototype.run = function(browser, baseUrl) {
	//TODO: run your test and call either this.pass() or this.fail('reason')

	return this.deferred.promise;
};

module.exports = ExampleTest;
```

