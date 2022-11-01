const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const currentSlide = track.querySelector(".current-slide");
const prevSlide = currentSlide.previousElementSibling;
let slideIndex = 0;

disableLeftButton(prevSlide);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// function to move each image in the carousel slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// when I click right, move slides to the left
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  const nextSlide = currentSlide.nextElementSibling;

  const slideIndex = slides.indexOf(nextSlide);
  const targetDot = dots[slideIndex];

  dotIndicator(currentDot, targetDot);

  moveToSlide(track, currentSlide, nextSlide);
  disableDirectionButton(nextSlide, ".carousel__button--right");
});

// when I click left, move slides to the left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const slideIndex = slides.indexOf(prevSlide);
  const targetDot = dots[slideIndex];

  dotIndicator(currentDot, targetDot);

  moveToSlide(track, currentSlide, prevSlide);
  disableDirectionButton(prevSlide, ".carousel__button--left");
});

// when direction button disable when you get to the last image on the carousel
const disableDirectionButton = (slide, className) => {
  if (slides.indexOf(slide) < slides.indexOf(slides[slides.length - 1])) {
    document.querySelector(".carousel__button--right").disabled = false;
    document.querySelector(".carousel__button--right").style.cursor = "pointer";
  }

  if (slides.indexOf(slide) > 0) {
    document.querySelector(".carousel__button--left").disabled = false;
    document.querySelector(".carousel__button--left").style.cursor = "pointer";
  }

  if (
    slides.indexOf(slides[slides.length - 1]) === slides.indexOf(slide) ||
    slides.indexOf(slides[0]) === slides.indexOf(slide)
  ) {
    document.querySelector(`${className}`).disabled = true;
    document.querySelector(`${className}`).style.cursor = "none";
  }

  if (slide === 0) {
    document.querySelector(`${className}`).disabled = false;
    document.querySelector(`${className}`).style.cursor = "pointer";
  }
};

// when I click the nav indicator, move to that slide
dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button");

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  if (targetIndex >= 0) {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
  }

  moveToSlide(track, currentSlide, targetSlide);
  disableDirectionButton(targetSlide, ".carousel__button--right");

  if (targetIndex === 0) {
    disableLeftButton(prevSlide);
    disableDirectionButton(targetIndex, ".carousel__button--right");
  }
});

// when the slides gets to the last or first picture disable the left or right button
function disableLeftButton(slide) {
  //disable the left button
  if (slides.indexOf(slide) !== null) {
    document.querySelector(".carousel__button--left").disabled = true;
    document.querySelector(".carousel__button--left").style.cursor = "none";
  }

  //disable the right button
  if (slides.indexOf(slide) === slides[slides.length - 1]) {
    document.querySelector(".carousel__button--right").disabled = true;
    document.querySelector(".carousel__button--right").style.cursor = "none";
  }
}

// when I clicked on the indicator button make it an active indicator by assigning it an active class
function dotIndicator(currentDot, targetDot) {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

function plusSlides(n) {
  moveSlide(slideIndex + n);
}

function moveSlide(n) {
  let i = 0;
  let current;
  let next;

  let moveSlideAnimClass = {
    forCurrent: "",
    forNext: "",
  };

  if (n > slideIndex) {
    if (n > slides.length) {
      n = 0;
      // console.log(slides.length);
    }
    moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
    moveSlideAnimClass.forNext = "moveLeftNextSlide";
  } else if (n < slideIndex) {
    if (n < 0) {
      n = slides.length - 1;
    }

    moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
    moveSlideAnimClass.forNext = "moveRightPrevSlide";
  }

  if (n !== slideIndex) {
    next = slides[n];
    current = slides[slideIndex];
    // console.log(slideIndex);

    for (i = 0; i < slides.length; i++) {
      slides[i].className = "carousel__slide";
    }

    // current.classList.add(moveSlideAnimClass.forCurrent);
    // next.classList.add(moveSlideAnimClass.forNext);

    // console.log(current.classList, n);
    if (n < 3) {
      slideIndex = n;
      console.log(slideIndex);
    } else {
      slideIndex = 0;
      console.log(slideIndex);
    }
  }
}

// making slides automatic
let timer = null;

function setTimer() {
  timer = setInterval(function () {
    plusSlides(1);
  }, 3000);
}

setTimer();

function playPauseSlides() {
  let playPauseBtn = document.getElementById("playPause");

  if (timer === null) {
    setTimer();
    playPauseBtn.style.backgroundPositionY = "0px";
  } else {
    clearInterval(timer);
    timer = null;
    playPauseBtn.style.backgroundPositionY = "-33px";
  }
}
