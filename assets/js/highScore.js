var topScores = document.querySelector("#topScore");
var clear = document.querySelector("#clear");

// onclick clear local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// pulls itials from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createUl = document.createElement("ul");
        createUl.textContent = allScores[i].initials + " " + allScores[i].score;
        questionsText.appendChild(createUl);

    }
}