<?php
/**
 * A test class using PHPUnit's data providers to run the functional tests
 *
 * @author Chaz Birge <chaz@supplyhog.com>
 * @license MIT http://opensource.org/licenses/MIT
 * @copyright (c) 2013, SupplyHog Inc.
 * @package phpunit-zombie-link
 */
class SiteTest extends PHPUnit_Framework_TestCase {
	/**
	 * @dataProvider provider
	 */
	public function testPage($file, $status) {
		$this->assertTrue($status, $file);
	}

	public function provider() {
		//path to zombie interface file
		$file = getcwd() . "/zombie/TestInterface.js";

		//execute testing script
        	//assumes the default Node execution path for OSX
		$read = exec("/usr/local/bin/node {$file} http://localhost/index-test.php &");

		//format response to be data provider compatible
		$data = array();
		$read = CJSON::decode($read);
		$this->assertNotNull($read, 'Something is wrong with Node.js Test Interface');
		foreach ($read as $key => $row) {
			$data[$key] = array($key, $row);
		}
		return $data;
	}
}
