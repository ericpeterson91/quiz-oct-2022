const question = document.getElementById("question");
let container = document.querySelector('.container')
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the capital of Saskatchewan?",
    choice1: "Saskatoon",
    choice2: "Regina",
    choice3: "Moose Jaw",
    choice4: "Prince Albert",
    answer: 2
  },
  {
    question:
      "Which area in Canada is famous for houseboating?",
    choice1: "The Pas",
    choice2: "Niagara On the Lake",
    choice3: "Shuswap",
    choice4: "Banff",
    answer: 3
  },
  {
    question: "Which is these celebrities is from Vancouver?",
    choice1: "Ryan Gosling",
    choice2: "Nicki Minaj",
    choice3: "Sebastian Maniscalco",
    choice4: "Ryan Reynolds",
    answer: 4
  },
  {
    question: "Approximately how many people visit Banff national park per year?",
    choice1: "1 million",
    choice2: "2 million",
    choice3: "4 million",
    choice4: "8 million",
    answer: 3
  },
  {
    question:
      "In what year did Nunavut become a territory?",
    choice1: "1965",
    choice2: "1980",
    choice3: "1991",
    choice4: "1999",
    answer: 4
  },
  {
    question: "Which Canadian city has the second largest population?",
    choice1: "Vancouver",
    choice2: "Toronto",
    choice3: "Calgary",
    choice4: "Montreal",
    answer: 4
  },
  {
    question: "Which province has the largest GDP per capita?",
    choice1: "Alberta",
    choice2: "Quebec",
    choice3: "Ontario",
    choice4: "British Columbia",
    answer: 1
  },
  {
    question:
      "What percentage of Canadians live within 160 kilometers of the U.S. border?",
    choice1: "50%",
    choice2: "65%",
    choice3: "80%",
    choice4: "90%",
    answer: 4
  },
  {
    question: "According to Apple Maps, how long would it take to drive from Vancouver, BC to St.John's, NL? (without stopping)",
    choice1: "2 days, 16 hours",
    choice2: "3 days, 4 hours",
    choice3: "3 days, 20 hours",
    choice4: "4 days, 4 hours",
    answer: 2
  },
  {
    question: "What percentage of Canadians speak French?",
    choice1: "15%",
    choice2: "21%",
    choice3: "26%",
    choice4: "33%",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const reset = () => {
    window.location.reload()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return container.innerHTML = `<div class='final-msg'>You scored ${score} out of 100!<button class='btn final-btn' onclick=reset()>Retry</button></div>`;
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();