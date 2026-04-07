const questions = [
  {
    question: "Which is largest animal in the world?",
    answers:[
      {text:"Shark",correct:false},
      {text:"Blue whale",correct:true},
      {text:"Elephant",correct:false},
      {text:"Giraffe",correct:false},
    ]
  },
   {
    question: "Which is smallest country in the world?",
    answers:[
      {text:"Vatican City",correct:true},
      {text:"Bhutan",correct:false},
      {text:"Nepal",correct:false},
      {text:"Sri Lanka",correct:false},
    ]
  },
   {
    question: "Which is largest desert in the world?",
    answers:[
      {text:"Kalahari",correct:false},
      {text:"Gobi",correct:false},
      {text:"Sahara",correct:false},
      {text:"Antartica",correct:true},
    ]
  },
   {
    question: "Which is smallest continent in the world?",
    answers:[
      {text:"Asia",correct:false},
      {text:"Australia",correct:true},
      {text:"Arctic",correct:false},
      {text:"Africa",correct:false},
    ]
  }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0; // start with 0
let score=0; // initially

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion(){
  resetState(); // it is a function that will reset the previous question and answer

  let currentQuestion=questions[currentQuestionIndex];
  let questionNo=currentQuestionIndex+1;
  questionElement.innerHTML=questionNo+". " + currentQuestion.question; // .question is from questions array

  // to display answer
  currentQuestion.answers.forEach(answer =>{
    const button=document.createElement("button"); // create elt with tagname button
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button); // to display inside the answer-buttons div
    if(answer.correct){
      button.dataset.correct=answer.correct;  // it will add the true or false in this data set correct from answers fo questions array
    }
    button.addEventListener("click",selectAnswer); // when we click on button function selectAnswer call
  });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild); //so it will remove all the previous answers
  }
}

function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct ==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct"); // if it is true it will add class name correct
    score++; // increase the score by 1 when we click on correct answer 
  }else{
    selectedBtn.classList.add("incorrect"); // if it is not true it will add class name incorrect
  }
  // so now for the class name correct and incorrect we have to add the background color so we will change the background color for class name correct and incorrect in css file

  // so here we have added array from answerButtons children for each so for each button it will check the data set if it is true then it will add the class name correct, suppose if we have selected the wrong answer then it will go and check the other answers and if it is true then it will add the green color with this class name correct and after that it will disable the button so we cannot click on the any button and after that it will display the next button so that we can go to the next question
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct ==="true"){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState(); // remove answers part
  // and instead of question we have to display the score code so we are displaying the question in the questionElement so in this one we will add innerHtml
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton(); // call this function
  }else{
    startQuiz(); // when there is no next question click on that button so it will restart the quiz
  }
});

startQuiz(); // always call after completing quiz 