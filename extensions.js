/**
 * File: extensions.js
 * ----------------------------
 * Optional extension / challenge for the tweet classifier. The aim is for words that appear in 
 * more tweets (e.g., "the") to have less weight / contribution to the tweet's overall sentiment score. 
 * Your tasks are the following functions (specifications below for each):
 * 
 *    - updateWordMap: simply copy over your earlier implementation into the designated TODO space!
 *    - getUniqueWords: brief helper function to implement
 *    - updateWordFrequency: function to implement, similar in spirit to updateWordMap
 *    - predictTweet: I recommend first copying over your earlier implementation, then tweaking
 *                      ~1-2 lines to leverage word frequencies in calculating tweetSentimentScore
 * 
 * NOTE: When you're ready to test, go into index.html, and change the line <script src="sentiment-analysis.js">
 * </script> to <script src="extensions.js"></script>. You'll likely see an increase in model accuracy!
 */

/** Function: updateWordMap
 * Identical to the version in sentiment-analysis.js
 */
function updateWordMap(wordMap, tweet, tweetLabel){
    let tweetWords = tweet.toLowerCase().split(" ");
    for (let word of tweetWords){
        let stemmedWord = stemmer(word);
        if (stemmedWord === ""){continue;}

        //TODO: copy and paste your earlier implementation from sentiment-analysis.js here!
    }
}

/** Function: getUniqueWords
 * This helper function takes an array of words, which may contain duplicates, and returns an array
 * uniqueWords with only the unique words in the original array.
 *  e.g., getUniqueWords(["blue","green","blue","red","red"]) should return ["blue","green","red"] (in any order)
 * 
 * Hint: You can check if an element is an array via .includes(), e.g., uniqueWords.includes(word)
 * ----------------------------
 * Params:
 *  > words (array[string]): Array of words / strings
 
 * Returns: 
 *  > uniqueWords (array[string]): An array of the unique words in the input
 */
function getUniqueWords(words){
    let uniqueWords = [];
    // TODO: your code here to build up the array uniqueWords! 
  
    return uniqueWords;
}

/** Function: updateWordFrequency
 * This function goes through each UNIQUE word in a new tweet of the training
 * corpus, stems the word, and updates frequencyMap as follows:
 *   (1) if word is already in frequencyMap, the word's value (frequency) in 
         frequencyMap should be increased by 1
 * 
 *   (2) if word is not in frequencyMap yet, it should be added as a new key with initial value 1
 * -----------
 * Params:
 *  > frequencyMap (object): Keys are distinct words and values are how many tweets the words appears in.
 *  > tweet (string): the text of the tweet ingested to update wordMap

 * Returns:
 *  >  None (function should just update WordMap!)
 */
function updateWordFrequency(frequencyMap, tweet){
    let tweetWords = tweet.toLowerCase().split(" ");
    uniqueWords = getUniqueWords(tweetWords); // calls your helper function from above!
    for (let word of uniqueWords){
        let stemmedWord = stemmer(word);
        if (stemmedWord === ""){continue;}

         //TODO: write your code to update frequencyMap here!
        
    }
}

/** Function: predictTweet
 * Similar to your earlier implementation, except that instead of directly adding up the sentiment scores
 * of the tweet words, it should multiply each sentiment score with (1 / word_frequency), so that
 * words that appear more often (e.g., "the") are weighted less. Here, we calculate word_frequency as
 * # of tweets that word appears in (use frequencyMap for this!) divided by the total # of tweets (numTweets).
 * 
 * As before, if tweetSentimentScore > 0, predict as pro-refugee; otherwise, anti-refugee.
 * Tweet words not in wordMap / frequencyMap should be ignored.  
 * ----------------------------
 * Params:
 *  > tweet (str): the text of the tweet we're trying to classify
 *  > wordMap (obj): Keys are distinct words and values are word sentiment scores.
 *  > frequencyMap (obj): Keys are distinct words and values are how many tweets the words appears in.
 *  > numTweets (int): total number of tweets
 
 * Returns: 
 *  > (int): 1 if the tweet is predicted as pro-refugee sentiment, -1 if anti-refugee sentiment
 */
function predictTweet(tweet, wordMap, frequencyMap, numTweets){
    let tweetWords = tweet.toLowerCase().split(" ");
    let tweetSentimentScore = 0;
    //TODO: delete the line below and write your code in here!
    return 0;
}

/* no need to modify anything beyond this point! */

let wordMap = trainAndEvaluateModel();

function trainAndEvaluateModel(){

    let wordMap = {}; //stores each word's sentiment score, e.g., {"happy": 5, "unhappy": -4}
    let frequencyMap = {}; //stores each word's frequency i.e. how many tweets each word appears in,
                            // e.g., {"happy": 40, "unhappy": 30, "the": 250, "rare": 2}

    //loop over all tweets, and iteratively update the words' sentiment and frequency scores  
    for (let tweet of trainTweets){
        updateWordMap(wordMap, tweet.tweet, tweet.label);
        updateWordFrequency(frequencyMap, tweet.tweet);
    }

    //using wordMap and frequencyMap, predict each tweet in the test set as pro-refugee or anti-refugee 
    let predictedLabels = [];
    let correctLabels = [];
    for (let tweet of testTweets){
        let predLabel = predictTweet(tweet.tweet, wordMap, frequencyMap, trainTweets.length);
        predictedLabels.push(predLabel);
        correctLabels.push(tweet.label);
    }

    //calls function (in graphics.js) to calculate & print accuracy scores to console
    logResults(predictedLabels, correctLabels);

    //displays classification results on webpage, using function in graphics.js 
    displayResults(predictedLabels, correctLabels)

    return wordMap;
}
