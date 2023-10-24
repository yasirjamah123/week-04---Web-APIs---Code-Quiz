const questions = [
    { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 5 + 7?", choices: ["10", "11", "12", "13"], answer: "12" },
    { question: "What is 8 + 3?", choices: ["10", "11", "12", "13"], answer: "11" },
    { question: "What is 4 + 9?", choices: ["12", "13", "14", "15"], answer: "13" },
    { question: "What is 6 + 6?", choices: ["11", "12", "13", "14"], answer: "12" }
];

const quizContainer = document.getElementById("quiz-container");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const choices = document.getElementById("choices");
const timer = document.getElementById("timer");
const timeRemaining = document.getElementById("time-remaining");
const gameOver = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitScore = document.getElementById("submit-score");
const highScores = document.getElementById("high-scores");
const highScoreList = document.getElementById("high-score-list");
const goBack = document.getElementById("go-back");
const clearScores = document.getElementById("clear-scores");
const startQuizButton = document.getElementById("start-quiz");
const viewScoresButton = document.getElementById("view-scores");
const homeButton = document.getElementById("home");

let currentQuestion = 0;
let score = 0;
let time = 60;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    quiz.style.display = "block";
    startTimer();
    showQuestion();
    startQuizButton.style.display = "none"; // Hide the Start Quiz button
    viewScoresButton.style.display = "none"; // Hide the View High Scores button
}

// Function to display a question
function showQuestion() {
    if (currentQuestion < questions.length) {
        const currentQuestionData = questions[currentQuestion];
        questionText.textContent = currentQuestionData.question;
        choices.innerHTML = "";

        for (const choice of currentQuestionData.choices) {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", handleAnswer);
            choices.appendChild(button);
        }
    } else {
        endQuiz();
    }
}

// Function to handle user's answer
function handleAnswer(event) {
    const userChoice = event.target.textContent;
    const correctAnswer = questions[currentQuestion].answer;

    if (userChoice === correctAnswer) {
        score += 10;
    } else {
        time -= 10;
    }

    currentQuestion++;
    showQuestion();
}

// Function to start the timer
function startTimer() {
    timeRemaining.textContent = time;
    timerInterval = setInterval(() => {
        time--;
        timeRemaining.textContent = time;
        if (time <= 0 || currentQuestion >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    quiz.style.display = "none";
    gameOver.style.display = "block";
    finalScore.textContent = score;
}

// Event listener for submitting high score
submitScore.addEventListener("click", () => {
    const userInitials = initials.value;
    if (userInitials) {
        const highScore = { initials: userInitials, score };
        saveHighScore(highScore);
        displayHighScores();
    }
});

// Function to save high score
function saveHighScore(highScore) {
    const highScoresData = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresData.push(highScore);
    highScoresData.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScoresData));
}

// Function to display high scores
function displayHighScores() {
    const highScoresData = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoreList.innerHTML = "";

    highScoresData.forEach((highScore, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${highScore.initials} - ${highScore.score}`;
        highScoreList.appendChild(li);
    });

    highScores.style.display = "block";
    quizContainer.style.display = "none";
}

// Event listener for going back to the main quiz and restarting
goBack.addEventListener("click", () => {
    highScores.style.display = "none";
    quizContainer.style.display = "block";
    restartQuiz();
});

// Event listener for clearing high scores
clearScores.addEventListener("click", () => {
    clearHighScores();
    highScoreList.innerHTML = "";
});

// Event listener for the Home button
homeButton.addEventListener("click", () => {
    highScores.style.display = "none";
    startQuizButton.style.display = "block"; // Show the Start Quiz button
    viewScoresButton.style.display = "block"; // Show the View High Scores button
});

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 60;
    clearInterval(timerInterval);

    // Reset the style to display the Start Quiz button and hide other elements
    quiz.style.display = "none";
    gameOver.style.display = "none";
    startQuizButton.style.display = "block";
    viewScoresButton.style.display = "block";
    quizContainer.style.display = "block";
}

// Event listener for starting the quiz
startQuizButton.addEventListener("click", startQuiz);

// Event listener for viewing high scores
viewScoresButton.addEventListener("click", () => {
    displayHighScores();
    startQuizButton.style.display = "none"; // Hide the Start Quiz button
    viewScoresButton.style.display = "none"; // Hide the View High Scores button
});
