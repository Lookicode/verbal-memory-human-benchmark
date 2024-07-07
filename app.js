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

  let currentWord = displayRandomWord(allWords);

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
  document.getElementById("word").innerText = currentWord;
});

seenWord.addEventListener("click", () => {
  let evaluatedWord = document.getElementById("word").innerText;
  if (!seenWords.includes(evaluatedWord)) {
    alert("Game over! Your score is: " + score);
    return;
  }
  currentWord = displayRandomWord(allWords);
  score++;
  document.getElementById("word").innerText = currentWord;
});


function displayRandomWord(allWords) {
  let randomWord = allWords[Math.floor(Math.random() * allWords.length)];
  document.getElementById("word").innerText = randomWord;
  return randomWord;
}