import "./styles.css";
import img1 from "./img/sackboyMad.png";
import cowImg from "./img/cow.png";
import roosterImg from "./img/rooster.jpg";
import bingImg from "./img/bing.jpeg";
import guyImg from "./img/guy.jpeg";
import picardiaImg from "./img/picardia.png";

const dropDown = document.getElementById("dropDownServices");
const imgList = [img1, cowImg, roosterImg, bingImg, guyImg, picardiaImg];
const button = document.getElementById("services");

button.addEventListener("mouseenter", () => {
    dropDown.style.display = "flex";
});

button.addEventListener("mouseleave", () => {
    dropDown.style.display = "none";
});

createSlider();
function createImages(){

}
function createSlider() {
    const currentImg = parseInt(localStorage.getItem("currentImg"));

    // console.log(`slider currentImg : ${JSON.parse(localStorage.getItem("currentImg"))}`);

    let current = imgList[currentImg];
   
    let after;
    let before;

    if(currentImg - 1 < 0){
        before = imgList[imgList.length-1];
    }
    else{
        before = imgList[currentImg-1];
    }
    
    
    if(currentImg + 1 > imgList.length-1){
        console.log("after is 0");
        after = imgList[0];
    }
    else{
        console.log("after is plus one");
        after = imgList[currentImg+1];
    }
   
  

    const slider = document.getElementById("slider");
    const whiteSpace = document.createElement("div");
    const whiteSpace2 = document.createElement("div");
    whiteSpace.classList.add("whiteSpace");
    whiteSpace.classList.add("whiteSpace1");

    whiteSpace2.classList.add("whiteSpace");

    whiteSpace2.classList.add("whiteSpace2");

    const imgContainer = document.getElementById("imgContainer");

    const img = document.createElement("img");

    img.src = current;
    img.classList.add("image");
    img.id = "mainImg";

    const img2 = document.createElement("img");

    img2.src = before;
    img2.classList.add("image");
    img2.classList.add("img2");

    const img3 = document.createElement("img");

    img3.src = after;

    img3.classList.add("image");
    img3.classList.add("img3");

    slider.appendChild(img2);
    slider.appendChild(img);
    slider.appendChild(img3);

    imgContainer.appendChild(whiteSpace);

    imgContainer.appendChild(slider);
    imgContainer.appendChild(whiteSpace2);

    img.style.height = "500px";

    const nextButton = document.getElementById("nextButton");
    const backButton = document.getElementById("backButton");

    let imgPos = 0;
    let img2Pos = 0;
    let img3Pos = 0;


    nextButton.replaceWith(nextButton.cloneNode(true));
    backButton.replaceWith(backButton.cloneNode(true));

    // Reassign the buttons after replacement
    const newNextButton = document.getElementById("nextButton");
    const newBackButton = document.getElementById("backButton");

    newBackButton.addEventListener("click", () => {
        
        newBackButton.disabled = true;
        imgPos = 100;
        img2Pos = 100;

        // console.log(imgPos);
        // console.log(img2Pos);
        // console.log(img3Pos);

        if (img3Pos != 0) {
            console.log("yes3");
            img3.style.transform = "translateX(0%)";
            img.style.transform = "translateX(0%)";
            img2.style.transform = "translateX(0%)";

            imgPos = 0;
            img2Pos = 0;
            img3Pos = 0;

            console.log("reset 1 2");
        } else {
            img.style.transform = `translateX(${imgPos}%)`;
            img2.style.transform = `translateX(${img2Pos}%)`;
        }

        setTimeout(() => {
            checkImg("back");
            newBackButton.disabled = false; // Re-enable the button after 3 seconds
            slider.replaceChildren();
            whiteSpace.remove();
            whiteSpace2.remove();
            createSlider();
        }, 1000); 
        
    });

    newNextButton.addEventListener("click", () => {
        
        newNextButton.disabled = true;
        
        // console.log(imgPos);
        // console.log(img2Pos);
        // console.log(img3Pos);

        imgPos = -100;
        img3Pos = -100;

        if (img2Pos != 0) {
            // console.log("yes2");
            img3.style.transform = "translateX(0%)";
            img.style.transform = "translateX(0%)";
            img2.style.transform = "translateX(0%)";

            imgPos = 0;
            img2Pos = 0;
            img3Pos = 0;

            console.log("reset 1 2");
        } else {
            img.style.transform = `translateX(${imgPos}%)`;
            img3.style.transform = `translateX(${img3Pos}%)`;
        }

        setTimeout(() => {
            checkImg("next");
            newNextButton.disabled = false; // Re-enable the button after 3 seconds
            slider.replaceChildren();
            whiteSpace.remove();
            whiteSpace2.remove();
            createSlider();
        }, 1000); 

        
    });
}

function checkImg(button){
    console.log("check is IMG");
    console.log(`currentImg before: ${JSON.parse(localStorage.getItem("currentImg"))}`);
    console.log(`current button: ${button}`);
    let currentImg = JSON.parse(localStorage.getItem("currentImg"));
    
    let newImg;

    if(button == "next"){
        if(currentImg){
            if(currentImg < imgList.length-1){
                localStorage.setItem("currentImg", JSON.stringify(currentImg + 1));
            }
            else{
                localStorage.setItem("currentImg", "0");
            }
            
        }
        else{
            localStorage.setItem("currentImg", "1");
    
            console.log("no items");
        }
    }
    else{
        
        if(currentImg != "" || currentImg == 0){ 
            

            if(currentImg > 0){
               
                localStorage.setItem("currentImg",currentImg - 1);
            }
            else{
                
                localStorage.setItem("currentImg", imgList.length-1);
            }
            
        }
        else{
            localStorage.setItem("currentImg", "1");
    
            console.log("no items");
        }
    }

    console.log(`currentImg after: ${JSON.parse(localStorage.getItem("currentImg"))}`);

    
    
}

const testButton = document.getElementById("testButton");

testButton.addEventListener("click", () => {
    const mainImg = document.getElementById("mainImg");
    mainImg.src = cowImg;
});
