const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeline =quiz_box.querySelector(" header   .time_line");

const option_list = document.querySelector(".option_list");

start_btn.onclick = () => {

  info_box.classList.add("activeinfo");
  
}

exit_btn.onclick = () => {
    
    info_box.classList.remove("activeinfo");

}

continue_btn.onclick = () => {

    info_box.classList.remove("activeinfo");
    quiz_box.classList.add("activequiz");

    
    showquestions(0);
  quecounter(1);
  startTimer(15);
  startTimerLine(0);
  }
 

  let que_count = 0;  
  let que_numb = 1;
  let  counter;
  let timevalue = 15;
 let widthValue = 0;
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result");
const restart_quiz = result_box.querySelector(".buttons .start");
const quiz_quiz = result_box.querySelector(".buttons .quit");
next_btn.onclick = () => {
  if (que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showquestions(que_count);
    quecounter(que_numb);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
  }
  else{
          console.log("questions completed");
           showresultbox();
  }
}

  function showquestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag= '<span>'+questions[index].numb +"."+ questions[index] . question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                      + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i=0 ; i < option.length;i++){
      option[i].setAttribute("onclick", "optionselected(this)");
    }
  }

  let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
  let crossicon ='<div class="icon cross"><i class="fas fa-times"></i></div>';

   function optionselected(answer){
    clearInterval(counterLine);
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns == correctAns){
      answer.classList.add("correct"); 
      console.log("answer is correct");
      answer.insertAdjacentHTML("beforeend", tickicon);
    }
    else{
      answer.classList.add("incorrect");
       console.log("answer is wrong");

       answer.insertAdjacentHTML("beforeend", crossicon);

    for(let i=0; i < alloptions; i++){
       if(option_list.children[i].textContent == correctAns){
         option_list.children[i].setAttribute("class","option correct");
         option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
          } 
        }
    }
     
    for (let i= 0; i < alloptions; i++){
          option_list.children[i].classList.add("disabled");
     }
     next_btn.style.display = "block";
   }

   function showresultbox(){
    info_box.classList.remove("activeinfo");
    quiz_box.classList.remove("activequiz");
    result_box.classList.add("activeresult");
   }

function startTimer(time){
  counter = setInterval(timer,1000);
  function timer(){
      timeCount.textContent = time;
      time--;
      if(time < 9){
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero;
      }
      if(time < 0){
        clearInterval(counter);
        timeCount.textContent = "00";
      }
  }
}



function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    time += 1;
    timeline.style.width = time + "px";
    if(time > 549){

         clearInterval(counterLine);
    }
  }
}



function quecounter(index){
  const bottom_ques_counter= quiz_box.querySelector(".total_que");
  let totalquescounttag='<span><p>'+ index +'</p><p>of</p><p>'+ questions.length +'</p>Questions</span>'; 
   bottom_ques_counter.innerHTML =totalquescounttag;
}