/**
 * File: sentiment-analysis.js
 * ----------------------------
 * Objective is classifying tweets as either pro-refugee or anti-refugees sentiment,
 * corresponding to labels of 1 and -1, respectively. Realistically, we should 
 * have a neural label (0), but for reasons of model simplicity, we'll forego it
 * 
 * Refresh Chrome tab on index.html & check console to see whether the tests pass or 
 * not, as well as the model performance scores once you complete all TODOs!
 */


/** Function: updateWordMap
 * This function goes through each word in a new tweet of the training
 * corpus, stems the word, and updates wordMap as follows:
 *   (1) if word is already in wordMap, the word's value (sentiment score) in 
 *       wordMap should be increased by 1 if tweetLabel = 1 (pro-refugee), 
 *       and decreased by 1 if tweet = -1 (anti-refugee sentiment).
 * 
 *   (2) if word is not in wordMap yet, it should be added as a new key with 
 *       initial value 1 if tweet is pro-refugee, and -1 if anti-refugee. 
 * 
 * Tips: 
 *   - objName.hasOwnProperty(key) checks whether a key is present in an obj (true/false)
 * -----------
 * Params:
 *  > wordMap (object): a JS object where the keys are distinct words, and values 
 *                              are the corresponding sentiment scores (+/- integer)
 *  > tweet (string): the text of the tweet ingested to update wordMap
 *  > tweetLabel (int): 1 if pro-refugee, -1 if anti-refugee

 * Returns:
 *  >  None (function should just update WordMap!)
 */
function updateWordMap(wordMap, tweet, tweetLabel){
    let tweetWords = tweet.toLowerCase().split(" ");
    for (let word of tweetWords){
        let stemmedWord = stemmer(word);
        if (stemmedWord === ""){continue;}

        //TODO: write your code to update wordMap here!
        
    }
}

/** Function: predictTweet
 * This function is the entire pipeline from a tweet to its predicted label (1 or -1), making
 * use of the features in wordSentimentMap collected during training. It should add up the 
 * sentiment scores of all the words in the tweet, retrieving from wordMap.
 *
 * Then, if tweetSentimentScore > 0, predict as pro-refugee; otherwise, anti-refugee. Tweet words 
 * not in wordMap should be ignored.  
 * ----------------------------
 * Params:
 *  > tweet (str): the text of the tweet we're trying to classify
 *  > wordMap (obj): JS object obtained by analyzing the training corpus; keys are 
 *           distinct words and values are word sentiment scores.
 
 * Returns: 
 *  > (int): 1 if the tweet is predicted as pro-refugee sentiment, -1 if anti-refugee sentiment
 */
function predictTweet(tweet, wordMap){
    let tweetWords = tweet.toLowerCase().split(" ");
    let tweetSentimentScore = 0;
    //TODO: delete the line below and write your code in here!
    return 0;
}


/* no need to modify anything beyond this point! */

let wordMap = trainAndEvaluateModel();

function trainAndEvaluateModel(){

    let wordMap = {}; //stores each word's sentiment score, e.g., {"happy": 5, "unhappy": -4}

    //loop over all tweets, and iteratively update the words' sentiment scores  
    for (let tweet of trainTweets){
        updateWordMap(wordMap, tweet.tweet, tweet.label);
    }

    //using wordMap, predict each tweet in the test set as pro-refugee or anti-refugee 
    let predictedLabels = [];
    let correctLabels = [];
    for (let tweet of testTweets){
        let predLabel = predictTweet(tweet.tweet, wordMap);
        predictedLabels.push(predLabel);
        correctLabels.push(tweet.label);
    }

    //calls function (in graphics.js) to calculate & print accuracy scores to console
    logResults(predictedLabels, correctLabels);

    //displays classification results on webpage, using function in graphics.js 
    displayResults(predictedLabels, correctLabels)

    return wordMap;
}
