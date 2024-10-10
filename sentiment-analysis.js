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
        
        if (wordMap.hasOwnProperty(stemmedWord)){ //word already in wordMap
            wordMap[stemmedWord] += tweetLabel; // +1 if pro-refugee,
                                                // -1 if anti-refugee
        }
        else{ // new word!
            wordMap[stemmedWord] = tweetLabel;
        }
    }
}

/** Function: predictTweet
 * This function is the entire pipeline from a tweet to its predicted label (1 or -1), making
 * use of the features in wordSentimentMap collected during training. It should add up the 
 * sentiment scores of all the words in the tweet, retrieving from wordMap.
 *
 * Then, if tweetSentimentScore < 0, predict as anti-refugee; otherwise, pro-refugee. Tweet words 
 * not in wordSentimentMap should be ignored.  
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
    
    for (let word of tweetWords){
        let stemmedWord = stemmer(word);
        if (wordMap.hasOwnProperty(stemmedWord)){
            //add the word's sentiment to the tweet's total score 
            tweetSentimentScore += wordMap[stemmedWord];
        }
    }
    
    if (tweetSentimentScore < 0){
        return -1; // predict tweet has anti-refugee sentiment
    }
    return 1; //predict tweet has pro-refugee sentiment
}

/* No need to modify anything beyond this point */

function trainAndEvaluateModel(){

    let wordMap = {};
    for (let tweet of trainTweets){
        updateWordMap(wordMap, tweet.tweet, tweet.label);
    }
    
    let numCorrect = 0;
    let falsePositive = 0;
    let positive = 0; let negative = 0;
    let falseNegative = 0;
    for (let tweet of testTweets){
        let predLabel = predictTweet(tweet.tweet, wordMap);

        if (tweet.label === predLabel){
            numCorrect += 1;
        }
        else if (predLabel === 1){
            falsePositive += 1;
        }
        else{
            falseNegative += 1;
        }
        if (tweet.label === 1){
            positive += 1;
        }
        else{
            negative += 1;
        }
    }
    
    console.log("Percent Correct: ", numCorrect / testTweets.length * 100);
    console.log("False Positive Rate: ", falsePositive / negative * 100);
    console.log("False Negative Rate: ", falseNegative / positive * 100);
    return wordMap;
}

let wordMap = trainAndEvaluateModel();
