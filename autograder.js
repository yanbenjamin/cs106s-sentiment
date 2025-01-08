console.log("Run sanityCheck() in the console to perform automated tests",
            " (please note that they're not comprehensive!)");

// autograder to check if outputs match that of reference solution 
function sanityCheck(){
    testUpdateWordMap();
    testPredictTweet();
}

function testUpdateWordMap(){

    let numFailedTests = 0;

    function logSuccess(tweet, inputWordMap, wordMap, expectedWordMap){
        console.log("✅ updateWordMap matches reference solution for inputs: ",
                        "\ntweet = " + JSON.stringify(tweet),
                        "\nwordMap = " + JSON.stringify(inputWordMap),
                        "\n\nUpdated wordMap = " + JSON.stringify(wordMap),
                        "\nExpected wordMap = " + JSON.stringify(expectedWordMap)
                    );
    }

    function logError(tweet, inputWordMap, wordMap, expectedWordMap){
        console.log("❗updateWordMap does not match reference solution for inputs: ",
                        "\ntweet = " + JSON.stringify(tweet),
                        "\nwordMap = " + JSON.stringify(inputWordMap),
                        "\n\nUpdated wordMap = " + JSON.stringify(wordMap),
                        "\nExpected wordMap = " + JSON.stringify(expectedWordMap)
        ); 
    }

    function runUnitTest(tweet, inputWordMap, expectedWordMap){
        let wordMap = Object.assign({}, inputWordMap);
        updateWordMap(wordMap, tweet.tweet, tweet.label);

        let outputKeys = Object.keys(wordMap); // words stored in output wordMap
        let expectedKeys = Object.keys(expectedWordMap); // words stored in expected wordMap
        outputKeys.sort(); // alphabetically
        expectedKeys.sort(); // alphabetically

        //check length of keys i.e. number of words in each map
        if (outputKeys.length !== expectedKeys.length){
            logError(tweet, inputWordMap, wordMap, expectedWordMap);
            return 1;
        }

        // check if the output contains the same words as the expected wordMap  
        for (let i = 0; i < outputKeys.length; i++){
            if (outputKeys[i] !== expectedKeys[i]){
                logError(tweet, inputWordMap, wordMap, expectedWordMap);
                return 1;
            }
        }

        // check if the sentiment scores are the same 
        for (let key in wordMap){
            if (wordMap[key] !== expectedWordMap[key]){
                logError(tweet, inputWordMap, wordMap, expectedWordMap);
                return 1;
            }
        }

        logSuccess(tweet, inputWordMap, wordMap, expectedWordMap);
        return 0; // success!
    };

    numFailedTests += runUnitTest({tweet: "super great", label: 1}, {}, 
                                    {"super": 1, "great": 1});

    numFailedTests += runUnitTest({tweet: "super bad", label: -1}, {"super": 1,"great": 1},
                                    {"super": 0, "great": 1, "bad": -1});

    numFailedTests += runUnitTest({tweet: "cs for social good", label: 1}, {"social": 1,"good": 1},
                                    {"cs": 1, "for": 1, "social": 2, "good": 2});

    //tests whether program uses stemmedWord or not
    stemmerTest = runUnitTest({tweet: "love loving loved", label: 1}, {},
                                    {"love": 3});
    if (stemmerTest && !numFailedTests) console.log("🔎 Quick Check: Did you use word instead of stemmedWord?");
    numFailedTests += stemmerTest;

    if (numFailedTests === 0){
        console.log("✅ All tests for updateWordMap passed!",
                    "\n----------------------------------");
        return 0;
    } 
    console.log("🫠 updateWordMap: Passes " + (4 - numFailedTests) + " out of 4 tests, you got this!",
                "\n---------------------------------");
    return 1;
}

function testPredictTweet(){
    let numFailedTests = 0;
    let invalidLabel = false;

    function logSuccess(tweet, wordMap, outputLabel, expectedLabel, stepByStep, sentiment){
        console.log("✅ predictTweet matches reference solution for inputs: ",
                        "\ntweet = " + JSON.stringify(tweet),
                        "\nwordMap = " + JSON.stringify(wordMap),
                        "\n\nOutput Label = " + outputLabel,
                        "\nExpected Label = " + expectedLabel + " (tweetSentimentScore=" + sentiment + "=" + stepByStep + ")"
                    );
    }

    function logError(tweet, wordMap, outputLabel, expectedLabel, stepByStep, sentiment){
        console.log("❗predictTweet does not match reference solution for inputs: ",
                        "\ntweet = " + JSON.stringify(tweet),
                        "\nwordMap = " + JSON.stringify(wordMap),
                        "\n\nOutput Label = " + outputLabel,
                        "\nExpected Label = " +  expectedLabel + " (tweetSentimentScore=" + sentiment + "=" + stepByStep + ")"
        ); 
    }

    function runUnitTest(tweet, wordMap, expectedLabel, stepByStep, sentiment){
        let outputLabel = predictTweet(tweet, wordMap);
        if(outputLabel !== 1 && outputLabel !== -1) invalidLabel = true;
        if (outputLabel !== expectedLabel){
            logError(tweet, wordMap, outputLabel, expectedLabel, stepByStep, sentiment);
            return 1;
        }
        logSuccess(tweet, wordMap, outputLabel, expectedLabel, stepByStep, sentiment);
        return 0; // success!
    };

    numFailedTests += runUnitTest("super great", {"super": 4, "great": 2}, 1, "4+2", 6);
    numFailedTests += runUnitTest("fine not the worst", {"fine": 2, "not": 0, "the": 0, "worst": -5}, -1, "2+0+0-5", -3);

    zeroScoreTest = runUnitTest("good and bad", {"good": 3, "and": 0, "bad": -3}, -1, "3+0-3", 0);
    numFailedTests += zeroScoreTest;

    nonTrainingWordTest = runUnitTest("love jujutsu kaisen", {"love": 7}, 1, "7+0+0", 7);
    if (nonTrainingWordTest && numFailedTests === 0) console.log("🔎 Quick Check: Does your function first check if a word is in wordMap? (and ignore it otherwise)");
    numFailedTests += nonTrainingWordTest;

    stemmerTest = runUnitTest("disappointing even in imax", {"disappoint": -5, "even": -1, "in": 0, "imax": 3}, -1, "-5-1+0+3", -3);
    if (stemmerTest && numFailedTests === 0) console.log("🔎 Quick Check: Did you stem each word first? (i.e. using the stemmer() function)");
    numFailedTests += stemmerTest;

    if (invalidLabel) console.log("🔎 Quick Check: Does your function always return either 1 or -1, and not the sentiment score itself?");
    if (zeroScoreTest && !invalidLabel) console.log("🔎 Quick Check: Does your function return a label of -1 when tweetSentimentScore is 0?");

    if (numFailedTests === 0) console.log("✅ All tests for predictTweet passed!");
    else console.log("🫠 predictTweet: Passes " + (5 - numFailedTests) + " out of 5 tests, you got this!");
}

