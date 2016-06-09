/**
 * @file
 * Test file for the {@link Josephus} module.
 * Execute from command line with: node test josephus
 */
var josephus = require('./josephus').josephus;

var get_testSuites = function () {
    return [
        {
            name: 'Bad Input',
            tests: [
                {
                    name: 'Size < 3 (positive)',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(2, 1, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Size < 3 (zero)',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(0, 1, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Size < 3 (negative)',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(-1, 1, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Sword index out of bounds (negative)',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(3, -1, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Sword index out of bounds (too large)',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(3, 4, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Kill self',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(3, 1, 0, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Pass sword to self',
                    test: function () {
                        var expected = -1;
                        var actual = josephus(3, 1, 1, 0);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected function to return -1 (bad input), but got: " + actual
                            }
                        }

                        return result;
                    }
                }
            ]
        },
        {
            name: 'Basic',
            tests: [
                {
                    name: 'Minimum circle, all left',
                    test: function () {
                        var expected = 2;
                        var actual = josephus(3, 0, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected index 2, but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: 'Minimum circle, all right',
                    test: function () {
                        var expected = 1;
                        var actual = josephus(3, 0, -1, -1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected index 1, but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    /*
                    0 begins with sword
                    0 kills 1
                    0 passes sword to 2
                    2 kill 3
                    2 passes sword to 4
                    ...
                    38 kills 39
                    38 passes sword to 0
                    0 kills 2
                    0 passes sword to 4
                    4 kills 6
                    4 passes sword to 8
                    ...
                    36 kills 38
                    36 passes sword to 0
                    0 kills 4
                    0 passes sword to 8
                    8 kills 12
                    8 passes sword to 16
                    ...
                    32 kills 36
                    32 passes sword to 0
                    0 kills 8
                    0 passes sword to 16
                    16 kills 24
                    16 passes sword to 32
                    32 kills 0 passes sword to 16
                    16 is where Josephus should stand
                    */
                    name: 'Historical',
                    test: function () {
                        var expected = 16;
                        var actual = josephus(40, 0, 1, 1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected index 16, but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    /*
                    0 starts with the sword
                    0 kills 39
                    0 passes sword to 38
                    38 kills 37
                    38 passes sword to 36
                    ...
                    2 kills 1
                    2 passes sword to 0
                    0 kills 38
                    0 passes sword to 36
                    36 kills 34
                    36 passes sword to 32
                    ...
                    4 kills 2
                    4 passes sword to 0
                    0 kills 36
                    0 passes sword to 32
                    32 kills 28
                    32 passes sword to 24
                    ...
                    8 kills 4
                    8 passes sword to 0
                    0 kills 32
                    0 passes sword to 24
                    24 kills 16
                    24 passes sword to 8
                    8 kills 0
                    8 passes sword to 24
                    24 is where Josephus should stand
                    */
                    name: 'Reverse historical',
                    test: function () {
                        var expected = 24;
                        var actual = josephus(40, 0, -1, -1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected index 24, but got: " + actual
                            }
                        }

                        return result;
                    }
                }
            ]
        },
        {
            name: 'Stress Tests',
            tests: [
                {
                    name: "N = 99999999, kill left 1, pass right 1",
                    test: function () {
                        var expected = 2;
                        var actual = josephus(99999999, 0, 1, -1);
                        var result;
                        
                        if (actual === expected) {
                            result = true;
                        } else {
                            result = {
                                failure: "Expected index 2, but got: " + actual
                            }
                        }

                        return result;
                    }
                },
                {
                    name: "N = 3, kill right 99999999, pass left 99999999",
                    test: function () {
                        var expected = 1;
                        var actual = josephus(3, 0, -99999999, 99999999);
                        var result;
                        
                            result = true;
                        if (actual === expected) {
                        } else {
                            result = {
                                failure: "Expected index 1, but got: " + actual
                            }
                        }

                        return result;
                    }
                }
            ]
        }
    ];
};

var run_test = function (test) {
    var name = test.name;
    var result;

    console.log("");
    console.log("        Test: " + name);
    console.log("        Running test...");

    result = test.test();

    if (result === true) {
        console.log("        Test passed");
    } else {
        result.name = name;
        console.log("        Test failed!");
        console.log("        " + result.failure);
    }

    return result;
};

var run_testSuite = function (testSuite) {
    var results = {};
    var result;
    var tests = testSuite.tests;
    var num_tests = tests.length;
    var failures = [];
    var failure;
    var num_failures;
    var num_successes;

    console.log("");
    console.log("    ----------------------------------------------------------------------------");
    console.log("    Test suite: " + testSuite.name);
    console.log("    ----------------------------------------------------------------------------");
    console.log("    Loading tests...");
    console.log("    " + num_tests + " tests found")
    console.log("    Running tests...");

    for (i = 0; i < num_tests; i++) {
        test = tests[i];
        result = run_test(test);

        if (result !== true) {
            failures.push(result);
        }
    }

    num_failures = failures.length;
    num_successes = num_tests - num_failures;

    console.log("");
    console.log("    ----------------------------------------------------------------------------");
    console.log("    Suite results:")
    console.log("    ----------------------------------------------------------------------------");
    console.log("    Test suite: " + testSuite.name);
    console.log("    Ran " + num_tests + " tests");
    console.log("    " + num_successes + " tests passed");
    console.log("    " + num_failures + " tests failed!");

    for (i = 0; i < failures.length; i++) {
        failure = failures[i];

        console.log("")
        console.log("        Test: " + failure.name + " failed!");
        console.log("        " + failure.failure);
    }

    console.log("    ----------------------------------------------------------------------------");
    console.log("");
    console.log("");

    results.name = testSuite.name;
    results.num_successes = num_successes;
    results.num_failures = num_failures;
    results.failures = failures;

    return results;
};

var test_josephus = function () {
    var testSuites = get_testSuites();
    var num_testSuites = testSuites.length;
    var total_tests = 0;
    var failures = [];
    var suiteFailure;
    var testFailure;
    var num_failedSuites;
    var total_failures = 0;
    var total_successes;
    var results;
    var testSuite;
    var i;

    console.log("");
    console.log("================================================================================");
    console.log("Testing the Josephus Module");
    console.log("================================================================================");
    console.log("Loading test suites...");
    
    for (i = 0; i < num_testSuites; i++) {
        testSuite = testSuites[i];
        total_tests += testSuite.tests.length;
        results = run_testSuite(testSuite);

        if (results.num_failures !== 0) {
            failures.push(results);
            total_failures += results.failures.length;
        }
    }

    num_failedSuites = failures.length;
    num_successfulSuites = num_testSuites - num_failedSuites;

    total_successes = total_tests - total_failures;

    console.log("");
    console.log("================================================================================");
    console.log("Final results:");
    console.log("================================================================================");
    console.log("Ran " + num_testSuites + " test suites of " + total_tests + " tests");
    console.log(num_successfulSuites + " test suites passed");
    console.log(num_failedSuites + " test suites failed!");

    for (i = 0; i < failures.length; i++) {
        suiteFailure = failures[i];
        testFailures = suiteFailure.failures;

        console.log("")
        console.log("    Test suite: " + suiteFailure.name + " failed " + testFailures.length + " tests");

        for (j = 0; j < testFailures.length; j++) {
            testFailure = testFailures[j];

            console.log("")
            console.log("        Test: " + testFailure.name + " failed!");
            console.log("        " + testFailure.failure);
        }
    }

    console.log("================================================================================");
    console.log("");
    console.log("");
};

//BEGIN
test_josephus();
