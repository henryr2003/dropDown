let autoSlideInterval;
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

if (!localStorage.getItem("currentImg")) {
    localStorage.setItem("currentImg", 0);
}

button.addEventListener("mouseenter", () => {
    dropDown.style.display = "flex";
});

button.addEventListener("mouseleave", () => {
    dropDown.style.display = "none";
});

createSlider();

function createSlider() {
    const currentImg = parseInt(localStorage.getItem("currentImg"));

    // console.log(`slider currentImg : ${JSON.parse(localStorage.getItem("currentImg"))}`);

    let current = imgList[currentImg];

    let after;
    let before;

    if (currentImg - 1 < 0) {
        before = imgList[imgList.length - 1];
    } else {
        before = imgList[currentImg - 1];
    }

    if (currentImg + 1 > imgList.length - 1) {
        after = imgList[0];
    } else {
        after = imgList[currentImg + 1];
    }

    const carouselContainer = document.getElementById("carouselContainer");
    const slider = document.getElementById("slider");
    const selectorContainer = document.createElement("div");
    selectorContainer.id = "selectorContainer";
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

    carouselContainer.appendChild(selectorContainer);

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

    for (let i = 0; i < imgList.length; i++) {
        const circle = document.createElement("button");
        circle.classList.add("circle");
        if (i == currentImg) {
            circle.style.backgroundColor = "blue";
        }
        circle.id = i;
        selectorContainer.appendChild(circle);

        circle.addEventListener("click", () => {
            if (currentImg != circle.id) {
                resetAutoSlide();
                newBackButton.disabled = true;
                newNextButton.disabled = true;
                //go next
                if (currentImg < circle.id) {
                    img3.src = imgList[circle.id];
                    img.style.transform = `translateX(-100%)`;
                    img3.style.transform = `translateX(-100%)`;
                } else {
                    img2.src = imgList[circle.id];
                    img.style.transform = `translateX(100%)`;
                    img2.style.transform = `translateX(100%)`;
                }

                setTimeout(() => {
                    checkImg(circle.id);
                    newBackButton.disabled = false; // Re-enable the button after 3 seconds
                    newNextButton.disabled = false;
                    slider.replaceChildren();
                    whiteSpace.remove();
                    whiteSpace2.remove();
                    selectorContainer.remove();
                    createSlider();
                }, 1000);
            }
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            newBackButton.disabled = true; // Re-enable the button after 3 seconds
            newNextButton.disabled = true;
            img.style.transform = `translateX(-100%)`;
            img3.style.transform = `translateX(-100%)`;

            setTimeout(() => {
                checkImg("next");
                newBackButton.disabled = false; // Re-enable the button after 3 seconds
                newNextButton.disabled = false;
                slider.replaceChildren();
                whiteSpace.remove();
                whiteSpace2.remove();
                selectorContainer.remove();
                createSlider();
            }, 1000);
        }, 5000);
    }

    newBackButton.addEventListener("click", () => {
        resetAutoSlide();
        newBackButton.disabled = true;
        newNextButton.disabled = true;

        img.style.transform = `translateX(100%)`;
        img2.style.transform = `translateX(100%)`;

        setTimeout(() => {
            checkImg("back");
            newBackButton.disabled = false; // Re-enable the button after 3 seconds
            newNextButton.disabled = false;
            slider.replaceChildren();
            whiteSpace.remove();
            whiteSpace2.remove();
            selectorContainer.remove();
            createSlider();
        }, 1000);
    });

    newNextButton.addEventListener("click", () => {
        resetAutoSlide();
        newNextButton.disabled = true;
        newBackButton.disabled = true;

        img.style.transform = `translateX(-100%)`;
        img3.style.transform = `translateX(-100%)`;

        setTimeout(() => {
            checkImg("next");
            newNextButton.disabled = false; // Re-enable the button after 3 seconds
            newBackButton.disabled = false;
            slider.replaceChildren();
            whiteSpace.remove();
            whiteSpace2.remove();
            selectorContainer.remove();
            createSlider();
        }, 1000);
    });

    resetAutoSlide();
}

function checkImg(button) {
    let currentImg = JSON.parse(localStorage.getItem("currentImg"));

    let newImg;

    if (button == "next") {
        if (currentImg) {
            if (currentImg < imgList.length - 1) {
                localStorage.setItem(
                    "currentImg",
                    JSON.stringify(currentImg + 1)
                );
            } else {
                localStorage.setItem("currentImg", "0");
            }
        } else {
            localStorage.setItem("currentImg", "1");
        }
    } else if (button == "back") {
        if (currentImg != "" || currentImg == 0) {
            if (currentImg > 0) {
                localStorage.setItem("currentImg", currentImg - 1);
            } else {
                localStorage.setItem("currentImg", imgList.length - 1);
            }
        } else {
            localStorage.setItem("currentImg", "1");
        }
    } else {
        localStorage.setItem("currentImg", button);
    }
}
