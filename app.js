// list of already seen words
let seenWords = [];

// score gets incremented by 1 for each correct word
let score = 0;

// dictionary of all words from the text file
let allWords = [];

let BIAS_TOWARDS_SEEN_WORDS = 0.4;

start.addEventListener("click", () => {
  start.style.display = "none";
  document.getElementById("word").innerText = "";
  setTimeout(startGame, 500);
});
// document.addEventListener("DOMContentLoaded", async () => {

// });

newWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (seenWords.includes(evaluatedWord)) {
    alert("Game over! Your score is: " + score);
    resetGame();
    return;
  }
  currentWord = displayRandomWord(allWords);
  seenWords.push(evaluatedWord);
  score++;
  // document.getElementById("word").innerText = currentWord;
});

seenWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (!seenWords.includes(evaluatedWord)) {
    alert("Game over! Your score is: " + score);
    resetGame();
    return;
  }
  currentWord = displayRandomWord(allWords);
  score++;
  // document.getElementById("word").innerText = currentWord;
});

function displayRandomWord(allWords) {
  // let's make it biased towards the not already seen words, make it 30% likely to see words that have already been seen
  // TODO-CONSIDERATION make the magic constant dependent on the ratio of already_seen_words/all_words?
  if (seenWords.length > 0 && Math.random() < BIAS_TOWARDS_SEEN_WORDS) {
    let randomSeenWord =
      seenWords[Math.floor(Math.random() * seenWords.length)];
    document.getElementById("word").innerText = randomSeenWord;
    return randomSeenWord;
  }
  let randomWord = allWords[Math.floor(Math.random() * allWords.length)];
  document.getElementById("word").innerText = randomWord;
  return randomWord;
}

async function startGame() {
  await fetch("dictionary.txt")
    .then((response) => response.text())
    .then((text) => text.split("\r\n"))
    .then((splitLines) => {
      splitLines.forEach((word) => {
        allWords.push(word);
      });
    })
    .catch((error) => console.error("Error fetching the text file:", error));

  newWord.style.display = "inline";
  seenWord.style.display = "inline";

  displayRandomWord(allWords);
}

function resetGame() {
  seenWords = [];
  document.getElementById("word").innerText =
    "You scored " + score + " point(s)!";
  score = 0;
  start.style.top = "55%";
  start.innerText = "START OVER";
  start.style.display = "inline";
  newWord.style.display = "none";
  seenWord.style.display = "none";
}
