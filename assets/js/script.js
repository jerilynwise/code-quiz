// declared variables- pulls from the html
var mainText = document.querySelector("#mainText")
var timer = document.querySelector("#timer");
var questionsText =document.querySelector("#questionsText");
var choices = document.querySelector("#choices");
var startTimer = document.querySelector("#startTimer");

//decalred variable for the timer and questions
var score= 0;
var questionIndex = 0;
var totalTime = 75;
var holdPenalty = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

//questions array
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["body section", "both head and body are correct", "head section",],
        answer: "body section"
    },
    {
        title: "How do you call a function named myFunction?",
        choices: ["call myFunction()", "call function myFunction()", "myFunction()",],
        answer: "myFunction()"
    },
    {
        title: "How does a FOR loop start?",
        choices: ["for(i<=5; i++", "for(i=0; i<=5)", "for i = 1 to 5", "for(i=0; i<=5; i++)"],
        answer: "for(i=0; i<=5; i++)"
    },
    {
        title: "How can you add a comment in a JavaScript?",
        choices: ["//This is a comment", "<!-- This is a comment --!>", "--This is a comment"],
        answer: "//This is a comment"
    },
];

//when player hits start quiz button then a timer will start on screen
startTimer.addEventListener("click", function() {
    if (holdPenalty === 0) {
        holdPenalty = setInterval( function () {
            totalTime--;
            timer.textContent = "Time: " + totalTime;
            
            if(totalTime <= 0) {
                clearInterval(holdPenalty);
                quizDone();
                timer.textContent = "Time's Up!"
            }
        }, 1000);
    }
    render(questionIndex);
});

//when the start quiz button is hit the timer up above starts and this function renders the questions and choices to screen
function render(questionIndex) {
    questionsText.innerHTML = "";
    ulCreate.innerHTML = "";
    //for loop to loop through all questions in the array
    for (var i =0; i < questions.length; i++) {
        var questionArray = questions[questionIndex].title;
        var choicesArray = questions[questionIndex].choices;
        questionsText.textContent = questionArray;
    }
    choicesArray.forEach( function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsText.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (matchUp));
    })
};

//function to see if the player chose the correct answer
function matchUp(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        //correct answer selected
        if(element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        // wrong answer selected
        }else {
            totalTime = totalTime - penalty;
            createDiv.textContent = "wrong!"
        }
    }
    questionIndex++;

    if(questionIndex >= questions.length) {
        quizDone();
        createDiv.textContent = "End of quiz!" + " " + " You got " +score+ "/" + questions.length
    } else {
        render(questionIndex);
    }
    questionsText.appendChild(createDiv);    
};

//when the quiz ends it then pushes this page to the screen
function quizDone() {
    questionsText.innerHTML = "";
    timer.innerHTML = "";

    //Heading
    var createTitle = document.createElement("h1");
    createTitle.setAttribute("id", "createTitle");
    createTitle.textContent = "You have finished the quiz!"

    questionsText.appendChild(createTitle);

    //Paragraph
    var createP1 = document.createElement("p");
    createP1.setAttribute("id", "createP1");

    questionsText.appendChild(createP1);

    //replaces time left with the score
    if (totalTime >= 0) {
        var timeLeft = totalTime;
        var createP2 = document.createElement("p");
        clearInterval(holdPenalty);
        createP1.textContent = "Your final score is:" + timeLeft;

        questionsText.appendChild(createP2);
    }

        // Label
        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your initials: ";
    
        questionsText.appendChild(createLabel);

        // input
        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.setAttribute("id", "initials");
        createInput.textContent = "";

        questionsText.appendChild(createInput);

        // submit
        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type", "submit");
        createSubmit.setAttribute("id", "Submit");
        createSubmit.textContent = "Submit";

        questionsText.appendChild(createSubmit);

        // Event listener to capture initials and local storage for initials and score
        createSubmit.addEventListener("click", function () {
            var initials = createInput.value;

            if (initials === null) {

                console.log("No value entered!");

            } else {
                var finalScore = {
                    initials: initials,
                    score: timeLeft
                }
                console.log(finalScore);
                var allScores = localStorage.getItem("allScores");
                if (allScores === null) {
                    allScores = [];
                } else {
                    allScores = JSON.parse(allScores);
                }
                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores", newScore);
                // Travels to final page
                window.location.replace("./highScore.html");
            }
        });


}
