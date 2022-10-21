// global variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// get random word
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    placeholder(word);
};
getWord();

// placeholder characters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// guess button "click"
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// validate player inputs
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input === "") {
        message.innerText = "Please enter a letter from A-Z.";
    } else if (input.length > 1) {
        message.innerText = "Please only guess one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only, please!";
    } else {
        return input;
    }
};

// make a guess
const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that one. Try a new letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

// display guessed letters on page
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    guessedLetters.forEach(function (letter) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li)
    });
};

// update word with player's guesses
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    };

    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// keep track of remaining guesses
const updateGuessesRemaining = function (guess) {
    word = word.toUpperCase();

    if (!word.includes(guess)) {
        message.innerText = "That one isn't in the word. Guess again!";
        remainingGuesses -= 1;
    } else {
        message.innerText = "Good guess! That letter is in the word.";
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${word}.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// check if player has won
const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

// start game over
function startOver () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// play again!
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});
