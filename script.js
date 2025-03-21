const quizData = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        code: null,
        options: ["Document Object Model", "Data Object Management", "Digital Output Module", "Display Orientation Manager"],
        correct: 0,
        time: 60,
        answered: false
    },
    {
        question: "What will this code output?",
        code: "console.log(typeof NaN);",
        options: ["number", "string", "undefined", "NaN"],
        correct: 0,
        time: 60,
        answered: false
    },
    {
        question: "Which CSS property enables flexbox layout?",
        code: null,
        options: ["display: grid", "display: flex", "display: block", "display: inline"],
        correct: 1,
        time: 60,
        answered: false
    },
    {
        question: "What does 'HTTP' stand for?",
        code: null,
        options: ["HyperText Transfer Protocol", "High-Tech Text Process", "Hyperlink Text Translation Process", "Home Tool Transfer Protocol"],
        correct: 0,
        time: 60,
        answered: false
    },
    {
        question: "Which is NOT a JavaScript framework?",
        code: null,
        options: ["React", "Vue", "Django", "Angular"],
        correct: 2,
        time: 60,
        answered: false
    },
    {
        question: "What will this code return?",
        code: "Boolean('false');",
        options: ["true", "false", "undefined", "TypeError"],
        correct: 0,
        time: 60,
        answered: false
    },
    {
        question: "Which HTML tag is used for emphasized text?",
        code: null,
        options: ["strong", "em", "i", "bold"],
        correct: 1,
        time: 60,
        answered: false
    },
    {
        question: "What does CSS stand for?",
        code: null,
        options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Syntax", "Coded Style Script"],
        correct: 0,
        time: 60,
        answered: false
    },
    {
        question: "What is the output of 3 + 2 + '7' in JavaScript?",
        code: null,
        options: ["12", "57", "327", "NaN"],
        correct: 1,
        time: 60,
        answered: false
    },
    {
        question: "Which is a valid React hook?",
        code: null,
        options: ["useState()", "createStore()", "componentDidMount()", "render()"],
        correct: 0,
        time: 60,
        answered: false
    }
].map(q => ({ ...q, answered: false }));

let currentQuestion = 0;
let score = 0;
let timer;

// Initialize Quiz
function initializeQuiz() {
    updateProgress();
    loadQuestion();
    
    if(!quizData[currentQuestion].answered) {
        startTimer();
    } else {
        document.getElementById('time').textContent = "⏳";
    }
}

// Load Question with Answer Tracking
function loadQuestion() {
    const question = quizData[currentQuestion];
    const questionElement = document.getElementById('question');
    const codeContainer = document.getElementById('codeContainer');
    const optionsElement = document.getElementById('options');

    questionElement.textContent = question.question;
    codeContainer.innerHTML = question.code 
        ? `<div class="code-snippet">${question.code}</div>` 
        : '';

    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = `option-btn ${question.answered ? 'disabled' : ''}`;
        button.innerHTML = `<span class="option-no">${index + 1}.</span> ${option}`;
        
        if(question.answered) {
            if(index === question.correct) button.classList.add('correct');
            button.onclick = null;
        } else {
            button.onclick = () => validateAnswer(index);
        }
        
        optionsElement.appendChild(button);
    });

    document.getElementById('prevBtn').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').textContent = 
        currentQuestion === quizData.length - 1 ? 'Submit Results 🚀' : 'Next →';
}

// Timer Functionality
function startTimer() {
    clearInterval(timer);
    let timeLeft = quizData[currentQuestion].time;
    document.getElementById('time').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// Handle Timeout
function handleTimeout() {
    const question = quizData[currentQuestion];
    if(!question.answered) {
        question.answered = true;
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));
    }
    nextQuestion();
}

// Answer Validation
function validateAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    if(question.answered) return;

    question.answered = true;
    const options = document.querySelectorAll('.option-btn');

    options.forEach((option, index) => {
        option.classList.add('disabled');
        if(index === question.correct) option.classList.add('correct');
        if(index === selectedIndex && index !== question.correct) option.classList.add('wrong');
    });

    if(selectedIndex === question.correct) {
        score += 10;
        document.getElementById('score').textContent = score;
    }
}

// Navigation Controls
function nextQuestion() {
    if(currentQuestion < quizData.length - 1) {
        currentQuestion++;
        initializeQuiz();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if(currentQuestion > 0) {
        clearInterval(timer);
        currentQuestion--;
        document.getElementById('time').textContent = "⏳";
        initializeQuiz();
    }
}

// Progress Tracking
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Final Results Display
function showResults() {
    clearInterval(timer);
    document.querySelector('.quiz-container').innerHTML = `
        <div class="results">
            <h2>🏆 Quiz Complete! 🏆</h2>
            <div class="final-score">${score}/100</div>
            <p>Correct Answers: ${score/10}/10</p>
            <button class="nav-btn" onclick="location.reload()">Retry Quiz</button>
        </div>
    `;
}

// Initialize Quiz Properly
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
});
