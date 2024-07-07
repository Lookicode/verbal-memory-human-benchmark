let seenWords = [];
let score = 0;
let allWords = [];
let BIAS_TOWARDS_SEEN_WORDS = 0.4;

start.addEventListener("click", () => {
  start.style.display = "none";
  document.getElementById("word").innerText = "";
  setTimeout(startGame, 500);
});

newWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (seenWords.includes(evaluatedWord)) {
    resetGame();
    return;
  }
  preventAccidentalDoubleClick(newWord);
  currentWord = displayRandomWord(allWords);
  seenWords.push(evaluatedWord);
  score++;
});

seenWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (!seenWords.includes(evaluatedWord)) {
    resetGame();
    return;
  }
  preventAccidentalDoubleClick(seenWord);
  currentWord = displayRandomWord(allWords);
  score++;
});

function displayRandomWord(allWords) {
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

function preventAccidentalDoubleClick(button) {
  button.disabled = true;

  // re-enable the button after a short delay
  setTimeout(() => {
    button.disabled = false;
  }, 250);
}
