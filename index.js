const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nameFormContainer = document.getElementById('name-form-container')
const submitNameButton = document.getElementById('submit-name-btn')
const viewScoreButton = document.getElementById('view-score-btn')
const nameInput = document.getElementById('name')

let shuffledQuestions, currentQuestionIndex, score = 0, userName = ''

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

// Sample questions array
const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
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
  }
]

// Event listener for viewing the score on a separate page
viewScoreButton.addEventListener('click', () => {
  window.location.href = 'score.html' // Redirect to score page
})
