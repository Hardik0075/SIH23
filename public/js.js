
window.addEventListener("load", () => {
    const loader = document.querySelector(".center");
   const wave = document.querySelectorAll(".wave");

    loader.classList.add("center--hidden");
  
    loader.addEventListener("transitionend", () => {
    //   document.body.removeChild(loader);
    loader.classList.remove("center"); 
    loader.classList.add("loader_over");
    });
  });
  function chng() {
    let img = document.getElementById('in_chng_img');
    img.setAttribute('src', './bg27.png');
  }
  
  function chng1() {
    let img = document.getElementById('in_chng_img');
    img.setAttribute('src', './bg21.png');
  }
  
  function chng2() {
    let img = document.getElementById('in_chng_img');
    img.setAttribute('src', './bh15.png');
  }
  
  function mouseOut() {
    let img = document.getElementById('in_chng_img');
    const big= document.getElementById('in_big_img');
    // big.style.backgroundColor="black";
    img.setAttribute('src', './bg24.png');
  }