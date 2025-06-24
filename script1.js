const quizData = [
  { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: "H2O" },
  { question: "What is 5 x 6?", options: ["11", "30", "20", "56"], answer: "30" },
  { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Tesla", "Curie"], answer: "Newton" },
  { question: "Capital of Sri Lanka?", options: ["Colombo", "Kandy", "Anuradhapura", "Galle"], answer: "Colombo" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "What year did Sri Lanka gain independence?", options: ["1948", "1950", "1972", "1944"], answer: "1948" },
  { question: "What is the boiling point of water?", options: ["50°C", "100°C", "200°C", "80°C"], answer: "100°C" },
];

let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const current = quizData[currentQuestion];
  quizEl.innerHTML = `
    <h2>${current.question}</h2>
    ${current.options.map((opt, idx) => `
      <div>
        <input type="radio" name="option" id="opt${idx}" value="${opt}">
        <label for="opt${idx}">${opt}</label>
      </div>
    `).join("")}
  `;
}

function showResult() {
  quizEl.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultEl.classList.remove("hidden");

  let resultText = `You scored ${score} out of ${quizData.length}.<br>`;
  if (score === quizData.length) {
    resultText += `<strong>You are the Winner! 🎉</strong>`;
  }

  resultText += `
    <div class="game-box">
      <h3>🎮 Mini Game: Tap the Circle!</h3>
      <button id="start-game">Start Game</button>
      <div id="circle" style="width:50px;height:50px;background:red;border-radius:50%;position:absolute;display:none;cursor:pointer;"></div>
    </div>
    <button id="play-again">Try Again</button>
  `;
  resultEl.innerHTML = resultText;

  document.getElementById("play-again").addEventListener("click", () => location.reload());
  document.getElementById("start-game").addEventListener("click", startMiniGame);
}

function startMiniGame() {
  const circle = document.getElementById("circle");
  circle.style.display = "block";
  moveCircle();

  circle.addEventListener("click", () => {
    alert("🎉 You caught the circle! Well done!");
    circle.style.display = "none";
  });
}

function moveCircle() {
  const circle = document.getElementById("circle");
  const x = Math.random() * (window.innerWidth - 60);
  const y = Math.random() * (window.innerHeight - 60);
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert("Please select an answer!");
  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

loadQuestion();

