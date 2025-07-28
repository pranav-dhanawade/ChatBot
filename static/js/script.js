async function postData(url="",data={}) {
      const response = await fetch(url,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        }, body: JSON.stringify(data),
      });
      return response.json();
}
  



document.getElementById('sendButton').addEventListener("click", async() =>{
    
    questionInput = document.getElementById('questionInput').value;
    document.getElementById('questionInput').value = "";
    document.querySelector(".right2").style.display="block";
    document.querySelector(".right1").style.display="none";
    document.getElementById('question1').innerHTML = questionInput;
    document.getElementById('question2').innerHTML = questionInput;


    //Data Fetching
    let result = await postData("/api",{'question':questionInput})
    solution.innerHTML = result.answer;

})
document.getElementById('sendButton2').addEventListener("click", async() =>{
    inputQuestion = document.getElementById('inputQuestion').value;
    document.getElementById('inputQuestion').value = "";
    document.querySelector(".right2").style.display="block";
    document.querySelector(".right1").style.display="none";
    document.getElementById('question1').innerHTML = inputQuestion;
    document.getElementById('question2').innerHTML = inputQuestion;
    document.getElementById('solution').innerHTML = "Loading..";
    
    let result = await postData("/api",{'question':inputQuestion})
    
    solution.innerHTML = result.answer;
})
function shownewchat(){
    document.querySelector(".right2").style.display="none";
    document.querySelector(".right1").style.display="block";
}
document.getElementById('newchat').addEventListener("click",shownewchat)
