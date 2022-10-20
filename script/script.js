const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const currentSlide = track.querySelector(".current-slide");
const prevSlide = currentSlide.previousElementSibling;

disableLeftButton(prevSlide);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(track);

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
  // console.log(slides.indexOf(slide));
  // console.log(slides.indexOf(slides[slides.length - 1]));

  if (slides.indexOf(slide) < slides.indexOf(slides[slides.length - 1])) {
    document.querySelector(".carousel__button--right").disabled = false;
    document.querySelector(".carousel__button--right").style.cursor = "pointer";

    // console.log("am in");
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

function disableLeftButton(slide) {
  if (slides.indexOf(slide) !== null) {
    document.querySelector(".carousel__button--left").disabled = true;
    document.querySelector(".carousel__button--left").style.cursor = "none";
  }

  if (slides.indexOf(slide) === slides[slides.length - 1]) {
    document.querySelector(".carousel__button--right").disabled = true;
    document.querySelector(".carousel__button--right").style.cursor = "none";
  }
}

function dotIndicator(currentDot, targetDot) {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}
