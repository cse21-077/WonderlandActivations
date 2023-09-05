'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const elemArr = [navCloseBtn, overlay, navOpenBtn];

for (let i = 0; i < elemArr.length; i++) {
    elemArr[i].addEventListener("click", function() {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    });
}

/**
 * toggle navbar & overlay when click any navbar-link
 */

const navbarLinks = document.querySelectorAll("[data-navbar-link]");

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", function() {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    });
}





/**
 * header & go-top-btn active
 * when window scroll down to 400px
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function() {
    if (window.scrollY >= 400) {
        header.classList.add("active");
        goTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        goTopBtn.classList.remove("active");
    }
});

document.getElementById('next').onclick = function() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}

/**
 * Gallery Script
 */
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

/* Scroll gallery limitier*/
const imageTrack = document.getElementById('image-track');
const images = document.querySelectorAll('.image');
const imageCount = images.length;
let currentIndex = 0;

// Function to scroll to the next image
function scrollToNextImage() {
    currentIndex++;
    if (currentIndex >= imageCount) {
        currentIndex = imageCount - 1; // Don't go beyond the last image
    }
    const scrollPosition = currentIndex * images[0].width;
    imageTrack.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Function to scroll to the previous image
function scrollToPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = 0; // Don't go beyond the first image
    }
    const scrollPosition = currentIndex * images[0].width;
    imageTrack.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Add event listeners for scrolling to next and previous images
document.getElementById('scroll-next').addEventListener('click', scrollToNextImage);
document.getElementById('scroll-prev').addEventListener('click', scrollToPrevImage);

//Pop Up
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const openPopupButton = document.getElementById("openPopup");
    const closePopupButton = document.getElementById("closePopup");
    const okButton = document.getElementById("okButton");
    const emailInput = document.getElementById("emailInput");

    // Function to open the popup
    function openPopup() {
        popup.style.display = "block";
    }

    // Function to close the popup
    function closePopup() {
        popup.style.display = "none";
    }

    // Event listener for the "Get A Quote" button
    openPopupButton.addEventListener("click", openPopup);

    // Event listener for the "OK" button
    okButton.addEventListener("click", function() {
        const userEmail = emailInput.value;
        if (userEmail) {
            // You can add your code here to handle the email input
            alert(`Thank you! Your email: ${userEmail}`);
            closePopup();
        } else {
            alert("Please enter a valid email.");
        }
    });

    // Event listener for the "Cancel" button
    closePopupButton.addEventListener("click", closePopup);
});