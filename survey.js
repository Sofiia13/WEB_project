// localStorage.clear();

const surveyData = [
  {
    question: "Що потрібно враховувати при виборі кімнатних рослин?",
    answers: [
      { answer: "Колір листя", isCorrect: false },
      { answer: "Ріст рослини", isCorrect: false },
      { answer: "Рівень освітлення", isCorrect: true },
      { answer: "Форма квітів", isCorrect: false },
    ],
  },
  {
    question: "Які кімнатні рослини зазвичай не вимагають частого поливу?",
    type: "checkbox",
    answers: [
      { answer: "Кактуси", isCorrect: true },
      { answer: "Папороть", isCorrect: true },
      { answer: "Фіалки", isCorrect: false },
      { answer: "Герань", isCorrect: false },
    ],
  },
  {
    question: "Як часто потрібно поливати кімнатні рослини?",
    answers: [
      { answer: "Раз на тиждень", isCorrect: false },
      { answer: "Раз на місяць", isCorrect: false },
      { answer: "Два рази на день", isCorrect: false },
      { answer: "Залежить від типу рослини", isCorrect: true },
    ],
  },
  {
    question: "Чому переводять кімнатні рослини в більші горщики?",
    answers: [
      { answer: "Для забезпечення кращого росту", isCorrect: true },
      { answer: "Для заощадження місця", isCorrect: false },
      { answer: "Для зменшення потреби в поливі", isCorrect: false },
      { answer: "Для зміни кольору листя", isCorrect: false },
    ],
  },
  {
    question: "Які рослини здатні покращити якість повітря в приміщенні?",
    type: "checkbox",
    answers: [
      { answer: "Папороть", isCorrect: true },
      { answer: "Фікус", isCorrect: false },
      { answer: "Гіацинт", isCorrect: false },
      { answer: "Алое вера", isCorrect: true },
    ],
  },
];

function generateSurvey() {
  const surveyContainer = document.getElementById("survey-container");

  surveyData.forEach(function (questionObj, index) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = questionObj.question;
    questionDiv.appendChild(questionText);

    questionObj.answers.forEach(function (answerObj) {
      const answerLabel = document.createElement("label");
      const input = document.createElement("input");
      input.type = questionObj.type || "radio";
      input.name = "question" + index;
      input.value = answerObj.answer;

      if (questionObj.type === "checkbox") {
        input.checked = false;
      }

      answerLabel.appendChild(input);
      answerLabel.appendChild(document.createTextNode(answerObj.answer));
      questionDiv.appendChild(answerLabel);

      questionDiv.appendChild(document.createElement("br"));
    });

    surveyContainer.appendChild(questionDiv);
  });
}

window.onload = generateSurvey;

function checkAnswers() {
  let correctAnswers = 0;

  surveyData.forEach(function (questionObj, index) {
    const selectedAnswer = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedAnswer) {
      const selectedAnswerValue = selectedAnswer.value;
      const correctAnswer = questionObj.answers.find(
        (answerObj) => answerObj.isCorrect
      ).answer;
      if (selectedAnswerValue === correctAnswer) {
        correctAnswers++;
      }
    }
  });

  const totalQuestions = surveyData.length;
  const percentageCorrect = (correctAnswers / totalQuestions) * 100;

  alert(
    `You got ${correctAnswers} out of ${totalQuestions} questions correct (${percentageCorrect}%).`
  );
  return correctAnswers;
}

let json = [];

function loadData() {
  const jsonString = localStorage.getItem("testResults");
  if (jsonString) {
    json = JSON.parse(jsonString);
  }
}

loadData();

function saveData(correctAnswers) {
  console.log("Saving data...");
  const selectedName = document.getElementById("fname").value;
  const jsonData = {
    name: selectedName,
    result: correctAnswers,
  };
  json.push(jsonData);

  const jsonString = JSON.stringify(json);

  localStorage.setItem("testResults", jsonString);
}

function handleClick() {
  console.log("Handling click...");
  const correctAnswers = checkAnswers();
  saveData(correctAnswers);
}

document.getElementById("save-btn").addEventListener("click", handleClick);
