let dictionary = {
  "ser/estar": "desu",
  "haber (inanimado)": "arimasu",
  "haber (animado)": "imasu",
  "tener": "motteimasu",
  "hacer": "shimasu",
  "ir": "ikimasu",
  "volver": "kaerimasu",
  "comer": "tabemasu",
  "beber": "nomimasu",
  "escuchar": "kikimasu",
  "ver": "mimasu",
  "hablar": "hanashimasu",
  "estudiar": "benkyou shimasu",
  "leer": "yomimasu",
  "escribir": "kakimasu",
  "comprar": "kaimasu"
};

const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');

let currentWord;
let correctAnswer;

function swapKeysAndValues() {
  const swapped = {};
  for (const key in dictionary) {
      if (dictionary.hasOwnProperty(key)) {
          swapped[dictionary[key]] = key;
      }
  }
  dictionary = swapped;
  displayQuestion();  // Update the question after swapping
}

function getRandomWord() {
  const keys = Object.keys(dictionary);
  return keys[Math.floor(Math.random() * keys.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateOptions() {
  const options = Object.values(dictionary);
  shuffleArray(options);
  options.splice(options.indexOf(correctAnswer), 1);
  return options.slice(0, 3);
}

function displayQuestion() {
  currentWord = getRandomWord();
  correctAnswer = dictionary[currentWord];

  questionDiv.textContent = currentWord;

  const options = generateOptions();
  options.push(correctAnswer);
  shuffleArray(options);

  //Creates the options
  optionsDiv.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = "btn btn-option";
    button.addEventListener('click', checkAnswer);
    optionsDiv.appendChild(button);
  });
}

function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  if (selectedAnswer === correctAnswer) {
    questionDiv.textContent = "Correct";
    questionDiv.className = "badge badge-correct";
    setTimeout(() => {
      displayQuestion();
      questionDiv.className = "badge badge-light";
    }, 800);
  } else {
    questionDiv.textContent = "Incorrect";
    questionDiv.className = "badge badge-incorrect";
    setTimeout(() => {
      questionDiv.className = "badge badge-light";
      questionDiv.textContent = currentWord;
    }, 800);
    //alert('Incorrect. Try again.');
  }
}

displayQuestion();
