// 1. Exit Popup with Escape Key – Pressing the Esc key closes the popup.    ✅
// 2. Image Change with Keyboard Numbers – Pressing a number key changes the popup image directly. ✅
// 3. Image Navigation with Arrow Keys – Left / Right arrow keys navigate between images.  ✅
// 4. Special Effect for Invalid Keys – If a non - indicator key is pressed, the popup triggers a visual effect. ✅
// 5. Special Effect for Current Image Key – If the key pressed corresponds to the already active image, a different effect is shown. ✅

//! _______________________________________ Global_Variables _______________________________________ 
let popupOpenKeys = document.querySelectorAll("#Gallery .popupKey"),
    popupElement = document.querySelector(".popup"),
    popupBox = popupElement.querySelector(".box"),
    popupImg = popupBox.querySelector("img"),
    galleryImages = Array.from(document.querySelectorAll("#Gallery img")),
    //or galleryImages = [...document.querySelectorAll("#Gallery img")],
    popupCloseKey = popupElement.querySelector(".close"),
    popupPrevKey = popupElement.querySelector(".prev"),
    popupNextKey = popupElement.querySelector(".next"),
    currentImg,
    currentImgSrc,
    currentImgIndex;

// Instead of finding the current image's index in the galleryImages array,
// you can assign a data-index attribute to each image and access it directly using:
// currentImg.dataset.index
//
// However, this approach is not fully dynamic.
// If you add, remove, or reorder images, you need to update their data-index values manually.

//! _______________________________________ Create_Indicators_Dynamically _______________________________________

for (let i = 0; i < galleryImages.length; i++) {
    let newIndicator = document.createElement("li");
    newIndicator.textContent = i + 1;

    if (i == 0) {
        newIndicator.classList.add("active");
    }

    let popupIndicatorsContainer = popupElement.querySelector(".indicators");
    popupIndicatorsContainer.append(newIndicator);
}

let popupIndicators = Array.from(popupElement.querySelectorAll(".indicators li"));

//! _______________________________________ Open_Popup _______________________________________

// currentImg = popupKey.parentElement.previousElementSibling.querySelector("img");

// OR --------------------------

// use (index) that exist in forEach ,
// number of popupOpenKeys is the same  number of galleryImages
// and the same order, so each index refers to the correct image

popupOpenKeys.forEach(function (popupKey, currentOpenKeyIndex) {
    popupKey.addEventListener("click", function () {

        // currentImg = popupKey.parentElement.previousElementSibling.querySelector("img");
        currentImg = galleryImages[currentOpenKeyIndex];
        currentImgSrc = currentImg.getAttribute("src");

        updatePopupImg(currentImgSrc);
        open(popupElement);

        // currentImgIndex = currentOpenKeyIndex;
        currentImgIndex = (galleryImages.indexOf(currentImg));
        updateIndicators();

    });

});

//! _______________________________________ Keyboard_Control _______________________________________

document.addEventListener("keydown", function (event) {

    if (popupElement.classList.contains("show")) {

        //* __________________ ArrowRight __________________

        if (event.key == "ArrowRight") {
            showNextImage();
            updateIndicators();
        }

        //* __________________ ArrowLeft __________________

        if (event.key == "ArrowLeft") {
            showPreviousImage();
            updateIndicators();
        }

        //* __________________ Escape __________________

        if (event.key == "Escape") {
            close(popupElement);
        }
        //* __________________ Keyboard Numbers __________________

        let key = +event.key;

        // Special Effect for Current Image Key

        if (key == currentImgIndex + 1) {
            triggerSameImageEffect();
        }

        // Image Change with Keyboard Numbers

        else if (key >= 1 && key <= galleryImages.length) {

            currentImgIndex = key - 1;
            currentImg = galleryImages[currentImgIndex];
            currentImgSrc = currentImg.getAttribute("src");
            updatePopupImg(currentImgSrc);
            updateIndicators();

        }

        // Special Effect for Invalid Keys

        else if (key < 1 || key > galleryImages.length) {
            triggerInvalidKeyEffect();
        }
    }

});

//! _______________________________________ Close_Popup _______________________________________

popupCloseKey.addEventListener("click", () => {
    close(popupElement);
});

popupElement.addEventListener("click", () => {
    close(popupElement);
});

popupBox.addEventListener("click", (event) => {
    event.stopPropagation();
});

//! _______________________________________ Prev _______________________________________
popupPrevKey.addEventListener("click", () => {
    showPreviousImage();
    updateIndicators();
});

//! _______________________________________ Next _______________________________________
popupNextKey.addEventListener("click", () => {
    showNextImage();
    updateIndicators();

});

//! _______________________________________ Change_Img_with_Indicators ______________________________________________
popupIndicators.forEach(function (popupIndicator, currentIndicatorIndex) {
    popupIndicator.addEventListener("click", function () {

        if (currentImgIndex == currentIndicatorIndex) {
            triggerSameImageEffect();
        }

        currentImg = galleryImages[currentIndicatorIndex];
        currentImgSrc = currentImg.getAttribute("src");
        updatePopupImg(currentImgSrc);

        currentImgIndex = currentIndicatorIndex;
        updateIndicators();

    });
});