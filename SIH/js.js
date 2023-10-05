var btn = document.getElementById("button");
var sibtn = document.getElementById("signupbtn");
  
var stname = document.getElementById("student-name");
var clgname = document.getElementById("college-name");
var uniId = document.getElementById("unique-id");
var pass = document.getElementById("Password");
var stud = document.getElementById("stud-name");

var useful ="";
function save(){
    sibtn.addEventListener("click",()=>{
        window.location.href = "login.html";
        useful = stud.value;
        // console.log(useful);
    });
}
// useful=stud.value;
console.log(useful);
function run(){
btn.addEventListener("click",()=>{
    // console.log(stname.value);
    if( stname.value=="Hardik" || stname.value=="Harsh" || stname.value== "" )
    {
        window.location.href = "data.html";
    }
   else{
    alert("Details do not match");
   }
});
}



