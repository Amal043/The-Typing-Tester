const paragraphs = [
"Practice makes perfect. Typing fast and accurately requires repetition. A little progress each day adds up to big results when you stay consistent. The key is to build muscle memory by practicing regularly. Focus on precision before speed and let your fingers adapt naturally. Over time, you'll find yourself typing faster without even thinking about it.",
  
  "JavaScript is a versatile language used for web development and beyond. It powers interactive websites and modern applications across the internet. From dynamic content to responsive user interfaces, JavaScript plays a crucial role in building rich user experiences. As browsers evolve, JavaScript continues to expand its capabilities, becoming a core tool for every modern developer.",
  
  "Typing tests help improve speed and accuracy in a fun and interactive way. The more you type, the more natural it becomes to hit the right keys quickly. Consistency is important—daily practice helps sharpen your reflexes and reduces mistakes. As your confidence grows, you’ll notice improvements in writing, coding, and general communication tasks.",
  
  "The quick brown fox jumps over the lazy dog near the river bank. This sentence contains every letter of the alphabet, making it perfect for practice. Repeating this classic phrase builds familiarity with the entire keyboard layout. It’s a simple yet powerful tool used in typography, font design, and typing drills across generations.",
  
  "She sells seashells by the seashore under the summer sun. Though it’s a tongue twister, it helps improve articulation and typing precision. Practicing phrases like these builds rhythm and timing in your finger movements. Plus, they can be a fun way to challenge your muscle memory and accuracy while staying engaged.",
  
  "Every great developer you know once wrote terrible code. Learning from mistakes and iterating is part of growing in any skill, especially typing. Don’t be afraid of errors—they're valuable lessons that pave the path to mastery. Whether it's debugging code or correcting typos, persistence always leads to progress.",
  
  "Time is the most valuable thing a person can spend wisely. Prioritizing practice and focused effort always leads to meaningful improvements. Rather than rushing, take a moment to slow down and concentrate on your goals. You’ll accomplish more with steady progress than with sporadic bursts of effort.",
  
  "Clean code is not just for computers; it’s for humans too. Readable and well-structured code saves time, prevents bugs, and helps collaboration. Similarly, clear and accurate typing ensures effective communication. The habits you build now will help you write better, whether it's prose or programming.",
  
  "Life is what happens when you're busy making other plans. It’s important to pause, reflect, and focus on what really matters—like learning something new. Growth comes when you take small steps daily, even when things don’t go as expected. Skills like typing may seem minor, but they add efficiency and flow to everything else.",
  
  "Always aim for progress, not perfection in your efforts. Even small improvements in typing speed can make a big difference in productivity. Celebrate your wins, learn from your mistakes, and keep going. Over time, the results will speak for themselves, and you’ll be amazed by how far you’ve come.",
  
  "Creativity is intelligence having fun with possibilities. Typing faster lets your ideas flow freely onto the page without breaking momentum. Whether you’re writing a story or coding a program, speed and accuracy make expression effortless. They help translate thought into action with fewer barriers and greater joy.",
  
  "The best way to get started is to quit talking and begin doing. Whether you're coding or typing, action beats intention every time. Planning is useful, but it must be followed by consistent effort. Even five minutes of focused practice each day can lead to remarkable growth over time.",
  
  "A journey of a thousand miles begins with a single step forward. That first keystroke might seem slow, but it's part of the path to mastery. Each session builds on the last, turning effort into skill. With commitment and patience, your typing will become second nature, freeing your mind for deeper work.",
  
  "Success comes to those who are too busy to look for it. If you focus on your craft, the results will follow naturally with time and effort. Don’t chase perfection—instead, master your process. Typing is just one example of how small improvements compound into significant long-term gains.",
  
  "Reading books expands vocabulary and imagination immensely. Typing out quotes from books can also sharpen your accuracy and rhythm. When you type what you read, you engage both your brain and your hands. This enhances retention, builds fluency, and strengthens the connection between thought and expression.",
  
  "Don’t watch the clock; do what it does. Keep going forward. Let your fingers flow while your mind focuses on the message, not the minutes. The best progress often happens when you're immersed in the task. Lose yourself in the rhythm of typing, and the results will come naturally.",
  
  "Stay focused and never give up on your goals and dreams. Typing is just one of many skills that grows stronger with dedication and discipline. What begins as a simple exercise can become a foundation for creativity, communication, and confidence across every part of your life.",
  
  "You miss 100% of the shots you don’t take. Take the risk. Step outside your comfort zone, type a little faster, and challenge yourself today. Growth is uncomfortable at first but rewarding in the long run. Let each mistake be a stepping stone on the road to mastery.",
  
  "Practice typing daily to boost both speed and precision. A simple five-minute routine can enhance your skills and confidence over time. Just like with any habit, consistency builds results. Stick with it, and you’ll soon find that tasks which once took minutes now take seconds.",
  
  "A positive mindset leads to positive actions and results. Believing you can improve your typing is the first step toward actually doing it. Confidence grows with every success, no matter how small. Keep your attitude strong, and your skills will naturally follow your belief."
];

