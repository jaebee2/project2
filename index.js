const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nameFormContainer = document.getElementById('name-form-container')
const submitNameButton = document.getElementById('submit-name-btn')
const viewScoreButton = document.getElementById('view-score-btn')
const nameInput = document.getElementById('name')

let shuffledQuestions , currentQuestionIndex, score = 0, userName = ''

// Event listener to capture the user's name and start the quiz
submitNameButton.addEventListener('click', () => {
  userName = nameInput.value
  if (userName) {
    nameFormContainer.classList.add('hide') // Hide name input form
    startButton.classList.remove('hide') // Show start button after name is entered
  } else {
    alert("Please enter your name to start the quiz!") // Alert if no name is entered
  }
})

// Start quiz event listener
startButton.addEventListener('click', startGame)

// Next question event listener
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Function to start the quiz
function startGame() {
  score = 0 // Reset score at the start of each game
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Function to set the next question
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Function to display the question and its answers
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Function to reset state between questions
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  // If correct answer, increase the score
  if (correct) {
    score++
  }
 

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    saveScore() // Save score to localStorage when quiz ends
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    viewScoreButton.classList.remove('hide') // Show the view score button
  }
  
}

// Function to save score and username to localStorage
function saveScore() {
  const userData = {
    name: userName,
    score: score
  }
  localStorage.setItem('quizUserData', JSON.stringify(userData)) // Save as JSON
}

// Function to set the correct/wrong class
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// Function to clear the correct/wrong class
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// Event listener for viewing the score on a separate page
viewScoreButton.addEventListener('click', () => {
    window.location.href = 'score.html' // Redirect to score page
  })

// Sample questions array
const questions = [
    // Existing questions
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    
    {
      question: 'Is web development fun?',
      answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    },
   
    {
      question: 'In the Marvel Cinematic Universe, who is the first character to join the Avengers after the original six?',
      answers: [
        { text: 'Scarlet Witch', correct: true },
        { text: 'Spider-Man', correct: false },
        { text: 'Black Panther', correct: false },
        { text: 'Vision', correct: false }
      ]
    },
    {
      question: 'Which villain is responsible for the Avengers coming together in the first Avengers movie?',
      answers: [
        { text: 'Ultron', correct: false },
        { text: 'Thanos', correct: false },
        { text: 'Loki', correct: true },
        { text: 'Red Skull', correct: false }
      ]
    },
    {
      question: 'What is the name of the government organization that oversees the Avengers in the MCU?',
      answers: [
        { text: 'S.W.O.R.D.', correct: false },
        { text: 'S.H.I.E.L.D.', correct: true },
        { text: 'H.A.M.M.E.R.', correct: false },
        { text: 'A.I.M.', correct: false }
      ]
    },
    {
      question: 'In the comics, which member of the Avengers is known for having a bow and arrow as their primary weapon?',
      answers: [
        { text: 'Black Widow', correct: false },
        { text: 'Hawkeye', correct: true },
        { text: 'Falcon', correct: false },
        { text: 'Ant-Man', correct: false }
      ]
    },
    // JavaScript-themed questions
    {
      question: 'Which keyword is used to declare a variable in JavaScript?',
      answers: [
        { text: 'var', correct: true },
        { text: 'int', correct: false },
        { text: 'float', correct: false },
        { text: 'string', correct: false }
      ]
    },
    {
      question: 'What is the output of the expression "2" + 2 in JavaScript?',
      answers: [
        { text: '22', correct: true },
        { text: '4', correct: false },
        { text: 'NaN', correct: false },
        { text: 'undefined', correct: false }
      ]
    },
    {
      question: 'Which of the following is not a JavaScript data type?',
      answers: [
        { text: 'Number', correct: false },
        { text: 'String', correct: false },
        { text: 'Boolean', correct: false },
        { text: 'Character', correct: true }
      ]
    },
    {
      question: 'What does the isNaN() function do in JavaScript?',
      answers: [
        { text: 'Checks if a value is NaN', correct: true },
        { text: 'Checks if a number is an integer', correct: false },
        { text: 'Checks if a variable is defined', correct: false },
        { text: 'Checks if a value is a number', correct: false }
      ]
    },
    {
      question: 'What is the correct syntax for referring to an external script called "script.js"?',
      answers: [
        { text: '<script src="script.js"></script>', correct: true },
        { text: '<script href="script.js"></script>', correct: false },
        { text: '<script ref="script.js"></script>', correct: false },
        { text: '<script name="script.js"></script>', correct: false }
      ]
    }
  ];
  


