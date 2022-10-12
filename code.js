
window.addEventListener('load',function(){
    // start Page  => check all information are written
     validationStartPage();

    // set Exam set up 
    couneter = 0;
    testName ="";
    examNo=[];
    valOfCheckBox=[];
    techBtn = document.getElementById('techExam');
    techExam = document.getElementById('technicalExam');

    techBtn.addEventListener('click',function(e){
        examChoosePage.style.display='none';
        techExam.style.display = 'block';

        testName = e.target.innerText;
        generalInfo();      
    })
    enExam= document.getElementById('enExam');
    enExam.addEventListener('click',function(e){
        examChoosePage.style.display='none';
        techExam.style.display = 'block';
     
        testName = e.target.innerText;
        generalInfo();
    })
    // prev Btn
    prev = document.getElementById('prev');
    prev.addEventListener('click',function(e){
        if (couneter ==0 )e.preventDefault();
        else{couneter --; setQuestions();}
    })
    // Next Btn
    nextq = document.getElementById('next');
    nextq.addEventListener('click',function(e){
        if (couneter ==technicalQuestion.length-1)e.preventDefault();
        else{couneter++; setQuestions();}
      
    })
    // finish Btn
    finishBtn = document.getElementById('finish');
    finishBtn.addEventListener('click',endExam)
})
function generalInfo(){
    UserNameForTest.innerText = userName.value +"\t "+testName;
    examNo.push(testName);
    setTimeout();
    setQuestions();
}
// start exam code 
function question(_question , _ans1 ,_ans2 ,_ans3){
    this._question = _question;
    this._ans1 = _ans1;
    this._ans2 = _ans2;
    this._ans3 = _ans3; 
}

    technicalQuestion=[
        new question ('Full form of URL is ?' ,' a- Uniform Resource Locator',' b- Uniform Resource Link', ' c- Uniform Registered Locator' ),
        new question ('In which of the following form , data is stored in computer ?',' a- Decimal',' b- Binary',' c- HexaDecimal'),
        new question ('HTML stands for?' ,' a- Hyper Text Markup Language',' b- High Text Markup Language',' c- Hyper Tabular Markup Language')
    ];
    englishQuestion = [
        new question("Don't make so much noise. Noriko ..... to study for her ESL test!",' a- try',' b- tries',' c- is trying'),
        new question("Jun-Sik ..... his teeth before breakfast every morning.",' a- will cleaned',' b- is cleaning',' c- cleans'),
        new question("How many students in your class ..... from Korea?",' a- comes',' b- come',' c- came')
    ];

function setQuestions(){
    question  = document.getElementById('question');
    answers   = document.getElementById('answers');
    userAnser = document.getElementsByName('ans');

    if(testName == 'Technical Exam'){
        question.innerText = technicalQuestion[couneter]['_question'] ;
        answers.innerHTML = '<li><input type = "radio" name="ans" value ="0">'+ technicalQuestion[couneter]['_ans1'] +'</li> <li><input  type = "radio" name="ans" value ="1">'+ technicalQuestion[couneter]['_ans2'] +'</li> <li><input  type = "radio" name="ans" value ="2">'+ technicalQuestion[couneter]['_ans3'] +'</li>';
    }else{
        question.innerText = englishQuestion[couneter]['_question'] ;
        answers.innerHTML = '<li><input type = "radio" name="ans" value ="0">'+ englishQuestion[couneter]['_ans1'] +'</li> <li><input  type = "radio" name="ans" value ="1">'+ englishQuestion[couneter]['_ans2'] +'</li> <li><input  type = "radio" name="ans" value ="2">'+ englishQuestion[couneter]['_ans3'] +'</li>';       
    }
   saveUservalues();
}

function saveUservalues(){
    for (let i = 0; i < userAnser.length; i++) {
        if(valOfCheckBox[couneter]!=undefined) userAnser[valOfCheckBox[couneter]].checked=true;
        userAnser[i].addEventListener('change',function(){
            if(this.checked) valOfCheckBox[couneter] = this.value   })
    }
}
function setTimeout(){
    minutes = document.getElementById('minute');
    seconds = document.getElementById('Second');
    minutes.innerText = '02';
    seconds.innerText = '00';
    var min = 2;
    var sec = 0;
    timer=setInterval(function(){
        if (sec == 0){ sec =59; min--;}
        else sec -- ;
        minutes.innerText = '0'+min+' ';

        if(sec>9) seconds.innerText = ' '+sec;
        else seconds.innerText = ' 0'+sec;
        if(sec==0&& min ==0)endExam();
    },1000);
}

