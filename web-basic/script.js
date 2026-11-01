
/* =========================================
   VIKASH - PERSONAL EDITION ANALOG CLOCK
   Live Clock and Customization
========================================= */

// =========================================
// GET HTML ELEMENTS
// =========================================

const minuteMarkers = document.getElementById("minute-markers");
const hourMarkers = document.getElementById("hour-markers");

const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const weekdayElement = document.getElementById("weekday");
const dateDisplay = document.getElementById("date-display");

const digitalTime = document.getElementById("digital-time");
const digitalDate = document.getElementById("digital-date");

const dial = document.getElementById("dial");
const hands = document.getElementById("hands");

// Customization controls
const numeralSelect = document.getElementById("numeral-style");
const handSelect = document.getElementById("hand-style");
const dialSelect = document.getElementById("dial-design");

const watchColorSelect = document.getElementById("watch-color");
const backgroundSelect = document.getElementById("background-color");

const customDial = document.getElementById("custom-dial");
const customBackground = document.getElementById("custom-background");

const resetButton = document.getElementById("reset-button");


// =========================================
// CLOCK NUMERALS
// =========================================

const arabicNumbers = [
    "12", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "10", "11"
];

const romanNumbers = [
    "XII", "I", "II", "III", "IV", "V",
    "VI", "VII", "VIII", "IX", "X", "XI"
];


// =========================================
// CREATE MINUTE MARKERS
// =========================================

function createMinuteMarkers() {

    minuteMarkers.innerHTML = "";

    for (let i = 0; i < 60; i++) {

        const marker = document.createElement("div");

        marker.className = "minute-marker";

        if (i % 5 === 0) {
            marker.classList.add("major");
        }

        const angle = i * 6;

        marker.style.left = "50%";
        marker.style.top = "50%";

        marker.style.transform = `
            translate(-50%, -50%)
            rotate(${angle}deg)
            translateY(-44cqw)
        `;

        minuteMarkers.appendChild(marker);
    }
}


// =========================================
// CREATE HOUR NUMERALS
// =========================================

function createHourMarkers(style = "arabic") {

    hourMarkers.innerHTML = "";

    for (let i = 0; i < 12; i++) {

        const marker = document.createElement("div");

        marker.className = "hour-marker";

        const angle = i * 30;

        const radius = 39;

        const radians = (angle - 90) * Math.PI / 180;

        const x = 50 + radius * Math.cos(radians);
        const y = 50 + radius * Math.sin(radians);

        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;

        if (style === "roman") {
            marker.textContent = romanNumbers[i];
        } else if (style === "bold") {
            marker.textContent = arabicNumbers[i];
            marker.classList.add("bold");
        } else if (style === "minimal") {
            marker.classList.add("minimal");
        } else {
            marker.textContent = arabicNumbers[i];
        }

        hourMarkers.appendChild(marker);
    }
}


// =========================================
// UPDATE CLOCK
// =========================================

function updateClock() {

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Smooth hand movement
    const secondAngle = (seconds + milliseconds / 1000) * 6;

    const minuteAngle = (minutes + seconds / 60) * 6;

    const hourAngle = ((hours % 12) + minutes / 60) * 30;

    // Rotate clock hands
    hourHand.style.transform =
        `translateX(-50%) rotate(${hourAngle}deg)`;

    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteAngle}deg)`;

    secondHand.style.transform =
        `translateX(-50%) rotate(${secondAngle}deg)`;


    // Weekday inside clock: SUN, MON, TUE...
    const weekday = now.toLocaleDateString("en-US", {
        weekday: "short"
    }).toUpperCase();

    weekdayElement.textContent = weekday;


    // Date inside clock: NOV 1
    const shortDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    }).toUpperCase();

    dateDisplay.textContent = shortDate;


    // Digital time: HH:MM:SS AM/PM
    digitalTime.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });


    // Digital date: DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, "0");

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const year = now.getFullYear();

    digitalDate.textContent = `${day}/${month}/${year}`;
}


// =========================================
// HAND STYLE CUSTOMIZATION
// =========================================

handSelect.addEventListener("change", function () {

    hands.className = "hands";

    hands.classList.add(`hands-${this.value}`);

});


// =========================================
// DIAL DESIGN CUSTOMIZATION
// =========================================

dialSelect.addEventListener("change", function () {

    dial.className = "dial";

    dial.classList.add(`pattern-${this.value}`);

});


// =========================================
// NUMERAL STYLE CUSTOMIZATION
// =========================================

numeralSelect.addEventListener("change", function () {

    createHourMarkers(this.value);

});


// =========================================
// WATCH COLOR CUSTOMIZATION
// =========================================

watchColorSelect.addEventListener("change", function () {

    document.body.classList.remove(
        "theme-emerald",
        "theme-black",
        "theme-burgundy",
        "theme-ivory",
        "theme-silver"
    );

    if (this.value !== "midnight") {

        document.body.classList.add(`theme-${this.value}`);

    }

});


// =========================================
// BACKGROUND COLOR CUSTOMIZATION
// =========================================

backgroundSelect.addEventListener("change", function () {

    document.body.classList.remove(
        "bg-black",
        "bg-charcoal",
        "bg-slate",
        "bg-cream",
        "bg-wine"
    );

    if (this.value !== "navy") {

        document.body.classList.add(`bg-${this.value}`);

    }

});


// =========================================
// CUSTOM DIAL COLOR
// =========================================

customDial.addEventListener("input", function () {

    document.body.style.setProperty("--dial", this.value);

    document.body.style.setProperty("--dial-light", this.value);

});


// =========================================
// CUSTOM BACKGROUND COLOR
// =========================================

customBackground.addEventListener("input", function () {

    document.body.style.setProperty("--background", this.value);

    document.body.style.setProperty("--background-glow", this.value);

});


// =========================================
// RESET DESIGN
// =========================================

resetButton.addEventListener("click", function () {

    // Reset dropdowns
    numeralSelect.value = "arabic";
    handSelect.value = "classic";
    dialSelect.value = "sunburst";

    watchColorSelect.value = "midnight";
    backgroundSelect.value = "navy";

    // Reset custom colors
    customDial.value = "#0b1d38";
    customBackground.value = "#071329";

    // Remove custom themes
    document.body.classList.remove(
        "theme-emerald",
        "theme-black",
        "theme-burgundy",
        "theme-ivory",
        "theme-silver",
        "bg-black",
        "bg-charcoal",
        "bg-slate",
        "bg-cream",
        "bg-wine"
    );

    // Reset inline color variables
    document.body.style.removeProperty("--dial");
    document.body.style.removeProperty("--dial-light");
    document.body.style.removeProperty("--background");
    document.body.style.removeProperty("--background-glow");

    // Reset clock designs
    hands.className = "hands";
    dial.className = "dial";

    createHourMarkers("arabic");

});


// =========================================
// INITIALIZE CLOCK
// =========================================

createMinuteMarkers();

createHourMarkers("arabic");

updateClock();

// Update every 50 milliseconds for smooth hands
setInterval(updateClock, 50);
