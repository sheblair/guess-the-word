// the unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");

// the button with the text "Guess!" in it
const guessLetterButton = document.querySelector(".guess");

// the text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

// the empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// the paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");

// the span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");

// the empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// the word the player must guess
const word = "magnolia";

// the empty array to contain all the letters the player has guessed
const guessedLetters = [];


const placeholder = function (word) {
    
    const placeholderLetters = [];

    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    // empty message paragraph
    message.innerText = "";
    // grab what was entered in the input
    const guess = letterInput.value;    
    // making sure it is a single letter
    const goodGuess = validateInput(guess);

    // make the guess with the variable that contains the validated input
     makeGuess(goodGuess);

    // empty letter input for next guess
    letterInput.value = "";  

    // this conditional block is the solution code - this doesn't make sense to me
    // if (goodGuess) {
    //     makeGuess(guess);
    // }
});

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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that one. Try a new letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    guessedLetters.forEach(function (letter) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li)
    });
};

const updateWordInProgress = function (guessedLetters) {

    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    // i got everything pretty much on my own except for the else statement, and also i had reversed
    // the loop so was let letter of guessedLetters rather than let letter of wordArray. which DOES matter
    // bc i just tried reversing it and it fucks it up. honestly this bit was hard for me, i struggled a lot
    // with it and am still kinda not sure if i totally understand it
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

const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};