function endExam(){
    finalResults = document.getElementById('FinalResult');
    TechExams = document.getElementById('TechExam');
    clearInterval(timer);
    // to know if two exams ended or not
    if(examNo.length>2){
        techExam.style.display='none';
        finalResults.style.display='block';
    }else if(testName == 'Technical Exam') TechExam();
    else englishExam();
}
function englishExam(){
        EnglishRes= document.getElementById('EnglishRes');
        finalEngGrade = 0;
        if(valOfCheckBox[0]==2 ) finalEngGrade++; 
        if(valOfCheckBox[1]==2 ) finalEngGrade++; 
        if(valOfCheckBox[2]==1 ) finalEngGrade++; 
        if(finalEngGrade >=2)
        {
            EnglishRes.style.backgroundColor='lightgreen';
            EnglishRes.innerHTML ='<p>Success</p><p>'+finalEngGrade+' of 3</p>'
        }
        else{
            EnglishRes.style.backgroundColor='red';
            EnglishRes.innerHTML ='<p>Fail</p><p>'+finalEngGrade+' of 3</p>'
        }
        examNo.push('Technical Exam');
        testName='Technical Exam';
        bothExams();
}
function TechExam(){
    finalTechGrade = 0;
    if(valOfCheckBox[0]==0 ) finalTechGrade++; 
    if(valOfCheckBox[1]==1 ) finalTechGrade++; 
    if(valOfCheckBox[2]==0 ) finalTechGrade++; 
    if(finalTechGrade >=2)
    {
        TechExams.style.backgroundColor='lightgreen';
        TechExams.innerHTML ='<p>Success</p><p>'+finalTechGrade+' of 3</p>'
    }
    else{
        TechExams.style.backgroundColor='red';
        TechExams.innerHTML ='<p>Fail</p><p>'+finalTechGrade+' of 3</p>'
    }
    examNo.push('English Exam');
    testName = 'English Exam';
    bothExams();
}
function bothExams(){
    valOfCheckBox=[];
    couneter=0;
    if(examNo.length<=2){
        UserNameForTest.innerText = userName.value +"         "+testName;
        setTimeout();
        setQuestions();
    }else endExam();
}
// end  exam code 
// Start start page validation
function validationStartPage(){
    userName  = document.getElementById('userName');
    UserEmail = document.getElementById('UserEmail');
    UserEmailError = document.getElementById('UserEmailError');
    userNameError = document.getElementById('userNameError');

    examChoosePage  = document.getElementById('startChooseexam');
    startPage = document.getElementById('startPage');

    startbtn  = document.getElementById('btnStart');
    userName.focus();
    
    userName.addEventListener('blur',ckeckUsername);
    UserEmail.addEventListener('blur', checkuserEmail);

    startbtn .addEventListener('click',function(e){
        if(NameValid()&&EmailValid()){
           alert('Important Note, \n If you reload Page you will exit exam !');
            startPage.style.display ='none';
            examChoosePage.style.display = 'block';
        }
        else e.preventDefault();
        ckeckUsername();
        checkuserEmail();
    })

}
function ckeckUsername(){
    if(!NameValid()){
        userName.focus();
        userName.select();
        userNameError.style.display = 'block';
    }
    else  userNameError.style.display = 'none';

}
function NameValid(){
    nameRegular = /^[a-zA-Z ]{8,16}$/;
    if(userName.value.match(nameRegular)) return true;
    else return false;
}
function checkuserEmail(){
    if(!EmailValid()){
        UserEmail.focus();
        UserEmail.select();
        UserEmailError.style.display = 'block';
    }
    else  UserEmailError.style.display = 'none';

}
function EmailValid(){
    emailRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(UserEmail.value.match(emailRegular)) return true;
    else return false;
}
// End start page validation