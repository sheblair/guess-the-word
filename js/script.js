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
let word = "magnolia";

// the empty array to contain all the letters the player has guessed
const guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");

    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    // this is the way i originally coded it
    // const randomWord = wordArray[randomIndex].trim();
    // // this wasn't working at first because i declared a new variable ("let word = randomWord") instead of redeclaring
    // word = randomWord;

    placeholder(word);
};

const placeholder = function (word) {
    const placeholderLetters = [];
    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // empty message paragraph
    message.innerText = "";

    // grab what was entered in the input
    const guess = letterInput.value;

    // making sure it is a single letter
    const goodGuess = validateInput(guess);

    // make the guess with the variable that contains the validated input
    // this is a conditional block that checks to see if goodGuess has returned an input 
    // (only true if it is a letter that matches the regex), or if the return has been undefined
    if (goodGuess) {
        makeGuess(guess);
    }

    // this is how i was coding it. the problem with this is that while it works, 
    // it returns an error whenever the user types in an unaccepted character, 
    // because the program doesn't know what to do with undefined. in the conditional block, 
    // you're telling it that if it gets undefined, it doesn't try to do anything at all, just stop running the code completely
    //      makeGuess(goodGuess);

    // empty letter input for next guess
    letterInput.value = "";

    
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
        updateGuessesRemaining(guess);
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
    // bc i just tried reversing it and it fucks it up.

    // it 'knows where to put the letter' because it's looping this every single time you guess!! 
    // so it deals with the updated revealWord array, not the empty array we declared above
    // this is something i have to remind myself - the program is running this code every single time we make a guess,
    // not operating as one big push, but many iterations over and over the same code,
    // so it starts over at the top every single time. it's filling up the revealWord array as we go. 
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

const updateGuessesRemaining = function (guess) {
    // why don't we need to convert word to an array here in order to check if the guess is inside it?
    // because you can use includes() on both strings and arrays in javascript
    word = word.toUpperCase();
    if (!word.includes(guess)) {
        message.innerText = "That one isn't in the word. Guess again!";
        remainingGuesses -= 1;
    } else {
        message.innerText = "Good guess! That letter is in the word.";
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${word}.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
