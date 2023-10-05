var mybtn = document.getElementById("mybtn");
var arr = ["data1.html","data.html"];
// var i=0;
var t=true;
// var clickCount = 0;
mybtn.addEventListener("click",()=>{
    t= (t==true)?false:true;
    alert("Your plague is less than 20%");
   first();

});

function first(){
    window.location.href="data1.html";
}

function second(){
    window.location.href="data2.html";

}