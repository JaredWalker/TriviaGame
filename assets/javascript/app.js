// VARIABLES

var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    clickSound: new Audio(""),
    gameHTML: "",
    questionsArray: [
                    "How many feet does a mouse have?", "Which of these is not a seafood ?", "How many planets are there in our solar system ?", "Jim Henson was famous for playing with these objects", "Bill Gates is known for creating which company?"],
    answerArray: [
                  ["1", "5", "4", "A few"], ["Hotdog", "crableg", "Tuna can", "Salmon"], ["infinite", "9", "A few", "8"], ["chicken tenders", "puppets", "skateboards", "lizards"], ["Sony", "Microsoft", "Apple", "Wendys"],],
    correctAnswers: [
                    "C. 4", "A. Hotdog", "D. 8", "B. puppets", "B. Microsoft"],
    imageArray: [
                "<img class='center-block img-right' src='assets/images/Dr.SteveBrule1.jpg'>", "<img class='center-block img-right' src='assets/images/Dr.SteveBrulehotdog.jpg'>", "<img class='center-block img-right' src='assets/images/Dr.SteveBruleplanets.jpg'>", "<img class='center-block img-right' src='assets/images/Dr.SteveBrule2.jpg'>", "<img class='center-block img-right' src='assets/images/Dr.SteveBruleQuote.jpg'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  
  
  function startScreen(){
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>I'm a Doctor too!</a></p>";
    //Add Start button to main-area
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Bringo! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 4000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Thats Wrong ya Dangus! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Pretty good job for a hunk!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  

  startScreen();
  
  //start-button click
  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      trivia.clickSound.play();
      generateHTML();
  
      timer();
  }); // Closes start-button click
  
  $("body").on("click", ".answer", function(event){
      trivia.clickSound.play();
    //If correct answer
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); 
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      trivia.clickSound.play();
      resetGame();
  }); // Closes reset-button click
  