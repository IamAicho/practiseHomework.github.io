var circleX = 0,
    circleY = 0,
    mouseX = 0,
    mouseY = 0;

$(function () {
    $(window).on('mousemove', function (event) {
        mouseX = event.clientX - 10;
        mouseY = event.clientY - 10;
    })

    setInterval(function () {
        circleX += (mouseX - circleX) / 10;
        circleY += (mouseY - circleY) / 10;

        $('.cursor').css({
            'left': circleX,
            'top': circleY,
        })
    }, 5)
})



feather.replace();

const nextEl = document.querySelector("#next");
const previousEl = document.querySelector("#previous");
const sliderEl = document.querySelector("#slider");
const sliderImgs = sliderEl.querySelectorAll("img");
const totalImgs = sliderImgs.length;
let imgWidth;

function handleResize() {
    imgWidth = sliderEl.offsetWidth;
}
handleResize();
window.addEventListener("resize", handleResize);

const loopAutoNext = (time) => {
    setInterval(() => {
        onNextClick();
    }, time);
};

loopAutoNext(3000);

//Defining which ball is active
const toggleBullet = (prev) => {
    const bullets = document.querySelectorAll(".bullet");
    let nextSlide;

    if (prev) {
        nextSlide = Math.round(sliderEl.scrollLeft) - imgWidth;
    } else {
        nextSlide = Math.round(sliderEl.scrollLeft) + imgWidth;
    }

    let activeBullet = nextSlide / imgWidth;
    bullets.forEach((element) => element.classList.remove("active"));
    if (
        Math.round(activeBullet) !== totalImgs &&
        Math.round(activeBullet) !== -1
    ) {
        bullets[Math.round(activeBullet)].classList.add("active");
    } else {
        bullets[0].classList.add("active");
    }
};

const createBullets = (index) => {
    const btnBullet = document.createElement("button");
    btnBullet.classList.add("bullet");
    btnBullet.setAttribute("onclick", `bulletSlider(${index})`);
    document.querySelector(".bullets-container").appendChild(btnBullet);
};

//Create bullets
if (totalImgs > 0) {
    sliderImgs.forEach((_, index) => createBullets(index));
    document.querySelectorAll(".bullet")[0].classList.add("active");
}

//Click bullet
const bulletSlider = (index) => {
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach((element) => element.classList.remove("active"));
    sliderEl.scrollLeft = imgWidth * index;
    bullets[index].classList.add("active");
};

//Next Slide ---------------
nextEl.addEventListener("click", onNextClick);
previousEl.addEventListener("click", onPreviousClick);

function onNextClick() {
    sliderEl.scrollLeft += imgWidth;
    //return to beginning
    const sliderFullWidth = sliderEl.scrollWidth;
    const lastSlide = sliderFullWidth - imgWidth;

    toggleBullet(false);

    if (lastSlide == Math.round(sliderEl.scrollLeft)) {
        sliderEl.scrollLeft = 0;
    }
}
//Previous Slide -----------
function onPreviousClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= imgWidth;

    toggleBullet(true);
}
