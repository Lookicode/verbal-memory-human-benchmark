// list of already seen words
let seenWords = [];

// score gets incremented by 1 for each correct word
let score = 0;

// dictionary of all words from the text file
let allWords = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("dictionary.txt")
    .then((response) => response.text())
    .then((text) => text.split("\r\n"))
    .then((splitLines) => {
      splitLines.forEach((word) => {
        allWords.push(word);
      });
    })
    .catch((error) => console.error("Error fetching the text file:", error));

  displayRandomWord(allWords);
});

newWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (seenWords.includes(evaluatedWord)) {
    alert("Game over! Your score is: " + score);
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
    return;
  }
  currentWord = displayRandomWord(allWords);
  score++;
  // document.getElementById("word").innerText = currentWord;
});

function displayRandomWord(allWords) {
  // let's make it biased towards the not already seen words, make it 30% likely to see words that have already been seen
  // TODO make the magic constant dependent on the ratio of already_seen_words/all_words
  if (seenWords.length > 0 && Math.random() < 0.4) {
    let randomSeenWord =
      seenWords[Math.floor(Math.random() * seenWords.length)];
    document.getElementById("word").innerText = randomSeenWord;
    return randomSeenWord;
  }
  let randomWord = allWords[Math.floor(Math.random() * allWords.length)];
  document.getElementById("word").innerText = randomWord;
  return randomWord;
}
