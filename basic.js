const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
const heading = document.getElementById('heading');
// change button behavior:
form.addEventListener('submit', (e) => {
    if (form.elements[0].value === "") {
        alert("You must write something!")
    }
    heading.style.display = 'none';
    e.preventDefault();
    // get input value
    // form 1st children --> input
    getWordInfo(form.elements[0].value);
})
const getWordInfo = async (word) => {
    try {
        // Fetch API data
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found!");

        let data = await response.json();

        // stores a specific value from a object
        let definitions = data[0].meanings[0].definitions[0]; 
        
        // Display word and meaning
        resultDiv.innerHTML = 
        `<h2><strong>Word:</strong> ${data[0].word}</h2>
        <p><strong>Part of Speech:</strong> ${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definitions.definition || "Not found"}</p>`;

         // adding read more button
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`

        resultDiv.style.display = "flex";
        console.log(data);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red; display: block;">${error.message}</p>`;
    }
    resultDiv.style.display = "flex";
   
};

const randomWords = [
  "inspire", "tranquil", "velocity", "resilient", "eclipse", "novel", "serendipity",
  "eloquent", "ethereal", "labyrinth", "ephemeral", "zenith", "nadir", "aesthetic",
  "benevolent", "catalyst", "charisma", "diligent", "elusive", "fortitude",
  "gratitude", "harmony", "ingenious", "jubilation", "kinetic", "lucid", "meticulous",
  "nostalgia", "oblivion", "paradox", "quintessential", "reverie", "solitude", "tenacity",
  "utopia", "vivid", "wanderlust", "xenial", "yearn", "zealous"
];
const wordOfTheDay = randomWords[Math.floor(Math.random() * randomWords.length)];
// Display it when the page loads
window.addEventListener('DOMContentLoaded', () => {
    getWordInfo(wordOfTheDay);
});
