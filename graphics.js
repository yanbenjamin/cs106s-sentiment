
function logResults(predictedLabels, correctLabels){
    let numLabels = predictedLabels.length; // assumed equal to correctLabels.length
    let numCorrect = 0;
    let falsePositives = 0; //tweets that are labeled anti-refugee but predicted as pro-refugee
    let falseNegatives = 0; //tweets that are labeled pro-refugee but predicted as anti-refugee
    let positiveLabels = 0; //total number of tweets labeled as pro-refugee
    let negativeLabels = 0; //total number of tweets labeled as anti-refugee

    for (let i = 0; i < numLabels; i++){
        let correctLabel = correctLabels[i];
        let predLabel = predictedLabels[i];

        if (correctLabel === predLabel) numCorrect++;
        else{ //incorrect -- check for statistical Type I or II errors
            if (predLabel === 1) falsePositives++;
            else if (predLabel === -1) falseNegatives++;
        }

        if (correctLabel === 1) positiveLabels++;
        else negativeLabels++;

    }

    console.log("✔️ Percent Correct: ", (numCorrect / testTweets.length * 100).toFixed(1) + "%");
    console.log("False Positive Rate: ", (falsePositives / negativeLabels * 100).toFixed(1) + "%");
    console.log("False Negative Rate: ", (falseNegatives / positiveLabels * 100).toFixed(1) + "%");
}


function displayResults(predictedLabels, correctLabels){
    document.addEventListener("DOMContentLoaded", function() {

        let tweetBoard = document.getElementById("board");

        let numLabels = predictedLabels.length; // assumed equal to correctLabels.length
        for (let i = 0; i < numLabels; i++){
                let correctLabel = correctLabels[i];
                let predLabel = predictedLabels[i];

                let tweetBox = createTweetBox(i, correctLabel, predLabel);
                tweetBoard.appendChild(tweetBox);
        }
    })
}


function createTweetBox(index, correctLabel, predLabel){

    let tweetBox = document.createElement("div"); // rectangle for the tweet
    tweetBox.classList.add("tweet");

    //color the rectangle green if tweet prediction is correct, else red
    if (correctLabel === predLabel) tweetBox.classList.add("correct");
    else tweetBox.classList.add("incorrect")

    let tweetTitle = document.createElement("h3"); // section heading
    tweetTitle.innerHTML = "Tweet " + index;
    tweetBox.appendChild(tweetTitle);

    let predLabelText = document.createElement("p"); // paragraph
    predLabelText.innerHTML = "Predicted Label: " + ((predLabel === 1) ? "🟢 (+1)": ((predLabel === -1) ? "🔴 (-1)": "None"));
    tweetBox.appendChild(predLabelText);

    let correctLabelText = document.createElement("p"); // paragraph 
    correctLabelText.innerHTML = "Correct Label: " + ((correctLabel === 1) ? "🟢 (+1)": ((correctLabel === -1) ? "🔴 (-1)": "None"));
    tweetBox.appendChild(correctLabelText);

    let isCorrect = document.createElement("p"); // paragraph 
    isCorrect.innerHTML = (correctLabel === predLabel) ? "✔️": "❌";
    tweetBox.appendChild(isCorrect);

    return tweetBox;
}

/* example HTML of what the tweet board ends up looking like

<div id = "board">
    <div class = "tweet incorrect">        <- each of these divs is one tweet (box)!
        <h3>Tweet 1</h3>                   <- displays tweet number, as well as  
        <p>Predicted Label: 🟢 (+1)</p>        the predicted and correct sentiment labels
        <p>Correct Label: 🔴 (-1)</p>          🟢 is 1 (positive), 🔴 is -1 (negative)
        <p>❌</p>                          <!-- displays if correct prediction or not 
    </div>

    <div class = "tweet incorrect">
        <h3>Tweet 2</h3>
        <p>Predicted Label: None</p>
        <p>Correct Label: 🔴 (-1)</p>
        <p>❌</p>          
    </div>

    <div class = "tweet correct">
        <h3>Tweet 3</h3>
        <p>Predicted Label: 🟢 (+1)</p>
        <p>Correct Label: 🟢 (+1)</p>
        <p>✔️</p>          
    </div>

    <div class = "tweet correct">
        <h3>Tweet 4</h3>
        <p>Predicted Label: 🔴 (-1)</p>
        <p>Correct Label: 🔴 (-1)</p>
        <p>✔️</p>          
    </div>

    ...
</div>

*/
