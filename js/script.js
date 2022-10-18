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

// function to update word to placeholder circles - i used solution code for this
const placeholder = function (word) {
    
    // empty array where the placeholder circles will go
    const placeholderLetters = [];

    // loop over the word, and for each letter of the word,
    // 1. log it to the console and
    // 2. push a ● to the empty array
    for (let letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    
    // array with circles is joined into a string and becomes the text inside the wordInProgress element
    wordInProgress.innerText = placeholderLetters.join("");
};

// calling the placeholder function. this can work w/o param/arg while word=magnolia, but when it becomes any random word, we will need the param/arg pair
placeholder(word);

// event listener for click event on "Guess!" button
guessLetterButton.addEventListener("click", function (e) {
    // this prevents the form from doing default behavior of clicking, form submitting, and page reloading
    e.preventDefault();

    // create a variable to capture the guess input
    const guess = letterInput.value;

    // log out the input of the guessed letter
    console.log(guess);

    // empty the input box for the next guess
    letterInput.value = ""; 

});