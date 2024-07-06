document.addEventListener('DOMContentLoaded', () => {
    fetch('data.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('word').innerText = text;
        })
        .catch(error => console.error('Error fetching the text file:', error));
});