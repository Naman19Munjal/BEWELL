<<<<<<< HEAD
var currentscrumbledword = "";
var currentans = "";
var currentindex = "";
var wordDictionay = [];
var countDownDate = 50;
var timer = "";
// var words = ["wonderful", "unmatched", "delivery", "awesome", "delightfull", "cylinder", "painful", "alternate"];

wordDictionay = [
    { question: " What should you avoid with someone who is sick?", key: shuffle("CLOSECONTACT"), value: "CLOSECONTACT" },
    { question: "What should you wash your hands with for atleast 20 seconds, when visibly dirty?", key: shuffle("SOAP"), value: "SOAP" },
    { question: "What should you do, upon return from a COVID-19 affected area?", key: shuffle("SELFQUARANTINE"), value: "SELFQUARANTINE" },
    { question: "This is one of the symptoms of COVID-19", key: shuffle("SORETHROAT"), value: "SORETHROAT" },
    { question: "What cannot prevent Coronavirus?", key: shuffle("ANTIBIOTICS"), value: "ANTIBIOTICS" },
    { question: "What is the minimum distance one must maintain from someone with COVID-19 symptoms?", key: shuffle("THREEFEET"), value: "THREEFEET" },
    { question: "What nature of cough is a symptom of COVID-19?", key: shuffle("DRY"), value: "DRY" },
    { question: "For how many days should one quarantine themselves, in case of symptoms or on return from COVID-19 affected area?", key: shuffle("FOURTEEN"), value: "FOURTEEN" },
    { question: "What should you not do to a mask when using it?", key: shuffle("TOUCH"), value: "TOUCH" },
    { question: "What is a great practice to break the chain of COVID-19?", key: shuffle("SOCIALDISTANCING"), value: "SOCIALDISTANCING" }
]

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function shuffle(s) {
    var arr = s.split(''); // Convert String to array
    var n = arr.length; // Length of the array

    for (var i = 0; i < n - 1; ++i) {
        var j = getRandomInt(n); // Get random of [0, n-1]

        var temp = arr[i]; // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join(''); // Convert Array to string
    return s; // Return shuffled string
}

function onload() {
    // words.forEach(function(word) {
    //     var w = word.toUpperCase();
    //     wordDictionay.push({
    //         question: "",
    //         key: shuffle(w),
    //         value: w
    //     });

    // });
    LoadGui();
}

function LoadGui() {
    clearBox();
    clearInterval(myTimer);
    disableBtn();

    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").setAttribute("visibilty", "hidden")
    currentindex = randomKeyFromDict(Object.keys(wordDictionay));
    currentscrumbledword = wordDictionay[currentindex].key;
    currentans = wordDictionay[currentindex].value;
    var count = Object(currentscrumbledword).length;
    document.getElementById("question").innerHTML = wordDictionay[currentindex].question;
    DrawWords(currentscrumbledword, count);
    var textbox = document.getElementById("puzzlesolution");
    textbox.value = "_".repeat(count);
    if (count > 12) {
        textbox.setAttribute('rows', 2);
        textbox.setAttribute('cols', count / 2);
    } else {
        textbox.setAttribute('rows', 1);
        textbox.setAttribute('cols', count);
    }
    countDownDate = 50;
    display = document.querySelector('#timer');
    setTimer();
}

var myTimer;

function setTimer() {
    myTimer = setInterval(myClock, 1000);
    var c = 60;

    function myClock() {
       
        document.getElementById("timer").innerHTML = "00:"+ (--c);
        if (c == 0) {
            clearInterval(myTimer);
            enableBtn();
        }
    }
}

function disableBtn() {
    document.getElementById("next-btn").disabled = true;
}

function enableBtn() {
    document.getElementById("next-btn").disabled = false;
}


function randomKeyFromDict(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function DrawWords(word, wordlength) {
    var input = 0;
    word.split('').forEach(function(c) {
        drawLabel(c, wordlength, input);
        input++;
    });
}

function clearBox() {
    document.getElementById("puzzleword").innerHTML = "";
    document.getElementById("puzzlesolution").value = "";
}

function drawLabel(cha, count, input) {
    var size = count - 3;
    var font = size - 2;
    // document.getElementById("puzzleword").innerHTML = " ";
    $("#puzzleword").append("<input type='button' class='puzzle-char' id='" + cha + input + "' onmousedown= 'charOnClick(this.value,this.id);' value ='" + cha + "'></input>");
}

function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function charOnClick(chrs, id) {
    // var text = document.getElementById("puzzlesolution").value;
    document.getElementById("puzzlesolution").value = replaceChar(chrs);
    document.getElementById(id).setAttribute("type", "hidden");
    Logic();
}

function replaceChar(replaceChar) {
    var origString = document.getElementById("puzzlesolution").value;
    var index = origString.indexOf("_");
    let firstPart = origString.substr(0, index);

    let lastPart = origString.substr(index + 1);

    let newString =
        firstPart + replaceChar + lastPart;

    return newString;
}

function Logic() {
    var input = document.getElementById("puzzlesolution").value;

    if (input.includes("_")) {
        return;
    }
    if (input.length == currentans.length) {
        if (wordDictionay[currentindex].value == input) {
            Showmessage("Voila!!! Correct Answer Loading New Quiz.")
            changecolorAccordingtoResult(1);
            wordDictionay.pop(currentscrumbledword);
            // LoadGui();
        } else {
            Showmessage("Oops! Wrong Answer Please Try Again")
            wordDictionay.push({
                key: currentscrumbledword,
                value: currentans
            });
            // document.getElementById("puzzlesolution").setAttribute("type", "hidden");
            // document.getElementById("puzzleword").innerHTML = "";
            changecolorAccordingtoResult(0);
            // showAlert("Oops!!", "You Lost Please Click on Button to Start", 'Danger', "down");
        }
    }
    if (Object(wordDictionay).length == 0) {
        // showAlert("Oops!!", "You Win Want to Play Again Pless button", 'success', "up");
    }
}

function CorrectAnsMessage() {


}

function Showmessage(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

function showAlert(status, msg, type, thumb) {
    document.getElementById("myAlert").innerHTML = "";
    $("#myAlert").append("<div class='jumbotron jumbotron-fluid bg-" + type + "'>  <div class='container'><h1><i class='fas fa-thumbs-" + thumb + "'></i> " + status + "</h1><p style='padding-left:9%;'>" + msg + "</p></div></div>");
    $("#myAlert").css('visibilty', 'visible');
}

function changecolorAccordingtoResult(colorcode) {
    clearInterval(myTimer);
    enableBtn();
    if (colorcode == 1)
        document.getElementById("puzzlesolution").style.backgroundColor = 'green';
    else {
        document.getElementById("puzzlesolution").style.backgroundColor = 'red';
        document.getElementById("answer").innerHTML = currentans;
        document.getElementById("answer").setAttribute("visibilty", "visible")
    }
}
=======
const deckCards = ["Agility.png", "Agility.png", "Boat.png", "Boat.png", "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png"];
const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function startGame() {
    // Invoke shuffle function and store in variable
    const shuffledDeck = shuffle(deckCards);
    // Iterate over deck of cards array
    for (let i = 0; i < shuffledDeck.length; i++) {
        // Create the <li> tags
        const liTag = document.createElement('LI');
        // Give <li> class of card
        liTag.classList.add('card');
        // Create the <img> tags
        const addImage = document.createElement("IMG");
        // Append <img> to <li>
        liTag.appendChild(addImage);
        // Set the img src path with the shuffled deck
        addImage.setAttribute("src", "images/" + shuffledDeck[i]);
        // Add an alt tag to the image
        addImage.setAttribute("alt", "image of vault boy from fallout");
        // Update the new <li> to the deck <ul>
        deck.appendChild(liTag);
    }
}

startGame();

function removeCard() {
    // As long as <ul> deck has a child node, remove it
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

function timer() {
    // Update the count every 1 second
    time = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        // Update the timer in HTML with the time it takes the user to play the game
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs";
    }, 1000);
}
function stopTime() {
    clearInterval(time);
}

function resetEverything() {
    // Stop time, reset the minutes and seconds update the time inner HTML
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
    // Reset star count and the add the class back to show stars again
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    // Reset moves count and reset its inner HTML
    moves = 0;
    movesCount.innerHTML = 0;
    // Clear both arrays that hold the opened and matched cards
    matched = [];
    opened = [];
    // Clear the deck
    removeCard();
    // Create a new deck
    startGame();
}

function movesCounter() {
    // Update the html for the moves counter
    movesCount.innerHTML++;
    // Keep track of the number of moves for every pair checked
    moves++;
}
function starRating() {
    if (moves === 14) {
        // First element child is the <i> within the <li>
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

function compareTwo() {
    // When there are 2 cards in the opened array
    if (opened.length === 2) {
        // Disable any further mouse clicks on other cards
        document.body.style.pointerEvents = "none";
    }
    // Compare the two images src
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        // If matched call match()
        match();
        // console.log("It's a Match!");
    } else if (opened.length === 2 && opened[0].src != opened[1].src) {
        // If No match call noMatch()
        noMatch();
        // console.log("NO Match!");
    }
}

function match() {
    /* Access the two cards in opened array and add
    the class of match to the imgages parent: the <li> tag
    */
    setTimeout(function () {
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        // Push the matched cards to the matched array
        matched.push(...opened);
        // Allow for further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        // Check to see if the game has been won with all 8 pairs
        winGame();
        // Clear the opened array
        opened = [];
    }, 600);
    // Call movesCounter to increment by one
    movesCounter();
    starRating();
}

function noMatch() {
    /* After 700 miliseconds the two cards open will have
    the class of flip removed from the images parent element <li>*/
    setTimeout(function () {
        // Remove class flip on images parent element
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        // Allow further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        // Remove the cards from opened array
        opened = [];
    }, 700);
    // Call movesCounter to increment by one
    movesCounter();
    starRating();
}

function AddStats() {
    // Access the modal content div
    const stats = document.querySelector(".modal-content");
    // Create three different paragraphs
    for (let i = 1; i <= 3; i++) {
        // Create a new Paragraph
        const statsElement = document.createElement("p");
        // Add a class to the new Paragraph
        statsElement.classList.add("stats");
        // Add the new created <p> tag to the modal content
        stats.appendChild(statsElement);
    }
    // Select all p tags with the class of stats and update the content
    let p = stats.querySelectorAll("p.stats");
    // Set the new <p> to have the content of stats (time, moves and star rating)
    p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
    p[1].innerHTML = "Moves Taken: " + moves;
    p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";
}

function displayModal() {
    // Access the modal <span> element (x) that closes the modal
    const modalClose = document.getElementsByClassName("close")[0];
    // When the game is won set modal to display block to show it
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    modalClose.onclick = function () {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function winGame() {
    if (matched.length === 16) {
        stopTime();
        AddStats();
        displayModal();
    }
}

deck.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
        // To console if I was clicking the correct element 
        console.log(evt.target.nodeName + " Was clicked");
        // Start the timer after the first click of one card
        // Executes the timer() function
        if (timeStart === false) {
            timeStart = true;
            timer();
        }
        // Call flipCard() function
        flipCard();
    }

    //Flip the card and display cards img
    function flipCard() {
        // When <li> is clicked add the class .flip to show img
        evt.target.classList.add("flip");
        // Call addToOpened() function
        addToOpened();
    }

    //Add the fliped cards to the empty array of opened
    function addToOpened() {
        /* If the opened array has zero or one other img push another 
        img into the array so we can compare these two to be matched
        */
        if (opened.length === 0 || opened.length === 1) {
            // Push that img to opened array
            opened.push(evt.target.firstElementChild);
        }
        // Call compareTwo() function
        compareTwo();
    }
});

reset.addEventListener('click', resetEverything);

playAgain.addEventListener('click', function () {
    modal.style.display = "none";
    resetEverything();
});

>>>>>>> 319e5e39ae0351b6b4faac871cf68c93b342d8f0
