let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);

let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);

let current = {
    question: "",
    answer: "",
}

const endpoint = "https://opentdb.com/api.php?amount=1&category=15&type=multiple";

async function newTrivia() {

    try {
        const response = await fetch (endpoint);
        if (!response.ok) {
            throw Error(response.statusText)
        };
        const data = await response.json();
        const trivia = data.results[0];
        const question = decodeHTMLEntities(trivia.question);
        const answer = decodeHTMLEntities(trivia.correct_answer);
        displayTrivia(question);
        current.question = question;
        current.answer = answer;
      
    } catch (err) {
        console.error(err);
        alert('Failed to get new trivia');
    }
}

function decodeHTMLEntities(text) {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent;
}

function displayTrivia(question) {
    const questionText = document.querySelector('#js-quote-text');
    const answerText = document.querySelector("#js-answer-text");
    questionText.textContent = question;
    answerText.textContent = "";
}

function newAnswer() {
const answerText = document.querySelector("#js-answer-text");
answerText.textContent = current.answer;
}

setTimeout(function() {
    console.log("This message appears after 1 second.");
}, 2000);

newTrivia();