const paragraphEl = document.getElementById("paragraph");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const calcBtn = document.getElementById("calcBtn");
const viewBtn = document.getElementById("viewAnalysisBtn");
const analysisContainer = document.getElementById("analysisContainer");

let originalText = "";
let timeLeft = 60;
let interval;
let totalTyped = 0;
let correctChars = 0;
let finalWpm = 0;
let finalAccuracy = 100;

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function startTest() {
  originalText = getRandomParagraph();
  paragraphEl.textContent = originalText;
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();

  timeLeft = 60;
  totalTyped = 0;
  correctChars = 0;

  timerEl.textContent = timeLeft;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 100;
  analysisContainer.classList.remove("active");
  analysisContainer.classList.add("hidden");

  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
  document.getElementById("resultsContainer").classList.add("hidden");
document.getElementById("resultsContainer").classList.remove("active");

}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0) stopTest();
}

function stopTest() {
  clearInterval(interval);
  inputEl.disabled = true;

  finalWpm = calculateWPM();
  finalAccuracy = calculateAccuracy();

  wpmEl.textContent = finalWpm;
  accuracyEl.textContent = finalAccuracy;

  document.getElementById("finalWpmDisplay").textContent = finalWpm;
  document.getElementById("finalAccuracyDisplay").textContent = finalAccuracy + "%";

  document.getElementById("testContainer").classList.add("shift-left");

  // hiding pie chart while showing results
  document.getElementById("resultsContainer").classList.remove("hidden");
  document.getElementById("resultsContainer").classList.add("active");
  analysisContainer.classList.remove("active");
  analysisContainer.classList.add("hidden");
}


function calculateWPM() {
  const typedText = inputEl.value.trim();
  const words = typedText.split(/\s+/).length;
  const minutes = (60 - timeLeft) / 60;
  return minutes > 0 ? Math.round(words / minutes) : 0;
}

function calculateAccuracy() {
  const typedText = inputEl.value;
  let correct = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) correct++;
  }
  return typedText.length > 0
    ? Math.round((correct / typedText.length) * 100)
    : 100;
}

inputEl.addEventListener("input", () => {
  totalTyped++;
  correctChars = 0;
  const typedText = inputEl.value;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) correctChars++;
  }

  wpmEl.textContent = calculateWPM();
  accuracyEl.textContent = calculateAccuracy();
});

startBtn.addEventListener("click", startTest);
calcBtn.addEventListener("click", stopTest);

viewBtn.addEventListener("click", () => {
  const isChartVisible = analysisContainer.classList.contains("active");
  const resultsContainer = document.getElementById("resultsContainer");

  if (isChartVisible) {
    // Hiding chart
    analysisContainer.classList.remove("active");
    analysisContainer.classList.add("hidden");
  } else {
    // Showing chart and hiding results
    analysisContainer.classList.remove("hidden");
    analysisContainer.classList.add("active");
    resultsContainer.classList.remove("active");
    resultsContainer.classList.add("hidden");
    drawChart();
  }
});

function drawChart() {
  const incorrect = 100 - finalAccuracy;
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Correct (%)", "Incorrect (%)"],
      datasets: [{
        data: [finalAccuracy, incorrect],
        backgroundColor: ["#28a745", "#dc3545"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Typing Accuracy Analysis" }
      }
    }
  });
}
