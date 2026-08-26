//! ________________________________________________
function open(element) {

    element.classList.add("active");
    setTimeout(() => {
        element.classList.add("show");
    }, 1);

}

//! ________________________________________________
function close(element) {

    element.classList.remove("show");
    setTimeout(() => {
        element.classList.remove("active");
    }, 500);
}

//! ________________________________________________
function updatePopupImg(imgSrc) {
    popupImg.setAttribute("src", imgSrc);

}
//! ________________________________________________
function showPreviousImage() {

    currentImgIndex = (--currentImgIndex <= -1) ? galleryImages.length - 1 : currentImgIndex;
    // currentImgIndex = (--currentImgIndex + galleryImages.length) % galleryImages.length;
    let prevImgIndex = currentImgIndex,
        prevImg = galleryImages[prevImgIndex],
        prevImgSrc = prevImg.getAttribute("src");
    updatePopupImg(prevImgSrc);

}

//! ________________________________________________
function showNextImage() {

    currentImgIndex = (++currentImgIndex >= galleryImages.length) ? 0 : currentImgIndex;
    // currentImgIndex = ++currentImgIndex % galleryImages.length;
    let nextImgIndex = currentImgIndex,
        nextImg = galleryImages[nextImgIndex],
        NextImgSrc = nextImg.getAttribute("src");
    updatePopupImg(NextImgSrc);

}

//! ________________________________________________
function updateIndicators() {

    let newIndicator = popupIndicators[currentImgIndex],
        oldIndicator = popupElement.querySelector(".indicators li.active");

    oldIndicator.classList.remove("active");
    newIndicator.classList.add("active");

    // ______________ box shadow for center indicator ____________________
    let centerIndicatorIndex = parseInt((popupIndicators.length - 1) / 2),
        centerIndicator = popupIndicators[centerIndicatorIndex];

    if (currentImgIndex == centerIndicatorIndex - 1) {
        centerIndicator.classList.add("box_shadow");
    }

    if (currentImgIndex == centerIndicatorIndex) {
        centerIndicator.classList.remove("box_shadow");
    }
}

//! ________________________________________________
function triggerSameImageEffect() {

    popupBox.classList.add("same_image_effect");

    setTimeout(() => {
        popupBox.classList.remove("same_image_effect");
    }, 300);
}

//! ________________________________________________
function triggerInvalidKeyEffect() {

    popupBox.classList.add("invalid_key_effect");

    setTimeout(() => {
        popupBox.classList.remove("invalid_key_effect");
    }, 400);
}