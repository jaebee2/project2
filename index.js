const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nameFormContainer = document.getElementById('name-form-container')
const submitNameButton = document.getElementById('submit-name-btn')
const viewScoreButton = document.getElementById('view-score-btn')
const scoreContainerElement = document.getElementById('score-container')
const nameInput = document.getElementById('name')
const scoreElement = document.getElementById('score')

// Variables for tracking the quiz state
let shuffledQuestions, currentQuestionIndex, score = 0, userName = '', questions = []
const maxQuestions = 10

// Fetch questions from JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data
    console.log('Questions loaded:', questions)
  })
  .catch(error => console.error('Error fetching questions:', error))

// Event listener to capture the user's name and start the quiz
submitNameButton.addEventListener('click', () => {
  userName = nameInput.value
  if (userName.trim() === '') {
    alert('Please enter your name to start the quiz!')
  } else {
    nameFormContainer.classList.add('hide')
    startButton.classList.remove('hide')
  }
})

// Event listener to start the quiz
startButton.addEventListener('click', startGame)

// Event listener to move to the next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start the quiz
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, maxQuestions) // Shuffle and select first 10
  currentQuestionIndex = 0
  score = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Move to the next question
function setNextQuestion() {
  resetState()
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex])
  } else {
    endGame()  // Call endGame when all questions are answered
  }
}

// Display a question with shuffled answers
function showQuestion(question) {
  questionElement.innerText = question.question

  // Shuffle the answers array before displaying them
  const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5)

  shuffledAnswers.forEach(answer => {
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

// Reset state before showing the next question
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Handle the user's answer selection
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (correct) {
    score++
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    endGame() // Call endGame when no more questions are left
  }
}

// Update the visual status of correct or wrong answer
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// Clear the visual status of previous question
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// End the quiz and display the user's score
function endGame() {
  questionContainerElement.classList.add('hide') // Hide question container
  scoreContainerElement.classList.remove('hide') // Show score container
  scoreElement.innerText = `${userName}, you scored ${score} out of ${maxQuestions}!`
  viewScoreButton.classList.remove('hide')
}
