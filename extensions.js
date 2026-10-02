/**
 * File: extensions.js
 * ----------------------------
 * Optional extension / challenge for the tweet classifier. The aim is for words that appear in 
 * more tweets (e.g., "the") to have less weight / contribution to the tweet's overall sentiment score.
 * Word frequencies are stored in a new object called frequencyMap.
 *
 * Your tasks are the following functions (specifications below for each):
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

        // completed TODO
        if (stemmedWord in wordMap){
            wordMap[stemmedWord] += tweetLabel;
        } else{
            wordMap[stemmedWord] = tweetLabel;
        }

    }
}

/** Function: createWordMap
 * Identical to the version in sentiment-analysis.js
 */
function createWordMap(trainTweets) {
    let wordMap = {};

    // completed TODO
    for (let tweet of trainTweets) {
        updateWordMap(wordMap, tweet.tweet, tweet.label);
    }

    return wordMap;
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
    // completed TODO
    for (let word of words){
        if (!uniqueWords.includes(word)){
            uniqueWords.push(word); //add word if not already in uniqueWords
        }
    }
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
 *  >  None (function should just update frequencyMap!)
 */
function updateWordFrequency(frequencyMap, tweet){
    let tweetWords = tweet.toLowerCase().split(" ");
    let uniqueWords = getUniqueWords(tweetWords); // calls your helper function from above!
    for (let word of uniqueWords){
        let stemmedWord = stemmer(word);
        if (stemmedWord === ""){continue;}

         // completed TODO
        if (stemmedWord in frequencyMap){
            frequencyMap[stemmedWord]++;
        } else{
            frequencyMap[stemmedWord] = 1;
        }
    }
}

/** Function: createFrequencyMap
 * This function should loop over all tweets in the training array, and leverage your
 * helper function updateWordFrequency above to iteratively update each word's frequency. 
 * 
 * Note: Your implementation will look quite similar to createWordMap :)
 * -----------------------------------
 * Params:
 *   - trainTweets: an array where each element is a tweet object. For each tweet object, you  
 *                  can access its string text via tweet.tweet (you won't need to use tweet.label here).
 * 
 * Returns:
 *   - An object that maps each word to its frequency, e.g., {"happy": 40, "unhappy": 30, "the": 250, "rare": 2}
 */
function createFrequencyMap(trainTweets) {
    let frequencyMap = {};

    /* completed TODO */
    for (let tweet of trainTweets) {
        updateWordFrequency(frequencyMap, tweet.tweet, tweet.label);
    }

    return frequencyMap;
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
    
    // completed TODO
    for (let word of tweetWords){
        let stemmedWord = stemmer(word);
        if (stemmedWord === ""){continue;}

        if (stemmedWord in wordMap){
            // proportion of tweets that the word appears in 
            let word_frequency = frequencyMap[stemmedWord] / numTweets;

            // weight the word's sentiment score by 1 / proportion, so more frequent words are weighted less
            tweetSentimentScore += wordMap[stemmedWord] * (1 / word_frequency);
        }
    }
    if (tweetSentimentScore > 0){
        return 1; // predict tweet has pro-refugee sentiment
    }
    return -1; //predict tweet has anti-refugee sentiment
}

/* no need to modify anything beyond this point! */

let wordMap = trainAndEvaluateModel();

function trainAndEvaluateModel(){

    let wordMap = createWordMap(trainTweets); //stores each word's sentiment score, e.g., {"happy": 5, "unhappy": -4}
    let frequencyMap = createFrequencyMap(trainTweets); //stores each word's frequency i.e. how many tweets each word appears in,
                            // e.g., {"happy": 40, "unhappy": 30, "the": 250, "rare": 2}

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
